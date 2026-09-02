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
  photoUrl?: string;
}

export interface AddStudentFormProps {
  onCancel: () => void;
  onSave: (newStudentData: StudentFormData) => void;
}

export interface SectionProps {
  formData: StudentFormData;
  handleChange: (field: keyof StudentFormData, value: string) => void;
  onCancel?: () => void;
}
