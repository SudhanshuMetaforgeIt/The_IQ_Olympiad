import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function OlympiadsBreadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4"
    >
      <Link
        href="/"
        className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 transition-colors"
      >
        <Home className="size-3.5" />
        <span>Home</span>
      </Link>
      <ChevronRight className="size-3 text-slate-400" />
      <span className="text-slate-800 font-bold">Olympiads</span>
    </nav>
  );
}
