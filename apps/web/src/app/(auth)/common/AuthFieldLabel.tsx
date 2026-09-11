import type { ReactNode } from "react";

type AuthFieldLabelProps = {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
  hint?: string;
};

export default function AuthFieldLabel({
  children,
  required = false,
  htmlFor,
  hint,
}: AuthFieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-bold text-slate-800 mb-1.5"
    >
      {children}{" "}
      {required && <span className="text-red-500 font-bold">*</span>}
      {hint && (
        <span className="text-slate-400 font-normal">{hint}</span>
      )}
    </label>
  );
}
