import type { GuardianRelation, StudentClass } from "./auth.types";

export type StudentMeUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

export type StudentProfileGuardian = {
  name: string;
  phone: string;
  email?: string;
  relation: GuardianRelation;
};

export type StudentMeProfile = {
  id: string;
  fullName: string;
  dateOfBirth: string | null;
  academicClass: StudentClass | null;
  section: string | null;
  rollNumber: string | null;
  aadharNumber: string | null;
  academicYear: string | null;
  profilePhoto: string | null;
  status: string;
  guardian: StudentProfileGuardian | null;
};

export type StudentMeSchool = {
  id: string;
  code: string;
  name: string;
};

export type StudentProfileCompletion = {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
};

/** Response data for GET /api/students/me */
export type StudentMeResponse = {
  user: StudentMeUser;
  profile: StudentMeProfile | null;
  school: StudentMeSchool | null;
  profileCompletion: StudentProfileCompletion;
};

/** Response data for GET/PATCH /api/students/profile */
export type StudentProfileResponse = {
  profile: StudentMeProfile | null;
  school: StudentMeSchool | null;
  profileCompletion: StudentProfileCompletion;
};

export type UpdateStudentProfileRequest = {
  fullName?: string;
  dateOfBirth?: string;
  academicClass?: StudentClass;
  section?: string;
  rollNumber?: string;
  aadharNumber?: string;
  academicYear?: string;
  schoolCode?: string;
  guardian?: {
    name: string;
    phone: string;
    email?: string;
    relation: GuardianRelation;
  };
};

export type UploadStudentProfilePhotoResponse = {
  message: string;
  profilePhoto: string;
};
