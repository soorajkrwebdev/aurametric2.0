import { supabase } from "@/lib/supabase";
import type { ApiSuccess, DashboardData, HealthStatus } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const body = (await response.json()) as ApiSuccess<T>;
  return body.data;
}

export function fetchHealth() {
  return request<HealthStatus>("/health");
}

export function fetchDashboard() {
  return request<DashboardData>("/dashboard");
}
