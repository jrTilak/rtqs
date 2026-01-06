import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';
import { IsId } from '@/common/decorators/validations/is-id';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { QuizQuestionBaseDto } from '../quiz-question.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizQuestionDto {
  @IsId('Module id of this question')
  moduleId: string;

  @ApiProperty({
    type: QuizQuestionBaseDto,
    required: true,
    description: 'Array of quiz questions',
    isArray: true,
  })
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
