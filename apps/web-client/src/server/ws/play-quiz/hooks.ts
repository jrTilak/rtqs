import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/server/keys";
import {
  joinLobbyRoom,
  nextQuestion,
  submitAnswer,
  updateLobby,
  evaluateQuestion,
} from "./commands";
import type { JoinLobbyRoomPayload } from "./types";
import type { GetLobbyResponse } from "@/server/apis/play-quiz";

export const useUpdateLobby = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLobby,
    onSuccess: (res, params) => {
      queryClient.setQueryData(
        KEYS.playQuiz.getLobby(params.id),
        (prev: GetLobbyResponse["data"] | undefined) => {
          if (prev) {
            return {
              ...prev,
              ...res,
              participants: [...prev.participants],
              quiz: prev.quiz,
            };
          }
          return res;
        }
      );
    },
  });
};

export const useJoinLobbyRoom = (
  payload: JoinLobbyRoomPayload,
  options?: {
    enabled?: boolean;
  }
) => {
  return useMutation({
    mutationFn: () => joinLobbyRoom(payload),
    ...(options || {}),
  });
};

export const useNextQuestion = () => {
  return useMutation({
    mutationFn: nextQuestion,
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswer,
  });
};

export const useEvaluateQuestion = () => {
  return useMutation({
    mutationFn: evaluateQuestion,
  });
};
