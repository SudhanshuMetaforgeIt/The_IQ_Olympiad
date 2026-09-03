export { apiRequest } from "./client";
export { ApiError } from "./types";
export type { ApiErrorResponse, ApiSuccessResponse } from "./types";
export {
  registerSchool,
  registerStudent,
  sendOtp,
  verifyOtp,
} from "./services/auth.service";
export { getSchoolByCode } from "./services/schools.service";
export { getStudentMe } from "./services/students.service";
export type {
  GuardianRelation,
  RegisterSchoolRequest,
  RegisterSchoolResponse,
  RegisterStudentGuardianPayload,
  RegisterStudentRequest,
  RegisterStudentResponse,
  SchoolByCodeResponse,
  SchoolType,
  SendOtpRequest,
  SendOtpResponse,
  StudentClass,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./services/auth.types";
export type {
  StudentMeProfile,
  StudentMeResponse,
  StudentMeSchool,
  StudentMeUser,
} from "./services/students.types";
export { GUARDIAN_RELATIONS, SCHOOL_TYPES, STUDENT_CLASSES } from "./services/auth.types";
