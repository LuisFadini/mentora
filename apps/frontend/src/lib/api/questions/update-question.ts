import { ApiError } from "../api-error";
import { apiFetch } from "../client.ts";

export interface UpdateAnswerDTO {
  id?: string;
  content: string;
  correct: boolean;
  delete?: boolean;
}

export interface UpdateQuestionDTO {
  title?: string;
  subjects?: string[];
  source?: string;
  content?: string;
  answers?: UpdateAnswerDTO[];
}

export async function updateQuestion(id: string, question: UpdateQuestionDTO) {
  const response = await apiFetch(`/questions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(question),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return true;
}
