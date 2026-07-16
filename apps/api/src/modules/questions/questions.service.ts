import { removeUndefined } from "@mentora/utils";

import type { PersistedQuestion } from "../../shared/infrastructure/db/repositories/question.repository.ts";
import type { IQuestionTipsRepository } from "../../shared/interfaces/repository.interface.ts";
import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import type { CreateQuestionDTO } from "./dto/create-question.dto.ts";
import type { CreateQuestionTipDTO } from "./dto/create-question-tip.dto.ts";
import type { UpdateQuestionDTO } from "./dto/update-question.dto.ts";
import type { UpdateQuestionTipDTO } from "./dto/update-question-tip.dto.ts";
import type { ValidateQuestionDTO } from "./dto/validate-question.dto.ts";
import { type Answer, type Question } from "./question.types.ts";

export class QuestionService {
  constructor(
    private readonly questionRepository: IRepository<
      Question,
      PersistedQuestion
    >,
    private readonly questionTipsRepository: IQuestionTipsRepository,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  async getQuestionById(id: string) {
    return this.questionRepository.findById(id);
  }

  async createQuestion(question: CreateQuestionDTO) {
    const now = new Date();

    return this.questionRepository.create({
      ...question,
      answers: question.answers.map((a) => {
        return { ...a, createdAt: now, updatedAt: now };
      }),
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateQuestion(id: string, data: UpdateQuestionDTO) {
    const existingQuestion = await this.questionRepository.findById(id);
    if (!existingQuestion) return null;

    const cleanData = removeUndefined(data);

    const { answers: incomingAnswers, ...questionFields } = cleanData;
    const now = new Date();

    const updatedQuestionBase = {
      ...existingQuestion,
      ...questionFields,
      updatedAt: now,
    };

    if (!incomingAnswers) {
      return this.questionRepository.update(updatedQuestionBase);
    }

    const existingAnswersMap = new Map(
      existingQuestion.answers.map((a) => [a.id, a]),
    );

    const finalAnswers: Answer[] = [];

    for (const incoming of incomingAnswers) {
      if (incoming.delete && incoming.id) {
        continue;
      }

      if (incoming.id && existingAnswersMap.has(incoming.id)) {
        const existing = existingAnswersMap.get(incoming.id)!;

        finalAnswers.push({
          ...existing,
          content: incoming.content,
          correct: incoming.correct,
          updatedAt: now,
        });

        continue;
      }

      finalAnswers.push({
        content: incoming.content,
        correct: incoming.correct,
        createdAt: now,
        updatedAt: now,
      } as Answer);
    }

    return this.questionRepository.update({
      ...updatedQuestionBase,
      answers: finalAnswers,
    });
  }

  async validateQuestion(id: string, data: ValidateQuestionDTO) {
    const question = await this.questionRepository.findById(id);

    if (!question) {
      throw new Error("Question not found");
    }

    const correctAnswer = question.answers.find((a) => a.correct);

    if (!correctAnswer) {
      throw new Error("Question has no correct answer");
    }

    const isCorrect = correctAnswer.id === data.answerId;

    return {
      correct: isCorrect,
      correctAnswerId: correctAnswer.id,
    };
  }

  async getQuestionTips(id: string) {
    const question = await this.questionRepository.findById(id);

    if (!question) {
      throw new Error("Question not found");
    }

    return await this.questionTipsRepository.findByQuestionId(question.id);
  }

  async getQuestionTip(id: string) {
    return this.questionTipsRepository.findById(id);
  }

  async getQuestionTipByOrder(id: string, order: number) {
    return this.questionTipsRepository.findByOrder(id, order);
  }

  async createQuestionTip(questionId: string, tip: CreateQuestionTipDTO) {
    const now = new Date();

    return await this.questionTipsRepository.create({
      questionId,
      ...tip,
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateQuestionTip(id: string, data: UpdateQuestionTipDTO) {
    const existingQuestionTip = await this.questionTipsRepository.findById(id);
    if (!existingQuestionTip) return null;

    const cleanData = removeUndefined(data);

    const updatedQuestionTip = await this.questionTipsRepository.update({
      ...existingQuestionTip,
      ...cleanData,
      updatedAt: new Date(),
    });

    return updatedQuestionTip;
  }

  async deleteQuestionTip(id: string) {
    return await this.questionTipsRepository.delete(id);
  }
}
