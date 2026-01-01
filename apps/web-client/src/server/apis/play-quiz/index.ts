import { sdk } from "../sdk";

export const listLobbies = sdk.playQuizControllerListLobbies;
export type ListLobbiesParams = Parameters<typeof listLobbies>[0];
