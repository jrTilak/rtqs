import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QuizEntity } from '../quizzes/entities';
import { QuizzesRepository } from '../quizzes/quizzes.repository';
import {
  QuizParticipantEntity,
  QuizParticipantEntityType,
} from './entities/quiz-participant.entity';
import { QuizParticipantsRepository } from './quiz-participants.repository';
import {
  CreateQuizParticipantsDto,
  DeleteQuizParticipantsDto,
  ListQuizParticipantsDto,
} from './dto/requests/quiz-participant.dto';

@Injectable()
export class QuizParticipantsService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly _quizzesRepo: QuizzesRepository,

    @InjectRepository(QuizParticipantEntity)
    private readonly _quizParticipantsRepo: QuizParticipantsRepository,

    private readonly _em: EntityManager,
  ) {}

  async create(
    data: CreateQuizParticipantsDto,
  ): Promise<QuizParticipantEntityType[]> {
    const quiz = await this._quizzesRepo.findOne(
      {
        id: data.quizId,
      },
      {
        fields: ['id'],
      },
    );

    if (!quiz?.id) {
      throw new NotFoundException('Quiz with given id not found');
    }

    const quizRef = this._em.getReference(QuizEntity, quiz.id);

    const participants = data.data.map((p) =>
      this._quizParticipantsRepo.create({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
        quiz: quizRef,
      }),
    );

    await this._em.persist(participants).flush();

    return participants;
  }

  list(filter: ListQuizParticipantsDto): Promise<QuizParticipantEntityType[]> {
    return this._quizParticipantsRepo.find({
      quiz: filter.quizId,
    });
  }

  async deleteMany({ ids }: DeleteQuizParticipantsDto): Promise<string[]> {
    const existingIds = await this._quizParticipantsRepo.getExistingIds(ids);

    if (existingIds.length === 0) {
      throw new BadRequestException(
        'No quiz participants found with given ids',
      );
    }

    await this._em.nativeDelete(QuizParticipantEntity, {
      id: {
        $in: existingIds,
      },
    });

    return existingIds;
  }
}
