import { PickType } from '@nestjs/swagger';
import { LobbyBaseDto } from '../lobby.dto';
import { IsId } from '@/common/decorators/validations/is-id';
import { IsArrayOfId } from '@/common/decorators/validations/is-array-of-id';

export class CreateLobbyDto extends PickType(LobbyBaseDto, [
  'code',
  'name',
  'waitInLobbyUntil',
]) {
  @IsId('Quiz id')
  quizId: string;
}

export class DeleteLobbyDto {
  @IsArrayOfId('Id of lobby to delete')
  ids: string[];
}

export class ListLobbyDto {
  @IsId('Quiz id')
  quizId: string;
}
