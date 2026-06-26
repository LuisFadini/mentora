import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export async function closeSession(fetchFn?: typeof fetch): Promise<boolean> {
  const response = await apiFetch("/auth", { method: "DELETE" }, fetchFn);

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return true;
}
