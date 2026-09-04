import type { RegisterStudentRequest } from "@/lib/api";

export type StudentSignupFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
};

export type StudentSignupFieldErrors = Partial<
  Record<keyof StudentSignupFormValues | "form", string>
>;

export const INITIAL_STUDENT_SIGNUP_VALUES: StudentSignupFormValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: true,
};

export function buildRegisterStudentPayload(
  values: StudentSignupFormValues
): RegisterStudentRequest {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    password: values.password,
  };
}
