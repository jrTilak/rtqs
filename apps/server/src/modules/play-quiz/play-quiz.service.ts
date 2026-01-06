import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateLobbyDto,
  DeleteLobbyDto,
  ListLobbyDto,
} from './dto/request/lobby.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  QuizLobbyEntity,
  QuizLobbyEntityType,
  QuizLobbyStatsEnum,
} from './entities';
import { QuizLobbyRepository } from './play-quiz.repository';
import { QuizEntity } from '../quizzes/entities';
import { QuizzesRepository } from '../quizzes/quizzes.repository';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class PlayQuizService {
  constructor(
    @InjectRepository(QuizLobbyEntity)
    private readonly _quizLobbyRepo: QuizLobbyRepository,

    @InjectRepository(QuizEntity)
    private readonly _quizzesRepo: QuizzesRepository,

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
      waitInLobbyUntil: new Date(data.waitInLobbyUntil),
      participantsCount: 0,
    });

    await this._em.persist(quizLobby).flush();

    return quizLobby;
  }

  async listLobbies({ quizId }: ListLobbyDto) {
    return this._quizLobbyRepo.find({
      quiz: quizId,
    });
  }

  async findLobbyByCode(code: string): Promise<QuizLobbyEntityType> {
    const lobby = await this._quizLobbyRepo.findOne({
      code: code,
      status: {
        $ne: QuizLobbyStatsEnum.ENDED,
      },
    });

    if (!lobby) {
      throw new NotFoundException('Lobby with that code not found');
    }

    return lobby;
  }

  async findLobbyById(id: string): Promise<QuizLobbyEntityType> {
    const lobby = await this._quizLobbyRepo.findOne({
      id: id,
    });

    if (!lobby) {
      throw new NotFoundException('Quiz with given id not found');
    }

    return lobby;
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
}
