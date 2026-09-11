import Link from "next/link";

type AuthBackLinkProps = {
  href?: string;
  label?: string;
  className?: string;
};

export default function AuthBackLink({
  href = "/login",
  label = "Back to login",
  className = "mb-6",
}: AuthBackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-violet-700 transition cursor-pointer ${className}`}
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      {label}
    </Link>
  );
}
