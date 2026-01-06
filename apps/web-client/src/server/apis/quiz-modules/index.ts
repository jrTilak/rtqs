import { sdk } from "../sdk";

export const create = sdk.quizModulesControllerCreate;
export type CreateParams = Parameters<typeof create>[0];

export const list = sdk.quizModulesControllerList;
export type ListParams = Parameters<typeof list>[0];

export const update = sdk.quizModulesControllerUpdate;
export type UpdateParams = Parameters<typeof update>[0];

export const deleteMany = sdk.quizModulesControllerDeleteMany;
export type DeleteManyParams = Parameters<typeof deleteMany>[0];
