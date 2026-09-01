"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import StudentLoginPage from "./student_login";

interface SchoolAdminLoginPageProps {
  onSwitchRole?: (role: "student" | "school") => void;
}

export default function SchoolAdminLoginPage({ onSwitchRole }: SchoolAdminLoginPageProps) {
  const [activeRole, setActiveRole] = useState<"student" | "school">("school");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Mobile validation helper (10 digits starting with 6, 7, 8, 9)
  const formatMobileNumber = (val: string): string => {
    let digits = val.replace(/\D/g, "");
    if (digits.length > 0 && !/^[6-9]/.test(digits)) {
      digits = "";
    }
    return digits.slice(0, 10);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatMobileNumber(e.target.value));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.");
      return;
    }
    setOtpSent(true);
    setTimer(30);
    setCanResend(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  if (activeRole === "student") {
    return <StudentLoginPage />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.");
      return;
    }
    if (!otpSent) {
      alert("Please click 'Send OTP' to receive your verification code.");
      return;
    }
    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP code.");
      return;
    }
    console.log("School Admin Login Submitted:", { phone, otp, activeRole });
    alert("School Admin Login Successful!");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: School Admin Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header Brand Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="size-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c2.22-.48 3.88-2.3 4.39-4.54C19.08 11.05 21 8.97 21 6.4V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-indigo-950 tracking-tight leading-none uppercase">
                  THEIQ<span className="text-violet-600">OLYMPIAD</span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 tracking-wide mt-0.5">
                  Excel. Compete. Achieve.
                </p>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-6">
              <span className="text-xs font-black text-violet-600 uppercase tracking-widest block mb-1">
                WELCOME TO THE IQ OLYMPIAD
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Log in as School Admin.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl mb-4">
              <button
                type="button"
                onClick={() => {
                  setActiveRole("student");
                  if (onSwitchRole) onSwitchRole("student");
                }}
                className="py-3 rounded-xl text-sm font-black transition-all cursor-pointer text-slate-600 hover:text-slate-900"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveRole("school");
                  if (onSwitchRole) onSwitchRole("school");
                }}
                className="py-3 rounded-xl text-sm font-black transition-all cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25"
              >
                School Admin
              </button>
            </div>

            {/* Sub-tag pill */}
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-violet-700 bg-violet-50 border border-violet-100 px-4 py-1.5 rounded-full inline-block">
                For IQ Coordinators
              </span>
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Phone Number Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700">
                    <span>+91</span>
                    <svg className="w-3.5 h-3.5 fill-slate-400" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>

                {/* Send OTP Action */}
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-xs font-extrabold text-violet-600 hover:text-violet-800 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>{otpSent ? "Resend OTP" : "Send OTP"}</span>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Enter OTP Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Enter OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                    className="w-full px-4 py-3.5 pr-11 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                  </div>
                </div>

                {/* Resend Countdown */}
                <p className="text-xs font-medium text-slate-500 mt-2">
                  Didn&apos;t receive OTP?{" "}
                  <button
                    type="button"
                    onClick={canResend ? handleSendOtp : undefined}
                    disabled={!canResend}
                    className={`font-bold transition ${
                      canResend
                        ? "text-violet-600 hover:underline cursor-pointer"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Resend OTP {otpSent && !canResend && `(00:${timer < 10 ? `0${timer}` : timer})`}
                  </button>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                Log in as School Admin
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
              </button>
            </form>

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
              <p className="text-slate-500">
                New School Admin?{" "}
                <Link href="/signup?role=school" className="text-violet-600 hover:underline font-extrabold">
                  Sign up
                </Link>
              </p>

              <button
                type="button"
                className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-violet-600" viewBox="0 0 24 24">
                  <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                </svg>
                Help & Support
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Branding & Features Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 via-purple-50/50 to-indigo-50/40 p-6 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
          <div>
            {/* Top Sparkle Badge */}
            <div className="size-12 rounded-2xl bg-violet-100 border border-violet-200/60 flex items-center justify-center text-violet-600 mb-6 shadow-sm">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
              </svg>
            </div>

            {/* Headline */}
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Practice smarter.
              <br />
              <span className="text-slate-900">Compete confidently.</span>
            </h3>

            {/* Sub-headline */}
            <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
              A complete Olympiad workspace for personalised learning, real exam practice and meaningful progress.
            </p>

            {/* 3D Mascot Illustration Box */}
            <div className="relative w-full h-[240px] sm:h-[280px] rounded-3xl bg-gradient-to-br from-violet-100/70 via-purple-100/40 to-indigo-100/60 border border-purple-200/50 flex items-center justify-center overflow-hidden mb-8 shadow-inner">
              <Image
                src="/ai-teacher-3d-transparent.png"
                alt="IQ Olympiad AI Mascot"
                fill
                className="object-contain object-bottom p-4"
                priority
              />
            </div>

            {/* Feature Badges List */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-purple-100/80 shadow-sm backdrop-blur-sm">
                <div className="size-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                  </svg>
                </div>
                <span className="text-sm font-black text-slate-800">
                  AI-guided practice
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-purple-100/80 shadow-sm backdrop-blur-sm">
                <div className="size-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c2.22-.48 3.88-2.3 4.39-4.54C19.08 11.05 21 8.97 21 6.4V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                  </svg>
                </div>
                <span className="text-sm font-black text-slate-800">
                  Real Olympiad experience
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-purple-100/80 shadow-sm backdrop-blur-sm">
                <div className="size-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <span className="text-sm font-black text-slate-800">
                  Instant, useful feedback
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
