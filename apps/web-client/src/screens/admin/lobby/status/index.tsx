import { LOBBY_STATUS } from "@/server/constants";
import { InLobby } from "./in-lobby";
import type { LobbyProps } from "..";
import { ManageLobbyQuestions } from "./manage-lobby-questions";
import { QuizSummary } from "./quiz-summary";

export const LobbyStatus = ({ lobby }: LobbyProps) => {
  if (lobby.status === LOBBY_STATUS.IN_LOBBY) {
    return <InLobby lobby={lobby} />;
  }

  if (lobby.status === LOBBY_STATUS.ENDED) {
    return <QuizSummary lobby={lobby} />;
  }

  return <ManageLobbyQuestions lobby={lobby} />;
};
