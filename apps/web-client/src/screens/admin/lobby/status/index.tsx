import { LOBBY_STATUS } from "@/server/constants";
import { InLobby } from "./in-lobby";
import type { LobbyProps } from "..";

export const LobbyStatus = ({ lobby }: LobbyProps) => {
  switch (lobby.status) {
    case LOBBY_STATUS.IN_LOBBY:
      return <InLobby lobby={lobby} />;
    default:
      return null;
  }
};
