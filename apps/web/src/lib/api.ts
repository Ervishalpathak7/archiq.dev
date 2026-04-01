// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}/${path}`, {
    ...options,
    credentials: "include", // always send the HttpOnly cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "API error");
  }

  return res.json();
}
