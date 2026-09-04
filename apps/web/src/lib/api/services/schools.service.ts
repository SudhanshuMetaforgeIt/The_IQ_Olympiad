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

export async function searchSchools(
  query: string,
  signal?: AbortSignal
): Promise<SchoolByCodeResponse[]> {
  const q = query.trim();
  if (q.length < 2) {
    return [];
  }
  return apiRequest<SchoolByCodeResponse[]>(
    `/api/schools/search?q=${encodeURIComponent(q)}`,
    {
      method: "GET",
      signal,
    }
  );
}
