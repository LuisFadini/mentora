export interface CreateQuestionDTO {
  id: number;
  titulo: string;
  enunciado: string;
}

export const questionDatabase: CreateQuestionDTO[] = [
  { id: 1, titulo: "Asd", enunciado: "asd" },
  { id: 2, titulo: "Asd", enunciado: "asd" },
];

export function createQuestion(Question: CreateQuestionDTO) {
  if (!Question) return 1;
  Question.id += 3;
  questionDatabase.push(Question);

  return 0;
}
