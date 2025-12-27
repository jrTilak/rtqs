import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateQuizModuleDto } from './create-quiz-module.dto';

export class UpdateQuizModuleDto extends PartialType(CreateQuizModuleDto) {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the quiz module to update',
    format: 'uuid',
  })
  id: string;
}
