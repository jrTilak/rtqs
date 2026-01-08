import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { QuizLobbyStatsEnum } from '../entities';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LobbyBaseDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value as string).toUpperCase())
  @ApiProperty({
    type: 'string',
    example: 'ACES',
    required: true,
    description: 'A unique code for this lobby',
  })
  @ApiProperty({
    type: 'string',
    example: 'ACES',
    required: true,
    description: 'A unique code for this lobby',
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'My Lobby',
    required: true,
    description: 'Name of the lobby',
  })
  name: string;

  @ApiProperty({
    description: 'Till when, we will wait for other player in lobby',
    required: true,
    format: 'date-time',
    example: '2026-01-03T08:45:00.000Z',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  waitUntil: string;

  @ApiProperty({
    description: 'Status of Lobby',
    required: true,
    type: 'string',
    enum: QuizLobbyStatsEnum,
  })
  status: QuizLobbyStatsEnum;
}
