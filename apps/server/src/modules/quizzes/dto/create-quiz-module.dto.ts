import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateQuizModuleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Module 1',
    description: 'Name of the Module',
  })
  name: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'The order of model, first to last ie 0 to ...',
    type: 'number',
    required: true,
    example: 0,
    minimum: 0,
  })
  index: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the quiz to which this model is related',
    format: 'uuid',
    type: 'string',
    required: true,
  })
  quizId: string;
}
