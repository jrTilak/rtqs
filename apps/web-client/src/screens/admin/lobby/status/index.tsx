import { LOBBY_STATUS } from "@/server/constants";
import { InLobby } from "./in-lobby";
import type { LobbyProps } from "..";
import { ManageLobbyQuestions } from "./manage-lobby-questions";

export const LobbyStatus = ({ lobby }: LobbyProps) => {
  if (lobby.status === LOBBY_STATUS.IN_LOBBY) {
    return <InLobby lobby={lobby} />;
  }

  return <ManageLobbyQuestions lobby={lobby} />;
};
