"use client";

import { OtpLoginForm, type AuthRole } from "../../common";

type SchoolAdminLoginFormProps = {
  onRoleChange: (role: AuthRole) => void;
};

export default function SchoolAdminLoginForm({
  onRoleChange,
}: SchoolAdminLoginFormProps) {
  return (
    <OtpLoginForm
      role="school"
      onRoleChange={onRoleChange}
      subtitle="Log in as School Admin."
      pillText="For IQ Coordinators"
      submitLabel="Log in as School Admin"
      footerPrompt="New School Admin?"
      footerHref="/signup?role=school"
      footerLinkLabel="Sign up"
      successMessage="School Admin Login Successful!"
    />
  );
}
