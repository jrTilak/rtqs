import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLobby } from "./commands";
import { KEYS } from "@/server/keys";

export const useCreateLobby = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLobby,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: KEYS.playQuiz.listLobbies({ quizId: params.quizId }),
      });
    },
    onMutate: async (params) => {
      console.log("Mutating with params:", params);
    },
  });
};
