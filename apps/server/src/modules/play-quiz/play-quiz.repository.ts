import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/db/base-repository';
import { QuizLobbyEntity } from './entities';

@Injectable()
export class QuizLobbyRepository extends BaseRepository<QuizLobbyEntity> {}
