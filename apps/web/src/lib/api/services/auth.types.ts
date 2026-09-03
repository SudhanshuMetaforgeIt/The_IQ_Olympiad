export const STUDENT_CLASSES = [
  "CLASS_7",
  "CLASS_8",
  "CLASS_9",
  "CLASS_10",
  "CLASS_11",
  "CLASS_12",
] as const;

export type StudentClass = (typeof STUDENT_CLASSES)[number];

export const GUARDIAN_RELATIONS = [
  "FATHER",
  "MOTHER",
  "GUARDIAN",
  "MENTOR",
  "OTHER",
] as const;

export type GuardianRelation = (typeof GUARDIAN_RELATIONS)[number];

export type RegisterStudentGuardianPayload = {
  name: string;
  phone: string;
  email?: string;
  relation: GuardianRelation;
};

/** Exact request body for POST /api/auth/register/student */
export type RegisterStudentRequest = {
  email: string;
  password: string;
  name: string;
  phone: string;
  schoolCode: string;
  fullName: string;
  dateOfBirth: string;
  academicClass: StudentClass;
  section: string;
  rollNumber: string;
  academicYear: string;
  guardian: RegisterStudentGuardianPayload;
};

export type RegisteredUser = {
  id: string;
  email: string;
  name: string;
  roles: string[];
  phone?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

export type RegisterStudentResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: RegisteredUser;
  studentProfile: {
    _id: string;
    userId: string;
    schoolId: string;
    fullName: string;
    dateOfBirth: string;
    academicClass: StudentClass;
    section: string;
    rollNumber: string;
    academicYear: string;
    status: string;
  };
  school: {
    id: string;
    code: string;
    name: string;
    status: string;
  };
};

export const SCHOOL_TYPES = [
  "PRIMARY",
  "MIDDLE",
  "SECONDARY",
  "SENIOR_SECONDARY",
] as const;

export type SchoolType = (typeof SCHOOL_TYPES)[number];

export type RegisterSchoolRequest = {
  adminName: string;
  officialEmail: string;
  adminMobile: string;
  password: string;
  schoolName: string;
  schoolCode?: string;
  schoolBranch?: string;
  address: {
    city: string;
    state?: string;
    line1?: string;
    line2?: string;
    pincode?: string;
    country?: string;
  };
  schoolTypes?: SchoolType[];
  managedClasses?: number[];
};

export type RegisterSchoolResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: RegisteredUser;
  school: {
    id: string;
    code: string;
    name: string;
    branch?: string;
    email: string;
    status: string;
  };
  membership: {
    id: string;
    userId: string;
    schoolId: string;
    role: string;
    status: string;
  };
};

export type SchoolByCodeResponse = {
  id: string;
  code: string;
  name: string;
  branch?: string;
  address: {
    city: string;
    state?: string;
    line1?: string;
    line2?: string;
    pincode?: string;
    country?: string;
  };
  schoolTypes: string[];
  managedClasses: number[];
  status: string;
};

export type SendOtpRequest = {
  phone: string;
};

export type SendOtpResponse = {
  phone: string;
  expiresInSeconds: number;
  message: string;
  /** Present only in non-production until SMS is integrated */
  debugCode?: string;
};

export type VerifyOtpRequest = {
  phone: string;
  otp: string;
};

export type VerifyOtpResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: RegisteredUser;
};
