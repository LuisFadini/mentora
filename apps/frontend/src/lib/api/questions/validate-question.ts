import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export interface ValidateQuestionDTO {
  answerId: string;
}

export type ValidateQuestion = {
  correct: boolean;
  correctAnswerId: string;
};

export async function validateQuestion(
  id: string,
  data: ValidateQuestionDTO,
  fetchFn?: typeof fetch,
): Promise<ValidateQuestion> {
  const response = await apiFetch(
    `/questions/${id}/validate`,
    { method: "POST", body: JSON.stringify(data) },
    fetchFn,
  );

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
