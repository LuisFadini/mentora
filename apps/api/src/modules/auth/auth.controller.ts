import { type Request, type Response } from "express";

import { config } from "../../config/env.ts";
import type { AuthService } from "./auth.service.ts";
import type { CreateSessionDTO } from "./dto/create-session.dto.ts";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setSessionCookie(res: Response, sessionToken: string) {
    return res.cookie("session_token", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: !config.isDevelopment,
      maxAge: config.SESSION_DURATION,
    });
  }

  private clearSessionCookie(res: Response) {
    return res.clearCookie("session_token", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: !config.isDevelopment,
    });
  }

  verifySession = async (req: Request, res: Response) => {
    const { session_token } = req.cookies as Record<string, string>;

    if (!session_token) return res.status(401).json({ authenticated: false });

    const session = await this.authService.verifySession(session_token);

    if (!session) {
      this.clearSessionCookie(res);

      return res.status(401).json({
        authenticated: false,
      });
    }

    if (session.refresh) this.setSessionCookie(res, session_token);

    return res.json({ authenticated: true, user: session.user });
  };

  createSession = async (
    req: Request<unknown, unknown, CreateSessionDTO>,
    res: Response,
  ) => {
    const session = await this.authService.createSession(req.body);

    if (!session)
      return res.status(404).json({
        message: "User not found",
      });

    if (!session.authenticated)
      return res.status(401).json({
        message: "Passwords don't match",
      });

    this.setSessionCookie(res, session.sessionId!);

    return res.status(202).send();
  };

  deleteSession = async (req: Request, res: Response) => {
    const { session_token } = req.cookies as Record<string, string>;

    const deleteSuccess = await this.authService.deleteSession(session_token!);

    if (!deleteSuccess)
      return res.status(400).json({ message: "Error closing session" });

    this.clearSessionCookie(res);

    return res.status(200).json({ message: "Session closed successfully" });
  };
}
