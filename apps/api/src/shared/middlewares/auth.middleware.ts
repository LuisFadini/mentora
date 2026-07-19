import type { NextFunction, Request, RequestHandler, Response } from "express";

import { config } from "../../config/env.ts";
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

    const expired =
      Date.now() - session.lastSeenAt.getTime() > config.SESSION_DURATION;

    if (expired) {
      await sessionRepository.delete(session.id);
      return res
        .clearCookie("session_token", {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: !config.isDevelopment,
        })
        .status(401)
        .json({ message: "Authentication expired" });
    }

    const user = await userRepository.findById(session.userId);

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    req.session = session;

    return next();
  };
}
