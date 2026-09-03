"use client";

import type { ChangeEvent, FormEvent } from "react";
import { AuthFieldLabel, AuthSubmitButton, authInputClassLg } from "../../common";
const SCHOOL_TYPES = [
  "Primary (Classes 1 to 5)",
  "Middle (Classes 6 to 8)",
  "Secondary (Classes 9 to 10)",
  "Senior Secondary (Classes 11 to 12)",
];

type StepSchoolProfileProps = {
  formData: SchoolSignupFormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSchoolTypeToggle: (type: string) => void;
  onClassToggle: (cls: number) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent) => void;
};

export default function StepSchoolProfile({
  formData,
  onChange,
  onSchoolTypeToggle,
  onClassToggle,
  onBack,
  onSubmit,
}: StepSchoolProfileProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-violet-500 ring-2 ring-violet-500/20 shadow-xl transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black tracking-widest text-violet-700 bg-violet-50 border border-violet-100 px-3.5 py-1 rounded-full uppercase">
          STEP 2 OF 3
        </span>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-violet-600 cursor-pointer"
        >
          ← Back to Step 1
        </button>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-1">School Profile</h3>
      <p className="text-sm font-medium text-slate-500 mb-8">
        Tell us more about your school details and managed classes.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <AuthFieldLabel required>School Name</AuthFieldLabel>
          <div className="relative">
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={onChange}
              placeholder="Enter school name"
              required
              className={`${authInputClassLg} pl-11`}
            />
            <svg
              className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.17L4.42 12.1 12 7.92l7.58 4.18L12 16.17z" />
            </svg>
          </div>
        </div>

        <div>
          <AuthFieldLabel required>City</AuthFieldLabel>
          <div className="relative">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="Enter city"
              required
              className={`${authInputClassLg} pl-11`}
            />
            <svg
              className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>

        <div>
          <AuthFieldLabel hint="(Optional)">School Branch </AuthFieldLabel>
          <div className="relative">
            <input
              type="text"
              name="schoolBranch"
              value={formData.schoolBranch}
              onChange={onChange}
              placeholder="Enter branch name (e.g. Main Branch, North Campus)"
              className={`${authInputClassLg} pl-11`}
            />
            <svg
              className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
            >
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </svg>
          </div>
        </div>

        <div>
          <AuthFieldLabel hint="(Select all that apply)">
            School Type{" "}
          </AuthFieldLabel>
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {SCHOOL_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.schoolTypes.includes(type)}
                  onChange={() => onSchoolTypeToggle(type)}
                  className="size-4.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <AuthFieldLabel hint="(Select classes 7 to 12)">
            Classes You Manage{" "}
          </AuthFieldLabel>
          <div className="grid grid-cols-6 gap-2">
            {[7, 8, 9, 10, 11, 12].map((cls) => {
              const isSelected = formData.managedClasses.includes(cls);
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => onClassToggle(cls)}
                  className={`py-3 rounded-xl text-xs font-extrabold border transition cursor-pointer flex items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-500/20"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3.5 h-3.5 fill-current text-white"
                      viewBox="0 0 24 24"
                    >
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
            onClick={onBack}
            className="w-1/3 py-4 px-4 rounded-2xl border border-slate-300 text-slate-700 font-extrabold text-sm hover:bg-slate-100 transition cursor-pointer"
          >
            ← Back
          </button>
          <AuthSubmitButton className="w-2/3 text-base">
            Continue to Next Step ➔
          </AuthSubmitButton>
        </div>
      </form>
    </div>
  );
}
