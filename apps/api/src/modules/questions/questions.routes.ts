import { permissions } from "@mentora/permissions";
import type { RequestHandler } from "express";
import { Router } from "express";

import { requirePermission } from "../../shared/middlewares/permission.middleware.ts";
import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { validateNumberParam } from "../../shared/middlewares/validate-number.middleware.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import { CreateQuestionTipDTO } from "./dto/create-question-tip.dto.ts";
import { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import { UpdateQuestionTipDTO } from "./dto/update-question-tip.dto.ts";
import { UploadQuestionImageDTO } from "./dto/upload-question-image.dto.ts";
import { ValidateQuestionDTO } from "./dto/validate-question.dto.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { GetQuestionImageParams } from "./params/get-question-image.params.ts";
import type { GetQuestionTipParams } from "./params/get-question-tip.params.ts";
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

  router.get(
    "/:id/tips",
    authMiddleware,
    validateUUIDV7Param<GetQuestionParams>("id"),
    questionController.getQuestionTips,
  );
  router.post(
    "/:id/tips",
    authMiddleware,
    validateUUIDV7Param<GetQuestionParams>("id"),
    validateBodyDTO(CreateQuestionTipDTO),
    questionController.createQuestionTip,
  );
  router.get(
    "/:id/tips/:tipId",
    authMiddleware,
    validateUUIDV7Param<GetQuestionTipParams>("id"),
    validateBodyDTO(CreateQuestionTipDTO),
    validateUUIDV7Param<GetQuestionTipParams>("tipId"),
    questionController.getQuestionTip,
  );
  router.get(
    "/:id/tips/order/:order",
    authMiddleware,
    validateUUIDV7Param<GetQuestionParams>("id"),
    questionController.getQuestionTipByOrder,
  );
  router.patch(
    "/:id/tips/:tipId",
    authMiddleware,
    validateUUIDV7Param<GetQuestionTipParams>("id"),
    validateBodyDTO(UpdateQuestionTipDTO),
    validateUUIDV7Param<GetQuestionTipParams>("tipId"),
    questionController.updateQuestionTip,
  );
  router.delete(
    "/:id/tips/:tipId",
    authMiddleware,
    validateUUIDV7Param<GetQuestionTipParams>("id"),
    validateUUIDV7Param<GetQuestionTipParams>("tipId"),
    questionController.deleteQuestionTip,
  );
  router.get(
    "/:id/:image",
    authMiddleware,
    validateUUIDV7Param<GetQuestionImageParams>("id"),
    validateNumberParam<GetQuestionImageParams>("image"),
    questionController.getQuestionImage,
  );
  router.post(
    "/:id/images",
    authMiddleware,
    requirePermission(permissions.questions.update),
    validateUUIDV7Param<GetQuestionParams>("id"),
    validateBodyDTO(UploadQuestionImageDTO),
    questionController.uploadQuestionImage,
  );

  return router;
}
