export type Question = {
  id?: string;
  title: string;
  subjects: string;
  body: string;
  answers: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Answer = {
  id?: string;
  idQuestion: string;
  answerBody: string;
  createdAt: Date;
  updatedAt: Date;
};
