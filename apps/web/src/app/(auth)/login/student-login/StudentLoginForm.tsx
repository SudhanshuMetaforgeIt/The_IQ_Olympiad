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
      subtitle="Log in as a Student or School Admin."
      pillText="For students in Classes 7 to 12"
      submitLabel="Log in as Student"
      footerPrompt="New student?"
      footerHref="/signup?role=student"
      footerLinkLabel="Sign up"
      successMessage="Login Successful!"
    />
  );
}
