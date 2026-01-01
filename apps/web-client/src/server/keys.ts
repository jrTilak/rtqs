import type { ListQuizModulesParams } from "./apis/quiz-modules";
import type { ListQuizQuestionsParams } from "./apis/quiz-questions";
import type { GetAQuizParams } from "./apis/quizzes";

export const KEYS = {
  quizzes: {
    listQuizzes: () => ["list", "quizzes"],
    getAQuiz: (params?: GetAQuizParams) => ["quiz", "getAQuiz", params],
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
  quizLobby: {
    listLobbies: (params: { quizId: string }) => ["quiz", "lobbies", params],
  },
};
