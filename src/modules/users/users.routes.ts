import type { RequestHandler } from "express";
import { Router } from "express";

import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { CreateUserDTO } from "./dto/create-user.dto.ts";
import { UpdateUserDTO } from "./dto/update-user.dto.ts";
import { type GetUserParams } from "./params/get-user.params.ts";
import { type UserController } from "./users.controller.ts";

export function createUsersRoutes(
  controller: UserController,
  authMiddleware: RequestHandler,
): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getUsers);
  router.get(
    "/:id",
    authMiddleware,
    validateUUIDV7Param<GetUserParams>("id"),
    controller.getUser,
  );
  router.post("/", validateBodyDTO(CreateUserDTO), controller.createUser);
  router.patch(
    "/:id",
    authMiddleware,
    validateUUIDV7Param<GetUserParams>("id"),
    validateBodyDTO(UpdateUserDTO),
    controller.updateUser,
  );

  return router;
}
