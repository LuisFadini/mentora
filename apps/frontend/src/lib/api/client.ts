import { env } from "$env/dynamic/public";

export const API_URL = env.PUBLIC_API_URL ?? "/api";

export async function apiFetch(
  path: string,
  init?: RequestInit,
  fetchFn: typeof fetch = fetch,
) {
  return fetchFn(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}
