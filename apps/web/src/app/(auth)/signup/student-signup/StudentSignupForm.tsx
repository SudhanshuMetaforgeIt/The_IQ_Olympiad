"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  PhoneInput,
  PasswordInput,
  formatMobileNumber,
  authInputClass,
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

export default function StudentSignupForm({
  onRoleChange,
}: StudentSignupFormProps) {
  const [formData, setFormData] = useState<StudentSignupFormValues>(
    INITIAL_STUDENT_SIGNUP_VALUES
  );

  const {
    isSubmitting,
    fieldErrors,
    apiError,
    successMessage,
    clearFieldError,
    submitRegistration,
  } = useStudentRegistration();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const key = name as keyof StudentSignupFormValues;

    let nextValue: string | boolean = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      nextValue = e.target.checked;
    } else if (name === "phone") {
      nextValue = formatMobileNumber(value);
    }

    setFormData((prev) => ({ ...prev, [key]: nextValue }));
    clearFieldError(key);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitRegistration(formData);
  };

  return (
    <AuthSplitLayout
      sidePanel={<AuthSidePanel badgeIcon="star" />}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
          <AuthBrandHeader className="mb-0" />
          <AuthBackLink className="mb-0 shrink-0" />
        </div>

        <div className="mb-3 shrink-0">
          <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.18em] text-violet-600">
            WELCOME TO THE IQ OLYMPIAD
          </span>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Create your account
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Sign up as a Student or register your School.
          </p>
        </div>

        <AuthRoleSwitcher
          activeRole="student"
          onChange={onRoleChange}
          showIcons
          className="mb-3 shrink-0"
        />

        {successMessage ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 shrink-0 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700"
          >
            {successMessage}
          </motion.div>
        ) : null}

        {apiError ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 shrink-0 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700"
            role="alert"
          >
            {apiError}
          </motion.div>
        ) : null}

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
          <motion.div
            className="min-h-0 flex-1 space-y-3"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <AuthFieldLabel required>Full Name</AuthFieldLabel>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className={authInputClass}
                aria-invalid={Boolean(fieldErrors.fullName)}
              />
              <FieldError message={fieldErrors.fullName} />
            </div>

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
              <AuthFieldLabel required>Mobile Number</AuthFieldLabel>
              <PhoneInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
              />
              <FieldError message={fieldErrors.phone} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

            <div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="size-5 cursor-pointer rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <label
                  htmlFor="terms"
                  className="cursor-pointer text-xs font-semibold text-slate-700"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="font-bold text-violet-600 hover:underline"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-bold text-violet-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <FieldError message={fieldErrors.agreedToTerms} />
            </div>
          </motion.div>

          <div className="mt-3 shrink-0 space-y-3">
            <p className="text-xs font-medium text-slate-500">
              You can add school and academic details after login from your student dashboard.
            </p>

            <AuthSubmitButton icon={<BookIcon />} disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create Student Account"}
            </AuthSubmitButton>

            <AuthFooterLinks
              bordered={false}
              prompt="Already have an account?"
              linkHref="/login"
              linkLabel="Log in"
              className="text-slate-500"
            />
          </div>
        </form>
      </div>
    </AuthSplitLayout>
  );
}
