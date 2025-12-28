import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@/db';
import { Quiz, quizTable } from './entity';
import { desc, eq, inArray } from 'drizzle-orm';
import {
  CreateQuizDto,
  DeleteQuizzesDto,
  UpdateQuizDto,
} from './dto/requests/quiz.dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
@Injectable()
export class QuizzesService {
  async createQuiz(data: CreateQuizDto): Promise<ApiResponse<Quiz>> {
    const [quiz] = await db.insert(quizTable).values(data).returning();

    return new ApiResponse(quiz);
  }

  async listQuizzes(): Promise<ApiResponse<Quiz[]>> {
    const quizzes = await db
      .select()
      .from(quizTable)
      .orderBy(desc(quizTable.updatedAt));

    return new ApiResponse(quizzes);
  }

  async updateQuiz({ id, ...data }: UpdateQuizDto): Promise<ApiResponse<Quiz>> {
    const [exists] = await db
      .select({ id: quizTable.id })
      .from(quizTable)
      .where(eq(quizTable.id, id));

    if (!exists?.id) {
      throw new NotFoundException('No Quiz found with provided id.');
    }

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
}
