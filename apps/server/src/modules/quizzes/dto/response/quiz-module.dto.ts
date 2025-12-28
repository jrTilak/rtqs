import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QuizModuleDto extends BaseTableDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Module 1',
    title: 'Name of module',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 0,
    required: true,
    title: 'order of module',
  })
  index: number;
}
