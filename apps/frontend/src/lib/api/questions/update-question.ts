import { ApiError } from "../api-error";
import { apiFetch } from "../client.ts";

export interface UpdateAnswerDTO {
  content: string;
  correct: boolean;
  delete: boolean;
}

export interface UpdateQuestionDTO {
  id: string;
  title: string;
  subjects: string[];
  source: string;
  content: string;
  answers: UpdateAnswerDTO[];
}

export async function updateQuestion(id: string, question: UpdateQuestionDTO) {
  const response = await apiFetch(`/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(question),
  });
  let ers: UpdateQuestionDTO = {
    ...question
  }
  console.log(ers);
  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
  return true;
}
