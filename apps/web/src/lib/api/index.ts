export { apiRequest } from "./client";
export { ApiError } from "./types";
export type { ApiErrorResponse, ApiSuccessResponse } from "./types";
export {
  loginStudent,
  registerSchool,
  registerStudent,
  sendOtp,
  verifyOtp,
} from "./services/auth.service";
export { getSchoolByCode, searchSchools } from "./services/schools.service";
export {
  getStudentMe,
  getStudentProfile,
  patchStudentProfile,
  resolveApiAssetUrl,
  uploadStudentProfilePhoto,
} from "./services/students.service";
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
  StudentLoginRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./services/auth.types";
export type {
  StudentMeProfile,
  StudentMeResponse,
  StudentMeSchool,
  StudentMeUser,
  StudentProfileCompletion,
  StudentProfileGuardian,
  StudentProfileResponse,
  UpdateStudentProfileRequest,
  UploadStudentProfilePhotoResponse,
} from "./services/students.types";
export { GUARDIAN_RELATIONS, SCHOOL_TYPES, STUDENT_CLASSES } from "./services/auth.types";
