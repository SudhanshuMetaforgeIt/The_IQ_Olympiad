"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";

import {
  GUARDIAN_RELATIONS,
  STUDENT_CLASSES,
  type GuardianRelation,
  type StudentClass,
} from "@/lib/api";
import {
  AuthBackLink,
  AuthBrandHeader,
  AuthFooterLinks,
  AuthRoleSwitcher,
  AuthSidePanel,
  AuthSplitLayout,
  AuthSubmitButton,
  BookIcon,
  AuthFieldLabel,
  AuthSectionDivider,
  PhoneInput,
  PasswordInput,
  formatMobileNumber,
  authInputClass,
  authSelectClass,
  type AuthRole,
} from "../../common";

import FieldError from "./FieldError";
import {
  INITIAL_STUDENT_SIGNUP_VALUES,
  type StudentSignupFormValues,
} from "./types";
import { useStudentRegistration } from "./useStudentRegistration";

type StudentSignupFormProps = {
  onRoleChange: (role: AuthRole) => void;
};

const CLASS_LABELS: Record<StudentClass, string> = {
  CLASS_7: "Class 7",
  CLASS_8: "Class 8",
  CLASS_9: "Class 9",
  CLASS_10: "Class 10",
  CLASS_11: "Class 11",
  CLASS_12: "Class 12",
};

const RELATION_LABELS: Record<GuardianRelation, string> = {
  FATHER: "Father",
  MOTHER: "Mother",
  GUARDIAN: "Guardian",
  MENTOR: "Mentor",
  OTHER: "Other",
};

export default function StudentSignupForm({
  onRoleChange,
}: StudentSignupFormProps) {
  const [formData, setFormData] = useState<StudentSignupFormValues>(
    INITIAL_STUDENT_SIGNUP_VALUES
  );

  const {
    isSubmitting,
    isValidatingSchool,
    fieldErrors,
    apiError,
    successMessage,
    verifiedSchool,
    clearFieldError,
    validateSchoolCode,
    submitRegistration,
  } = useStudentRegistration();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const key = name as keyof StudentSignupFormValues;

    let nextValue: string | boolean = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      nextValue = e.target.checked;
    } else if (name === "phone" || name === "guardianPhone") {
      nextValue = formatMobileNumber(value);
    } else if (name === "schoolCode") {
      nextValue = value.toUpperCase();
    } else if (name === "section") {
      nextValue = value.toUpperCase();
    }

    setFormData((prev) => ({ ...prev, [key]: nextValue }));
    clearFieldError(key);
  };

  const handleSchoolBlur = () => {
    if (formData.schoolCode.trim().length >= 6) {
      void validateSchoolCode(formData.schoolCode);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitRegistration(formData);
  };

  return (
    <AuthSplitLayout
      maxWidthClass="max-w-6xl"
      sidePanel={
        <AuthSidePanel
          badgeIcon="star"
          imageHeightClass="h-[260px] sm:h-[300px]"
        />
      }
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <AuthBrandHeader className="mb-0" />
          <AuthBackLink className="mb-0 shrink-0" />
        </div>

        <div className="mb-6">
          <span className="text-xs font-black text-violet-600 uppercase tracking-widest block mb-1">
            WELCOME TO THE IQ OLYMPIAD
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Create your account
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Sign up as a Student or register your School.
          </p>
        </div>

        <AuthRoleSwitcher
          activeRole="student"
          onChange={onRoleChange}
          showIcons
        />

        {successMessage && (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {successMessage}
          </div>
        )}

        {apiError && (
          <div
            className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <AuthSectionDivider label="Personal Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>First Name</AuthFieldLabel>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                autoComplete="given-name"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.firstName)}
              />
              <FieldError message={fieldErrors.firstName} />
            </div>
            <div>
              <AuthFieldLabel required>Last Name</AuthFieldLabel>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                autoComplete="family-name"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.lastName)}
              />
              <FieldError message={fieldErrors.lastName} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Email</AuthFieldLabel>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter student email"
                autoComplete="email"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              <FieldError message={fieldErrors.email} />
            </div>
            <div>
              <AuthFieldLabel required>Phone</AuthFieldLabel>
              <PhoneInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
              />
              <FieldError message={fieldErrors.phone} />
            </div>
          </div>

          <div>
            <AuthFieldLabel required>Date of Birth</AuthFieldLabel>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={authInputClass}
              aria-invalid={Boolean(fieldErrors.dateOfBirth)}
            />
            <FieldError message={fieldErrors.dateOfBirth} />
          </div>

          <AuthSectionDivider label="School Information" className="pt-2" />

          <div>
            <AuthFieldLabel required>School Code</AuthFieldLabel>
            <div className="flex gap-2">
              <input
                type="text"
                name="schoolCode"
                value={formData.schoolCode}
                onChange={handleChange}
                onBlur={handleSchoolBlur}
                placeholder="e.g. SCH-ABC123"
                className={`${authInputClass} uppercase`}
                aria-invalid={Boolean(fieldErrors.schoolCode)}
              />
              <button
                type="button"
                onClick={() => void validateSchoolCode(formData.schoolCode)}
                disabled={isValidatingSchool || isSubmitting}
                className="shrink-0 rounded-xl border border-violet-200 bg-violet-50 px-4 text-xs font-extrabold text-violet-700 hover:bg-violet-100 disabled:opacity-60"
              >
                {isValidatingSchool ? "Checking…" : "Verify"}
              </button>
            </div>
            <FieldError message={fieldErrors.schoolCode} />
            {verifiedSchool && !fieldErrors.schoolCode && (
              <p className="mt-1.5 text-xs font-semibold text-emerald-600">
                Verified: {verifiedSchool.name}
                {verifiedSchool.address?.city
                  ? ` · ${verifiedSchool.address.city}`
                  : ""}
              </p>
            )}
          </div>

          <AuthSectionDivider label="Academic Information" className="pt-2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Class / Grade</AuthFieldLabel>
              <select
                name="academicClass"
                value={formData.academicClass}
                onChange={handleChange}
                className={authSelectClass}
                aria-invalid={Boolean(fieldErrors.academicClass)}
              >
                <option value="" disabled>
                  Select class / grade
                </option>
                {STUDENT_CLASSES.map((studentClass) => (
                  <option key={studentClass} value={studentClass}>
                    {CLASS_LABELS[studentClass]}
                  </option>
                ))}
              </select>
              <FieldError message={fieldErrors.academicClass} />
            </div>
            <div>
              <AuthFieldLabel required>Section</AuthFieldLabel>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="e.g. A"
                className={`${authInputClass} uppercase`}
                aria-invalid={Boolean(fieldErrors.section)}
              />
              <FieldError message={fieldErrors.section} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Roll Number</AuthFieldLabel>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.rollNumber)}
              />
              <FieldError message={fieldErrors.rollNumber} />
            </div>
            <div>
              <AuthFieldLabel required>Academic Year</AuthFieldLabel>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="e.g. 2026-27"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.academicYear)}
              />
              <FieldError message={fieldErrors.academicYear} />
            </div>
          </div>

          <AuthSectionDivider label="Guardian Information" className="pt-2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Guardian Name</AuthFieldLabel>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Enter guardian name"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.guardianName)}
              />
              <FieldError message={fieldErrors.guardianName} />
            </div>
            <div>
              <AuthFieldLabel required>Guardian Phone</AuthFieldLabel>
              <PhoneInput
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
              />
              <FieldError message={fieldErrors.guardianPhone} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel>Guardian Email</AuthFieldLabel>
              <input
                type="email"
                name="guardianEmail"
                value={formData.guardianEmail}
                onChange={handleChange}
                placeholder="Optional email"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.guardianEmail)}
              />
              <FieldError message={fieldErrors.guardianEmail} />
            </div>
            <div>
              <AuthFieldLabel required>Relation</AuthFieldLabel>
              <select
                name="guardianRelation"
                value={formData.guardianRelation}
                onChange={handleChange}
                className={authSelectClass}
                aria-invalid={Boolean(fieldErrors.guardianRelation)}
              >
                <option value="" disabled>
                  Select relation
                </option>
                {GUARDIAN_RELATIONS.map((relation) => (
                  <option key={relation} value={relation}>
                    {RELATION_LABELS[relation]}
                  </option>
                ))}
              </select>
              <FieldError message={fieldErrors.guardianRelation} />
            </div>
          </div>

          <AuthSectionDivider label="Account Security" className="pt-2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Password</AuthFieldLabel>
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <FieldError message={fieldErrors.password} />
            </div>
            <div>
              <AuthFieldLabel required>Confirm Password</AuthFieldLabel>
              <PasswordInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
              <FieldError message={fieldErrors.confirmPassword} />
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="size-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs font-semibold text-slate-700 cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-violet-600 font-bold hover:underline"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-violet-600 font-bold hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <FieldError message={fieldErrors.agreedToTerms} />
          </div>

          <AuthSubmitButton
            icon={<BookIcon />}
            disabled={isSubmitting || isValidatingSchool}
          >
            {isSubmitting ? "Creating account…" : "Create Student Account"}
          </AuthSubmitButton>
        </form>

        <AuthFooterLinks
          prompt="Already have an account?"
          linkHref="/login"
          linkLabel="Log in"
        />
      </div>
    </AuthSplitLayout>
  );
}
