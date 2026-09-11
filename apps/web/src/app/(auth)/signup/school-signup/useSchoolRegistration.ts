"use client";

import { useCallback, useRef, useState } from "react";

import { ApiError, registerSchool } from "@/lib/api";
import { setAccessToken } from "@/lib/auth/token-storage";

import {
  buildRegisterSchoolPayload,
  type SchoolSignupFormData,
} from "./types";

type UseSchoolRegistrationResult = {
  isSubmitting: boolean;
  apiError: string | null;
  createdSchoolCode: string | null;
  createdSchoolName: string | null;
  submitRegistration: (values: SchoolSignupFormData) => Promise<void>;
};

export function useSchoolRegistration(): UseSchoolRegistrationResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [createdSchoolCode, setCreatedSchoolCode] = useState<string | null>(
    null,
  );
  const [createdSchoolName, setCreatedSchoolName] = useState<string | null>(
    null,
  );
  const submitAbortRef = useRef<AbortController | null>(null);

  const submitRegistration = useCallback(async (values: SchoolSignupFormData) => {
    submitAbortRef.current?.abort();
    const controller = new AbortController();
    submitAbortRef.current = controller;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const result = await registerSchool(
        buildRegisterSchoolPayload(values),
        controller.signal,
      );
      setAccessToken(result.accessToken);
      setCreatedSchoolCode(result.school.code);
      setCreatedSchoolName(result.school.name);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      if (error instanceof ApiError) {
        setApiError(error.message);
        return;
      }
      if (error instanceof TypeError) {
        setApiError(
          "Cannot reach the API. Confirm it is running at http://localhost:4000 and open the app at http://localhost:3000.",
        );
        return;
      }
      setApiError("Unable to create the school account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    isSubmitting,
    apiError,
    createdSchoolCode,
    createdSchoolName,
    submitRegistration,
  };
}
