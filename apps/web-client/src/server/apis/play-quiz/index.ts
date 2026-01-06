import { sdk } from "../sdk";

export const listLobbies = sdk.playQuizControllerListLobbies;
export type ListLobbiesParams = Parameters<typeof listLobbies>[0];

export const createLobby = sdk.playQuizControllerCreateLobby;
export type CreateLobbyParams = Parameters<typeof createLobby>[0];

import { apiClient } from "../axios";

export const deleteMany = (params: { ids: string[] }) => {
  return apiClient<{ data: string[] }>({
    url: `/api/quiz/play/lobby`,
    method: "DELETE",
    params: {
      ids: params.ids,
    },
  });
};
export type DeleteManyParams = Parameters<typeof deleteMany>[0];

export const getLobby = sdk.playQuizControllerFindLobbyById;
export type GetLobbyParams = Parameters<typeof getLobby>[0];
