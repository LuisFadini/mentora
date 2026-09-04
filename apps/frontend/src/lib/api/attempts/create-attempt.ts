import { ApiError } from "../api-error.ts";
import { apiFetch } from "../client.ts";

export interface CreateAttemptDTO {
  questionId: string;
  answerId: string;
  tipsUsed: number;
}

export async function createAttempt(attempt: CreateAttemptDTO) {
  const response = await apiFetch("/attempts", {
    method: "POST",
    body: JSON.stringify(attempt),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return true;
}
