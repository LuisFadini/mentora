import { Router } from "express";

import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { CreateQuestion } from "./dto/create-question.dto.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { QuestionController } from "./questions.controller.ts";

export function RouteQuestions(questionController: QuestionController) {
  const router = Router();

  router.get("/", questionController.getQuestions);
  router.get(
    "/:id",
    validateUUIDV7Param<GetQuestionParams>("id"),
    questionController.getQuestion,
  );
  router.post(
    "/",
    validateBodyDTO(CreateQuestion),
    questionController.createQuestion,
  );
  router.patch("/:id", questionController.updateQuestion);

  return router;
}
