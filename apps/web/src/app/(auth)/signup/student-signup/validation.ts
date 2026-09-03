import { GUARDIAN_RELATIONS, STUDENT_CLASSES } from "@/lib/api";

import type {
  StudentSignupFieldErrors,
  StudentSignupFormValues,
} from "./types";

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCHOOL_CODE_REGEX = /^[A-Z0-9-]{6,20}$/;
const ACADEMIC_YEAR_REGEX = /^\d{4}-\d{2}$/;
const MAX_STUDENT_AGE_YEARS = 30;

function calculateAge(dateOfBirth: Date, asOf = new Date()): number {
  let age = asOf.getUTCFullYear() - dateOfBirth.getUTCFullYear();
  const monthDifference = asOf.getUTCMonth() - dateOfBirth.getUTCMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && asOf.getUTCDate() < dateOfBirth.getUTCDate())
  ) {
    age -= 1;
  }
  return age;
}

function isValidDateOfBirth(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return false;
  }
  const now = new Date();
  if (date >= now) {
    return false;
  }
  const age = calculateAge(date, now);
  return age >= 0 && age <= MAX_STUDENT_AGE_YEARS;
}

export function validateStudentSignupForm(
  values: StudentSignupFormValues
): StudentSignupFieldErrors {
  const errors: StudentSignupFieldErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (values.firstName.trim().length > 60) {
    errors.firstName = "First name must be at most 60 characters";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (values.lastName.trim().length > 60) {
    errors.lastName = "Last name must be at most 60 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone =
      "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else if (!isValidDateOfBirth(values.dateOfBirth)) {
    errors.dateOfBirth =
      "Date of birth must be in the past and represent an age of 30 years or less";
  }

  if (!values.schoolCode.trim()) {
    errors.schoolCode = "School code is required";
  } else if (!SCHOOL_CODE_REGEX.test(values.schoolCode.trim().toUpperCase())) {
    errors.schoolCode =
      "School code must be 6–20 characters (letters, numbers, hyphens)";
  }

  if (!values.academicClass) {
    errors.academicClass = "Class / grade is required";
  } else if (
    !STUDENT_CLASSES.includes(
      values.academicClass as (typeof STUDENT_CLASSES)[number]
    )
  ) {
    errors.academicClass = "Select a valid class";
  }

  if (!values.section.trim()) {
    errors.section = "Section is required";
  } else if (values.section.trim().length > 20) {
    errors.section = "Section must be at most 20 characters";
  }

  if (!values.rollNumber.trim()) {
    errors.rollNumber = "Roll number is required";
  } else if (values.rollNumber.trim().length > 40) {
    errors.rollNumber = "Roll number must be at most 40 characters";
  }

  if (!values.academicYear.trim()) {
    errors.academicYear = "Academic year is required";
  } else if (!ACADEMIC_YEAR_REGEX.test(values.academicYear.trim())) {
    errors.academicYear = "Academic year must match YYYY-YY (e.g. 2026-27)";
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

  if (!values.guardianName.trim()) {
    errors.guardianName = "Guardian name is required";
  }

  if (!values.guardianPhone.trim()) {
    errors.guardianPhone = "Guardian phone is required";
  } else if (!PHONE_REGEX.test(values.guardianPhone.trim())) {
    errors.guardianPhone =
      "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9";
  }

  if (
    values.guardianEmail.trim() &&
    !EMAIL_REGEX.test(values.guardianEmail.trim())
  ) {
    errors.guardianEmail = "Enter a valid guardian email address";
  }

  if (!values.guardianRelation) {
    errors.guardianRelation = "Guardian relation is required";
  } else if (
    !GUARDIAN_RELATIONS.includes(
      values.guardianRelation as (typeof GUARDIAN_RELATIONS)[number]
    )
  ) {
    errors.guardianRelation = "Select a valid relation";
  }

  if (!values.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the Terms of Use and Privacy Policy";
  }

  return errors;
}
