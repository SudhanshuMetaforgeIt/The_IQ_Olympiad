import type {
  GuardianRelation,
  RegisterStudentRequest,
  StudentClass,
} from "@/lib/api";

export type StudentSignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  schoolCode: string;
  academicClass: StudentClass | "";
  section: string;
  rollNumber: string;
  academicYear: string;
  password: string;
  confirmPassword: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelation: GuardianRelation | "";
  agreedToTerms: boolean;
};

export type StudentSignupFieldErrors = Partial<
  Record<keyof StudentSignupFormValues | "form", string>
>;

export const INITIAL_STUDENT_SIGNUP_VALUES: StudentSignupFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  schoolCode: "",
  academicClass: "",
  section: "",
  rollNumber: "",
  academicYear: "",
  password: "",
  confirmPassword: "",
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
  guardianRelation: "",
  agreedToTerms: true,
};

export function buildRegisterStudentPayload(
  values: StudentSignupFormValues
): RegisterStudentRequest {
  const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim();

  const payload: RegisterStudentRequest = {
    email: values.email.trim().toLowerCase(),
    password: values.password,
    name: fullName,
    phone: values.phone.trim(),
    schoolCode: values.schoolCode.trim().toUpperCase(),
    fullName,
    dateOfBirth: values.dateOfBirth,
    academicClass: values.academicClass as StudentClass,
    section: values.section.trim().toUpperCase(),
    rollNumber: values.rollNumber.trim(),
    academicYear: values.academicYear.trim(),
    guardian: {
      name: values.guardianName.trim(),
      phone: values.guardianPhone.trim(),
      relation: values.guardianRelation as GuardianRelation,
    },
  };

  const guardianEmail = values.guardianEmail.trim().toLowerCase();
  if (guardianEmail) {
    payload.guardian.email = guardianEmail;
  }

  return payload;
}
