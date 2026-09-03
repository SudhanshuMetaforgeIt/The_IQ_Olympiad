import { apiRequest } from "../client";
import type { SchoolByCodeResponse } from "./auth.types";

export async function getSchoolByCode(
  code: string,
  signal?: AbortSignal
): Promise<SchoolByCodeResponse> {
  const normalized = encodeURIComponent(code.trim().toUpperCase());
  return apiRequest<SchoolByCodeResponse>(`/api/schools/code/${normalized}`, {
    method: "GET",
    signal,
  });
}
