import { QuizEntity } from './entities';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/db/base-repository';

@Injectable()
export class QuizzesRepository extends BaseRepository<QuizEntity> {}
