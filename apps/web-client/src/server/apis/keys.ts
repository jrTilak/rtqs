import type { ListQuizModulesParams } from "./quiz-modules";
import type { ListQuizQuestionsParams } from "./quiz-questions";
import type { GetAQuizParams } from "./quizzes";

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
};
