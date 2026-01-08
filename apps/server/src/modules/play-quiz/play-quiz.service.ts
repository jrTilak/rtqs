import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateLobbyDto,
  DeleteLobbyDto,
  JoinLobbyRoomDto,
  ListLobbyDto,
  NextQuestionDto,
  UpdateLobbyDto,
} from './dto/request/lobby.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  LobbyPlayerEntity,
  QuizLobbyEntity,
  QuizLobbyEntityType,
  QuizLobbyStatsEnum,
} from './entities';
import {
  LobbyPlayerRepository,
  QuizLobbyRepository,
} from './play-quiz.repository';
import { QuizEntity } from '../quizzes/entities';
import { QuizzesRepository } from '../quizzes/quizzes.repository';
import { EntityManager } from '@mikro-orm/core';
import { QuizParticipantEntity } from '../quiz-participants/entities/quiz-participant.entity';
import { QuizParticipantsRepository } from '../quiz-participants/quiz-participants.repository';
import { User } from '@/common/db/entities/auth.entity';
import { GetLobbyByIdResponseDto } from './dto/response/lobby.dto';
import { Socket } from 'socket.io';
import { ROLES } from '@/lib/auth';
import { getWsRoomId } from '@/lib/get-ws-room-id';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { QuizQuestionEntity } from '../quiz-questions/entities/quiz-question.entity';
import { QuizQuestionsRepository } from '../quiz-questions/quiz-questions.repository';
import { QuizModuleEntity } from '../quiz-modules/entities';
import { QuizModulesRepository } from '../quiz-modules/quiz-modules.repository';

@Injectable()
export class PlayQuizService {
  constructor(
    @InjectRepository(QuizLobbyEntity)
    private readonly _quizLobbyRepo: QuizLobbyRepository,

    @InjectRepository(QuizEntity)
    private readonly _quizzesRepo: QuizzesRepository,

    @InjectRepository(QuizParticipantEntity)
    private readonly _quizParticipantsRepo: QuizParticipantsRepository,

    @InjectRepository(LobbyPlayerEntity)
    private readonly _lobbyPlayerRepo: LobbyPlayerRepository,

    @InjectRepository(QuizQuestionEntity)
    private readonly _quizQuestionRepo: QuizQuestionsRepository,

    @InjectRepository(QuizModuleEntity)
    private readonly _quizModuleRepo: QuizModulesRepository,

    private readonly _em: EntityManager,
  ) {}

  async createLobby({
    quizId,
    ...data
  }: CreateLobbyDto): Promise<QuizLobbyEntityType> {
    const quiz = await this._quizzesRepo.findOne(
      {
        id: quizId,
      },
      {
        fields: ['id'],
      },
    );

    if (!quiz?.id) {
      throw new NotFoundException('Quiz with given id not found');
    }

    const lobby = await this._quizLobbyRepo.findOne({
      code: data.code,
      status: {
        $ne: QuizLobbyStatsEnum.ENDED,
      },
    });

    if (lobby) {
      throw new BadRequestException('Lobby with the give code exists');
    }

    const quizRef = this._em.getReference(QuizEntity, quiz.id);

    const quizLobby = this._quizLobbyRepo.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      quiz: quizRef,
      status: QuizLobbyStatsEnum.IN_LOBBY,
      waitUntil: new Date(data.waitUntil),
    });

    await this._em.persist(quizLobby).flush();

    return quizLobby;
  }

  async updateLobby({ id, ...data }: UpdateLobbyDto) {
    const lobby = await this._quizLobbyRepo.findOne({
      id,
    });

    if (!lobby) {
      throw new NotFoundException('Lobby with given id not found');
    }

    this._em.assign(lobby, data);
    await this._em.flush();

    return this.findLobbyById(id);
  }

  async listLobbies({ quizId }: ListLobbyDto) {
    return this._quizLobbyRepo.find({
      quiz: quizId,
    });
  }

  async joinLobby(code: string, user: User): Promise<QuizLobbyEntityType> {
    const lobby = await this._quizLobbyRepo.findOne({
      code: code,
      status: {
        $ne: QuizLobbyStatsEnum.ENDED,
      },
    });

    if (!lobby) {
      throw new NotFoundException('Lobby with that code not found');
    }

    if (lobby.status === QuizLobbyStatsEnum.ENDED) {
      throw new BadRequestException('Lobby is ended');
    }

    const participant = await this._quizParticipantsRepo.findOne({
      email: user.email,
      quiz: lobby.quiz,
    });

    if (!participant) {
      throw new BadRequestException(
        'You have not registered for this quiz. Please contact the adminstration if you think this is a mistake.',
      );
    }
    const userRef = this._em.getReference(User, user.id);

    const existingPlayer = await this._lobbyPlayerRepo.findOne({
      lobby,
      player: userRef,
    });

    if (existingPlayer) {
      return lobby;
    }

    const lobbyPlayer = this._lobbyPlayerRepo.create({
      lobby,
      player: userRef,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this._em.persist(lobbyPlayer).flush();

    return lobby;
  }

  async findJoinedLobby(
    lobbyId: string,
    user: User,
  ): Promise<QuizLobbyEntityType> {
    const lobby = await this._quizLobbyRepo.findOne(
      {
        id: lobbyId,
      },
      {
        populate: ['quiz', 'currentModule', 'currentQuestion'],
      },
    );

    if (!lobby) {
      throw new NotFoundException('Lobby with given id not found');
    }

    const lobbyPlayer = await this._lobbyPlayerRepo.findOne({
      lobby,
      player: user,
    });

    if (!lobbyPlayer) {
      throw new NotFoundException('You are not a part of this lobby');
    }

    return lobby;
  }

  async joinLobbyRoom(
    payload: JoinLobbyRoomDto,
    user: UserSession['user'],
    socket: Socket,
  ) {
    const lobbyExists = await this._quizLobbyRepo.existsOne(payload.lobbyId);

    if (!lobbyExists) {
      throw new NotFoundException('Lobby with given id not found');
    }

    if (user.role === ROLES.ADMIN) {
      await socket.join(
        getWsRoomId({
          role: ROLES.ADMIN,
          scope: 'lobby',
          scopeId: payload.lobbyId,
        }),
      );
    } else {
      const lobbyPlayer = await this._lobbyPlayerRepo.findOne({
        lobby: payload.lobbyId,
        player: user,
      });

      if (!lobbyPlayer) {
        throw new NotFoundException('You are not a part of this quiz');
      }

      await socket.join(
        getWsRoomId({
          role: ROLES.USER,
          scope: 'lobby',
          scopeId: payload.lobbyId,
        }),
      );
    }

    return { ok: true };
  }

  async findLobbyById(id: string): Promise<GetLobbyByIdResponseDto> {
    const lobby = await this._quizLobbyRepo.findOne(
      {
        id: id,
      },
      {
        populate: ['quiz', 'currentModule', 'currentQuestion'],
      },
    );

    if (!lobby) {
      throw new NotFoundException('Quiz with given id not found');
    }

    const participants = await this._lobbyPlayerRepo.find(
      {
        lobby: lobby.id,
      },
      {
        populate: ['player'],
      },
    );

    return {
      ...lobby,
      participants: participants.map((participant) => participant.player) || [],
    } as unknown as GetLobbyByIdResponseDto;
  }

  async deleteLobby({ ids }: DeleteLobbyDto): Promise<string[]> {
    const existingIds = await this._quizLobbyRepo.getExistingIds(ids);

    if (existingIds.length === 0) {
      throw new BadRequestException('No quiz found of given ids');
    }

    await this._em.nativeDelete(QuizLobbyEntity, {
      id: {
        $in: existingIds,
      },
    });

    return existingIds;
  }

  async computeNextQuestion({ lobbyId }: NextQuestionDto) {
    const lobby = await this._quizLobbyRepo.findOne(
      {
        id: lobbyId,
      },
      {
        populate: ['currentModule', 'currentQuestion', 'quiz'],
      },
    );

    if (!lobby) {
      throw new NotFoundException('Lobby with given id not found');
    }

    if (lobby.status == QuizLobbyStatsEnum.ENDED) {
      throw new BadRequestException('Lobby is ended');
    }

    const nextQuestionStartsAt = new Date();
    nextQuestionStartsAt.setSeconds(nextQuestionStartsAt.getSeconds() + 6);

    this._em.assign(lobby, {
      status: QuizLobbyStatsEnum.WAITING_FOR_NEXT_QUESTION,
      waitUntil: nextQuestionStartsAt.toISOString(),
    });

    await this._em.flush();

    let newModuleId = lobby.currentModule?.id;
    let newQuestionId = lobby.currentQuestion?.id;

    // first time
    if (!lobby.currentQuestion) {
      const firstModule = await this._quizModuleRepo.findOne(
        {
          quiz: lobby.quiz,
        },
        {
          orderBy: { index: 'asc' },
        },
      );
      if (!firstModule) {
        throw new BadRequestException('No module found');
      }
      const firstQuestion = await this._quizQuestionRepo.findOne(
        {
          module: firstModule,
        },
        {
          orderBy: { index: 'asc' },
        },
      );
      if (!firstQuestion) {
        throw new BadRequestException('No question found in this module');
      }
      newModuleId = firstModule.id;
      newQuestionId = firstQuestion.id;
    } else {
      // not first time
      if (lobby.currentModule && lobby.currentQuestion) {
        const nextQuestion = await this._quizQuestionRepo.findOne(
          {
            module: lobby.currentModule,
            index: {
              $gt: lobby.currentQuestion.index,
            },
          },
          {
            orderBy: { index: 'asc' },
          },
        );
        if (nextQuestion) {
          newQuestionId = nextQuestion.id;
        } else {
          const newModule = await this._quizModuleRepo.findOne(
            {
              quiz: lobby.quiz,
              index: {
                $gt: lobby.currentModule.index,
              },
            },
            {
              orderBy: { index: 'asc' },
            },
          );
          if (newModule) {
            newModuleId = newModule.id;
            const newQuestion = await this._quizQuestionRepo.findOne(
              {
                module: newModule,
              },
              {
                orderBy: { index: 'asc' },
              },
            );

            if (!newQuestion) {
              throw new BadRequestException('No more questions');
            }

            newQuestionId = newQuestion.id;
          } else {
            throw new BadRequestException('No more questions');
          }
        }
      } else {
        throw new BadRequestException('No module or question found');
      }
    }

    const lobbyFromDb = await this.findLobbyById(lobbyId);

    return {
      lobby: lobbyFromDb,
      newLobby: {
        id: lobbyId,
        currentModuleId: newModuleId,
        currentQuestionId: newQuestionId,
      },
    };
  }

  async saveNextQuestion(data: {
    id: string;
    currentModuleId: string;
    currentQuestionId: string;
  }) {
    const lobby = await this._quizLobbyRepo.findOne({
      id: data.id,
    });
    if (!lobby) {
      throw new NotFoundException('Lobby not found');
    }

    this._em.assign(lobby, {
      currentModule: this._em.getReference(
        QuizModuleEntity,
        data.currentModuleId,
      ),
      currentQuestion: this._em.getReference(
        QuizQuestionEntity,
        data.currentQuestionId,
      ),
      status: QuizLobbyStatsEnum.IN_QUIZ,
      waitUntil: new Date().toISOString(),
    });
    await this._em.flush();
    return lobby;
  }
}
