import { Module } from '@nestjs/common';
import { QuizModulesService } from './quiz-modules.service';
import { QuizModulesController } from './quiz-modules.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuizModuleEntity } from './entities/quiz-module.entity';
import { QuizEntity } from '../quizzes/entities';

@Module({
  controllers: [QuizModulesController],
  providers: [QuizModulesService],
  imports: [
    MikroOrmModule.forFeature({ entities: [QuizModuleEntity, QuizEntity] }),
  ],
})
export class QuizModulesModule {}
