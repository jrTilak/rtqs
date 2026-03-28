import * as auth from "./auth";
import * as orgs from "./organizations";
import * as quizFolders from "./quiz-folders";

export const server = {
  auth,
  orgs,
  ...quizFolders,
};
