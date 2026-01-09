import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { KEYS } from "../../keys";
import {
  create,
  deleteMany,
  findById,
  list,
  update,
  type CreateParams,
  type DeleteManyParams,
  type FindByIdParams,
  type UpdateParams,
} from ".";

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateParams) => create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.list(),
      });
    },
  });
};

export const useList = () => {
  return useQuery({
    queryKey: KEYS.quizzes.list(),
    queryFn: () => list().then((d) => d.data),
  });
};

export const useFindById = (params: FindByIdParams) => {
  return useQuery({
    queryKey: KEYS.quizzes.findById(params),
    queryFn: () => findById(params).then((d) => d.data),
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateParams) => update(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.list(),
      });
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.findById(params.id),
      });
    },
  });
};

export const useDeleteMany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteManyParams) => deleteMany(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.list(),
      });
    },
  });
};
