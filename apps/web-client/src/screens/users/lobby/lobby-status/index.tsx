import { LOBBY_STATUS } from "@/server/constants";
import { InLobby } from "./in-lobby";
import type { LobbyProps } from "..";
import { WaitingForNextQuestion } from "./waiting-for-next-question";

import { ModuleBreak } from "./module-break";

import { InQuiz } from "./in-quiz";

import { QuestionResponseSummary } from "./question-response-summary";

import { QuizSummary } from "./quiz-summary";
import { Ended } from "./ended";

export const LobbyStatus = ({ lobby }: LobbyProps) => {
  switch (lobby.status) {
    case LOBBY_STATUS.IN_LOBBY:
      return <InLobby lobby={lobby} />;

    case LOBBY_STATUS.WAITING_FOR_NEXT_QUESTION:
      return <WaitingForNextQuestion lobby={lobby} />;

    case LOBBY_STATUS.MODULE_BREAK:
      return <ModuleBreak lobby={lobby} />;

    case LOBBY_STATUS.IN_QUIZ:
      return <InQuiz lobby={lobby} />;

    case LOBBY_STATUS.QUESTION_RESPONSE_SUMMARY:
      return <QuestionResponseSummary lobby={lobby} />;

    case LOBBY_STATUS.QUIZ_SUMMARY:
      return <QuizSummary lobby={lobby} />;

    case LOBBY_STATUS.ENDED:
      return <Ended lobby={lobby} />;
    default:
      return null;
  }
};
