import type {
  FindJoinedLobbyParams,
  GetLobbyParams,
  ListLobbiesParams,
} from "./apis/play-quiz";
import type { ListParams as ListQuizModulesParams } from "./apis/quiz-modules";
import type { ListParams as ListQuizQuestionsParams } from "./apis/quiz-questions";
import type { FindByIdParams as FindByIdQuizParams } from "./apis/quizzes";
import type { ListParams as ListQuizParticipantsParams } from "./apis/quiz-participants";

export const KEYS = {
  quizzes: {
    list: () => ["list", "quizzes"],
    findById: (params?: FindByIdQuizParams) => ["quiz", "findById", params],
  },
  quizModules: {
    list: (params?: ListQuizModulesParams) => ["list", "quizModules", params],
  },
  quizQuestions: {
    list: (params?: ListQuizQuestionsParams) => [
      "list",
      "quizQuestions",
      params,
    ],
  },
  quizParticipants: {
    list: (params?: ListQuizParticipantsParams) => [
      "list",
      "quizParticipants",
      params,
    ],
  },
  playQuiz: {
    listLobbies: (params: ListLobbiesParams) => ["quiz", "lobbies", params],
    getLobby: (params: GetLobbyParams) => ["lobby", params],
    findJoinedLobby: (params: FindJoinedLobbyParams) => [
      "lobby",
      "findJoinedLobby",
      params,
    ],
  },
  users: {
    list: () => ["users"],
  },
};
