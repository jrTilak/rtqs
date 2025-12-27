import { ApiProperty, PartialType } from '@nestjs/swagger';
import { QuestionDto } from './add-questions.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateQuestionDto extends PartialType(QuestionDto) {
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
