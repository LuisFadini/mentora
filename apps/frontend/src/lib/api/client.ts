export const API_URL = "http://localhost:3000";

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
