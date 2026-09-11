import { apiRequest } from "../client";
import type {
  RegisterSchoolRequest,
  RegisterSchoolResponse,
  RegisterStudentRequest,
  RegisterStudentResponse,
  SendOtpRequest,
  SendOtpResponse,
  StudentLoginRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./auth.types";

export async function registerStudent(
  payload: RegisterStudentRequest,
  signal?: AbortSignal
): Promise<RegisterStudentResponse> {
  return apiRequest<RegisterStudentResponse>("/api/auth/register/student", {
    method: "POST",
    body: payload,
    signal,
  });
}

export async function registerSchool(
  payload: RegisterSchoolRequest,
  signal?: AbortSignal
): Promise<RegisterSchoolResponse> {
  return apiRequest<RegisterSchoolResponse>("/api/auth/register/school", {
    method: "POST",
    body: payload,
    signal,
  });
}

export async function sendOtp(
  payload: SendOtpRequest,
  signal?: AbortSignal
): Promise<SendOtpResponse> {
  return apiRequest<SendOtpResponse>("/api/auth/otp/send", {
    method: "POST",
    body: payload,
    signal,
  });
}

export async function verifyOtp(
  payload: VerifyOtpRequest,
  signal?: AbortSignal
): Promise<VerifyOtpResponse> {
  return apiRequest<VerifyOtpResponse>("/api/auth/otp/verify", {
    method: "POST",
    body: payload,
    signal,
  });
}

export async function loginStudent(
  payload: StudentLoginRequest,
  signal?: AbortSignal
): Promise<SendOtpResponse> {
  return apiRequest<SendOtpResponse>("/api/auth/login/student", {
    method: "POST",
    body: payload,
    signal,
  });
}
