import { sdk } from "../sdk";

export const listLobbies = sdk.playQuizControllerListLobbies;
export type ListLobbiesParams = Parameters<typeof listLobbies>[0];

export const getLobby = sdk.playQuizControllerGetLobby;
export type GetLobbyParams = Parameters<typeof getLobby>[0];
