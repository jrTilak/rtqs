import { Module } from '@nestjs/common';
import { QuizParticipantsService } from './quiz-participants.service';
import { QuizParticipantsController } from './quiz-participants.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { QuizParticipantEntity } from './entities/quiz-participant.entity';
import { QuizEntity } from '../quizzes/entities';

@Module({
  imports: [MikroOrmModule.forFeature([QuizParticipantEntity, QuizEntity])],
  controllers: [QuizParticipantsController],
  providers: [QuizParticipantsService],
})
export class QuizParticipantsModule {}
