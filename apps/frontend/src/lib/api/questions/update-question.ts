import { ApiError } from "../api-error";
import { apiFetch } from "../client.ts";

export interface UpdateAnswerDTO {
  content: string;
  correct: boolean;
}

export interface UpdateQuestionDTO {
  newTitle: string;
  newContent: string;
  newSource: string;
  newSubjects: string[];
  newAnswers: UpdateAnswerDTO[];
}

export async function updateQuestion(id: string, question: UpdateQuestionDTO) {
  const response = await apiFetch("/questions/" + id, {
    method: "PUT",
    body: JSON.stringify(question),
  });
  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
  return true;
}
