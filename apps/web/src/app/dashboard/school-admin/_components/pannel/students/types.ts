export interface StudentRecord {
  id: string;
  name: string;
  admissionNo: string;
  rollNumber: string;
  className: string;
  section: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  avatarBg: string;
  initials: string;
  avatarUrl: string;
  isRegistered: boolean;
}

export type ActiveCardType = "total" | "registered";

export interface StudentFormData {
  studentName: string;
  gender: string;
  dob: string;
  admissionNo: string;
  rollNumber: string;
  bloodGroup: string;
  aadharNumber: string;
  phone: string;
  email: string;
  className: string;
  section: string;
  academicYear: string;
  guardianName: string;
  relationship: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  previousSchool: string;
  transportRequired: string;
  medicalCondition: string;
}
