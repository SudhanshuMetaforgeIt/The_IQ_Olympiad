"use client";

import type { FormEvent } from "react";
import { AuthSubmitButton, PhoneInput, formatMobileNumber } from "../../common";
import type { SchoolSignupFormData } from "./types";

type StepVerifyActivateProps = {
  formData: SchoolSignupFormData;
  verificationMethod: "email" | "mobile";
  isVerificationSent: boolean;
  onVerificationMethodChange: (method: "email" | "mobile") => void;
  onMobileChange: (value: string) => void;
  onSendVerification: () => void;
  onBack: () => void;
  onSubmit: (e: FormEvent) => void;
};

export default function StepVerifyActivate({
  formData,
  verificationMethod,
  isVerificationSent,
  onVerificationMethodChange,
  onMobileChange,
  onSendVerification,
  onBack,
  onSubmit,
}: StepVerifyActivateProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-violet-500 ring-2 ring-violet-500/20 shadow-xl transition-all">
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
        Verify & Activate
      </h3>
      <p className="text-sm font-medium text-slate-500 mb-8">
        Verify your email or mobile number to activate your account.
      </p>

      <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => onVerificationMethodChange("email")}
          className={`py-3 rounded-xl text-xs font-black transition cursor-pointer ${
            verificationMethod === "email"
              ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Email Verification
        </button>
        <button
          type="button"
          onClick={() => onVerificationMethodChange("mobile")}
          className={`py-3 rounded-xl text-xs font-black transition cursor-pointer ${
            verificationMethod === "mobile"
              ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Mobile Verification
        </button>
      </div>

      {verificationMethod === "email" ? (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4 mb-8">
          <div className="size-14 rounded-2xl bg-violet-100 text-violet-600 mx-auto flex items-center justify-center">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-600">
            A verification link will be sent to your official email ID.
          </p>
          <p className="text-base font-black text-slate-900">
            {formData.officialEmail || "admin@school.com"}
          </p>
          <p className="text-xs font-medium text-slate-500">
            Please check your inbox and click on the link to verify your
            account.
          </p>
          <button
            type="button"
            onClick={onSendVerification}
            className="w-full py-3.5 px-4 rounded-xl border border-violet-200 bg-white text-violet-700 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-violet-50 transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            {isVerificationSent
              ? "Link Sent! Resend Link"
              : "Send Verification Link"}
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4 mb-8">
          <div className="size-14 rounded-2xl bg-violet-100 text-violet-600 mx-auto flex items-center justify-center">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-600">
            A verification code will be sent to your mobile number.
          </p>
          <div className="flex gap-2 justify-center">
            <PhoneInput
              value={formData.adminMobile}
              onChange={(e) =>
                onMobileChange(formatMobileNumber(e.target.value))
              }
              placeholder="Enter 10-digit mobile number"
              className="w-56 !py-2.5 !text-xs bg-white"
            />
          </div>
          <button
            type="button"
            onClick={onSendVerification}
            className="w-full py-3.5 px-4 rounded-xl border border-violet-200 bg-white text-violet-700 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-violet-50 transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            {isVerificationSent ? "OTP Sent! Resend OTP" : "Send OTP"}
          </button>
        </div>
      )}

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
            icon={
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            }
          >
            Create IQ Coordinator Account
          </AuthSubmitButton>
        </div>
      </form>
    </div>
  );
}
