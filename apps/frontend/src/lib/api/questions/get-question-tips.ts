import { ApiError } from "../api-error";
import { apiFetch } from "../client";
import type { QuestionTip } from "./types";

export async function getQuestionTips(
  id: string,
  fetchFn?: typeof fetch,
): Promise<QuestionTip[]> {
  const response = await apiFetch(`/questions/${id}/tips`, {}, fetchFn);

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
