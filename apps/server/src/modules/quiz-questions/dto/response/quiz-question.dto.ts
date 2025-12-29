import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QuizQuestionDto extends BaseTableDto {
  @ApiProperty({
    title: 'The question',
    required: true,
    type: 'string',
    example: 'What is your name?',
  })
  question: string;

  @ApiProperty({
    title: 'The answer',
    required: true,
    type: 'string',
    example: 'My name is Tilak',
  })
  answer: string;

  @ApiProperty({
    title: 'Order of question',
    required: true,
    type: 'number',
    example: 0,
  })
  index: number;
}
