import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { ApiProperty } from '@nestjs/swagger';
import { QuizLobbyEnum } from '../../entity';

export class LobbyDto extends BaseTableDto {
  @ApiProperty({
    description: 'The ID of the quiz to be played in the lobby',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
    format: 'uuid',
    required: true,
  })
  quizId: string;

  @ApiProperty({
    description: 'The number of participants in the lobby',
    example: 10,
    type: Number,
    required: true,
  })
  participantsCount: number;

  @ApiProperty({
    description: 'The date and time when the game will start',
    example: '2024-12-31T23:59:59Z',
    type: String,
    format: 'date-time',
  })
  waitInLobbyUntil: string;

  @ApiProperty({
    description: 'The unique code for the lobby',
    example: 'QUIZ',
    type: String,
    required: true,
  })
  code: string;

  @ApiProperty({
    description: 'The name of the lobby',
    example: 'Friday Night Quiz',
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The status of the lobby',
    example: QuizLobbyEnum.IN_LOBBY,
    enum: QuizLobbyEnum,
    required: true,
  })
  status: QuizLobbyEnum;
}
