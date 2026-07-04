import { ApiError } from "../api-error";
import { apiFetch } from "../client";
import type { Question } from "./types";

export async function getQuestions(
  fetchFn?: typeof fetch,
): Promise<Question[]> {
  const response = await apiFetch("/questions", {}, fetchFn);

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
