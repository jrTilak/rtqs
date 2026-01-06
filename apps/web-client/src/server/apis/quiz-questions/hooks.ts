import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { KEYS } from "../../keys";

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateParams) => create(params),
    onSuccess: (_, params) => {
      const moduleIds = Array.from(new Set([params.moduleId]));
      moduleIds.forEach((moduleId) => {
        queryClient.invalidateQueries({
          queryKey: KEYS.quizQuestions.list({
            moduleId,
          }),
        });
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
        queryKey: KEYS.quizQuestions.list({
          moduleId: params.moduleId!,
        }),
      });
    },
  });
};

export const useDeleteMany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      params: DeleteManyParams & {
        moduleId: string;
      }
    ) => deleteMany(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizQuestions.list({
          moduleId: params.moduleId,
        }),
      });
    },
  });
};

export const useList = (params: ListParams) => {
  return useQuery({
    queryKey: KEYS.quizQuestions.list(params),
    queryFn: () => list(params).then((res) => res.data),
  });
};
