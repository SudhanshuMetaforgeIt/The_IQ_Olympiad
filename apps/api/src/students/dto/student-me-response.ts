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

/** Academic profile fields needed by the student UI. */
export type StudentMeProfileView = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  academicClass: StudentClass;
  section: string;
  rollNumber: string;
  academicYear: string;
  status: StudentProfileStatus;
};

/** School display fields for the student UI. */
export type StudentMeSchoolView = {
  id: string;
  code: string;
  name: string;
};

export type StudentMeResponse = {
  user: StudentMeUserView;
  profile: StudentMeProfileView;
  school: StudentMeSchoolView;
};
