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
  fullName: "Rahul Sharma",
  className: "8",
  email: "rahul.sharma@abcschool.edu.in",
  phone: "+91 98765 43210",
  schoolName: "ABC Public School",
  academicYear: "2025 - 2026",
  section: "A",
  rollNumber: "23",
  studentId: "IQS2026-000784",
  dateOfBirth: "12 Mar 2012",
  gender: "Male",
  country: "India",
  aadharNumber: "4512 3456 7890",
  isAadharVerified: true,
};
