import { sdk } from "../sdk";

export const create = sdk.quizzesControllerCreate;
export type CreateParams = Parameters<typeof create>[0];

export const list = sdk.quizzesControllerListAll;
export type ListParams = Parameters<typeof list>[0];

export const findById = sdk.quizzesControllerFindById;
export type FindByIdParams = Parameters<typeof findById>[0];

export const update = sdk.quizzesControllerUpdate;
export type UpdateParams = Parameters<typeof update>[0];

export const deleteMany = sdk.quizzesControllerDeleteMany;
export type DeleteManyParams = Parameters<typeof deleteMany>[0];
