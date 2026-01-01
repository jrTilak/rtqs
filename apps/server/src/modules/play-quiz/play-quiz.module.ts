import { Module } from '@nestjs/common';
import { PlayQuizService } from './play-quiz.service';
import { PlayQuizGateway } from './play-quiz.gateway';
import { PlayQuizController } from './play-quiz.controller';

@Module({
  providers: [PlayQuizGateway, PlayQuizService],
  controllers: [PlayQuizController],
})
export class PlayQuizModule {}
