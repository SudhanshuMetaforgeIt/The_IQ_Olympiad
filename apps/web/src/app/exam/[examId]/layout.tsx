import type { ReactNode } from "react";

export default function ExamLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}