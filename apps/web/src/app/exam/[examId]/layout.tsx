import type { ReactNode } from "react";

export default function ExamLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="exam-protected-content h-dvh w-full max-w-full overflow-x-clip overflow-y-auto">
      {children}
    </div>
  );
}