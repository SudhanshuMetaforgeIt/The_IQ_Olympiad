import Link from "next/link";

type AuthFooterLinksProps = {
  prompt: string;
  linkHref: string;
  linkLabel: string;
  helpLabel?: string;
  bordered?: boolean;
  className?: string;
};

export default function AuthFooterLinks({
  prompt,
  linkHref,
  linkLabel,
  helpLabel = "Help and Support",
  bordered = true,
  className = "",
}: AuthFooterLinksProps) {
  return (
    <div
      className={`${
        bordered ? "mt-8 pt-6 border-t border-slate-100" : ""
      } flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold ${className}`}
    >
      <p className="text-slate-500">
        {prompt}{" "}
        <Link
          href={linkHref}
          className="text-violet-600 hover:underline font-extrabold"
        >
          {linkLabel}
        </Link>
      </p>

      <button
        type="button"
        className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition cursor-pointer"
      >
        <svg
          className="w-4 h-4 fill-current text-violet-600"
          viewBox="0 0 24 24"
        >
          <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
        </svg>
        {helpLabel}
      </button>
    </div>
  );
}
