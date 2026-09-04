"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { AuthSubmitButton } from "../../common";
import type { SchoolSignupFormData } from "./types";

type StepVerifyActivateProps = {
  formData: SchoolSignupFormData;
  isSubmitting: boolean;
  apiError: string | null;
  createdSchoolCode: string | null;
  createdSchoolName: string | null;
  onBack: () => void;
  onSubmit: (e: FormEvent) => void;
};

export default function StepVerifyActivate({
  formData,
  isSubmitting,
  apiError,
  createdSchoolCode,
  createdSchoolName,
  onBack,
  onSubmit,
}: StepVerifyActivateProps) {
  if (createdSchoolCode) {
    return (
      <div className="rounded-3xl border border-violet-500/40 bg-white/80 p-5 shadow-xl ring-2 ring-violet-500/10 backdrop-blur-sm sm:p-8">
        <span className="text-xs font-black tracking-widest text-violet-700 bg-violet-50 border border-violet-100 px-3.5 py-1 rounded-full uppercase">
          Account created
        </span>
        <h3 className="text-2xl font-black text-slate-900 mt-4 mb-1">
          School admin account is ready
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-6">
          Share this school code with students so they can sign up.
        </p>
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            School code
          </p>
          <p className="text-3xl font-black tracking-widest text-slate-900">
            {createdSchoolCode}
          </p>
          <p className="text-sm font-semibold text-slate-600 mt-2">
            {createdSchoolName}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/signup?role=student"
            className="flex-1 py-4 px-4 rounded-2xl bg-violet-600 text-white font-extrabold text-sm text-center hover:bg-violet-700 transition"
          >
            Register a student
          </Link>
          <Link
            href="/login?role=school"
            className="flex-1 py-4 px-4 rounded-2xl border border-slate-300 text-slate-700 font-extrabold text-sm text-center hover:bg-slate-100 transition"
          >
            Go to school login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-violet-500/40 bg-white/80 p-5 shadow-xl ring-2 ring-violet-500/10 backdrop-blur-sm transition-all sm:p-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black tracking-widest text-violet-700 bg-violet-50 border border-violet-100 px-3.5 py-1 rounded-full uppercase">
          STEP 3 OF 3
        </span>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-violet-600 cursor-pointer"
        >
          ← Back to Step 2
        </button>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-1">
        Create account
      </h3>
      <p className="text-sm font-medium text-slate-500 mb-6">
        Email verification is skipped until a mailer is integrated. Your
        account will be created immediately.
      </p>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">
          Review
        </p>
        <p className="text-sm font-semibold text-slate-700">
          {formData.adminName}
        </p>
        <p className="text-sm font-semibold text-slate-900">
          {formData.officialEmail}
        </p>
        <p className="text-sm font-semibold text-slate-700">
          {formData.schoolName}
        </p>
        <p className="text-sm font-medium text-slate-500">{formData.city}</p>
      </div>

      {apiError ? (
        <p
          className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
          role="alert"
        >
          {apiError}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 py-4 px-4 rounded-2xl border border-slate-300 text-slate-700 font-extrabold text-sm hover:bg-slate-100 transition cursor-pointer"
          >
            ← Back
          </button>
          <AuthSubmitButton
            className="w-2/3 text-base font-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create IQ Coordinator Account"}
          </AuthSubmitButton>
        </div>
      </form>
    </div>
  );
}
