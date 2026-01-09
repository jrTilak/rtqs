import type { GetLobbyResponse } from "@/server/apis/play-quiz";
import { LobbyStatus } from "./status";
import { useSocket } from "@/server/ws/hooks";
import { MESSAGES } from "@/server/ws/play-quiz/messages";
import { useJoinLobbyRoom } from "@/server/ws/play-quiz/hooks";
import { useEffect } from "react";

export type LobbyProps = {
  lobby: GetLobbyResponse["data"];
};

export const LobbyPage = ({ lobby }: LobbyProps) => {
  const { isConnected } = useSocket({
    events: [
      MESSAGES.LOBBY_UPDATED,
      MESSAGES.LOBBY_ROOM_JOINED,
      MESSAGES.ANSWER_SUBMITTED,
    ],
  });

  const joinLobbyRoom = useJoinLobbyRoom(
    {
      lobbyId: lobby.id,
    },
    {
      enabled: isConnected,
    }
  );

  useEffect(() => {
    if (!joinLobbyRoom.isSuccess) {
      joinLobbyRoom.mutate();
    }
  }, [joinLobbyRoom.isSuccess]);

  return <LobbyStatus lobby={lobby} />;
};
