import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  QuizModuleEntity,
  QuizModuleEntityType,
} from './entities/quiz-module.entity';
import { QuizModulesRepository } from './quiz-modules.repository';
import {
  CreateQuizModuleDto,
  DeleteQuizModulesDto,
  ListQuizModulesDto,
  UpdateQuizModuleDto,
} from './dto/requests/quiz-module.dto';
import { QuizzesRepository } from '../quizzes/quizzes.repository';
import { QuizEntity } from '../quizzes/entities';

@Injectable()
export class QuizModulesService {
  constructor(
    @InjectRepository(QuizModuleEntity)
    private readonly _quizModuleRepo: QuizModulesRepository,

    @InjectRepository(QuizEntity)
    private readonly _quizzesRepo: QuizzesRepository,

    private readonly _em: EntityManager,
  ) {}

  async create(data: CreateQuizModuleDto): Promise<QuizModuleEntityType> {
    console.log(this._quizzesRepo);
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

    const quizModule = this._quizModuleRepo.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      quiz: quizRef,
    });

    await this._em.persist(quizModule).flush();

    return quizModule;
  }

  list(filter: ListQuizModulesDto): Promise<QuizModuleEntityType[]> {
    return this._quizModuleRepo.find({
      quiz: filter.quizId,
    });
  }

  async findById(id: string): Promise<QuizModuleEntityType> {
    console.log(id);
    const module = await this._quizModuleRepo.findOne({
      id: id,
    });
    if (!module) {
      throw new NotFoundException('Quiz module with given id not found');
    }
    return module;
  }

  async update({
    id,
    ...data
  }: UpdateQuizModuleDto): Promise<QuizModuleEntityType> {
    const quizModule = await this.findById(id);

    this._quizModuleRepo.assign(quizModule, data);
    await this._em.flush();

    return quizModule;
  }

  async deleteMany({ ids }: DeleteQuizModulesDto): Promise<string[]> {
    const existingIds = await this._quizModuleRepo.getExistingIds(ids);

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
