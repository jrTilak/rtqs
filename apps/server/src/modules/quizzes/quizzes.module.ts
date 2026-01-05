import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { QuizEntity } from './entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
  imports: [MikroOrmModule.forFeature({ entities: [QuizEntity] })],
})
export class QuizzesModule {}
