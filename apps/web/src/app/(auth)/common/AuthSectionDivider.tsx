type AuthSectionDividerProps = {
  label: string;
  className?: string;
};

export default function AuthSectionDivider({
  label,
  className = "",
}: AuthSectionDividerProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-full border-t border-slate-200" />
      <div className="absolute bg-white px-4 flex items-center gap-2 text-xs font-bold text-violet-700">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        {label}
      </div>
    </div>
  );
}
