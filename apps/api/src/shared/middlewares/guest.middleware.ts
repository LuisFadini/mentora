import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import type { Session } from "../../modules/auth/auth.types.ts";
import type { IRepository } from "../interfaces/repository.interface.ts";

export function makeGuestMiddleware(
  sessionRepository: IRepository<Session>,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { session_token } = req.cookies as Record<string, string>;

    if (!session_token) return next();

    const session = await sessionRepository.findById(session_token);

    if (!session) return next();

    return res.status(403).json({
      message: "You are already authenticated",
    });
  };
}
