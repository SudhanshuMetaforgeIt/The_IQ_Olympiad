"use client";

import { OtpLoginForm, type AuthRole } from "../../common";

type StudentLoginFormProps = {
  onRoleChange: (role: AuthRole) => void;
};

export default function StudentLoginForm({ onRoleChange }: StudentLoginFormProps) {
  return (
    <OtpLoginForm
      role="student"
      onRoleChange={onRoleChange}
      subtitle="Continue your Olympiad journey and unlock your potential."
      pillText="For students in Classes 7 to 12"
      submitLabel="Continue"
      footerPrompt="New to The IQ Olympiad?"
      footerHref="/signup?role=student"
      footerLinkLabel="Sign up"
      requirePassword
      successMessage="Login Successful!"
      heroImage="/student_login.png"
      heroAlt="Student preparing for The IQ Olympiad"
    />
  );
}
