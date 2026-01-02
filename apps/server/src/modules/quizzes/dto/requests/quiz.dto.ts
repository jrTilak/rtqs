import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';
import { QuizBaseDto } from '../quiz.dto';
import { IsId } from '@/common/decorators/validations/is-id';
import { PartialType } from '@nestjs/swagger';

export class CreateQuizDto extends QuizBaseDto {}

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsId('Id of quiz to update')
  id: string;
}

export class DeleteQuizzesDto {
  @IsArrayOfId('Array of quiz ids')
  ids: string[];
}
