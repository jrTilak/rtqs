import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';
import { IsId } from '@/common/decorators/validations/is-id';
import { QuizParticipantBaseDto } from '../quiz-participant.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizParticipantsDto {
  @IsId('Quiz id for participants')
  quizId: string;

  @ValidateNested({ each: true })
  @Type(() => QuizParticipantBaseDto)
  data: QuizParticipantBaseDto[];
}

export class ListQuizParticipantsDto {
  @IsId('Quiz id')
  quizId: string;
}

export class DeleteQuizParticipantsDto {
  @IsArrayOfId('Array of quiz participant ids')
  ids: string[];
}
