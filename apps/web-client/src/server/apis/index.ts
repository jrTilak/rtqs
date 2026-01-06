import * as auth from "./auth/hooks";
import * as quizzes from "./quizzes/hooks";
import * as quizModules from "./quiz-modules/hooks";
import * as quizQuestions from "./quiz-questions/hooks";
import * as playQuiz from "./play-quiz/hooks";
import * as users from "./users/hooks";

export const server = {
  auth,
  quizzes,
  quizModules,
  quizQuestions,
  playQuiz,
  users,
};
