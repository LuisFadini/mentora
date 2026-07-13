import { permissions } from "@mentora/permissions";
import type { RequestHandler } from "express";
import { Router } from "express";

import { requirePermission } from "../../shared/middlewares/permission.middleware.ts";
import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import { ValidateQuestionDTO } from "./dto/validate-question.dto.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { QuestionController } from "./questions.controller.ts";

export function createQuestionsRoutes(
  questionController: QuestionController,
  authMiddleware: RequestHandler,
): Router {
  const router = Router();

  router.get("/", authMiddleware, questionController.getQuestions);
  router.get(
    "/:id",
    authMiddleware,
    validateUUIDV7Param<GetQuestionParams>("id"),
    questionController.getQuestion,
  );
  router.post(
    "/",
    authMiddleware,
    requirePermission(permissions.questions.create),
    validateBodyDTO(CreateQuestionDTO),
    questionController.createQuestion,
  );
  router.patch(
    "/:id",
    authMiddleware,
    requirePermission(permissions.questions.update),
    validateUUIDV7Param<GetQuestionParams>("id"),
    validateBodyDTO(UpdateQuestionDTO),
    questionController.updateQuestion,
  );
  router.post(
    "/:id/validate",
    authMiddleware,
    validateUUIDV7Param<GetQuestionParams>("id"),
    validateBodyDTO(ValidateQuestionDTO),
    questionController.validateQuestion,
  );

  return router;
}
