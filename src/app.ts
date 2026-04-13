import express, { type Express } from "express";
import { pinoHttp } from "pino-http";

import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import type { Question } from "./modules/questions/question.types.ts";
import { QuestionController } from "./modules/questions/questions.controller.ts";
import { RouteQuestions } from "./modules/questions/questions.routes.ts";
import { QuestionService } from "./modules/questions/questions.service.ts";
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

  const questionsRepository = new InMemoryRepository<Question>();

  const questionsService = new QuestionService(questionsRepository);
  const questionsController = new QuestionController(questionsService);
  app.use("/questions", RouteQuestions(questionsController));

  return app;
}
