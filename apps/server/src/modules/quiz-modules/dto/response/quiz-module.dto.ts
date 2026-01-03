import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { IntersectionType } from '@nestjs/swagger';
import { QuizModuleBaseDto } from '../quiz-modules.dto';

export class QuizModuleDto extends IntersectionType(
  BaseTableDto,
  QuizModuleBaseDto,
) {}
