"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  AuthBackLink,
  AuthBrandHeader,
  AuthFooterLinks,
  formatMobileNumber,
} from "../../common";
import SignupStepper from "./SignupStepper";
import StepAdminDetails from "./StepAdminDetails";
import StepSchoolProfile from "./StepSchoolProfile";
import StepVerifyActivate from "./StepVerifyActivate";
import type { SchoolSignupFormData, SchoolSignupStep } from "./types";

const INITIAL_FORM: SchoolSignupFormData = {
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
};

export default function SchoolAdminSignup() {
  const [currentStep, setCurrentStep] = useState<SchoolSignupStep>(1);
  const [verificationMethod, setVerificationMethod] = useState<
    "email" | "mobile"
  >("email");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [formData, setFormData] = useState<SchoolSignupFormData>(INITIAL_FORM);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "adminMobile") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatMobileNumber(value),
      }));
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

  const handleStep1Submit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.adminMobile.length !== 10) {
      alert(
        "Please enter a valid 10-digit admin mobile number starting with 6, 7, 8, or 9."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("IQ Coordinator Account Successfully Created!");
    console.log("Final Registration Data:", formData);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center justify-between gap-4">
          <AuthBrandHeader className="mb-0" />
          <AuthBackLink href="/login?role=school" className="mb-0 shrink-0" />
        </div>
        <div className="mt-4 sm:mt-0 sm:text-right">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            IQ Coordinator Account
          </h2>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Manage Olympiad registrations and empower students.
          </p>
        </div>
      </div>

      <SignupStepper currentStep={currentStep} onStepChange={setCurrentStep} />

      <div className="w-full max-w-3xl mb-8">
        {currentStep === 1 && (
          <StepAdminDetails
            formData={formData}
            onChange={handleChange}
            onSubmit={handleStep1Submit}
          />
        )}

        {currentStep === 2 && (
          <StepSchoolProfile
            formData={formData}
            onChange={handleChange}
            onSchoolTypeToggle={handleSchoolTypeToggle}
            onClassToggle={handleClassToggle}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleStep2Submit}
          />
        )}

        {currentStep === 3 && (
          <StepVerifyActivate
            formData={formData}
            verificationMethod={verificationMethod}
            isVerificationSent={isVerificationSent}
            onVerificationMethodChange={setVerificationMethod}
            onMobileChange={(value) =>
              setFormData((prev) => ({ ...prev, adminMobile: value }))
            }
            onSendVerification={() => setIsVerificationSent(true)}
            onBack={() => setCurrentStep(2)}
            onSubmit={handleFinalSubmit}
          />
        )}
      </div>

      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
        <AuthFooterLinks
          bordered={false}
          prompt="Already have an account?"
          linkHref="/login?role=school"
          linkLabel="Log in"
          className="text-slate-500"
        />
      </div>
    </div>
  );
}
