import { type Request, type Response } from "express";

import type { CreateAnswerDTO } from "./dto/create-answer.dto.ts";
import type { CreateQuestion } from "./dto/create-question.dto.ts";
import type { UpdateAnswerDTO } from "./dto/update-answer.dto.ts";
import type { UpdateQuestion } from "./dto/update-question.dto.ts";
import type { GetAnswerParams } from "./params/get-answer.params.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { AnswerService, QuestionService } from "./questions.service.ts";

export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  getQuestions = async (_req: Request, res: Response) => {
    const questions = await this.questionService.getQuestions();
    return res.json(questions);
  };

  getQuestion = async (req: Request<GetQuestionParams>, res: Response) => {
    const question = await this.questionService.getQuestionbyId(req.params.id);
    if (!question)
      return res.status(404).json({ message: "The Question Was Not Found" });
    return res.json(question);
  };

  createQuestion = async (
    req: Request<unknown, unknown, CreateQuestion>,
    res: Response,
  ) => {
    const body = await this.questionService.createQuestion(req.body);
    return res.status(201).json(body);
  };

  updateQuestion = async (
    req: Request<GetQuestionParams, unknown, UpdateQuestion>,
    res: Response,
  ) => {
    const userFinded = await this.questionService.updateQuestion(
      req.params.id,
      req.body,
    );
    if (!userFinded)
      return res.status(404).json({ message: "Cound't Find it" });
    return res.status(204).json(userFinded);
  };
}

export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  getAnswer = async (req: Request<GetAnswerParams>, res: Response) => {
    const answer = await this.answerService.getAnswerById(req.params.id);
    if (!answer) return res.status(404).json({ message: "User Not Found" });
    return res.json(answer);
  };

  getAnswers = async (_req: Request, res: Response) => {
    const answers = await this.answerService.getAnswers();
    return res.json(answers);
  };

  createAnswer = async (
    req: Request<unknown, unknown, CreateAnswerDTO>,
    res: Response,
  ) => {
    const answerCreated = await this.answerService.createAnswer(req.body);
    return res.status(201).json(answerCreated);
  };

  updateAnswer = async (
    req: Request<GetAnswerParams, unknown, UpdateAnswerDTO>,
    res: Response,
  ) => {
    const updatedAnswer = await this.answerService.updateAnswer(
      req.params.id,
      req.body,
    );
    if (!updatedAnswer)
      return res.status(404).json({ message: "Answer not found" });
    return res.status(201).json(updatedAnswer);
  };

  deleteAnswer = async (req: Request<GetQuestionParams>, res: Response) => {
    const isDeleted = await this.answerService.deleteAnswer(req.params.id);

    return res.status(200).json({ message: isDeleted });
  };
}
