import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/db/base-repository';
import { QuizParticipantEntity } from './entities/quiz-participant.entity';

@Injectable()
export class QuizParticipantsRepository extends BaseRepository<QuizParticipantEntity> {}
