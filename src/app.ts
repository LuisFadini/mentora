import express, { type Express } from "express";
import { pinoHttp } from "pino-http";

import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import type { User } from "./modules/users/user.types.ts";
import { UserController } from "./modules/users/users.controller.ts";
import { createUsersRoutes } from "./modules/users/users.routes.ts";
import { UsersService } from "./modules/users/users.service.ts";
import { InMemoryRepository } from "./shared/infrastructure/in-memory.repository.ts";

export function createApp(): Express {
  const app = express();

  if (!config.isTest) app.use(pinoHttp({ logger }));
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.status(200).send("Hello world");
  });

  const userRepository = new InMemoryRepository<User>();

  const usersService = new UsersService(userRepository);
  const usersController = new UserController(usersService);
  app.use("/users", createUsersRoutes(usersController));

  return app;
}
