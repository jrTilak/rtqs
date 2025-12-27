import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { db } from '@/db';
import { Quiz, quizModuleTable, quizTable } from './entity';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import { asc, eq, inArray } from 'drizzle-orm';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { DeleteQuizzesDto } from './dto/delete-quizzes.dto';
import { CreateQuizModuleDto } from './dto/create-quiz-module.dto';
import { UpdateQuizModuleDto } from './dto/update-quiz-module.dto';
import { DeleteQuizModulesDto } from './dto/delete-quiz-module.dto';

@Injectable()
export class QuizzesService {
  async createQuiz(data: CreateQuizDto): Promise<ApiResponse<Quiz>> {
    const [quiz] = await db.insert(quizTable).values(data).returning();

    return new ApiResponse(quiz);
  }

  async updateQuiz({ id, ...data }: UpdateQuizDto): Promise<ApiResponse<Quiz>> {
    const [quiz] = await db
      .update(quizTable)
      .set(data)
      .where(eq(quizTable.id, id))
      .returning();

    return new ApiResponse(quiz);
  }

  async deleteQuizzes({ ids }: DeleteQuizzesDto): Promise<ApiResponse> {
    await db.delete(quizTable).where(inArray(quizTable.id, ids));
    return new ApiResponse();
  }

  async listAllQuizzes(): Promise<ApiResponse<Quiz[]>> {
    const quizzes = await db.select().from(quizTable);

    return new ApiResponse(quizzes);
  }

  // quiz modules
  async createQuizModule(data: CreateQuizModuleDto) {
    const [module] = await db.insert(quizModuleTable).values(data).returning();
    return new ApiResponse(module);
  }

  async updateQuizModule(data: UpdateQuizModuleDto) {
    const [module] = await db.update(quizModuleTable).set(data).returning();
    return new ApiResponse(module);
  }

  async deleteQuizModules({ ids }: DeleteQuizModulesDto) {
    await db.delete(quizModuleTable).where(inArray(quizModuleTable.id, ids));
    return new ApiResponse();
  }

  async listQuizModules() {
    const modules = await db
      .select()
      .from(quizModuleTable)
      .orderBy(asc(quizModuleTable.index));
    return new ApiResponse(modules);
  }
}
