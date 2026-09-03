"use client";

import { useCallback, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  getSchoolByCode,
  registerStudent,
  type SchoolByCodeResponse,
} from "@/lib/api";
import { setAccessToken } from "@/lib/auth/token-storage";

import {
  buildRegisterStudentPayload,
  type StudentSignupFieldErrors,
  type StudentSignupFormValues,
} from "./types";
import { validateStudentSignupForm } from "./validation";

type UseStudentRegistrationResult = {
  isSubmitting: boolean;
  isValidatingSchool: boolean;
  fieldErrors: StudentSignupFieldErrors;
  apiError: string | null;
  successMessage: string | null;
  verifiedSchool: SchoolByCodeResponse | null;
  setFieldErrors: Dispatch<SetStateAction<StudentSignupFieldErrors>>;
  clearFieldError: (field: keyof StudentSignupFormValues) => void;
  validateSchoolCode: (schoolCode: string) => Promise<boolean>;
  submitRegistration: (values: StudentSignupFormValues) => Promise<void>;
};

export function useStudentRegistration(): UseStudentRegistrationResult {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingSchool, setIsValidatingSchool] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<StudentSignupFieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [verifiedSchool, setVerifiedSchool] =
    useState<SchoolByCodeResponse | null>(null);
  const schoolAbortRef = useRef<AbortController | null>(null);
  const submitAbortRef = useRef<AbortController | null>(null);

  const clearFieldError = useCallback((field: keyof StudentSignupFormValues) => {
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateSchoolCode = useCallback(async (schoolCode: string) => {
    const normalized = schoolCode.trim().toUpperCase();
    if (!normalized) {
      setVerifiedSchool(null);
      setFieldErrors((prev) => ({
        ...prev,
        schoolCode: "School code is required",
      }));
      return false;
    }

    schoolAbortRef.current?.abort();
    const controller = new AbortController();
    schoolAbortRef.current = controller;

    setIsValidatingSchool(true);
    setApiError(null);

    try {
      const school = await getSchoolByCode(normalized, controller.signal);
      setVerifiedSchool(school);
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.schoolCode;
        return next;
      });
      return true;
    } catch (error) {
      if (controller.signal.aborted) {
        return false;
      }
      setVerifiedSchool(null);
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to verify school code";
      setFieldErrors((prev) => ({
        ...prev,
        schoolCode:
          error instanceof ApiError && error.statusCode === 404
            ? "School code not found. Check the code from your school."
            : message,
      }));
      return false;
    } finally {
      if (schoolAbortRef.current === controller) {
        setIsValidatingSchool(false);
      }
    }
  }, []);

  const submitRegistration = useCallback(
    async (values: StudentSignupFormValues) => {
      if (isSubmitting) {
        return;
      }

      setApiError(null);
      setSuccessMessage(null);

      const errors = validateStudentSignupForm(values);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      const schoolOk = await validateSchoolCode(values.schoolCode);
      if (!schoolOk) {
        return;
      }

      submitAbortRef.current?.abort();
      const controller = new AbortController();
      submitAbortRef.current = controller;

      setIsSubmitting(true);
      setFieldErrors({});

      try {
        const payload = buildRegisterStudentPayload(values);
        const result = await registerStudent(payload, controller.signal);
        setAccessToken(result.accessToken);
        setSuccessMessage("Account created successfully. Redirecting…");
        router.push("/dashboard/student");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (error instanceof ApiError) {
          setApiError(
            error.errors.length > 0
              ? error.errors.join(" ")
              : error.message
          );
        } else {
          setApiError("Registration failed. Please try again.");
        }
      } finally {
        if (submitAbortRef.current === controller) {
          setIsSubmitting(false);
        }
      }
    },
    [isSubmitting, router, validateSchoolCode]
  );

  return {
    isSubmitting,
    isValidatingSchool,
    fieldErrors,
    apiError,
    successMessage,
    verifiedSchool,
    setFieldErrors,
    clearFieldError,
    validateSchoolCode,
    submitRegistration,
  };
}
