"use client";

import React, { useState } from "react";

export interface ExamRegistrationData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  questions: number;
  marks?: number;
}

interface ExamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamRegistrationData | null;
  onCompleteRegistration: (examId: number) => void;
}

export function ExamRegistrationModal({
  isOpen,
  onClose,
  exam,
  onCompleteRegistration,
}: ExamRegistrationModalProps) {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !exam) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onCompleteRegistration(exam.id);
    }, 800);
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-5xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-7 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Register for <span className="text-violet-600">{exam.title}</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Fill in the details below to register for the exam.
            </p>
          </div>
          <button
            type="button"
            onClick={handleModalClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success View */
            <div className="py-8 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">
              {/* Animated Green Circle with Tick */}
              <div className="size-24 rounded-full bg-emerald-100 border-4 border-emerald-300 text-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  Registration Successful! 🎉
                </h3>
                <p className="text-base font-medium text-slate-600 leading-relaxed">
                  You have successfully registered for <span className="font-bold text-violet-600">{exam.title}</span>.
                </p>
              </div>

              {/* Registration Summary Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 max-w-md w-full text-left space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 font-semibold">Student Name</span>
                  <span className="text-slate-900 font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 font-semibold">Exam Date</span>
                  <span className="text-slate-900 font-bold">{exam.date} • {exam.time}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 font-semibold">Duration</span>
                  <span className="text-slate-900 font-bold">{exam.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Status</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Confirmed
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleModalClose}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Registration Form + Summary Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Student Details Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
                {/* Student Details Title */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-black text-slate-900">Student Details</h3>
                  <div className="flex-1 h-[1px] bg-slate-200/80 ml-2" />
                </div>

                {/* Field 1: Student ID */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Student ID <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="Enter your Student ID"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">
                    Your Student ID is provided by your school.
                  </p>
                </div>

                {/* 2-Col Grid: Full Name & Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Class <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white appearance-none cursor-pointer"
                      >
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2-Col Grid: School Name & Date of Birth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      School Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="School name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-slate-50/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="DD / MM / YYYY"
                        className="w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2-Col Grid: Email Address & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Important Note Box */}
                <div className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="size-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    i
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Important Note</h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                      Please ensure all details are correct. You will not be able to change them after registration.
                    </p>
                  </div>
                </div>

                {/* Complete Registration Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer disabled:opacity-75"
                >
                  <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{isSubmitting ? "Registering..." : "Complete Registration"}</span>
                </button>

                {/* Secure Badge */}
                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span>Your information is secure and will not be shared.</span>
                </div>
              </form>

              {/* Right Column: Exam Details & Trophy Card */}
              <div className="lg:col-span-5 bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 space-y-5">
                {/* Trophy Illustration */}
                <div className="flex flex-col items-center justify-center pt-2">
                  <div className="relative size-36 flex items-center justify-center">
                    {/* Confetti particles */}
                    <div className="absolute top-2 left-4 size-2 rounded-full bg-amber-400 animate-pulse" />
                    <div className="absolute top-4 right-6 size-2.5 rounded-sm bg-purple-500 rotate-12" />
                    <div className="absolute bottom-6 left-2 size-2 rounded-sm bg-rose-400 -rotate-12" />
                    <div className="absolute top-10 right-2 size-2 rounded-full bg-emerald-400" />
                    <div className="absolute bottom-10 right-4 size-2.5 rounded-sm bg-indigo-500 rotate-45" />

                    {/* Gold Trophy SVG */}
                    <svg className="w-28 h-28 drop-shadow-md" viewBox="0 0 100 100" fill="none">
                      {/* Base / Pedestal */}
                      <rect x="30" y="80" width="40" height="10" rx="3" fill="#7C3AED" />
                      <rect x="36" y="72" width="28" height="8" rx="2" fill="#6D28D9" />
                      <path d="M44 60h12v12H44z" fill="#F59E0B" />
                      {/* Cup Body */}
                      <path d="M25 22h50v24c0 14-11 22-25 22S25 60 25 46V22z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
                      {/* Left Handle */}
                      <path d="M25 28H15c-3 0-5 3-5 7 0 6 4 11 15 13" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                      {/* Right Handle */}
                      <path d="M75 28h10c3 0 5 3 5 7 0 6-4 11-15 13" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                      {/* Star inside trophy */}
                      <path d="M50 33l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.5-4.4 6.2-.9L50 33z" fill="#FFFBEB" />
                    </svg>
                  </div>
                </div>

                {/* Exam Title & Description */}
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {exam.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    {exam.description}
                  </p>
                </div>

                {/* Metadata List */}
                <div className="space-y-3 pt-2">
                  {/* Exam Date */}
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">Exam Date</span>
                      <span className="text-sm font-extrabold text-slate-800">{exam.date}</span>
                    </div>
                  </div>

                  {/* Exam Time */}
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">Exam Time</span>
                      <span className="text-sm font-extrabold text-slate-800">{exam.time}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">Duration</span>
                      <span className="text-sm font-extrabold text-slate-800">{exam.duration}</span>
                    </div>
                  </div>

                  {/* Total Questions */}
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                        <rect x="9" y="3" width="6" height="4" rx="1" />
                        <path d="M9 12h6M9 16h6" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">Total Questions</span>
                      <span className="text-sm font-extrabold text-slate-800">{exam.questions} Questions</span>
                    </div>
                  </div>

                  {/* Total Marks */}
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-violet-100/80 text-violet-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">Total Marks</span>
                      <span className="text-sm font-extrabold text-slate-800">{exam.marks || 100} Marks</span>
                    </div>
                  </div>
                </div>

                {/* Bottom After Registration Box */}
                <div className="bg-violet-50/80 border border-violet-100 rounded-2xl p-3.5 flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    i
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-violet-900">After Registration</h5>
                    <p className="text-[11px] font-semibold text-violet-700 mt-0.5 leading-tight">
                      Once registered, you can attempt the exam on the scheduled date and time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
