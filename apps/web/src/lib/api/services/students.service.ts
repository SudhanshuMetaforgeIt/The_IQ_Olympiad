import { apiRequest } from "../client";
import type { StudentMeResponse } from "./students.types";

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
