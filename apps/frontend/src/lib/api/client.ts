export const API_URL = "http://localhost:3000";

export async function apiFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  return response;
}
