import { sdk } from "../sdk";

export const createQuiz = sdk.quizzesControllerCreateQuiz;
export type CreateQuizParams = Parameters<typeof createQuiz>[0];

export const listAllQuizzes = sdk.quizzesControllerListAllQuizzes;
export type ListAllQuizzesParams = Parameters<typeof listAllQuizzes>[0];

export const updateQuiz = sdk.quizzesControllerUpdateQuiz;
export type UpdateQuizParams = Parameters<typeof updateQuiz>[0];

export const deleteQuizzes = sdk.quizzesControllerDeleteQuizzes;
export type DeleteQuizzesParams = Parameters<typeof deleteQuizzes>[0];
