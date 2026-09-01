export type SchoolSignupFormData = {
  adminName: string;
  officialEmail: string;
  adminMobile: string;
  password: string;
  confirmPassword: string;
  schoolName: string;
  city: string;
  schoolBranch: string;
  schoolTypes: string[];
  managedClasses: number[];
};

export type SchoolSignupStep = 1 | 2 | 3;
