import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import { type Question } from "./question.types.ts";

export class QuestionService {
  constructor(private readonly questionReposity: IRepository<Question>) { }

  async getQuestions(): Promise<Question[]> {
    return this.questionReposity.findAll();
  }

  async getQuestionbyId(id: string) {
    return this.questionReposity.findById(id);
  }

  async createQuestion(question: Question) {
    return this.questionReposity.create(question);
  }

  async updateQuestion(id: string, question: Partial<Question>) {
    const questionFinded = await this.questionReposity.findById(id);
    if (!questionFinded) return null;

    return this.questionReposity.update({
      ...questionFinded,
      ...question,
      id: questionFinded.id!,
    });
  }
}
