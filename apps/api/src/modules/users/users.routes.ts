import type { RequestHandler } from "express";
import { Router } from "express";

import { requireSelfParam } from "../../shared/middlewares/require-self-param.middleware.ts";
import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { CreateUserDTO } from "./dto/create-user.dto.ts";
import { UpdateUserDTO } from "./dto/update-user.dto.ts";
import type { GetUserParams } from "./params/get-user.params.ts";
import type { UserController } from "./users.controller.ts";

export function createUsersRoutes(
  controller: UserController,
  authMiddleware: RequestHandler,
  guestMiddleware: RequestHandler,
): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getUsers);
  router.get(
    "/:id",
    authMiddleware,
    requireSelfParam<GetUserParams>("id"),
    controller.getUser,
  );
  router.get(
    "/:id/avatar",
    authMiddleware,
    requireSelfParam<GetUserParams>("id"),
    controller.getUserAvatar,
  );
  router.post(
    "/",
    guestMiddleware,
    validateBodyDTO(CreateUserDTO),
    controller.createUser,
  );
  router.patch(
    "/:id",
    authMiddleware,
    requireSelfParam<GetUserParams>("id"),
    validateBodyDTO(UpdateUserDTO),
    controller.updateUser,
  );
  router.delete(
    "/:id",
    authMiddleware,
    requireSelfParam<GetUserParams>("id"),
    controller.deleteUser,
  );

  return router;
}
