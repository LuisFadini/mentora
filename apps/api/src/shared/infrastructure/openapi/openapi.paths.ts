import { authPaths } from "../../../modules/auth/auth.openapi.ts";
import { usersPaths } from "../../../modules/users/users.openapi.ts";

export const paths = {
  ...usersPaths,
  ...authPaths,
};
