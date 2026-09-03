import type { RequestHandler } from "express";
import { Router } from "express";

import { requireSelfParam } from "../../shared/middlewares/require-self-param.middleware.ts";
import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import type { AttemptController } from "./attempts.controller.ts";
import { CreateAttemptDTO } from "./dto/create-attempt.dto.ts";

export function createAttemptsRoutes(
  controller: AttemptController,
  authMiddleware: RequestHandler,
): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getAttempts);
  router.post(
    "/",
    authMiddleware,
    validateBodyDTO(CreateAttemptDTO),
    controller.createAttempt,
  );

  router.get(
    "/:id",
    authMiddleware,
    validateUUIDV7Param("id"),
    controller.getAttemptById,
  );
  router.get(
    "/user/:userId",
    authMiddleware,
    requireSelfParam("userId"),
    controller.getAttemptsByUser,
  );
  router.delete(
    "/:id",
    authMiddleware,
    validateUUIDV7Param("id"),
    controller.deleteAttempt,
  );

  return router;
}
