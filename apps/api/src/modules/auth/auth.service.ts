import crypto from "node:crypto";

import { omit } from "@mentora/utils";

import { config } from "../../config/env.ts";
import type { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface.ts";
import type {
  ISessionRepository,
  IUserRepository,
} from "../../shared/interfaces/repository.interface.ts";
import type { CreateSessionDTO } from "./dto/create-session.dto.ts";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async verifySession(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) return null;

    const expired =
      Date.now() - session.lastSeenAt.getTime() > config.SESSION_DURATION;

    if (expired) {
      await this.sessionRepository.delete(sessionId);
      return null;
    }

    const shouldRefresh =
      Date.now() - session.lastSeenAt.getTime() >
      config.SESSION_REFRESH_INTERVAL;

    if (shouldRefresh) {
      await this.sessionRepository.touch(sessionId, new Date());
    }

    const user = await this.userRepository.findById(session.userId);
    if (!user) return null;

    return { user: omit(user, ["password"]), refresh: shouldRefresh };
  }

  async createSession(data: CreateSessionDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) return null;

    const passwordMatch = await this.passwordHasher.compare(
      data.password,
      user.password,
    );

    if (!passwordMatch) return { authenticated: false };

    const now = new Date();

    const session = await this.sessionRepository.create({
      id: crypto.randomBytes(32).toString("base64url"),
      userId: user.id!,
      createdAt: now,
      lastSeenAt: now,
    });

    return {
      authenticated: true,
      sessionId: session.id,
    };
  }

  async deleteSession(session_token: string) {
    return await this.sessionRepository.delete(session_token);
  }
}
