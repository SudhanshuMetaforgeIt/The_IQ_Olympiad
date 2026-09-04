import type {
  StudentSignupFieldErrors,
  StudentSignupFormValues,
} from "./types";

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStudentSignupForm(
  values: StudentSignupFormValues
): StudentSignupFieldErrors {
  const errors: StudentSignupFieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length > 120) {
    errors.fullName = "Full name must be at most 120 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone.trim()) {
    errors.phone = "Mobile number is required";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone =
      "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (values.password.length > 72) {
    errors.password = "Password must be at most 72 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the Terms of Use and Privacy Policy";
  }

  return errors;
}
