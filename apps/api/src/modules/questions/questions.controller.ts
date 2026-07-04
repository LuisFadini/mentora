import { type Request, type Response } from "express";

import type { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import type { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { QuestionService } from "./questions.service.ts";

export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  getQuestions = async (_req: Request, res: Response) => {
    const questions = await this.questionService.getQuestions();
    return res.json(questions);
  };

  getQuestion = async (req: Request<GetQuestionParams>, res: Response) => {
    const question = await this.questionService.getQuestionById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    return res.json(question);
  };

  createQuestion = async (
    req: Request<unknown, unknown, CreateQuestionDTO>,
    res: Response,
  ) => {
    const body = await this.questionService.createQuestion(req.body);
    return res.status(201).json(body);
  };

  updateQuestion = async (
    req: Request<GetQuestionParams, unknown, UpdateQuestionDTO>,
    res: Response,
  ) => {
    const updatedQuestion = await this.questionService.updateQuestion(
      req.params.id,
      req.body,
    );
    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found" });
    return res.status(200).json(updatedQuestion);
  };
}
