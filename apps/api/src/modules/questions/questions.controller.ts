import type { Request, Response } from "express";

import type { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import type { CreateQuestionTipDTO } from "./dto/create-question-tip.dto.ts";
import type { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import type { UpdateQuestionTipDTO } from "./dto/update-question-tip.dto.ts";
import type { ValidateQuestionDTO } from "./dto/validate-question.dto.ts";
import type { GetQuestionParams } from "./params/get-question.params.ts";
import type { GetQuestionTipParams } from "./params/get-question-tip.params.ts";
import type { GetQuestionTipByOrderParams } from "./params/get-question-tip-by-order.params.ts";
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

  validateQuestion = async (
    req: Request<GetQuestionParams, unknown, ValidateQuestionDTO>,
    res: Response,
  ) => {
    try {
      const result = await this.questionService.validateQuestion(
        req.params.id,
        req.body,
      );

      return res.json(result);
    } catch (e) {
      return res.status(404).json({
        message: e instanceof Error ? e.message : (e as string),
      });
    }
  };

  getQuestionTips = async (
    req: Request<GetQuestionParams, unknown, unknown>,
    res: Response,
  ) => {
    try {
      const result = await this.questionService.getQuestionTips(req.params.id);

      return res.json(result);
    } catch (e) {
      return res.status(404).json({
        message: e instanceof Error ? e.message : (e as string),
      });
    }
  };

  getQuestionTip = async (
    req: Request<GetQuestionTipParams>,
    res: Response,
  ) => {
    const tip = await this.questionService.getQuestionTip(req.params.tipId);
    if (!tip)
      return res.status(404).json({ message: "Question tip not found" });
    return res.json(tip);
  };

  getQuestionTipByOrder = async (
    req: Request<GetQuestionTipByOrderParams>,
    res: Response,
  ) => {
    const tip = await this.questionService.getQuestionTipByOrder(
      req.params.id,
      Number(req.params.order),
    );
    if (!tip)
      return res.status(404).json({ message: "Question tip not found" });
    return res.json(tip);
  };

  createQuestionTip = async (
    req: Request<GetQuestionParams, unknown, CreateQuestionTipDTO>,
    res: Response,
  ) => {
    const result = await this.questionService.createQuestionTip(
      req.params.id,
      req.body,
    );
    return res.json(result);
  };

  updateQuestionTip = async (
    req: Request<GetQuestionParams, unknown, UpdateQuestionTipDTO>,
    res: Response,
  ) => {
    const updatedQuestion = await this.questionService.updateQuestionTip(
      req.params.id,
      req.body,
    );
    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found" });
    return res.status(200).json(updatedQuestion);
  };

  deleteQuestionTip = async (
    req: Request<GetQuestionTipParams>,
    res: Response,
  ) => {
    const deleted = await this.questionService.deleteQuestionTip(
      req.params.tipId,
    );
    if (!deleted)
      return res.status(400).json({ message: "Error deleting question tip" });

    return res
      .status(200)
      .json({ message: "Question tip deleted successfully" });
  };
}
