import type { ButtonHTMLAttributes, ReactNode } from "react";
import { authSubmitClass } from "./styles";

type AuthSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
};

export default function AuthSubmitButton({
  children,
  icon,
  className = "",
  ...props
}: AuthSubmitButtonProps) {
  return (
    <button type="submit" className={`${authSubmitClass} ${className}`} {...props}>
      {children}
      {icon}
    </button>
  );
}

export function BookIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
    </svg>
  );
}
