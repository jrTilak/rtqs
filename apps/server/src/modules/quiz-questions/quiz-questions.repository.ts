import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/db/base-repository';
import { QuizQuestionEntity } from './entities/quiz-question.entity';

@Injectable()
export class QuizQuestionsRepository extends BaseRepository<QuizQuestionEntity> {}
