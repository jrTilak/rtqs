import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AddQuizQuestionsDto,
  DeleteQuizQuestionsDto,
  ListQuizQuestionsDto,
  UpdateQuizQuestionDto,
} from './dto/requests/quiz-questions.dto';
import { db } from '@/db';
import { quizQuestionTable } from './entity';
import { ApiResponse } from '@/common/dto/response/api-response.dto';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class QuizQuestionsService {
  async addQuizQuestions(data: AddQuizQuestionsDto) {
    const question = await db
      .insert(quizQuestionTable)
      .values(data.questions)
      .returning();
    return new ApiResponse(question);
  }

  async listQuizQuestions(data: ListQuizQuestionsDto) {
    const questions = await db
      .select()
      .from(quizQuestionTable)
      .where(eq(quizQuestionTable.moduleId, data.moduleId));
    return new ApiResponse(questions);
  }

  async updateQuizQuestion({ id, ...data }: UpdateQuizQuestionDto) {
    const [exists] = await db
      .select({ id: quizQuestionTable.id })
      .from(quizQuestionTable)
      .where(eq(quizQuestionTable.id, id));

    if (!exists?.id) {
      throw new NotFoundException('No Quiz question found with provided id.');
    }

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
