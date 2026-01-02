import { EntityRepository } from '@mikro-orm/postgresql';
import { QuizEntity } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizzesRepository extends EntityRepository<QuizEntity> {}
