import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import type { CreateQuestion } from "./dto/create-question.dto.ts";
import { type Answers, type Question } from "./question.types.ts";

export class QuestionService {
  constructor(private readonly questionReposity: IRepository<Question>) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionReposity.findAll();
  }

  async getQuestionbyId(id: string) {
    return this.questionReposity.findById(id);
  }

  async createQuestion(question: CreateQuestion) {
    return this.questionReposity.create({
      ...question,
      createAt: new Date(),
      updateAt: new Date(),
    });
  }

  async updateQuestion(id: string, question: Partial<Question>) {
    const questionFinded = await this.questionReposity.findById(id);
    if (!questionFinded) return null;

    return this.questionReposity.update({
      id: questionFinded.id!,
      ...questionFinded,
      ...question,
    });
  }
}

export class AnswerService {
  constructor(private readonly answerReposity: IRepository<Answers>) {}

  async getAnswers(): Promise<Answers[]> {
    return this.answerReposity.findAll();
  }

  async getAnswerById(id: string) {
    return this.answerReposity.findById(id);
  }

  async createAnswer(answer: Answers) {
    return this.answerReposity.create(answer);
  }

  async updateAnswer(id: string, answer: Partial<Answers>) {
    const answerFinded = await this.answerReposity.findById(id);
    if (!answerFinded) return null;
    return this.answerReposity.update({
      id: answerFinded.id!,
      ...answerFinded,
      ...answer,
    });
  }

  async deleteAnswer(id: string) {
    return this.answerReposity.delete(id);
  }
}
