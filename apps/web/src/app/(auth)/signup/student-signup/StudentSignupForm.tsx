"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import {
  AuthBackLink,
  AuthBrandHeader,
  AuthFooterLinks,
  AuthRoleSwitcher,
  AuthSidePanel,
  AuthSplitLayout,
  AuthSubmitButton,
  BookIcon,
  AuthFieldLabel,
  AuthSectionDivider,
  PhoneInput,
  PasswordInput,
  formatMobileNumber,
  authInputClass,
  authSelectClass,
  type AuthRole,
} from "../../common";

type StudentSignupFormProps = {
  onRoleChange: (role: AuthRole) => void;
};

export default function StudentSignupForm({
  onRoleChange,
}: StudentSignupFormProps) {
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "parentMobile") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatMobileNumber(value),
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the Terms of Use and Privacy Policy.");
      return;
    }
    if (formData.parentMobile.length !== 10) {
      alert(
        "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Student Signup Submitted:", formData);
  };

  return (
    <AuthSplitLayout
      maxWidthClass="max-w-6xl"
      sidePanel={
        <AuthSidePanel
          badgeIcon="star"
          imageHeightClass="h-[260px] sm:h-[300px]"
        />
      }
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <AuthBrandHeader className="mb-0" />
          <AuthBackLink className="mb-0 shrink-0" />
        </div>

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

        <AuthRoleSwitcher
          activeRole="student"
          onChange={onRoleChange}
          showIcons
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthSectionDivider label="Parent / Mentor Details" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Parent / Mentor Name</AuthFieldLabel>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter parent / mentor name"
                required
                className={authInputClass}
              />
            </div>
            <div>
              <AuthFieldLabel required>
                Parent / Mentor Mobile Number
              </AuthFieldLabel>
              <PhoneInput
                name="parentMobile"
                value={formData.parentMobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>
                Parent / Mentor Email ID
              </AuthFieldLabel>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                placeholder="Enter email id"
                required
                className={authInputClass}
              />
            </div>
            <div>
              <AuthFieldLabel required>Relation with Student</AuthFieldLabel>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                required
                className={authSelectClass}
              >
                <option value="" disabled>
                  Select relation
                </option>
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
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                required
                className={authInputClass}
              />
            </div>
            <div>
              <AuthFieldLabel required>Student Class / Grade</AuthFieldLabel>
              <select
                name="studentGrade"
                value={formData.studentGrade}
                onChange={handleChange}
                required
                className={authSelectClass}
              >
                <option value="" disabled>
                  Select class / grade
                </option>
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
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                className={authInputClass}
              />
            </div>
            <div>
              <AuthFieldLabel required>School Name</AuthFieldLabel>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Enter school name"
                required
                className={authInputClass}
              />
            </div>
          </div>

          <div>
            <AuthFieldLabel required>Student Email ID</AuthFieldLabel>
            <input
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              placeholder="Enter student email id"
              required
              className={authInputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <AuthFieldLabel required>Create Password</AuthFieldLabel>
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                required
              />
            </div>
            <div>
              <AuthFieldLabel required>Confirm Password</AuthFieldLabel>
              <PasswordInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="size-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-xs font-semibold text-slate-700 cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                className="text-violet-600 font-bold hover:underline"
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-violet-600 font-bold hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <AuthSubmitButton icon={<BookIcon />}>
            Create Student Account
          </AuthSubmitButton>
        </form>

        <AuthFooterLinks
          prompt="Already have an account?"
          linkHref="/login"
          linkLabel="Log in"
        />
      </div>
    </AuthSplitLayout>
  );
}
