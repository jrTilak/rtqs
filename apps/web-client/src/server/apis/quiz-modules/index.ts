import { sdk } from "../sdk";

export const createQuizModule = sdk.quizModulesControllerCreateQuizModule;
export type CreateQuizModuleParams = Parameters<typeof createQuizModule>[0];

export const listQuizModules = sdk.quizModulesControllerListQuizModules;
export type ListQuizModulesParams = Parameters<typeof listQuizModules>[0];

export const updateQuizModule = sdk.quizModulesControllerUpdateQuizModule;
export type UpdateQuizModuleParams = Parameters<typeof updateQuizModule>[0];

export const deleteQuizModules = sdk.quizModulesControllerDeleteQuizModules;
export type DeleteQuizModulesParams = Parameters<typeof deleteQuizModules>[0];
