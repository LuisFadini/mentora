import { type Request, type Response } from "express";

import type { AuthService } from "./auth.service.ts";
import type { CreateSessionDTO } from "./dto/create-session.dto.ts";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  verifySession = async (req: Request, res: Response) => {
    const sessionCookie = (req.cookies as { [key: string]: string })[
      "session_token"
    ];

    if (!sessionCookie) {
      return res.status(401).json({ authenticated: false });
    }

    const result = await this.authService.verifySession(sessionCookie);

    if (!result.authenticated) {
      return res.status(401).json(result);
    }

    return res.json(result);
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

    return res.status(202).cookie("session_token", session.sessionId!).send();
  };

  deleteSession = async (req: Request, res: Response) => {
    const sessionCookie = (req.cookies as { [key: string]: string })[
      "session_token"
    ];
    const deleteSuccess = await this.authService.deleteSession(sessionCookie!);

    if (!deleteSuccess)
      return res.status(400).json({ message: "Error closing session" });

    return res.status(200).json({ message: "Session closed successfully" });
  };
}
