"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AuthRole } from "../common";
import StudentSignupForm from "./student-signup/StudentSignupForm";
import SchoolAdminSignup from "./school-signup/SchoolAdminSignup";

function SignupPageContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const [activeRole, setActiveRole] = useState<AuthRole>(
    roleParam === "school" ? "school" : "student"
  );

  useEffect(() => {
    if (roleParam === "school") {
      setActiveRole("school");
    } else if (roleParam === "student") {
      setActiveRole("student");
    }
  }, [roleParam]);

  if (activeRole === "school") {
    return <SchoolAdminSignup />;
  }

  return <StudentSignupForm onRoleChange={setActiveRole} />;
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">
          Loading signup...
        </div>
      }
    >
      <SignupPageContent />
    </Suspense>
  );
}
