import type { ReactNode } from "react";
import Navbar from "./_components/common/Navbar";
import Footer from "./_components/common/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-purple-500 selection:text-white font-sans">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}