"use client";

import type { ChangeEvent, FormEvent } from "react";
import {
  AuthFieldLabel,
  AuthSubmitButton,
  PasswordInput,
  PhoneInput,
  authInputClassLg,
} from "../../common";
import type { SchoolSignupFormData } from "./types";

type StepAdminDetailsProps = {
  formData: SchoolSignupFormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent) => void;
};

export default function StepAdminDetails({
  formData,
  onChange,
  onSubmit,
}: StepAdminDetailsProps) {
  return (
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

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <AuthFieldLabel required>Admin Name</AuthFieldLabel>
          <div className="relative">
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={onChange}
              placeholder="Enter admin name"
              required
              className={`${authInputClassLg} pl-11`}
            />
            <svg
              className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <div>
          <AuthFieldLabel required>Official Email ID</AuthFieldLabel>
          <div className="relative">
            <input
              type="email"
              name="officialEmail"
              value={formData.officialEmail}
              onChange={onChange}
              placeholder="Enter official email id"
              required
              className={`${authInputClassLg} pl-11`}
            />
            <svg
              className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
        </div>

        <div>
          <AuthFieldLabel required>Admin Mobile Number</AuthFieldLabel>
          <PhoneInput
            size="lg"
            name="adminMobile"
            value={formData.adminMobile}
            onChange={onChange}
            placeholder="Enter 10-digit mobile number"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <AuthFieldLabel required>Create Password</AuthFieldLabel>
            <PasswordInput
              size="lg"
              showLockIcon
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Create password"
              required
            />
          </div>
          <div>
            <AuthFieldLabel required>Confirm Password</AuthFieldLabel>
            <PasswordInput
              size="lg"
              showLockIcon
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <div className="p-4 bg-violet-50 border border-violet-100 rounded-2xl flex items-start gap-3 text-xs font-semibold text-violet-800">
          <svg
            className="w-5 h-5 fill-current text-violet-600 flex-shrink-0 mt-0.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <span>
            Every student will get a unique ID linked to your school branch.
          </span>
        </div>

        <AuthSubmitButton className="mt-6 text-base">
          Continue to Next Step ➔
        </AuthSubmitButton>
      </form>
    </div>
  );
}
