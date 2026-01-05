import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';
import { IsId } from '@/common/decorators/validations/is-id';
import { PartialType } from '@nestjs/swagger';
import { QuizModuleBaseDto } from '../quiz-modules.dto';

export class CreateQuizModuleDto extends QuizModuleBaseDto {
  @IsId('Quiz id of this module')
  quizId: string;
}

export class ListQuizModulesDto {
  @IsId('Quiz id')
  quizId: string;
}

export class UpdateQuizModuleDto extends PartialType(CreateQuizModuleDto) {
  @IsId('Id of quiz module to update')
  id: string;
}

export class DeleteQuizModulesDto {
  @IsArrayOfId('Array of quiz modules ids')
  ids: string[];
}
