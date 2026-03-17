import { Router } from "express";
import { QuestionController } from "./questions.controller.ts";
import { GetQuestionParams } from "./params/get-question.params.ts";
import { validateUUIDV7Param } from "../../shared/middlewares/validate-uuid.middleware.ts";
import { CreateQuestion } from "./dto/create-question.dto.ts";
import { validateBodyDTO } from "../../shared/middlewares/validate-body-dto.middleware.ts"


export function RouteQuestions(questionController: QuestionController) {
  const router = Router();

  router.get("/", questionController.getQuestions);
  router.get("/:id", validateUUIDV7Param<GetQuestionParams>("id"), questionController.getQuestion);
  router.post(
    "/",
    validateBodyDTO(CreateQuestion),
    questionController.createQuestion);
  router.patch("/:id", questionController.updateQuestion);
}
