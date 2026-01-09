import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { KEYS } from "../../keys";
import {
  create,
  deleteMany,
  list,
  update,
  type CreateParams,
  type DeleteManyParams,
  type ListParams,
  type UpdateParams,
} from ".";

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateParams) => create(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizModules.list({ quizId: params.quizId }),
      });
    },
  });
};

export const useList = (params: ListParams) => {
  return useQuery({
    queryKey: KEYS.quizModules.list(params),
    queryFn: () => list(params).then((res) => res.data),
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
        queryKey: KEYS.quizModules.list({ quizId: params.quizId }),
      });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateParams) => update(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizModules.list({ quizId: params.quizId! }),
      });
    },
  });
};
