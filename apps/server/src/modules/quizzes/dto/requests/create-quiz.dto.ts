import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of quiz',
    type: 'string',
    example: 'Google Maestro v8.0',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    default: '',
    required: false,
  })
  description: string;
}
