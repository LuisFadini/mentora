import { Router } from "express";

import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { type GetUserParams } from "./params/get-user.params.ts";
import { type UserController } from "./users.controller.ts";

export function createUsersRoutes(controller: UserController): Router {
  const router = Router();

  router.get("/", controller.getUsers);
  router.get(
    "/:id",
    validateUUIDV7Param<GetUserParams>("id"),
    controller.getUser,
  );
  router.post("/", controller.createUser);

  return router;
}
