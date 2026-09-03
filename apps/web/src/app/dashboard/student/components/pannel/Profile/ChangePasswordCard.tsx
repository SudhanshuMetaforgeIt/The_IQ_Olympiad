"use client";

import React, { useState, useEffect, useRef } from "react";

interface ChangePasswordCardProps {
  phone?: string;
}

export function ChangePasswordCard({
  phone = "",
}: ChangePasswordCardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(45);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setTimer(45);
    // Focus first OTP box
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits entered
    if (newOtp.every((digit) => digit.length === 1)) {
      setTimeout(() => {
        setCurrentStep(2);
      }, 400);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordError(null);
    setCurrentStep(3);
  };

  const handleConfirmPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError(null);
    setCurrentStep(4);
  };

  const handleResetFlow = () => {
    setCurrentStep(1);
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="size-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Change Password
          </h3>
        </div>

        {/* 4-Step Stepper Progress Bar */}
        <div className="relative mb-6 pt-2">
          {/* Connecting Line */}
          <div className="absolute top-[22px] left-6 right-6 h-0.5 bg-slate-200 -z-0" />

          <div className="flex items-center justify-between relative z-10">
            {/* Step 1: Verify Identity */}
            <div className="flex flex-col items-center">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  currentStep >= 1
                    ? "bg-violet-600 text-white shadow-sm ring-4 ring-violet-100"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                1
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${
                  currentStep === 1 ? "text-violet-700" : "text-slate-400"
                }`}
              >
                Verify Identity
              </span>
            </div>

            {/* Step 2: New Password */}
            <div className="flex flex-col items-center">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  currentStep >= 2
                    ? "bg-violet-600 text-white shadow-sm ring-4 ring-violet-100"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                2
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${
                  currentStep === 2 ? "text-violet-700" : "text-slate-400"
                }`}
              >
                New Password
              </span>
            </div>

            {/* Step 3: Confirm Password */}
            <div className="flex flex-col items-center">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  currentStep >= 3
                    ? "bg-violet-600 text-white shadow-sm ring-4 ring-violet-100"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                3
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${
                  currentStep === 3 ? "text-violet-700" : "text-slate-400"
                }`}
              >
                Confirm Password
              </span>
            </div>

            {/* Step 4: Success */}
            <div className="flex flex-col items-center">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  currentStep === 4
                    ? "bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-100"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                4
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1.5 whitespace-nowrap ${
                  currentStep === 4 ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                Success
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Verify Identity (OTP Verification) */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-xs font-medium text-slate-500 leading-relaxed">
              We will send a one-time password (OTP) to your registered mobile number.
            </p>

            {/* Phone Number Strip + Send OTP Button */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 gap-3">
              <div className="flex items-center gap-2.5 pl-2">
                <div className="size-7 rounded-lg bg-white border border-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <line x1="12" x2="12.01" y1="18" y2="18" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {phone || "—"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                className="px-4 py-2 rounded-xl bg-violet-100/90 hover:bg-violet-200 text-violet-700 font-black text-xs transition cursor-pointer shadow-2xs shrink-0"
              >
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>
            </div>

            {/* 6-Digit OTP Boxes */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Enter the 6-digit OTP
                </label>
                {otpSent && (
                  <span className="text-xs font-semibold text-slate-400">
                    Resend OTP in{" "}
                    <span className="text-violet-600 font-mono font-bold">
                      00:{timer < 10 ? `0${timer}` : timer}
                    </span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="size-11 sm:size-12 rounded-xl border border-slate-200 bg-slate-50 text-center font-black text-base sm:text-lg text-slate-900 focus:bg-white focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: New Password Input */}
        {currentStep === 2 && (
          <form onSubmit={handleSetNewPassword} className="space-y-4">
            <p className="text-xs font-medium text-slate-500">
              Identity verified! Enter your new password below.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter at least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition"
              />
              {passwordError && (
                <span className="text-xs font-bold text-red-500 block mt-1">
                  {passwordError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs transition cursor-pointer shadow-xs"
            >
              Continue to Confirm
            </button>
          </form>
        )}

        {/* Step 3: Confirm Password Input */}
        {currentStep === 3 && (
          <form onSubmit={handleConfirmPassword} className="space-y-4">
            <p className="text-xs font-medium text-slate-500">
              Re-enter your password to confirm and update.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition"
              />
              {passwordError && (
                <span className="text-xs font-bold text-red-500 block mt-1">
                  {passwordError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs transition cursor-pointer shadow-xs"
            >
              Update Password
            </button>
          </form>
        )}

        {/* Step 4: Success Screen */}
        {currentStep === 4 && (
          <div className="text-center py-4 space-y-3">
            <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-base font-black text-slate-900">
              Password Changed Successfully!
            </h4>
            <p className="text-xs font-medium text-slate-500">
              Your account password has been updated securely.
            </p>
            <button
              type="button"
              onClick={handleResetFlow}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
