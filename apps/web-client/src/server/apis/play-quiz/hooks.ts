import { KEYS } from "@/server/keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLobby,
  deleteMany,
  getLobby,
  listLobbies,
  type CreateLobbyParams,
  type DeleteManyParams,
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

export const useDeleteMany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      params: DeleteManyParams & {
        quizId: string;
      }
    ) => deleteMany({ ids: params.ids }),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.playQuiz.listLobbies({ quizId: params.quizId }),
      });
    },
  });
};
