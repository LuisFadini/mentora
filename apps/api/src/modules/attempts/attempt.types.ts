import type { Answer, Question } from "../questions/question.types.ts";

export type CreateAttempt = {
  id?: string;
  userId: string;
  questionId: string;
  answerId: string;
  tipsUsed: number;
  createdAt: Date;
};

export type Attempt = {
  id?: string;
  userId: string;
  question: Question;
  answer: Answer;
  tipsUsed: number;
  createdAt: Date;
};
