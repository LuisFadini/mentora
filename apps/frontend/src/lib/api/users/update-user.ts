import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string | null;
}

export async function updateUser(id: string, data: UpdateUserDTO) {
  const response = await apiFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
