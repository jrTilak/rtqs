import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class ArrayOfIds {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
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
