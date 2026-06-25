import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export interface CreateSessionDTO {
  email: string;
  password: string;
}

export async function createSession(data: CreateSessionDTO) {
  const response = await apiFetch("/auth", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return true;
}
