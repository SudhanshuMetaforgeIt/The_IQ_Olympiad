"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import StudentLoginPage from "./student_login";
import SchoolAdminLoginPage from "./schooladmin_login";

function LoginContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams?.get("role") === "school" ? "school" : "student";
  const [role, setRole] = useState<"student" | "school">(initialRole);

  if (role === "school") {
    return <SchoolAdminLoginPage onSwitchRole={(r: "student" | "school") => setRole(r)} />;
  }

  return <StudentLoginPage />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}