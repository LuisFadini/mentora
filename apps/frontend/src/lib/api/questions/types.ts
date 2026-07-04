export type Question = {
  id: string;
  title: string;
  subjects: string[];
  content: string;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
};

export type Answer = {
  id: string;
  questionId: string;
  correct: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
