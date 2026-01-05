import { BaseTableDto } from '@/common/dto/response/base-table.dto';
import { IntersectionType } from '@nestjs/swagger';
import { LobbyBaseDto } from '../lobby.dto';

export class QuizLobbyDto extends IntersectionType(
  BaseTableDto,
  LobbyBaseDto,
) {}
