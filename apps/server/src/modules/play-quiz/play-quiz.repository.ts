import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/db/base-repository';
import {
  LobbyPlayerEntity,
  LobbyPlayerResponseEntity,
  QuizLobbyEntity,
} from './entities';

@Injectable()
export class QuizLobbyRepository extends BaseRepository<QuizLobbyEntity> {}

@Injectable()
export class LobbyPlayerRepository extends BaseRepository<LobbyPlayerEntity> {}

@Injectable()
export class LobbyPlayerResponseRepository extends BaseRepository<LobbyPlayerResponseEntity> {}
