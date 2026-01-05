import { ApiProperty } from '@nestjs/swagger';

export class BaseTableDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '362f380a-2c74-4870-ac21-9545a7fa6e43',
    required: true,
  })
  id: string;

  @ApiProperty({
    required: true,
    format: 'date-time',
    example: '2025-12-27 14:14',
    type: 'string',
  })
  createdAt: string;

  @ApiProperty({
    required: true,
    format: 'date-time',
    example: '2025-12-27 14:14',
    type: 'string',
  })
  updatedAt: string;
}
