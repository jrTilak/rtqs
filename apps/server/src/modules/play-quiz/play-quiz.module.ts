import { Module } from '@nestjs/common';
import { PlayQuizService } from './play-quiz.service';
import { PlayQuizController } from './play-quiz.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  LobbyPlayerEntity,
  LobbyPlayerResponseEntity,
  QuizLobbyEntity,
} from './entities';
import { QuizEntity } from '../quizzes/entities';
import { QuizParticipantEntity } from '../quiz-participants/entities/quiz-participant.entity';

@Module({
  controllers: [PlayQuizController],
  providers: [PlayQuizService],
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        QuizLobbyEntity,
        QuizEntity,
        QuizParticipantEntity,
        LobbyPlayerEntity,
        LobbyPlayerResponseEntity,
      ],
    }),
  ],
})
export class PlayQuizModule {}
