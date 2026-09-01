import type { InputHTMLAttributes } from "react";
import { authInputClass, authInputClassLg } from "./styles";

type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "maxLength" | "pattern" | "size"
> & {
  showFlag?: boolean;
  size?: "md" | "lg";
};

export default function PhoneInput({
  showFlag = true,
  size = "md",
  className = "",
  ...props
}: PhoneInputProps) {
  const inputClass = size === "lg" ? authInputClassLg : authInputClass;
  const prefixPadding = size === "lg" ? "px-3.5 py-3.5" : "px-3 py-3";

  return (
    <div className="flex gap-2">
      <div
        className={`flex items-center gap-1.5 ${prefixPadding} rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700`}
      >
        {showFlag && <span>🇮🇳</span>}
        <span>+91</span>
        <svg className="w-3.5 h-3.5 fill-slate-400" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      <input
        type="tel"
        maxLength={10}
        pattern="[6-9][0-9]{9}"
        title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
        className={`${inputClass} ${className}`}
        {...props}
      />
    </div>
  );
}
