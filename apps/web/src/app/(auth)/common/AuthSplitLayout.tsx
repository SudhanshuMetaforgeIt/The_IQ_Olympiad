import type { ReactNode } from "react";

type AuthSplitLayoutProps = {
  children: ReactNode;
  sidePanel: ReactNode;
  maxWidthClass?: string;
};

export default function AuthSplitLayout({
  children,
  sidePanel,
  maxWidthClass = "max-w-5xl",
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className={`w-full ${maxWidthClass} bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12`}
      >
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          {children}
        </div>
        {sidePanel}
      </div>
    </div>
  );
}
