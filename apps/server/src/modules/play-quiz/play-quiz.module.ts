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
import { PlayQuizGateway } from './play-quiz.gateway';

@Module({
  controllers: [PlayQuizController],
  providers: [PlayQuizService, PlayQuizGateway],
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
