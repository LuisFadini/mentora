export type Attempt = {
  id?: string;
  userId: string;
  questionId: string;
  answerId: string;
  tipsUsed: number;
  createdAt: Date;
};
