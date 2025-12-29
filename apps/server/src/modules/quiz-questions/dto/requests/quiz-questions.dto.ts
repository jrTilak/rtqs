import { ApiProperty, PartialType } from '@nestjs/swagger';
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
import { ArrayOfIds } from '@/common/dto/requests/array-of-ids.dto';
import { Type } from 'class-transformer';

export class QuizQuestionDto {
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

export class AddQuizQuestionsDto {
  @ApiProperty({
    type: QuizQuestionDto,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}

export class ListQuizQuestionsDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the module to list the questions for',
    format: 'uuid',
    example: 'bd19acce-57f4-4fc3-8aaf-506c23044c84',
  })
  moduleId: string;
}

export class UpdateQuizQuestionDto extends PartialType(QuizQuestionDto) {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the question to update',
    format: 'uuid',
    example: '2c73a694-895f-40d1-bf6b-e9794ae454b8',
  })
  id: string;
}

export class DeleteQuizQuestionsDto extends ArrayOfIds {}
