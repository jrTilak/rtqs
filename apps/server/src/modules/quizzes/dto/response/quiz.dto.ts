import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QuizDto extends BaseTableDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Google Maestro',
    title: 'Name of quiz',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: '',
    required: false,
    title: 'description of quiz',
  })
  description: string;
}
