import { sdk } from "../sdk";

export const createQuiz = sdk.quizzesControllerCreateQuiz;
export type CreateQuizParams = Parameters<typeof createQuiz>[0];

export const listQuizzes = sdk.quizzesControllerListQuizzes;
export type ListQuizzesParams = Parameters<typeof listQuizzes>[0];

export const getAQuiz = sdk.quizzesControllerGetAQuiz;
export type GetAQuizParams = Parameters<typeof getAQuiz>[0];

export const updateQuiz = sdk.quizzesControllerUpdateQuiz;
export type UpdateQuizParams = Parameters<typeof updateQuiz>[0];

export const deleteQuizzes = sdk.quizzesControllerDeleteQuizzes;
export type DeleteQuizzesParams = Parameters<typeof deleteQuizzes>[0];
