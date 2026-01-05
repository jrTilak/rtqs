import { ArrayOfIds } from '@/common/dto/requests/array-of-ids.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
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
    example: 'fe69982d-e863-4a39-961b-62f3adad6e1c',
  })
  quizId: string;
}

export class ListQuizModulesDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the quiz to to list modules for',
    format: 'uuid',
    example: 'bd19acce-57f4-4fc3-8aaf-506c23044c84',
  })
  id: string;
}

export class UpdateQuizModuleDto extends PartialType(CreateQuizModuleDto) {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    description: ' Id of the quiz module to update',
    format: 'uuid',
    example: 'bd19acce-57f4-4fc3-8aaf-506c23044c84',
  })
  id: string;
}

export class DeleteQuizModulesDto extends ArrayOfIds {}
