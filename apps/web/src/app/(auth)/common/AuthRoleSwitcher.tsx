import type { AuthRole } from "./utils";

type AuthRoleSwitcherProps = {
  activeRole: AuthRole;
  onChange: (role: AuthRole) => void;
  showIcons?: boolean;
  className?: string;
  pill?: boolean;
};

export default function AuthRoleSwitcher({
  activeRole,
  onChange,
  showIcons = false,
  className = "mb-8",
  pill = false,
}: AuthRoleSwitcherProps) {
  const tabClass = (role: AuthRole) =>
    `flex items-center justify-center gap-2 text-sm font-black transition-all cursor-pointer ${
      activeRole === role
        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25"
        : "text-slate-600 hover:text-slate-900 bg-transparent"
    } ${pill ? "rounded-full py-2" : "rounded-xl py-3"}`;

  return (
    <div
      className={`grid grid-cols-2 p-1.5 ${
        pill ? "rounded-full bg-slate-100" : "rounded-2xl bg-slate-100/90"
      } ${className}`}
    >
      <button type="button" onClick={() => onChange("student")} className={tabClass("student")}>
        {showIcons && (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.17L4.42 12.1 12 7.92l7.58 4.18L12 16.17zM6 14.73v3.77l6 3.27 6-3.27v-3.77l-6 3.27-6-3.27z" />
          </svg>
        )}
        Student
      </button>
      <button type="button" onClick={() => onChange("school")} className={tabClass("school")}>
        {showIcons && (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
        )}
        School Admin
      </button>
    </div>
  );
}
