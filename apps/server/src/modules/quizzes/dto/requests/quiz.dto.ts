import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ArrayOfIds } from '@/common/dto/requests/array-of-ids.dto';

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

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the quiz to update',
    format: 'uuid',
    example: '880e758b-4974-4b85-a124-a39665a4c5f5',
  })
  id: string;
}

export class DeleteQuizzesDto extends ArrayOfIds {}
