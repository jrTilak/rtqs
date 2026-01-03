import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class QuizQuestionBaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question',
    type: 'string',
    example: 'What is your name?',
    required: true,
  })
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Correct Answer',
    type: 'string',
    example: "It's jrTilak",
    required: true,
  })
  answer: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: 'number',
    example: 0,
    required: true,
  })
  index: number;
}
