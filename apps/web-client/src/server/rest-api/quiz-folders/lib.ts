import { sdk } from "../sdk";

export const createQuizFolder = sdk.quizFoldersControllerCreate;
export type CreateQuizFolderRequest = Parameters<
  typeof sdk.quizFoldersControllerCreate
>[0];

export const listQuizFolders = sdk.quizFoldersControllerList;
export type ListQuizFoldersRequest = Parameters<
  typeof sdk.quizFoldersControllerList
>[0];

export const updateQuizFolder = sdk.quizFoldersControllerUpdate;
export type UpdateQuizFolderRequest = Parameters<
  typeof sdk.quizFoldersControllerUpdate
>[0];

export const deleteQuizFolder = sdk.quizFoldersControllerDelete;
export type DeleteQuizFolderRequest = Parameters<
  typeof sdk.quizFoldersControllerDelete
>[0];
