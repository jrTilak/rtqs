import { Module } from '@nestjs/common';
import { QuizModulesService } from './quiz-modules.service';
import { QuizModulesController } from './quiz-modules.controller';

@Module({
  controllers: [QuizModulesController],
  providers: [QuizModulesService],
})
export class QuizModulesModule {}
