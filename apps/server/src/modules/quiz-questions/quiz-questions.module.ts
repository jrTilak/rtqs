import { Module } from '@nestjs/common';
import { QuizQuestionsService } from './quiz-questions.service';
import { QuizQuestionsController } from './quiz-questions.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuizQuestionEntity } from './entities/quiz-question.entity';
import { QuizModuleEntity } from '../quiz-modules/entities';

@Module({
  controllers: [QuizQuestionsController],
  providers: [QuizQuestionsService],
  imports: [
    MikroOrmModule.forFeature({
      entities: [QuizQuestionEntity, QuizModuleEntity],
    }),
  ],
})
export class QuizQuestionsModule {}
