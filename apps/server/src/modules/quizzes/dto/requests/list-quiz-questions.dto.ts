import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
