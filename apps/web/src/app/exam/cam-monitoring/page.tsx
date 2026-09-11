import Link from "next/link";
import { CameraMonitoringView } from "./CameraMonitoringView";

export const metadata = {
  title: "MediaPipe AI Camera Proctoring | The IQ Olympiad",
  description: "Real-time client-side AI camera proctoring using Google MediaPipe Face Landmarker.",
};

export default function CameraMonitoringPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-8 px-4 sm:px-6">
      {/* Top Header Navigation */}
      <div className="w-full max-w-7xl flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/student?tab=exams"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <span className="text-xs font-bold text-slate-400">Exam Proctoring Sandbox</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-400">Next.js + MediaPipe Wasm</span>
        </div>
      </div>

      {/* Main Monitoring Component */}
      <CameraMonitoringView />
    </main>
  );
}
