import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class QuizModuleBaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of quiz module',
    type: 'string',
    example: 'Module 1',
    required: true,
  })
  name: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: 'number',
    example: 0,
    required: true,
  })
  index: number;
}
