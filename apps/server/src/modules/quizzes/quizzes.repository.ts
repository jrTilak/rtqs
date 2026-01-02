import { db } from '@/db';
import { Injectable } from '@nestjs/common';
import { QuizTable, quizTable } from './entity';
import { desc, eq, inArray } from 'drizzle-orm';
import { PartialExcept } from '@/lib/types';

@Injectable()
export class QuizzesRepository {
  async insert(
    values: Pick<QuizTable, 'name' | 'description'>,
    tx = db,
  ): Promise<QuizTable> {
    const [quiz] = await tx.insert(quizTable).values(values).returning();
    return quiz;
  }

  findAll(tx = db): Promise<QuizTable[]> {
    return tx.select().from(quizTable).orderBy(desc(quizTable.updatedAt));
  }

  async findOneById(id: string, tx = db): Promise<QuizTable | null> {
    const [res] = await tx.select().from(quizTable).where(eq(quizTable.id, id));
    return res ?? null;
  }

  async getExistingIds(quizIds: string[], tx = db): Promise<string[]> {
    if (!quizIds.length) return [];

    const rows = await tx
      .select({ id: quizTable.id })
      .from(quizTable)
      .where(inArray(quizTable.id, quizIds));

    return rows.map((r) => r.id);
  }

  async exists(quizId: string): Promise<boolean> {
    const res = await this.getExistingIds([quizId]);
    return res.length === 1;
  }

  async updateOneById(
    { id, ...values }: PartialExcept<QuizTable, 'id'>,
    tx = db,
  ): Promise<QuizTable> {
    const [updated] = await tx
      .update(quizTable)
      .set(values)
      .where(eq(quizTable.id, id))
      .returning();

    return updated;
  }

  async deleteMany(ids: string[]): Promise<void> {
    await db.delete(quizTable).where(inArray(quizTable.id, ids));
  }
}
