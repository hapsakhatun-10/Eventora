const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("evento_token");
}

export function setToken(token: string): void {
  localStorage.setItem("evento_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("evento_token");
}

export function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_URL}${path}`, { ...options, headers });
}
