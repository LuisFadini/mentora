import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import type { Session } from "../../modules/auth/auth.types.ts";
import type { User } from "../../modules/users/user.types.ts";
import type { IRepository } from "../interfaces/repository.interface.ts";

export function makeAuthMiddleware(
  sessionRepository: IRepository<Session>,
  userRepository: IRepository<User>,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const sessionCookie = req.cookies as { [key: string]: string };

    const session_token = sessionCookie["session_token"];
    if (!session_token)
      return res.status(401).json({ message: "Authentication required" });

    const session = await sessionRepository.findById(session_token);

    if (!session)
      return res.status(401).json({ message: "Authentication expired" });

    const user = await userRepository.findById(session.userId);

    if (!user) return res.status(401).json({ error: "User not found" });

    return next();
  };
}
