import type { Session } from "../modules/auth/auth.types.ts";
import type { User } from "../modules/users/user.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
