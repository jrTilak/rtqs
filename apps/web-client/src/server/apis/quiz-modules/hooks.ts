import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuizModule,
  deleteQuizModules,
  listQuizModules,
  updateQuizModule,
  type CreateQuizModuleParams,
  type DeleteQuizModulesParams,
  type ListQuizModulesParams,
  type UpdateQuizModuleParams,
} from ".";
import { KEYS } from "../keys";

export const useCreateQuizModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateQuizModuleParams) => createQuizModule(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizModules.listQuizModules({ id: params.quizId }),
      });
    },
  });
};

export const useListQuizModules = (params: ListQuizModulesParams) => {
  return useQuery({
    queryKey: KEYS.quizModules.listQuizModules(params),
    queryFn: () => listQuizModules(params).then((res) => res.data),
  });
};

export const useDeleteQuizModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteQuizModulesParams &{
      quizId: string;
    }) => deleteQuizModules(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizModules.listQuizModules({ id: params.quizId }),
      });
    },
  });
};

export const useUpdateQuizModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateQuizModuleParams) => updateQuizModule(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizModules.listQuizModules(),
      });
    },
  });
};
