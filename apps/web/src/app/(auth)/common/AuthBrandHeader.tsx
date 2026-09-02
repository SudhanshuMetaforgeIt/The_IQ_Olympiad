import Link from "next/link";

type AuthBrandHeaderProps = {
  icon?: "star" | "trophy";
  compactTitle?: boolean;
  className?: string;
  href?: string;
};

export default function AuthBrandHeader({
  icon = "star",
  compactTitle = false,
  className = "mb-8",
  href = "/",
}: AuthBrandHeaderProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 ${className} group cursor-pointer`}
      aria-label="Go to home page"
    >
      <div className="size-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          {icon === "trophy" ? (
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c2.22-.48 3.88-2.3 4.39-4.54C19.08 11.05 21 8.97 21 6.4V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
          ) : (
            <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
          )}
        </svg>
      </div>
      <div>
        <h1
          className={`text-xl font-black text-indigo-950 tracking-tight leading-none group-hover:text-violet-800 transition-colors ${
            compactTitle ? "uppercase" : ""
          }`}
        >
          THE IQ <span className="text-violet-600">OLYMPIAD</span>
        </h1>
        <p className="text-xs font-semibold text-slate-500 tracking-wide mt-0.5 group-hover:text-slate-700 transition-colors">
          Excel. Compete. Achieve.
        </p>
      </div>
    </Link>
  );
}
