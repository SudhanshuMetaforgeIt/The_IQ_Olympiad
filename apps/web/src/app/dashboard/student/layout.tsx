import type { ReactNode } from "react";
import { StudentMeProvider } from "./StudentMeProvider";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StudentMeProvider>
      <main>{children}</main>
    </StudentMeProvider>
  );
}
