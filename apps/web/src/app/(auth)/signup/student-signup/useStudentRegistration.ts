"use client";

import { useCallback, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { ApiError, registerStudent } from "@/lib/api";

import {
  buildRegisterStudentPayload,
  type StudentSignupFieldErrors,
  type StudentSignupFormValues,
} from "./types";
import { validateStudentSignupForm } from "./validation";

type UseStudentRegistrationResult = {
  isSubmitting: boolean;
  fieldErrors: StudentSignupFieldErrors;
  apiError: string | null;
  successMessage: string | null;
  setFieldErrors: Dispatch<SetStateAction<StudentSignupFieldErrors>>;
  clearFieldError: (field: keyof StudentSignupFormValues) => void;
  submitRegistration: (values: StudentSignupFormValues) => Promise<void>;
};

export function useStudentRegistration(): UseStudentRegistrationResult {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<StudentSignupFieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

      submitAbortRef.current?.abort();
      const controller = new AbortController();
      submitAbortRef.current = controller;

      setIsSubmitting(true);
      setFieldErrors({});

      try {
        const payload = buildRegisterStudentPayload(values);
        await registerStudent(payload, controller.signal);
        setSuccessMessage("Account created successfully. Redirecting to login…");
        router.push("/login?role=student&registered=1");
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
    [isSubmitting, router]
  );

  return {
    isSubmitting,
    fieldErrors,
    apiError,
    successMessage,
    setFieldErrors,
    clearFieldError,
    submitRegistration,
  };
}
