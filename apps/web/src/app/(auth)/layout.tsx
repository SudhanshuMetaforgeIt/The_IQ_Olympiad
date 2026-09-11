import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <main className="h-dvh max-h-dvh overflow-hidden">{children}</main>;
}