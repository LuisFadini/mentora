import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import { config } from "../../config/env.ts";
import type { ISessionRepository } from "../interfaces/repository.interface.ts";

export function makeGuestMiddleware(
  sessionRepository: ISessionRepository,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { session_token } = req.cookies as Record<string, string>;

    if (!session_token) return next();

    const session = await sessionRepository.findById(session_token);

    if (!session) return next();

    const expired =
      Date.now() - session.lastSeenAt.getTime() > config.SESSION_DURATION;

    if (expired) {
      await sessionRepository.delete(session.id);
      res.clearCookie("session_token", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: !config.isDevelopment,
      });

      return next();
    }

    return res.status(403).json({
      message: "You are already authenticated",
    });
  };
}
