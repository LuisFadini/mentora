import express, { type Express } from "express";
import { pinoHttp } from "pino-http";

import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import type { User } from "./modules/users/user.types.ts";
import { UserController } from "./modules/users/users.controller.ts";
import { createUsersRoutes } from "./modules/users/users.routes.ts";
import { UsersService } from "./modules/users/users.service.ts";
import { InMemoryRepository } from "./shared/infrastructure/in-memory.repository.ts";
import { createOpenAPiRoutes } from "./shared/infrastructure/openapi/openapi.routes.ts";
import { Argon2idPasswordHasher } from "./shared/infrastructure/security/argon2-password-hasher.ts";

export function createApp(): Express {
  const app = express();

  if (!config.isTest) app.use(pinoHttp({ logger }));
  app.use(express.json());

  app.use("/", createOpenAPiRoutes());

  const userRepository = new InMemoryRepository<User>();

  const passwordHasher = new Argon2idPasswordHasher();

  const usersService = new UsersService(userRepository, passwordHasher);
  const usersController = new UserController(usersService);
  app.use("/users", createUsersRoutes(usersController));

  return app;
}
