import { Module } from '@nestjs/common';
import { PlayQuizService } from './play-quiz.service';
import { PlayQuizController } from './play-quiz.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuizLobbyEntity } from './entities';
import { QuizEntity } from '../quizzes/entities';

@Module({
  controllers: [PlayQuizController],
  providers: [PlayQuizService],
  imports: [
    MikroOrmModule.forFeature({ entities: [QuizLobbyEntity, QuizEntity] }),
  ],
})
export class PlayQuizModule {}
