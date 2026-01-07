import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { LobbyBaseDto } from '../lobby.dto';
import { QuizDto } from '@/modules/quizzes/dto/response/quiz.dto';

export class QuizLobbyDto extends IntersectionType(
  BaseTableDto,
  LobbyBaseDto,
) {}

export class FindJoinedLobbyResponseDto extends QuizLobbyDto {
  @ApiProperty({
    type: QuizDto,
    required: true,
  })
  quiz: QuizDto;
}
