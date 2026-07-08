import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import type { User } from "../../modules/users/user.types.ts";
import type {
  IRepository,
  ISessionRepository,
} from "../interfaces/repository.interface.ts";

export function makeAuthMiddleware(
  sessionRepository: ISessionRepository,
  userRepository: IRepository<User>,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { session_token } = req.cookies as Record<string, string>;

    if (!session_token)
      return res.status(401).json({ message: "Authentication required" });

    const session = await sessionRepository.findById(session_token);

    if (!session)
      return res.status(401).json({ message: "Authentication expired" });

    const user = await userRepository.findById(session.userId);

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    req.session = session;

    return next();
  };
}
