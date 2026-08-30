import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export async function deleteUser(id: string) {
  const response = await apiFetch(`/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
