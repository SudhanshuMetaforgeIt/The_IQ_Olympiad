export interface StudentProfileData {
  fullName: string;
  className: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  schoolName: string;
  academicYear: string;
  section: string;
  rollNumber: string;
  studentId: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  aadharNumber: string;
  isAadharVerified: boolean;
}

export const INITIAL_STUDENT_PROFILE: StudentProfileData = {
  fullName: "",
  className: "",
  email: "",
  phone: "",
  schoolName: "",
  academicYear: "",
  section: "",
  rollNumber: "",
  studentId: "",
  dateOfBirth: "",
  gender: "",
  country: "",
  aadharNumber: "",
  isAadharVerified: false,
};
