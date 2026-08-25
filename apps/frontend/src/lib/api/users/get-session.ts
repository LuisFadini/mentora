import type { Permission } from "@mentora/permissions";

import { ApiError } from "../api-error";
import { apiFetch } from "../client";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  permissions?: Permission[];
};

export type Session =
  | {
      authenticated: false;
    }
  | { authenticated: true; user: User }
  | null;

export async function getSession(fetchFn?: typeof fetch): Promise<Session> {
  const response = await apiFetch("/auth", {}, fetchFn);

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}
