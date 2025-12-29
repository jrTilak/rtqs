import { Module } from '@nestjs/common';
import { PlayQuizService } from './play-quiz.service';
import { PlayQuizGateway } from './play-quiz.gateway';

@Module({
  providers: [PlayQuizGateway, PlayQuizService],
})
export class PlayQuizModule {}
