import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { IntersectionType } from '@nestjs/swagger';
import { QuizBaseDto } from '../quiz.dto';

export class QuizDto extends IntersectionType(BaseTableDto, QuizBaseDto) {}
