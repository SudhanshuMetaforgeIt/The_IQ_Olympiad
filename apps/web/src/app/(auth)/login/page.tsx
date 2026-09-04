"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AuthRole } from "../common";
import StudentLoginForm from "./student-login/StudentLoginForm";
import SchoolAdminLoginForm from "./school-login/SchoolAdminLoginForm";

function LoginPageContent() {
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
    return <SchoolAdminLoginForm onRoleChange={setActiveRole} />;
  }

  return <StudentLoginForm onRoleChange={setActiveRole} />;
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f6f3ff] font-bold text-slate-500">
          Loading login...
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
