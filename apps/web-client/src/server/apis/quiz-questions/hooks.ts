import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addQuizQuestions,
  deleteQuizQuestions,
  listQuizQuestions,
  updateQuizQuestion,
  type AddQuizQuestionsParams,
  type DeleteQuizQuestionsParams,
  type ListQuizQuestionsParams,
  type UpdateQuizQuestionParams,
} from ".";
import { KEYS } from "../keys";

export const useAddQuizQuestions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddQuizQuestionsParams) => addQuizQuestions(params),
    onSuccess: (_, params) => {
      const moduleIds = Array.from(
        new Set(params.questions.map((q) => q.moduleId))
      );
      moduleIds.forEach((moduleId) => {
        queryClient.invalidateQueries({
          queryKey: KEYS.quizQuestions.listQuizQuestions({
            moduleId,
          }),
        });
      });
    },
  });
};

export const useUpdateQuizQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateQuizQuestionParams) =>
      updateQuizQuestion(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizQuestions.listQuizQuestions({
          moduleId: params.moduleId!,
        }),
      });
    },
  });
};

export const useDeleteQuizQuestions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteQuizQuestionsParams &{
      moduleId:string
    }) =>
      deleteQuizQuestions(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.quizQuestions.listQuizQuestions({
          moduleId: params.moduleId,
        }),
      });
    },
  });
};

export const useListQuizQuestions = (params: ListQuizQuestionsParams) => {
  return useQuery({
    queryKey: KEYS.quizQuestions.listQuizQuestions(params),
    queryFn: () => listQuizQuestions(params).then((res) => res.data),
  });
};
