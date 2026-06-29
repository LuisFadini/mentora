import crypto from "node:crypto";

import { omit } from "@mentora/utils";

import type { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface.ts";
import type {
  IRepository,
  IUserRepository,
} from "../../shared/interfaces/repository.interface.ts";
import { type Session } from "./auth.types.ts";
import type { CreateSessionDTO } from "./dto/create-session.dto.ts";

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: IRepository<Session>,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async verifySession(sessionId: string) {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) return { authenticated: false };

    const user = await this.userRepository.findById(session.userId);
    if (!user) return { authenticated: false };

    return {
      authenticated: true,
      user: omit(user, ["password"]),
    };
  }

  async createSession(data: CreateSessionDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) return null;

    const passwordMatch = await this.passwordHasher.compare(
      data.password,
      user.password,
    );

    if (!passwordMatch) return { authenticated: false };
    const session = await this.sessionRepository.create({
      id: crypto.randomBytes(32).toString("base64url"),
      userId: user.id!,
      createdAt: new Date(),
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
