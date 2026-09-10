import type { ReactNode } from "react";
import { StudentMeProvider } from "./StudentMeProvider";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StudentMeProvider>
      <main className="w-full max-w-[100dvw] min-w-0 overflow-x-hidden">
        {children}
      </main>
    </StudentMeProvider>
  );
}
