import { Router } from "express";

import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import { ValidateQuestionDTO } from "./dto/validate-question.dto.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { QuestionController } from "./questions.controller.ts";

export function createQuestionsRoutes(
  questionController: QuestionController,
): Router {
  const router = Router();

  router.get("/", questionController.getQuestions);
  router.get(
    "/:id",
    validateUUIDV7Param<GetQuestionParams>("id"),
    questionController.getQuestion,
  );
  router.post(
    "/",
    validateBodyDTO(CreateQuestionDTO),
    questionController.createQuestion,
  );
  router.patch(
    "/:id",
    validateUUIDV7Param<GetQuestionParams>("id"),
    validateBodyDTO(UpdateQuestionDTO),
    questionController.updateQuestion,
  );
  router.post(
    "/:id/validate",
    validateUUIDV7Param<GetQuestionParams>("id"),
    validateBodyDTO(ValidateQuestionDTO),
    questionController.validateQuestion,
  );

  return router;
}
