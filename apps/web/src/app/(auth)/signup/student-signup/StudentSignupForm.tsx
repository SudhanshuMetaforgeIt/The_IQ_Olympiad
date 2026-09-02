"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  AuthBackLink,
  AuthBrandHeader,
  AuthFooterLinks,
  AuthRoleSwitcher,
  AuthSidePanel,
  AuthSplitLayout,
  AuthSubmitButton,
  BookIcon,
  formatMobileNumber,
  type AuthRole,
} from "../../common";
import { StudentSignupFields } from "./StudentSignupFields";

type StudentSignupFormProps = {
  onRoleChange: (role: AuthRole) => void;
};

export default function StudentSignupForm({
  onRoleChange,
}: StudentSignupFormProps) {
  const router = useRouter();
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
      alert("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    router.push("/dashboard/student");
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
          <StudentSignupFields
            formData={formData}
            onChange={handleChange}
            agreedToTerms={agreedToTerms}
            onAgreedChange={setAgreedToTerms}
          />

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
