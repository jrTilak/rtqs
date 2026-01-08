import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { LobbyBaseDto } from '../lobby.dto';
import { IsId } from '@/common/decorators/validations/is-id';
import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';

export class CreateLobbyDto extends PickType(LobbyBaseDto, [
  'code',
  'name',
  'waitUntil',
]) {
  @IsId('Quiz id')
  quizId: string;
}

export class UpdateLobbyDto extends IntersectionType(
  PartialType(PickType(LobbyBaseDto, ['waitUntil'])),
  PartialType(PickType(LobbyBaseDto, ['status'])),
) {
  @IsId('Lobby id')
  id: string;
}

export class DeleteLobbyDto {
  @IsArrayOfId('Id of lobby to delete')
  ids: string[];
}

export class ListLobbyDto {
  @IsId('Quiz id')
  quizId: string;
}

export class JoinLobbyRoomDto {
  @IsId('Lobby id')
  lobbyId: string;
}

export class NextQuestionDto {
  @IsId('Lobby id')
  lobbyId: string;
}
