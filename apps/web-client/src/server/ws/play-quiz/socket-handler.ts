import type { QueryClient } from "@tanstack/react-query";
import { MESSAGES } from "./messages";
import { KEYS } from "@/server/keys";
import type {
  FindJoinedLobbyResponse,
  GetLobbyResponse,
} from "@/server/apis/play-quiz";
import type { WsAckResponse } from "../types";
import type { Lobby } from "@/server/apis/play-quiz/types";
import type { authClient } from "@/lib/auth-client";
import { ROLE } from "@/server/constants";
import type { User } from "better-auth";

type SocketHandlersProps = {
  queryClient: QueryClient;
  e: WsAckResponse<unknown>;
  user: NonNullable<ReturnType<typeof authClient.useSession>["data"]>["user"];
};

export const socketHandlers: Record<string, (e: SocketHandlersProps) => void> =
  {
    [MESSAGES.CONNECT]: ({}) => {
      console.log("Connected to the server");
    },
    [MESSAGES.DISCONNECT]: ({}) => {
      console.log("Disconnected from the server");
    },
    [MESSAGES.ERROR]: ({ e }) => {
      console.error("Socket error:", e);
    },
    [MESSAGES.LOBBY_UPDATED]: ({ e, queryClient, user }) => {
      if (e.success && e.data) {
        const data = e.data as Lobby;
        if (user.role === ROLE.ADMIN) {
          queryClient.setQueryData(
            KEYS.playQuiz.getLobby(data.id),
            (prev: GetLobbyResponse["data"] | undefined) => {
              if (!prev) return data;
              return {
                ...prev,
                ...data,
                participants: prev.participants,
                quiz: prev.quiz,
              };
            }
          );
        } else {
          queryClient.setQueryData(
            KEYS.playQuiz.findJoinedLobby(data.id),
            (prev: FindJoinedLobbyResponse["data"] | undefined) => {
              if (!prev) return data;
              return {
                ...prev,
                ...data,
              };
            }
          );
        }
      }
    },
    [MESSAGES.LOBBY_ROOM_JOINED]: ({ e, queryClient }) => {
      console.log("Joined lobby room", e);
      if (e.success && e.data) {
        const data = e.data as {
          lobby: string;
          user: User;
        };
        queryClient.setQueryData(
          KEYS.playQuiz.getLobby(data.lobby),
          (prev: GetLobbyResponse["data"] | undefined) => {
            if (!prev) return data;

            const newParticipants = [
              data.user,
              ...(prev.participants || []).filter((p) => p.id !== data.user.id),
            ];

            return {
              ...prev,
              participants: newParticipants,
              quiz: prev.quiz,
            };
          }
        );
      }
    },
    [MESSAGES.ANSWER_SUBMITTED]: ({ e, queryClient }) => {
      if (!e.success || !e.data) return;

      const payload = e.data as {
        lobbyId: string;
      };

      if (payload && payload.lobbyId) {
        queryClient.invalidateQueries({
          queryKey: KEYS.playQuiz
            .getLobbyResponses(payload.lobbyId)
            .slice(0, 3),
        });
      }
    },
  };
