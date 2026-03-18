import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import { pinoHttp } from "pino-http";

import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import { AuthController } from "./modules/auth/auth.controller.ts";
import { createAuthRoutes } from "./modules/auth/auth.routes.ts";
import { AuthService } from "./modules/auth/auth.service.ts";
import type { Session } from "./modules/auth/auth.types.ts";
import { UserController } from "./modules/users/users.controller.ts";
import { createUsersRoutes } from "./modules/users/users.routes.ts";
import { UsersService } from "./modules/users/users.service.ts";
import { InMemoryRepository } from "./shared/infrastructure/in-memory.repository.ts";
import { InMemoryUserRepository } from "./shared/infrastructure/in-memory-user.repository.ts";
import { createOpenAPiRoutes } from "./shared/infrastructure/openapi/openapi.routes.ts";
import { Argon2idPasswordHasher } from "./shared/infrastructure/security/argon2-password-hasher.ts";
import { makeAuthMiddleware } from "./shared/middlewares/auth.middleware.ts";

export function createApp(): Express {
  const app = express();

  if (!config.isTest) app.use(pinoHttp({ logger }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/", createOpenAPiRoutes());

  const userRepository = new InMemoryUserRepository();
  const sessionRepository = new InMemoryRepository<Session>();

  const authMiddleware = makeAuthMiddleware(sessionRepository, userRepository);

  const passwordHasher = new Argon2idPasswordHasher();

  const usersService = new UsersService(userRepository, passwordHasher);
  const usersController = new UserController(usersService);
  app.use("/users", createUsersRoutes(usersController, authMiddleware));

  const authService = new AuthService(
    userRepository,
    sessionRepository,
    passwordHasher,
  );
  const authController = new AuthController(authService);
  app.use("/auth", createAuthRoutes(authController, authMiddleware));

  return app;
}
