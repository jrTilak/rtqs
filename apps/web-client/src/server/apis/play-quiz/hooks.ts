import { KEYS } from "@/server/keys";
import { useQuery } from "@tanstack/react-query";
import {
  getLobby,
  listLobbies,
  type GetLobbyParams,
  type ListLobbiesParams,
} from ".";

export const useListLobbies = (params: ListLobbiesParams) => {
  return useQuery({
    queryKey: KEYS.playQuiz.listLobbies(params),
    queryFn: () => listLobbies(params).then((res) => res.data),
  });
};

export const useGetLobby = (params: GetLobbyParams) => {
  return useQuery({
    queryFn: () => getLobby(params).then((r) => r.data),
    queryKey: KEYS.playQuiz.getLobby(params),
  });
};
