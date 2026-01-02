import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export function IsId(description?: string) {
  return applyDecorators(
    ApiProperty({
      type: 'string',
      required: true,
      description: description || 'ID (UUID)',
      format: 'uuid',
      example: '880e758b-4974-4b85-a124-a39665a4c5f5',
    }),
    IsString(),
    IsUUID(),
    IsNotEmpty(),
  );
}
