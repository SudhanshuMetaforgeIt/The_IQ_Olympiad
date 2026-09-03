import type { StudentClass } from "./auth.types";

export type StudentMeUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

export type StudentMeProfile = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  academicClass: StudentClass;
  section: string;
  rollNumber: string;
  academicYear: string;
  status: string;
};

export type StudentMeSchool = {
  id: string;
  code: string;
  name: string;
};

/** Response data for GET /api/students/me */
export type StudentMeResponse = {
  user: StudentMeUser;
  profile: StudentMeProfile;
  school: StudentMeSchool;
};
