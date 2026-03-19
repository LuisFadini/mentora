import { type Request, type Response } from 'express'
import { CreateQuestion, createAnswer } from './dto/create-question.dto.ts'
import { UpdateQuestion } from './dto/update-question.dto.ts'
import { GetQuestionParams } from './params/get-question.params.ts'
import { QuestionService, AnswerService } from './questions.service.ts';
import { CreateAnswerDTO } from './dto/create-answer.dto.ts';
import { GetAnswerParams } from './params/get-answer.params.ts';
import { UpdateAnswerDTO } from './dto/update-answer.dto.ts';

export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  getQuestions = async (
    _req: Request,
    res: Response
  ) => {
    const questions = await this.questionService.getQuestions();
    return res.json(questions);
  }

  getQuestion = async (
    req: Request,
    res: Response
  ) => {
    const question = await this.questionService.getQuestionbyId(req.body.id);
    if (!question) return res.status(404).json({ message: 'The Question Was Not Found' });
    return res.json(question);
  }

  createQuestion = async (
    req: Request<unknown, unknown, CreateQuestion>,
    res: Response) => {
    //const question: any;
    const body = await this.questionService.createQuestion(req.body);
    return res.status(201).json(body);
  }

  updateQuestion = async (
    req: Request<GetQuestionParams, unknown, UpdateQuestion>,
    res: Response
  ) => {
    const userFinded = await this.questionService.updateQuestion(
      req.params.id,
      req.body,
    )
    if (!userFinded) return res.status(404).json({ message: "Cound't Find it" });
    return res.status(204).json(userFinded);
  }
}

export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  getAnswer = async (
    _req: Request,
    res: Response) => { }

  getAnswers = async (
    req: Request,
    res: Response) => { }

  createAnswer = async (
    req: Request<unknown, CreateAnswerDTO>,
    res: Response) => { }

  updateAnswer = async (
    req: Request<GetAnswerParams, unknown, UpdateAnswerDTO>,
    res: Response) => { }

  deleteAnswer = async (
    req: Request,
    res: Response) => { }
}
