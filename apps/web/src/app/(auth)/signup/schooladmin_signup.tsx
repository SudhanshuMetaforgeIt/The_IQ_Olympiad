"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SchoolAdminSignupPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [verificationMethod, setVerificationMethod] = useState<"email" | "mobile">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    adminName: "",
    officialEmail: "",
    adminMobile: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    city: "",
    schoolBranch: "",
    schoolTypes: ["Senior Secondary (Classes 11 to 12)"],
    managedClasses: [7, 8, 9, 10, 11, 12],
  });

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
    if (name === "adminMobile") {
      const sanitized = formatMobileNumber(value);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSchoolTypeToggle = (type: string) => {
    setFormData((prev) => {
      const exists = prev.schoolTypes.includes(type);
      return {
        ...prev,
        schoolTypes: exists
          ? prev.schoolTypes.filter((t) => t !== type)
          : [...prev.schoolTypes, type],
      };
    });
  };

  const handleClassToggle = (cls: number) => {
    setFormData((prev) => {
      const exists = prev.managedClasses.includes(cls);
      return {
        ...prev,
        managedClasses: exists
          ? prev.managedClasses.filter((c) => c !== cls)
          : [...prev.managedClasses, cls].sort((a, b) => a - b),
      };
    });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.adminMobile.length !== 10) {
      alert("Please enter a valid 10-digit admin mobile number starting with 6, 7, 8, or 9.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("IQ Coordinator Account Successfully Created!");
    console.log("Final Registration Data:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      
      {/* HEADER BAR */}
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
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

        {/* Center Title */}
        <div className="text-center sm:text-right">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            IQ Coordinator Account
          </h2>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Manage Olympiad registrations and empower students.
          </p>
        </div>
      </div>

      {/* STEPPER PROGRESS BAR */}
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="relative flex items-start justify-between max-w-xl mx-auto px-6">
          {/* Connector Line positioned precisely at the center of 40px circles */}
          <div className="absolute top-[20px] left-12 right-12 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />
          <div
            className="absolute top-[20px] left-12 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{
              width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "calc(100% - 6rem)",
            }}
          />

          {/* Step 1 Node */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div
              className={`size-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                currentStep >= 1
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-4 ring-white"
                  : "bg-slate-200 text-slate-500 ring-4 ring-white"
              }`}
            >
              1
            </div>
            <span className={`text-xs font-black ${currentStep === 1 ? "text-violet-700" : "text-slate-500"}`}>
              Admin Details
            </span>
          </button>

          {/* Step 2 Node */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div
              className={`size-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                currentStep >= 2
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-4 ring-white"
                  : "bg-slate-200 text-slate-500 ring-4 ring-white"
              }`}
            >
              2
            </div>
            <span className={`text-xs font-black ${currentStep === 2 ? "text-violet-700" : "text-slate-500"}`}>
              School Profile
            </span>
          </button>

          {/* Step 3 Node */}
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div
              className={`size-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                currentStep >= 3
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-4 ring-white"
                  : "bg-slate-200 text-slate-500 ring-4 ring-white"
              }`}
            >
              3
            </div>
            <span className={`text-xs font-black ${currentStep === 3 ? "text-violet-700" : "text-slate-500"}`}>
              Verify & Activate
            </span>
          </button>
        </div>
      </div>

      {/* SEQUENTIAL STEP CONTENT CONTAINER */}
      <div className="w-full max-w-3xl mb-8">
        
        {/* STEP 1 SCREEN: School Admin Details */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-violet-500 ring-2 ring-violet-500/20 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black tracking-widest text-violet-700 bg-violet-50 border border-violet-100 px-3.5 py-1 rounded-full uppercase">
                STEP 1 OF 3
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">
              School Admin Details
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-8">
              Enter administrator information to get started.
            </p>

            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Admin Name <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    placeholder="Enter admin name"
                    required
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                  <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official Email ID <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="officialEmail"
                    value={formData.officialEmail}
                    onChange={handleChange}
                    placeholder="Enter official email id"
                    required
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                  <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Admin Mobile Number <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3.5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700">
                    <span>🇮🇳</span>
                    <span>+91</span>
                    <svg className="w-3.5 h-3.5 fill-slate-400" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="adminMobile"
                    value={formData.adminMobile}
                    onChange={handleChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                </div>
              </div>

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
                      placeholder="Create password"
                      required
                      className="w-full px-4 py-3.5 pl-11 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                    />
                    <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
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
                      placeholder="Confirm password"
                      required
                      className="w-full px-4 py-3.5 pl-11 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                    />
                    <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
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

              {/* Info Banner */}
              <div className="p-4 bg-violet-50 border border-violet-100 rounded-2xl flex items-start gap-3 text-xs font-semibold text-violet-800">
                <svg className="w-5 h-5 fill-current text-violet-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span>Every student will get a unique ID linked to your school branch.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer mt-6"
              >
                Continue to Next Step ➔
              </button>
            </form>
          </div>
        )}

        {/* STEP 2 SCREEN: School Profile */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-violet-500 ring-2 ring-violet-500/20 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black tracking-widest text-violet-700 bg-violet-50 border border-violet-100 px-3.5 py-1 rounded-full uppercase">
                STEP 2 OF 3
              </span>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-violet-600 cursor-pointer"
              >
                ← Back to Step 1
              </button>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-1">
              School Profile
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-8">
              Tell us more about your school details and managed classes.
            </p>

            <form onSubmit={handleStep2Submit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  School Name <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter school name"
                    required
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                  <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.17L4.42 12.1 12 7.92l7.58 4.18L12 16.17z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  City <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                  <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  School Branch <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="schoolBranch"
                    value={formData.schoolBranch}
                    onChange={handleChange}
                    placeholder="Enter branch name (e.g. Main Branch, North Campus)"
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition"
                  />
                  <svg className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  </svg>
                </div>
              </div>

              {/* School Type Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  School Type <span className="text-slate-400 font-normal">(Select all that apply)</span>
                </label>
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {[
                    "Primary (Classes 1 to 5)",
                    "Middle (Classes 6 to 8)",
                    "Secondary (Classes 9 to 10)",
                    "Senior Secondary (Classes 11 to 12)",
                  ].map((type) => (
                    <label key={type} className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.schoolTypes.includes(type)}
                        onChange={() => handleSchoolTypeToggle(type)}
                        className="size-4.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Classes Managed Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Classes You Manage <span className="text-slate-400 font-normal">(Select classes 7 to 12)</span>
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[7, 8, 9, 10, 11, 12].map((cls) => {
                    const isSelected = formData.managedClasses.includes(cls);
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => handleClassToggle(cls)}
                        className={`py-3 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center justify-center gap-1 ${
                          isSelected
                            ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                        {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-4 px-4 rounded-2xl border border-slate-300 text-slate-700 font-extrabold text-sm hover:bg-slate-100 transition cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                >
                  Continue to Next Step ➔
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3 SCREEN: Verify & Activate */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-violet-500 ring-2 ring-violet-500/20 shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black tracking-widest text-violet-700 bg-violet-50 border border-violet-100 px-3.5 py-1 rounded-full uppercase">
                STEP 3 OF 3
              </span>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
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

            {/* Verification Method Toggle */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setVerificationMethod("email")}
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
                onClick={() => setVerificationMethod("mobile")}
                className={`py-3 rounded-xl text-xs font-black transition cursor-pointer ${
                  verificationMethod === "mobile"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Mobile Verification
              </button>
            </div>

            {/* Verification Details */}
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
                  Please check your inbox and click on the link to verify your account.
                </p>

                <button
                  type="button"
                  onClick={() => setIsVerificationSent(true)}
                  className="w-full py-3.5 px-4 rounded-xl border border-violet-200 bg-white text-violet-700 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-violet-50 transition cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  {isVerificationSent ? "Link Sent! Resend Link" : "Send Verification Link"}
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
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.adminMobile}
                    onChange={(e) => setFormData((prev) => ({ ...prev, adminMobile: formatMobileNumber(e.target.value) }))}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 outline-none w-56"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsVerificationSent(true)}
                  className="w-full py-3.5 px-4 rounded-xl border border-violet-200 bg-white text-violet-700 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-violet-50 transition cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  {isVerificationSent ? "OTP Sent! Resend OTP" : "Send OTP"}
                </button>
              </div>
            )}

            {/* STEP 3 FINAL SUBMIT BUTTON */}
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 py-4 px-4 rounded-2xl border border-slate-300 text-slate-700 font-extrabold text-sm hover:bg-slate-100 transition cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  Create IQ Coordinator Account
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* FOOTER LINKS BAR */}
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <p>
            Already have an account?{" "}
            <Link href="/login?role=school" className="text-violet-600 hover:underline font-extrabold">
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
  );
}
