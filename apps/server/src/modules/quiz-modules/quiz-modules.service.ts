import { Injectable, NotFoundException } from '@nestjs/common';
import { quizModuleTable } from './entity';
import { db } from '@/db';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import { asc, eq, inArray } from 'drizzle-orm';
import {
  CreateQuizModuleDto,
  DeleteQuizModulesDto,
  ListQuizModulesDto,
  UpdateQuizModuleDto,
} from './dto/requests/quiz-module.dto';

@Injectable()
export class QuizModulesService {
  async createQuizModule(data: CreateQuizModuleDto) {
    const [module] = await db.insert(quizModuleTable).values(data).returning();
    return new ApiResponse(module);
  }

  async listQuizModules(query: ListQuizModulesDto) {
    const modules = await db
      .select()
      .from(quizModuleTable)
      .where(eq(quizModuleTable.quizId, query.id))
      .orderBy(asc(quizModuleTable.index));
    return new ApiResponse(modules);
  }

  async updateQuizModule({ id, ...data }: UpdateQuizModuleDto) {
    const [exists] = await db
      .select({ id: quizModuleTable.id })
      .from(quizModuleTable)
      .where(eq(quizModuleTable.id, id));

    if (!exists?.id) {
      throw new NotFoundException('No Quiz module found with provided id.');
    }

    const [module] = await db
      .update(quizModuleTable)
      .set(data)
      .where(eq(quizModuleTable.id, id))
      .returning();
    return new ApiResponse(module);
  }

  async deleteQuizModules({ ids }: DeleteQuizModulesDto) {
    await db.delete(quizModuleTable).where(inArray(quizModuleTable.id, ids));
    return new ApiResponse();
  }
}
