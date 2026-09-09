import { attemptsPaths } from "../../../modules/attempts/attempts.openapi.ts";
import { authPaths } from "../../../modules/auth/auth.openapi.ts";
import { questionsPaths } from "../../../modules/questions/questions.openapi.ts";
import { usersPaths } from "../../../modules/users/users.openapi.ts";

export const paths = {
  ...usersPaths,
  ...authPaths,
  ...questionsPaths,
  ...attemptsPaths,
};
