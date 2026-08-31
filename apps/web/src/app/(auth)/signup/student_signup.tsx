"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SchoolAdminSignupPage from "./schooladmin_signup";

export default function StudentSignupPage() {
  const [activeRole, setActiveRole] = useState<"student" | "school">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [formData, setFormData] = useState({
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    relation: "",
    studentName: "",
    studentGrade: "",
    city: "",
    schoolName: "",
    studentEmail: "",
    password: "",
    confirmPassword: "",
  });

  if (activeRole === "school") {
    return <SchoolAdminSignupPage />;
  }

  const formatMobileNumber = (val: string): string => {
    let digits = val.replace(/\D/g, "");
    if (digits.length > 0 && !/^[6-9]/.test(digits)) {
      digits = "";
    }
    return digits.slice(0, 10);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "parentMobile") {
      const sanitized = formatMobileNumber(value);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the Terms of Use and Privacy Policy.");
      return;
    }
    if (formData.parentMobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup form submit
    console.log("Student Signup Submitted:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Outer Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Signup Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Header Brand Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="size-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-indigo-950 tracking-tight leading-none">
                  THE IQ <span className="text-violet-600">OLYMPIAD</span>
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
                Create your account
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Sign up as a Student or register your School.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl mb-8">
              <button
                type="button"
                onClick={() => setActiveRole("student")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.17L4.42 12.1 12 7.92l7.58 4.18L12 16.17zM6 14.73v3.77l6 3.27 6-3.27v-3.77l-6 3.27-6-3.27z" />
                </svg>
                Student
              </button>

              <button
                type="button"
                onClick={() => setActiveRole("school")}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all cursor-pointer text-slate-600 hover:text-slate-900"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                School Admin
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: Parent / Mentor Details Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200" />
                <div className="absolute bg-white px-4 flex items-center gap-2 text-xs font-bold text-violet-700">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  Parent / Mentor Details
                </div>
              </div>

              {/* Row 1: Parent Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Parent / Mentor Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Enter parent / mentor name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Parent / Mentor Mobile Number <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700">
                      <span>🇮🇳</span>
                      <span>+91</span>
                      <svg className="w-3.5 h-3.5 fill-slate-400" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="parentMobile"
                      value={formData.parentMobile}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      pattern="[6-9][0-9]{9}"
                      title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Parent Email & Relation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Parent / Mentor Email ID <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="Enter email id"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Relation with Student <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition cursor-pointer"
                  >
                    <option value="" disabled>Select relation</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="guardian">Guardian</option>
                    <option value="mentor">Mentor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* SECTION 2: Student Details Divider */}
              <div className="relative flex items-center justify-center pt-2">
                <div className="w-full border-t border-slate-200" />
                <div className="absolute bg-white px-4 flex items-center gap-2 text-xs font-bold text-violet-700">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  Student Details
                </div>
              </div>

              {/* Row 3: Student Name & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Student Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Student Class / Grade <span className="text-red-500 font-bold">*</span>
                  </label>
                  <select
                    name="studentGrade"
                    value={formData.studentGrade}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition cursor-pointer"
                  >
                    <option value="" disabled>Select class / grade</option>
                    <option value="class-7">Class 7</option>
                    <option value="class-8">Class 8</option>
                    <option value="class-9">Class 9</option>
                    <option value="class-10">Class 10</option>
                    <option value="class-11">Class 11</option>
                    <option value="class-12">Class 12</option>
                  </select>
                </div>
              </div>

              {/* Row 4: City & School Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    City <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    School Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter school name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>
              </div>

              {/* Row 5: Student Email ID */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Student Email ID <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  placeholder="Enter student email id"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                />
              </div>

              {/* Row 6: Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Create Password <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Confirm Password <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••••"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkbox: Terms of Use */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="size-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms-and-conditions" className="text-violet-600 font-bold hover:underline">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-violet-600 font-bold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                Create Student Account
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                </svg>
              </button>
            </form>

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
              <p className="text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-violet-600 hover:underline">
                  Log in
                </Link>
              </p>

              <button
                type="button"
                className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-violet-600" viewBox="0 0 24 24">
                  <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                </svg>
                Help and Support
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Branding & Features Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 via-purple-50/50 to-indigo-50/40 p-6 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
          <div>
            {/* Top Star Badge */}
            <div className="size-12 rounded-2xl bg-violet-100 border border-violet-200/60 flex items-center justify-center text-violet-600 mb-6 shadow-sm">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
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

            {/* 3D Robot Illustration Box */}
            <div className="relative w-full h-[260px] sm:h-[300px] rounded-3xl bg-gradient-to-br from-violet-100/70 via-purple-100/40 to-indigo-100/60 border border-purple-200/50 flex items-center justify-center overflow-hidden mb-8 shadow-inner">
              <Image
                src="/ai-teacher-3d-transparent.png"
                alt="AI Olympiad Mascot Robot"
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
