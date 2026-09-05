import { ApiError } from "../api-error.ts";
import { apiFetch } from "../client.ts";
import type { Answer, Question } from "../questions/types";

export type Attempt = {
  id: string;
  userId: string;
  question: Question;
  answer: Answer;
  tipsUsed: number;
  createdAt: string;
};

export async function getUserAttempts(
  userId: string,
  fetchFn?: typeof fetch,
): Promise<Attempt[]> {
  const response = await apiFetch(
    `/attempts/user/${userId}`,
    {
      method: "GET",
    },
    fetchFn,
  );

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
