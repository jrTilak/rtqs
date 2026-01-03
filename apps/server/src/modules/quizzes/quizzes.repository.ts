import { EntityRepository } from '@mikro-orm/postgresql';
import { QuizEntity } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizzesRepository extends EntityRepository<QuizEntity> {
  async getExistingIds(ids: string[]): Promise<string[]> {
    const quizzes = await this.find(
      {
        id: {
          $in: ids,
        },
      },
      {
        fields: ['id'],
      },
    );

    return quizzes.map((q) => q.id);
  }

  async exitsOne(id: string): Promise<boolean> {
    const quizzes = await this.getExistingIds([id]);
    return quizzes.length === 1;
  }
}
