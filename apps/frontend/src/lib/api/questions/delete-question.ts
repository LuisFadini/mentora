import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export async function deleteQuestion(
  id: string,
  fetchFn?: typeof fetch,
): Promise<void> {
  const response = await apiFetch(
    `/questions/${id}`,
    {
      method: "DELETE",
    },
    fetchFn,
  );

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
}
