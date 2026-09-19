import { supabase } from "@/lib/supabase";

export type ApiResponseEnvelope<T> = {
  success: true;
  data: T;
};

export type ApiErrorEnvelope = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};

export class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

function isDemoMode() {
  const url = import.meta.env.VITE_SUPABASE_URL ?? "";
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

  return !url || !key || url.includes("placeholder") || key.includes("placeholder");
}

async function getAccessToken(): Promise<string | null> {
  if (isDemoMode()) {
    return "demo-access-token";
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session?.access_token ?? null;
}

async function parseJsonBody<T>(response: Response): Promise<T | ApiErrorEnvelope> {
  const text = await response.text();

  if (!text) {
    return { success: false, error: { message: "Request returned no response body." } } as ApiErrorEnvelope;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return { success: false, error: { message: text } } as ApiErrorEnvelope;
  }
}

async function apiRequest<T>(path: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: unknown): Promise<T> {
  const token = await getAccessToken();
  const headers = new Headers({
    Accept: "application/json",
  });

  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = (await parseJsonBody<T | ApiErrorEnvelope>(response)) as T | ApiErrorEnvelope;

  const isErrorEnvelope = (value: unknown): value is ApiErrorEnvelope =>
    typeof value === "object" && value !== null && "success" in value && value.success === false && "error" in value;

  const isSuccessEnvelope = (value: unknown): value is ApiResponseEnvelope<T> =>
    typeof value === "object" && value !== null && "success" in value && value.success === true && "data" in value;

  if (!response.ok) {
    const message = isErrorEnvelope(payload) && payload.error?.message ? payload.error.message : "Request failed.";
    const code = isErrorEnvelope(payload) ? payload.error?.code : undefined;
    throw new ApiClientError(message, response.status, code);
  }

  if (isErrorEnvelope(payload)) {
    throw new ApiClientError(
      payload.error?.message ?? "Request failed.",
      response.status,
      payload.error?.code,
    );
  }

  if (isSuccessEnvelope(payload)) {
    return payload.data;
  }

  return payload as T;
}

export const apiClient = {
  get: <T>(path: string) => apiRequest<T>(path, "GET"),
  post: <T>(path: string, body: unknown) => apiRequest<T>(path, "POST", body),
  put: <T>(path: string, body: unknown) => apiRequest<T>(path, "PUT", body),
  remove: <T>(path: string) => apiRequest<T>(path, "DELETE"),
};
