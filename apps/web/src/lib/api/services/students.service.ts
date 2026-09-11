import { apiRequest } from "../client";
import {
  ApiError,
  type ApiErrorResponse,
  type ApiSuccessResponse,
} from "../types";
import type {
  StudentMeResponse,
  StudentProfileResponse,
  UpdateStudentProfileRequest,
  UploadStudentProfilePhotoResponse,
} from "./students.types";

const DEFAULT_API_BASE_URL = "http://localhost:4000";

function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  return (configured || DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

/** GET /api/students/me — authenticated STUDENT only. */
export async function getStudentMe(
  token: string,
  signal?: AbortSignal
): Promise<StudentMeResponse> {
  return apiRequest<StudentMeResponse>("/api/students/me", {
    method: "GET",
    token,
    signal,
  });
}

/** GET /api/students/profile — authenticated STUDENT only. */
export async function getStudentProfile(
  token: string,
  signal?: AbortSignal
): Promise<StudentProfileResponse> {
  return apiRequest<StudentProfileResponse>("/api/students/profile", {
    method: "GET",
    token,
    signal,
  });
}

/** PATCH /api/students/profile — authenticated STUDENT only. */
export async function patchStudentProfile(
  token: string,
  payload: UpdateStudentProfileRequest,
  signal?: AbortSignal
): Promise<StudentProfileResponse> {
  return apiRequest<StudentProfileResponse>("/api/students/profile", {
    method: "PATCH",
    token,
    body: payload,
    signal,
  });
}

/** POST /api/students/profile/photo — multipart field `photo`. */
export async function uploadStudentProfilePhoto(
  token: string,
  file: File,
  signal?: AbortSignal
): Promise<UploadStudentProfilePhotoResponse> {
  const body = new FormData();
  body.append("photo", file);

  const response = await fetch(`${getApiBaseUrl()}/api/students/profile/photo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
    signal,
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
    (payload as ApiSuccessResponse<UploadStudentProfilePhotoResponse>)
      .success === true &&
    "data" in payload
  ) {
    return (payload as ApiSuccessResponse<UploadStudentProfilePhotoResponse>)
      .data;
  }

  return payload as UploadStudentProfilePhotoResponse;
}

export function resolveApiAssetUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
