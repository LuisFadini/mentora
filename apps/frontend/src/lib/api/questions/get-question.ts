import { ApiError } from "../api-error";
import { apiFetch } from "../client";
import type { Question } from "./types";

export async function getQuestion(
  id: string,
  fetchFn?: typeof fetch,
): Promise<Question> {
  const response = await apiFetch(`/questions/${id}`, {}, fetchFn);

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
