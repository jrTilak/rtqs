import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { IntersectionType } from '@nestjs/swagger';
import { QuizParticipantBaseDto } from '../quiz-participant.dto';

export class QuizParticipantDto extends IntersectionType(
  BaseTableDto,
  QuizParticipantBaseDto,
) {}
