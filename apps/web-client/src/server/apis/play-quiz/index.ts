import { sdk } from "../sdk";

export const listLobbies = sdk.playQuizControllerListLobbies;
export type ListLobbiesParams = Parameters<typeof listLobbies>[0];

export const createLobby = sdk.playQuizControllerCreateLobby;
export type CreateLobbyParams = Parameters<typeof createLobby>[0];

export const deleteLobbies = sdk.playQuizControllerDeleteLobbies;
export type DeleteLobbiesParams = Parameters<typeof deleteLobbies>[0];

export const getLobby = sdk.playQuizControllerFindLobbyById;
export type GetLobbyParams = Parameters<typeof getLobby>[0];
export type GetLobbyResponse = Awaited<ReturnType<typeof getLobby>>;

export const joinLobby = sdk.playQuizControllerJoinLobby;
export type JoinLobbyParams = Parameters<typeof joinLobby>[0];

export const findJoinedLobby = sdk.playQuizControllerFindJoinedLobby;
export type FindJoinedLobbyParams = Parameters<typeof findJoinedLobby>[0];
export type FindJoinedLobbyResponse = Awaited<
  ReturnType<typeof findJoinedLobby>
>;

export const getLobbyResponses = sdk.playQuizControllerGetLobbyResponses;
export type GetLobbyResponsesParams = Parameters<typeof getLobbyResponses>[0];
export type GetLobbyResponsesResponse = Awaited<
  ReturnType<typeof getLobbyResponses>
>;
export const evaluateQuestion = sdk.playQuizControllerEvaluateQuestion;
export type EvaluateQuestionParams = Parameters<typeof evaluateQuestion>[0];
export type EvaluateQuestionResponse = Awaited<
  ReturnType<typeof evaluateQuestion>
>;
