import { type Request, type Response } from 'express'
import { CreateQuestion } from './dto/create-question.dto.ts'

export class QuestionController {
  createQuestion = async (
    req: Request<unknown, unknown, CreateQuestion>,
    res: Response) => {
    const question = req.body;
    res.status(201);
  }
}
