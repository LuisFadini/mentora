export type Question = {
  id?: string;
  title: string;
  subjects: string;
  body: string;
  answers: string[];
  createAt: Date;
  updateAt: Date;
}

export type Answers = {
  id?: string;
  idQuestion?: string;
  answerBody: string;
}
