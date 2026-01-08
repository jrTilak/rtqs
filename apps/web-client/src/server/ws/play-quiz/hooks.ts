import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/server/keys";
import { joinLobbyRoom, updateLobby } from "./commands";
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
