import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { IntersectionType } from '@nestjs/swagger';
import { QuizQuestionBaseDto } from '../quiz-question.dto';

export class QuizQuestionDto extends IntersectionType(
  BaseTableDto,
  QuizQuestionBaseDto,
) {}
