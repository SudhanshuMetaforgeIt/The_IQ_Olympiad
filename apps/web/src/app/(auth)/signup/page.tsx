"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import StudentSignupPage from "./student_signup";
import SchoolAdminSignupPage from "./schooladmin_signup";

function SignupContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams?.get("role") === "school" ? "school" : "student";
  const [role, setRole] = useState<"student" | "school">(initialRole);

  if (role === "school") {
    return <SchoolAdminSignupPage onSwitchRole={(r: "student" | "school") => setRole(r)} />;
  }

  return <StudentSignupPage />;
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
