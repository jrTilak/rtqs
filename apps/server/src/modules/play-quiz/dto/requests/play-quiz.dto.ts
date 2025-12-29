import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinDate,
} from 'class-validator';

export class OnCreateLobbyDto {
  @ApiProperty({
    description: 'The ID of the quiz to be played in the lobby',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({
    description: 'The date and time when the game will start',
    example: '2024-12-31T23:59:59Z',
    type: String,
    format: 'date-time',
  })
  @IsString()
  @IsDateString()
  @MinDate(() => new Date())
  waitUntil: string;

  @ApiProperty({
    description: 'The unique code for the lobby',
    example: 'QUIZ',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
