import * as auth from "./auth/hooks";
import * as quizzes from "./quizzes/hooks";
import * as quizModules from "./quiz-modules/hooks";
import * as quizQuestions from "./quiz-questions/hooks";

export const server = {
  auth,
  quizzes,
  quizModules,
  quizQuestions,
};
