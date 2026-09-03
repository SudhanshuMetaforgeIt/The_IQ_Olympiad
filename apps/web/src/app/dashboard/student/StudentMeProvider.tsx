"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiError, getStudentMe } from "@/lib/api";
import type { StudentMeResponse } from "@/lib/api/services/students.types";
import { getAccessToken } from "@/lib/auth/token-storage";
import type { StudentProfile } from "./types";
import type { StudentProfileData } from "./components/pannel/Profile/types";
import {
  toStudentProfileFormData,
  toStudentShell,
} from "./lib/mapStudentMe";

type StudentMeStatus =
  | "loading"
  | "ready"
  | "unauthenticated"
  | "missing_profile"
  | "error";

export type StudentMeContextValue = {
  status: StudentMeStatus;
  errorMessage: string | null;
  data: StudentMeResponse | null;
  shell: StudentProfile | null;
  profileForm: StudentProfileData | null;
  refetch: () => void;
};

const StudentMeContext = createContext<StudentMeContextValue | null>(null);

export function StudentMeProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<StudentMeStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<StudentMeResponse | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      // Yield so status updates are not synchronous effect setState.
      await Promise.resolve();
      if (controller.signal.aborted) return;

      const token = getAccessToken();
      if (!token) {
        setData(null);
        setErrorMessage(null);
        setStatus("unauthenticated");
        return;
      }

      setStatus("loading");
      setErrorMessage(null);

      try {
        const response = await getStudentMe(token, controller.signal);
        if (controller.signal.aborted) return;
        setData(response);
        setStatus("ready");
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        if (error instanceof ApiError) {
          if (error.statusCode === 401) {
            setData(null);
            setStatus("unauthenticated");
            setErrorMessage("Please sign in again to continue.");
            return;
          }
          if (error.statusCode === 404) {
            setData(null);
            setStatus("missing_profile");
            setErrorMessage(
              error.message || "Student profile not found for this account."
            );
            return;
          }
          setData(null);
          setStatus("error");
          setErrorMessage(error.message || "Failed to load student profile.");
          return;
        }

        setData(null);
        setStatus("error");
        setErrorMessage("Failed to load student profile.");
      }
    }

    void loadProfile();
    return () => controller.abort();
  }, [reloadKey]);

  const value = useMemo<StudentMeContextValue>(
    () => ({
      status,
      errorMessage,
      data,
      shell: data ? toStudentShell(data) : null,
      profileForm: data ? toStudentProfileFormData(data) : null,
      refetch: () => setReloadKey((key) => key + 1),
    }),
    [status, errorMessage, data]
  );

  return (
    <StudentMeContext.Provider value={value}>{children}</StudentMeContext.Provider>
  );
}

export function useStudentMe(): StudentMeContextValue {
  const context = useContext(StudentMeContext);
  if (!context) {
    throw new Error("useStudentMe must be used within StudentMeProvider");
  }
  return context;
}
