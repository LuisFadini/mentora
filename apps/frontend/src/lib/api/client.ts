export const API_URL = "http://localhost:3000";

export async function apiFetch(
  path: string,
  init?: RequestInit,
  fetchFn: typeof fetch = fetch,
) {
  return fetchFn(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
}
