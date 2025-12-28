import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuiz,
  deleteQuizzes,
  listAllQuizzes,
  updateQuiz,
  type CreateQuizParams,
  type DeleteQuizzesParams,
  type UpdateQuizParams,
} from ".";
import { KEYS } from "../keys";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateQuizParams) => createQuiz(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.listQuizzes(),
      });
    },
  });
};

export const useListQuizzes = () => {
  return useQuery({
    queryKey: KEYS.quizzes.listQuizzes(),
    queryFn: () => listAllQuizzes().then((d) => d.data),
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateQuizParams) => updateQuiz(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.listQuizzes(),
      });
    },
  });
};

export const useDeleteQuizzes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteQuizzesParams) => deleteQuizzes(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizzes.listQuizzes(),
      });
    },
  });
};
