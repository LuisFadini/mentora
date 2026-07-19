import type { RequestHandler } from "express";
import { Router } from "express";

import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import type { AuthController } from "./auth.controller.ts";
import { CreateSessionDTO } from "./dto/create-session.dto.ts";

export function createAuthRoutes(
  controller: AuthController,
  authMiddleware: RequestHandler,
  guestMiddleware: RequestHandler,
): Router {
  const router = Router();

  router.get("/", controller.verifySession);
  router.post(
    "/",
    guestMiddleware,
    validateBodyDTO(CreateSessionDTO),
    controller.createSession,
  );
  router.delete("/", authMiddleware, controller.deleteSession);

  return router;
}
