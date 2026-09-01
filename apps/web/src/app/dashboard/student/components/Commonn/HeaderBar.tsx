import Image from "next/image";
import type { StudentProfile } from "../../types";
import { BellIcon } from "./icons";

interface HeaderBarProps {
  student: StudentProfile;
}

export function HeaderBar({ student }: HeaderBarProps) {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-transparent">
      {/* Welcome Title */}
      <div>
        <span className="text-xs font-medium text-slate-500">Welcome back,</span>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          {student.name} <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-0.5">
          {student.grade} • {student.school}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
        >
          <BellIcon className="w-5 h-5" />
          {student.unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white">
              {student.unreadNotifications}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Image
            src={student.avatarUrl}
            alt={student.name}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-violet-500/20"
            unoptimized
          />
          <div className="hidden sm:block text-left">
            <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
              <span>{student.name}</span>
              <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-500">{student.grade}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
