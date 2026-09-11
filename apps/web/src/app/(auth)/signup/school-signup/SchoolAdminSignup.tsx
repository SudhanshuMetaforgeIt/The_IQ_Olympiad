"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AuthBackLink,
  AuthBrandHeader,
  AuthFooterLinks,
  AuthRoleSwitcher,
  formatMobileNumber,
  type AuthRole,
} from "../../common";
import SignupStepper from "./SignupStepper";
import StepAdminDetails from "./StepAdminDetails";
import StepSchoolProfile from "./StepSchoolProfile";
import StepVerifyActivate from "./StepVerifyActivate";
import type { SchoolSignupFormData, SchoolSignupStep } from "./types";
import { useSchoolRegistration } from "./useSchoolRegistration";

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

export default function SchoolAdminSignup({
  onRoleChange,
}: {
  onRoleChange: (role: AuthRole) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<SchoolSignupStep>(1);
  const [stepDir, setStepDir] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<SchoolSignupFormData>(INITIAL_FORM);
  const {
    isSubmitting,
    apiError,
    createdSchoolCode,
    createdSchoolName,
    submitRegistration,
  } = useSchoolRegistration();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const goToStep = (step: SchoolSignupStep) => {
    setStepDir(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
        "Please enter a valid 10-digit admin mobile number starting with 6, 7, 8, or 9.",
      );
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    goToStep(2);
  };

  const handleStep2Submit = (e: FormEvent) => {
    e.preventDefault();
    goToStep(3);
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitRegistration(formData);
  };

  return (
    <div
      ref={scrollerRef}
      className="h-dvh max-h-dvh w-full overflow-y-auto bg-[radial-gradient(circle_at_top_left,#efe7ff,transparent_42%),radial-gradient(circle_at_80%_20%,#ddd6fe,transparent_36%),linear-gradient(180deg,#f6f3ff_0%,#eee9ff_48%,#f8f6ff_100%)] px-4 py-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col pb-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <AuthBrandHeader className="mb-0" />
          <AuthBackLink href="/login?role=school" className="mb-0 shrink-0" />
        </div>
        <div className="mb-3">
          <h2 className="text-xl font-black tracking-tight text-slate-900">
            IQ Coordinator Account
          </h2>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">
            Manage Olympiad registrations and empower students.
          </p>
        </div>

        <AuthRoleSwitcher
          activeRole="school"
          onChange={onRoleChange}
          showIcons
          className="mb-3"
        />

        <SignupStepper currentStep={currentStep} onStepChange={goToStep} />

        <div className="relative mb-6 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={stepDir}>
            <motion.div
              key={currentStep}
              custom={stepDir}
              variants={signupStepVariants(hasMounted && prefersReducedMotion === true)}
              initial={hasMounted ? "enter" : false}
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentStep === 1 ? (
                <StepAdminDetails
                  formData={formData}
                  onChange={handleChange}
                  onSubmit={handleStep1Submit}
                />
              ) : null}

              {currentStep === 2 ? (
                <StepSchoolProfile
                  formData={formData}
                  onChange={handleChange}
                  onSchoolTypeToggle={handleSchoolTypeToggle}
                  onClassToggle={handleClassToggle}
                  onBack={() => goToStep(1)}
                  onSubmit={handleStep2Submit}
                />
              ) : null}

              {currentStep === 3 ? (
                <StepVerifyActivate
                  formData={formData}
                  isSubmitting={isSubmitting}
                  apiError={apiError}
                  createdSchoolCode={createdSchoolCode}
                  createdSchoolName={createdSchoolName}
                  onBack={() => goToStep(2)}
                  onSubmit={handleFinalSubmit}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center">
          <AuthFooterLinks
            bordered={false}
            prompt="Already have an account?"
            linkHref="/login?role=school"
            linkLabel="Log in"
            className="justify-center text-slate-500"
          />
        </div>
      </div>
    </div>
  );
}

function signupStepVariants(reduced: boolean) {
  if (reduced) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  return {
    enter: (direction: number) => ({ opacity: 0, x: direction * 36 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction * -36 }),
  };
}
