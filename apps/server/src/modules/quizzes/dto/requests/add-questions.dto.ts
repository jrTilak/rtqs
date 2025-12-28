import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Question',
    required: true,
    example: 'What is your name?',
  })
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Correct answer of the question',
    type: 'string',
    example: 'My name is Tilak Thapa.',
  })
  answer: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Order of the question',
    required: true,
    type: 'integer',
    example: 0,
  })
  index: number;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '012fc3f2-dd9e-4518-bab6-b7150a913fb5',
    description: 'The module in which the question lies',
    required: true,
    type: 'string',
    format: 'uuid',
  })
  moduleId: string;
}

export class AddQuestionsDto {
  @ApiProperty({
    type: QuestionDto,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
