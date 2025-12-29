import { sdk } from "../sdk";

export const addQuizQuestions = sdk.quizQuestionsControllerAddQuizQuestions;
export type AddQuizQuestionsParams = Parameters<typeof addQuizQuestions>[0];

export const listQuizQuestions = sdk.quizQuestionsControllerListQuizQuestions;
export type ListQuizQuestionsParams = Parameters<typeof listQuizQuestions>[0];

export const updateQuizQuestion = sdk.quizQuestionsControllerUpdateQuizQuestion;
export type UpdateQuizQuestionParams = Parameters<typeof updateQuizQuestion>[0];

export const deleteQuizQuestions =
  sdk.quizQuestionsControllerDeleteQuizQuestions;
export type DeleteQuizQuestionsParams = Parameters<
  typeof deleteQuizQuestions
>[0];
