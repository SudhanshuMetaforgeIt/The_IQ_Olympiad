import { GuardianRelation } from '../../common/enums/guardian-relation.enum.js';
import { StudentClass } from '../../common/enums/student-class.enum.js';
import { StudentProfileStatus } from '../../common/enums/student-profile-status.enum.js';

/** Safe user fields for the authenticated student dashboard. */
export type StudentMeUserView = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

export type StudentProfileGuardianView = {
  name: string;
  phone: string;
  email?: string;
  relation: GuardianRelation;
};

/** Academic profile fields needed by the student UI. Auth fields stay on user. */
export type StudentMeProfileView = {
  id: string;
  fullName: string;
  dateOfBirth: string | null;
  academicClass: StudentClass | null;
  section: string | null;
  rollNumber: string | null;
  aadharNumber: string | null;
  academicYear: string | null;
  profilePhoto: string | null;
  status: StudentProfileStatus;
  guardian: StudentProfileGuardianView | null;
};

/** School display fields for the student UI. */
export type StudentMeSchoolView = {
  id: string;
  code: string;
  name: string;
};

export type StudentProfileCompletionView = {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
};

export type StudentMeResponse = {
  user: StudentMeUserView;
  profile: StudentMeProfileView | null;
  school: StudentMeSchoolView | null;
  profileCompletion: StudentProfileCompletionView;
};

export type StudentProfileResponse = {
  profile: StudentMeProfileView | null;
  school: StudentMeSchoolView | null;
  profileCompletion: StudentProfileCompletionView;
};
