import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import { removeUndefined } from "../../shared/utils/remove-undefined.ts";
import type { CreateAnswerDTO } from "./dto/create-answer.dto.ts";
import type { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import type { UpdateAnswerDTO } from "./dto/update-answer.dto.ts";
import type { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import { type Answer, type Question } from "./question.types.ts";

export class QuestionService {
  constructor(private readonly questionRepository: IRepository<Question>) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  async getQuestionbyId(id: string) {
    return this.questionRepository.findById(id);
  }

  async createQuestion(question: CreateQuestionDTO) {
    return this.questionRepository.create({
      ...question,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateQuestion(id: string, data: Partial<UpdateQuestionDTO>) {
    const existingQuestion = await this.questionRepository.findById(id);
    if (!existingQuestion) return null;

    const cleanData = removeUndefined(data);

    return this.questionRepository.update({
      ...existingQuestion,
      ...cleanData,
      updatedAt: new Date(),
    });
  }
}

export class AnswerService {
  constructor(private readonly answerRepository: IRepository<Answer>) {}

  async getAnswers(): Promise<Answer[]> {
    return this.answerRepository.findAll();
  }

  async getAnswerById(id: string) {
    return this.answerRepository.findById(id);
  }

  async createAnswer(answer: CreateAnswerDTO) {
    return this.answerRepository.create({
      ...answer,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async updateAnswer(id: string, data: Partial<UpdateAnswerDTO>) {
    const existingAnswer = await this.answerRepository.findById(id);
    if (!existingAnswer) return null;

    const cleanData = removeUndefined(data);

    return this.answerRepository.update({
      ...existingAnswer,
      ...cleanData,
      updatedAt: new Date(),
    });
  }

  async deleteAnswer(id: string) {
    return this.answerRepository.delete(id);
  }
}
