import { ApiError } from "../api-error";
import { apiFetch } from "../client";
import type { QuestionTip } from "./types";

export async function getQuestionTip(
  id: string,
  order: number,
  fetchFn?: typeof fetch,
): Promise<QuestionTip> {
  const response = await apiFetch(
    `/questions/${id}/tips/order/${order}`,
    {},
    fetchFn,
  );

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
