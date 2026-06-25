import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: CreateUserDTO) {
  const response = await apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
