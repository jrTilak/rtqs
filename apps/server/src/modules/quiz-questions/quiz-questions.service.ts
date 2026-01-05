import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QuizEntity } from '../quizzes/entities';
import { QuizModuleEntity } from '../quiz-modules/entities';
import { QuizModulesRepository } from '../quiz-modules/quiz-modules.repository';
import {
  QuizQuestionEntity,
  QuizQuestionEntityType,
} from './entities/quiz-question.entity';
import { QuizQuestionsRepository } from './quiz-questions.repository';
import {
  CreateQuizQuestionDto,
  DeleteQuizQuestionsDto,
  ListQuizQuestionsDto,
  UpdateQuizQuestionDto,
} from './dto/requests/quiz-question.dto';

@Injectable()
export class QuizQuestionsService {
  constructor(
    @InjectRepository(QuizModuleEntity)
    private readonly _quizModuleRepo: QuizModulesRepository,

    @InjectRepository(QuizQuestionEntity)
    private readonly _quizQuestionsRepo: QuizQuestionsRepository,

    private readonly _em: EntityManager,
  ) {}

  async create(data: CreateQuizQuestionDto): Promise<QuizQuestionEntityType> {
    const module = await this._quizModuleRepo.findOne(
      {
        id: data.moduleId,
      },
      {
        fields: ['id'],
      },
    );

    if (!module?.id) {
      throw new NotFoundException('Module with given id not found');
    }

    const moduleRef = this._em.getReference(QuizModuleEntity, module.id);

    const quizQuestion = this._quizQuestionsRepo.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      module: moduleRef,
    });

    await this._em.persist(quizQuestion).flush();

    return quizQuestion;
  }

  list(filter: ListQuizQuestionsDto): Promise<QuizQuestionEntityType[]> {
    return this._quizQuestionsRepo.find({
      module: filter.moduleId,
    });
  }

  async findById(id: string): Promise<QuizQuestionEntityType> {
    const qn = await this._quizQuestionsRepo.findOne({
      id: id,
    });

    if (!qn) {
      throw new NotFoundException('Quiz question with given id not found');
    }

    return qn;
  }

  async update({
    id,
    ...data
  }: UpdateQuizQuestionDto): Promise<QuizQuestionEntityType> {
    const quizQns = await this.findById(id);

    this._quizQuestionsRepo.assign(quizQns, data);
    await this._em.flush();

    return quizQns;
  }

  async deleteMany({ ids }: DeleteQuizQuestionsDto): Promise<string[]> {
    const existingIds = await this._quizQuestionsRepo.getExistingIds(ids);

    if (existingIds.length === 0) {
      throw new BadRequestException('No quiz question found of given ids');
    }

    await this._em.nativeDelete(QuizQuestionEntity, {
      id: {
        $in: existingIds,
      },
    });

    return existingIds;
  }
}
