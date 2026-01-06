import { sdk } from "../sdk";

export const create = sdk.quizQuestionsControllerCreate;
export type CreateParams = Parameters<typeof create>[0];

export const list = sdk.quizQuestionsControllerList;
export type ListParams = Parameters<typeof list>[0];

export const update = sdk.quizQuestionsControllerUpdate;
export type UpdateParams = Parameters<typeof update>[0];

export const deleteMany = sdk.quizQuestionsControllerDeleteMany;
export type DeleteManyParams = Parameters<typeof deleteMany>[0];
