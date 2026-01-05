import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';
import { IsId } from '@/common/decorators/validations/is-id';
import { PartialType } from '@nestjs/swagger';
import { QuizQuestionBaseDto } from '../quiz-question.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizQuestionDto extends QuizQuestionBaseDto {
  @IsId('Module id of this question')
  moduleId: string;

  @ValidateNested({ each: true })
  @Type(() => QuizQuestionBaseDto)
  data: QuizQuestionBaseDto[];
}

export class ListQuizQuestionsDto {
  @IsId('Module id')
  moduleId: string;
}

class QuizQuestionWithModuleId extends QuizQuestionBaseDto {
  @IsId('Module id of this question')
  moduleId: string;
}

export class UpdateQuizQuestionDto extends PartialType(
  QuizQuestionWithModuleId,
) {
  @IsId('Id of quiz question to update')
  id: string;
}

export class DeleteQuizQuestionsDto {
  @IsArrayOfId('Array of quiz questions ids')
  ids: string[];
}
