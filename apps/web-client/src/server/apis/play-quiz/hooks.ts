import { KEYS } from "@/server/keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLobby,
  deleteLobbies,
  findJoinedLobby,
  getLobby,
  joinLobby,
  listLobbies,
  type CreateLobbyParams,
  type DeleteLobbiesParams,
  type FindJoinedLobbyParams,
  type GetLobbyParams,
  type JoinLobbyParams,
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

export const useCreateLobby = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateLobbyParams) => createLobby(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.playQuiz.listLobbies({ quizId: params.quizId }),
      });
    },
  });
};

export const useDeleteLobbies = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      params: DeleteLobbiesParams & {
        quizId: string;
      }
    ) => deleteLobbies({ ids: params.ids }),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.playQuiz.listLobbies({ quizId: params.quizId }),
      });
    },
  });
};

export const useJoinLobby = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: JoinLobbyParams) => joinLobby(params),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.playQuiz.findJoinedLobby(res.data.id),
      });
    },
  });
};

export const useFindJoinedLobby = (params: FindJoinedLobbyParams) => {
  return useQuery({
    queryFn: () => findJoinedLobby(params).then((r) => r.data),
    queryKey: KEYS.playQuiz.findJoinedLobby(params),
  });
};
