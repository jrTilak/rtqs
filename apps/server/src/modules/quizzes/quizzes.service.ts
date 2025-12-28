import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/requests/create-quiz.dto';
import { db } from '@/db';
import { Quiz, quizModuleTable, quizQuestionTable, quizTable } from './entity';
import { asc, desc, eq, inArray } from 'drizzle-orm';
import { UpdateQuizDto } from './dto/requests/update-quiz.dto';
import { DeleteQuizzesDto } from './dto/requests/delete-quizzes.dto';
import { CreateQuizModuleDto } from './dto/requests/create-quiz-module.dto';
import { UpdateQuizModuleDto } from './dto/requests/update-quiz-module.dto';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import { AddQuestionsDto } from './dto/requests/add-questions.dto';
import { UpdateQuestionDto } from './dto/requests/update-question.dto';
import { DeleteQuizModulesDto } from './dto/requests/delete-quiz-module.dto';
import { ListQuizModulesDto } from './dto/requests/list-quiz-modules.dto';
import { ListQuizQuestionsDto } from './dto/requests/list-quiz-questions.dto';
import { DeleteQuizQuestionsDto } from './dto/requests/delete-quiz-questions.dto';

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

  // quiz modules
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

  //qns
  async addQuestions(data: AddQuestionsDto) {
    const question = await db
      .insert(quizQuestionTable)
      .values(data.questions)
      .returning();
    return new ApiResponse(question);
  }

  async listQuestions(data: ListQuizQuestionsDto) {
    const questions = await db
      .select()
      .from(quizQuestionTable)
      .where(eq(quizQuestionTable.moduleId, data.moduleId));
    return new ApiResponse(questions);
  }

  async updateQuestion({ id, ...data }: UpdateQuestionDto) {
    const [question] = await db
      .update(quizQuestionTable)
      .set(data)
      .where(eq(quizQuestionTable.id, id))
      .returning();
    return new ApiResponse(question);
  }

  async deleteQuizQuestions({ ids }: DeleteQuizQuestionsDto) {
    await db
      .delete(quizQuestionTable)
      .where(inArray(quizQuestionTable.id, ids));
    return new ApiResponse();
  }
}
