import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class DeleteQuizzesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    type: 'string',
    isArray: true,
    format: 'uuid',
    required: true,
    minLength: 1,
  })
  ids: string[];
}
