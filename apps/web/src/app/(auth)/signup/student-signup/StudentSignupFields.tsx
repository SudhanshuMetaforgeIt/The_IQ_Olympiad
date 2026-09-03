"use client";

import React, { type ChangeEvent } from "react";
import Link from "next/link";
import {
  AuthFieldLabel,
  AuthSectionDivider,
  PhoneInput,
  PasswordInput,
  authInputClass,
  authSelectClass,
} from "../../common";

interface StudentSignupFieldsProps {
  formData: any;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  agreedToTerms: boolean;
  onAgreedChange: (agreed: boolean) => void;
}

export function StudentSignupFields({
  formData,
  onChange,
  agreedToTerms,
  onAgreedChange,
}: StudentSignupFieldsProps) {
  return (
    <div className="space-y-6">
      <AuthSectionDivider label="Parent / Mentor Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <AuthFieldLabel required>Parent / Mentor Name</AuthFieldLabel>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={onChange}
            placeholder="Enter parent / mentor name"
            required
            className={authInputClass}
          />
        </div>
        <div>
          <AuthFieldLabel required>Parent / Mentor Mobile Number</AuthFieldLabel>
          <PhoneInput
            name="parentMobile"
            value={formData.parentMobile}
            onChange={onChange}
            placeholder="Enter 10-digit mobile number"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <AuthFieldLabel required>Parent / Mentor Email ID</AuthFieldLabel>
          <input
            type="email"
            name="parentEmail"
            value={formData.parentEmail}
            onChange={onChange}
            placeholder="Enter email id"
            required
            className={authInputClass}
          />
        </div>
        <div>
          <AuthFieldLabel required>Relation with Student</AuthFieldLabel>
          <select name="relation" value={formData.relation} onChange={onChange} required className={authSelectClass}>
            <option value="" disabled>Select relation</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
            <option value="mentor">Mentor</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <AuthSectionDivider label="Student Details" className="pt-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <AuthFieldLabel required>Student Name</AuthFieldLabel>
          <input type="text" name="studentName" value={formData.studentName} onChange={onChange} placeholder="Enter student name" required className={authInputClass} />
        </div>
        <div>
          <AuthFieldLabel required>Student Class / Grade</AuthFieldLabel>
          <select name="studentGrade" value={formData.studentGrade} onChange={onChange} required className={authSelectClass}>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <AuthFieldLabel required>City</AuthFieldLabel>
          <input type="text" name="city" value={formData.city} onChange={onChange} placeholder="Enter city" required className={authInputClass} />
        </div>
        <div>
          <AuthFieldLabel required>School Name</AuthFieldLabel>
          <input type="text" name="schoolName" value={formData.schoolName} onChange={onChange} placeholder="Enter school name" required className={authInputClass} />
        </div>
      </div>

      <div>
        <AuthFieldLabel required>Student Email ID</AuthFieldLabel>
        <input type="email" name="studentEmail" value={formData.studentEmail} onChange={onChange} placeholder="Enter student email id" required className={authInputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <AuthFieldLabel required>Create Password</AuthFieldLabel>
          <PasswordInput name="password" value={formData.password} onChange={onChange} placeholder="••••••••••" required />
        </div>
        <div>
          <AuthFieldLabel required>Confirm Password</AuthFieldLabel>
          <PasswordInput name="confirmPassword" value={formData.confirmPassword} onChange={onChange} placeholder="••••••••••" required />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => onAgreedChange(e.target.checked)} className="size-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" />
        <label htmlFor="terms" className="text-xs font-semibold text-slate-700 cursor-pointer">
          I agree to the <Link href="/terms-and-conditions" className="text-violet-600 font-bold hover:underline">Terms of Use</Link> and <Link href="/privacy-policy" className="text-violet-600 font-bold hover:underline">Privacy Policy</Link>
        </label>
      </div>
    </div>
  );
}
