import type { ApiSuccess, HealthStatus } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const body = (await response.json()) as ApiSuccess<T>;
  return body.data;
}

export function fetchHealth() {
  return request<HealthStatus>("/health");
}
