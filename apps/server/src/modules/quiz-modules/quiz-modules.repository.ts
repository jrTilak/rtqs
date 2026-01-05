import { Injectable } from '@nestjs/common';
import { QuizModuleEntity } from './entities/quiz-module.entity';
import { BaseRepository } from '@/common/db/base-repository';

@Injectable()
export class QuizModulesRepository extends BaseRepository<QuizModuleEntity> {}
