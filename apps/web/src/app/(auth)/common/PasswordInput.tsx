"use client";

import { useState, type InputHTMLAttributes } from "react";
import { authInputClass, authInputClassLg } from "./styles";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  showLockIcon?: boolean;
  size?: "md" | "lg";
};

export default function PasswordInput({
  showLockIcon = false,
  size = "md",
  className = "",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const baseClass = size === "lg" ? authInputClassLg : authInputClass;
  const padding = [
    showLockIcon ? "pl-11" : "",
    "pr-10",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        className={`${baseClass} ${padding} ${className}`}
        {...props}
      />
      {showLockIcon && (
        <svg
          className="w-5 h-5 fill-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          viewBox="0 0 24 24"
        >
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
      )}
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      </button>
    </div>
  );
}
