import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateQuizDto,
  DeleteQuizzesDto,
  UpdateQuizDto,
} from './dto/requests/quiz.dto';
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

  listAll(): Promise<QuizEntityType[]> {
    return this._quizzesRepo.findAll();
  }

  findById(id: string) {
    return this._quizzesRepo.findOne({
      id,
    });
  }

  async update({ id, ...data }: UpdateQuizDto): Promise<QuizEntityType> {
    const quiz = await this.findById(id);

    if (!quiz) {
      throw new NotFoundException('No quiz found with given id');
    }

    this._quizzesRepo.assign(quiz, data);
    await this._em.flush();

    return quiz;
  }

  async deleteMany({ ids }: DeleteQuizzesDto): Promise<string[]> {
    const existingIds = await this._quizzesRepo.getExistingIds(ids);

    if (existingIds.length === 0) {
      throw new BadRequestException('No quiz found of given ids');
    }

    await this._em.nativeDelete(QuizEntity, {
      id: {
        $in: existingIds,
      },
    });

    return existingIds;
  }
}
