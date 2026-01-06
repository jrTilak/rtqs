import type { GetLobbyParams, ListLobbiesParams } from "./apis/play-quiz";
import type { ListQuizModulesParams } from "./apis/quiz-modules";
import type { ListQuizQuestionsParams } from "./apis/quiz-questions";
import type { FindByIdParams } from "./apis/quizzes";

export const KEYS = {
  quizzes: {
    list: () => ["list", "quizzes"],
    findById: (params?: FindByIdParams) => ["quiz", "findById", params],
  },
  quizModules: {
    listQuizModules: (params?: ListQuizModulesParams) => [
      "list",
      "quizModules",
      params,
    ],
  },
  quizQuestions: {
    listQuizQuestions: (params?: ListQuizQuestionsParams) => [
      "list",
      "quizQuestions",
      params,
    ],
  },
  playQuiz: {
    listLobbies: (params: ListLobbiesParams) => ["quiz", "lobbies", params],
    getLobby: (params: GetLobbyParams) => ["lobby", params],
  },
  users: {
    list: () => ["users"],
  },
};
