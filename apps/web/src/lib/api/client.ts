import { ApiError, type ApiErrorResponse, type ApiSuccessResponse } from "./types";

const DEFAULT_API_BASE_URL = "http://localhost:4000";

function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  return (configured || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  let payload: unknown = null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    payload = await response.json();
  }

  if (!response.ok) {
    const errorPayload = payload as ApiErrorResponse | null;
    throw new ApiError(
      errorPayload?.message ?? `Request failed with status ${response.status}`,
      errorPayload?.statusCode ?? response.status,
      errorPayload?.errors ?? []
    );
  }

  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    (payload as ApiSuccessResponse<T>).success === true &&
    "data" in payload
  ) {
    return (payload as ApiSuccessResponse<T>).data;
  }

  return payload as T;
}
