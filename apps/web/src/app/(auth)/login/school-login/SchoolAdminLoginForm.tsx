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
      subtitle="Continue your Olympiad journey and unlock your potential."
      pillText="For IQ Coordinators"
      submitLabel="Continue"
      footerPrompt="New to The IQ Olympiad?"
      footerHref="/signup?role=school"
      footerLinkLabel="Sign up"
      successMessage="School Admin Login Successful!"
      heroImage="/admin_login_img.png"
      heroAlt="School administrator managing The IQ Olympiad"
    />
  );
}
