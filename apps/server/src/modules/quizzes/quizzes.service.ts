import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/requests/quiz.dto';
import { QuizzesRepository } from './quizzes.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { QuizEntity, QuizEntityType } from './entities';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly _quizzesRepo: QuizzesRepository,
    private readonly _em: EntityManager,
  ) {}

  async create(data: CreateQuizDto): Promise<QuizEntityType> {
    const quiz = this._quizzesRepo.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this._em.persist(quiz).flush();

    return quiz;
  }
}
