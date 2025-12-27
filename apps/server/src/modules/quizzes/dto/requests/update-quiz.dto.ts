import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the quiz to update',
    format: 'uuid',
  })
  id: string;
}
