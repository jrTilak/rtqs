import { sdk } from "../sdk";

export const create = sdk.quizParticipantsControllerCreate;
export type CreateParams = Parameters<typeof create>[0];

export const list = sdk.quizParticipantsControllerList;
export type ListParams = Parameters<typeof list>[0];

export const deleteMany = sdk.quizParticipantsControllerDeleteMany;
export type DeleteManyParams = Parameters<typeof deleteMany>[0];
