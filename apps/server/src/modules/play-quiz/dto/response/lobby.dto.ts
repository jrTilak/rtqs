import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { LobbyBaseDto } from '../lobby.dto';
import { QuizDto } from '@/modules/quizzes/dto/response/quiz.dto';
import { User } from '@/common/db/entities/auth.entity';
import { QuizModuleDto } from '@/modules/quiz-modules/dto/response/quiz-module.dto';
import { QuizQuestionDto } from '@/modules/quiz-questions/dto/response/quiz-question.dto';

export class QuizLobbyDto extends IntersectionType(
  BaseTableDto,
  LobbyBaseDto,
) {}

export class GetLobbyByIdResponseDto extends QuizLobbyDto {
  @ApiProperty({
    type: QuizDto,
    required: true,
  })
  quiz: QuizDto;

  @ApiProperty({
    type: User,
    required: true,
    isArray: true,
  })
  participants: User[];

  @ApiProperty({
    type: QuizModuleDto,
    required: true,
  })
  currentModule: QuizModuleDto;

  @ApiProperty({
    type: QuizQuestionDto,
    required: true,
  })
  currentQuestion: QuizQuestionDto;
}

export class FindJoinedLobbyResponseDto extends OmitType(
  GetLobbyByIdResponseDto,
  ['participants'],
) {}
