import { ApiError } from "../api-error";
import { apiFetch } from "../client.ts";
export interface CreateAnswerDTO {
  correct: boolean;
  content: string;
}

export interface CreateQuestionDTO {
  title: string;
  content: string;
  source: string;
  subjects: string[];
  answers: CreateAnswerDTO[];
}

export async function createQuestion(question: CreateQuestionDTO) {
  const response = await apiFetch("/questions", {
    method: "POST",
    body: JSON.stringify(question),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return true;
}
