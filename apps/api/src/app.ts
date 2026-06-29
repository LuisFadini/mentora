import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import { pinoHttp } from "pino-http";

import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import { AuthController } from "./modules/auth/auth.controller.ts";
import { createAuthRoutes } from "./modules/auth/auth.routes.ts";
import { AuthService } from "./modules/auth/auth.service.ts";
import type { Question } from "./modules/questions/question.types.ts";
import { QuestionController } from "./modules/questions/questions.controller.ts";
import { createQuestionsRoutes } from "./modules/questions/questions.routes.ts";
import { QuestionService } from "./modules/questions/questions.service.ts";
import { UserController } from "./modules/users/users.controller.ts";
import { createUsersRoutes } from "./modules/users/users.routes.ts";
import { UsersService } from "./modules/users/users.service.ts";
import type { DB } from "./shared/infrastructure/db/index.ts";
import { SessionRepository } from "./shared/infrastructure/db/repositories/session.repository.ts";
import { UserRepository } from "./shared/infrastructure/db/repositories/user.repository.ts";
import { InMemoryRepository } from "./shared/infrastructure/in-memory.repository.ts";
import { createOpenAPiRoutes } from "./shared/infrastructure/openapi/openapi.routes.ts";
import { Argon2idPasswordHasher } from "./shared/infrastructure/security/argon2-password-hasher.ts";
import { makeAuthMiddleware } from "./shared/middlewares/auth.middleware.ts";

export function createApp(db: DB): Express {
  const app = express();

  if (!config.isTest) app.use(pinoHttp({ logger }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    }),
  );

  app.use("/", createOpenAPiRoutes());

  const userRepository = new UserRepository(db);
  const sessionRepository = new SessionRepository(db);

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

  const questionsRepository = new InMemoryRepository<Question>();

  const questionsService = new QuestionService(questionsRepository);
  const questionsController = new QuestionController(questionsService);
  app.use("/questions", createQuestionsRoutes(questionsController));

  return app;
}
