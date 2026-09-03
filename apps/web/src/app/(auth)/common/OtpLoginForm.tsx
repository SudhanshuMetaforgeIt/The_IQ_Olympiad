"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError, sendOtp, verifyOtp } from "@/lib/api";
import { setAccessToken } from "@/lib/auth/token-storage";
import AuthBrandHeader from "./AuthBrandHeader";
import AuthFooterLinks from "./AuthFooterLinks";
import AuthRoleSwitcher from "./AuthRoleSwitcher";
import AuthSidePanel from "./AuthSidePanel";
import AuthSplitLayout from "./AuthSplitLayout";
import AuthSubmitButton, { BookIcon } from "./AuthSubmitButton";
import AuthFieldLabel from "./AuthFieldLabel";
import PhoneInput from "./PhoneInput";
import { formatMobileNumber, formatOtp, type AuthRole } from "./utils";
import { authInputClassLg } from "./styles";

type OtpLoginFormProps = {
  role: AuthRole;
  onRoleChange: (role: AuthRole) => void;
  subtitle: string;
  pillText: string;
  submitLabel: string;
  footerPrompt: string;
  footerHref: string;
  footerLinkLabel: string;
  successMessage: string;
};

export default function OtpLoginForm({
  role,
  onRoleChange,
  subtitle,
  pillText,
  submitLabel,
  footerPrompt,
  footerHref,
  footerLinkLabel,
  successMessage,
}: OtpLoginFormProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.",
      );
      return;
    }

    setIsSendingOtp(true);
    setError(null);

    try {
      const result = await sendOtp({ phone });
      setOtpSent(true);
      setTimer(30);
      setCanResend(false);

      // Temporary until SMS is integrated — OTP is returned as debugCode in non-prod.
      if (result.debugCode) {
        alert(`Your OTP is ${result.debugCode}`);
      } else {
        alert("OTP sent. Check your phone.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        alert(err.message);
        return;
      }
      if (err instanceof TypeError) {
        const message =
          "Cannot reach the API. Confirm it is running at http://localhost:4000.";
        setError(message);
        alert(message);
        return;
      }
      const message = "Unable to send OTP. Please try again.";
      setError(message);
      alert(message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, timer]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.",
      );
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await verifyOtp({ phone, otp });
      const roles = result.user.roles;

      if (role === "student" && !roles.includes("STUDENT")) {
        throw new ApiError("This phone is not registered as a student.", 403);
      }
      if (role === "school" && !roles.includes("SCHOOL_ADMIN")) {
        throw new ApiError(
          "This phone is not registered as a school admin.",
          403,
        );
      }

      setAccessToken(result.accessToken);
      alert(successMessage);

      if (role === "student") {
        router.push("/dashboard/student");
      } else {
        router.push("/dashboard/school-admin");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        alert(err.message);
        return;
      }
      if (err instanceof TypeError) {
        const message =
          "Cannot reach the API. Confirm it is running at http://localhost:4000.";
        setError(message);
        alert(message);
        return;
      }
      const message = "Unable to log in. Please try again.";
      setError(message);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout sidePanel={<AuthSidePanel />}>
      <div>
        <AuthBrandHeader icon="trophy" compactTitle />

        <div className="mb-6">
          <span className="text-xs font-black text-violet-600 uppercase tracking-widest block mb-1">
            WELCOME TO THE IQ OLYMPIAD
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">{subtitle}</p>
        </div>

        <AuthRoleSwitcher
          activeRole={role}
          onChange={onRoleChange}
          className="mb-4"
        />

        <div className="text-center mb-8">
          <span className="text-xs font-bold text-violet-700 bg-violet-50 border border-violet-100 px-4 py-1.5 rounded-full inline-block">
            {pillText}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <AuthFieldLabel>Phone Number</AuthFieldLabel>
            <PhoneInput
              showFlag={false}
              size="lg"
              value={phone}
              onChange={(e) => setPhone(formatMobileNumber(e.target.value))}
              placeholder="Enter your phone number"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => void handleSendOtp()}
                disabled={isSendingOtp}
                className="text-xs font-extrabold text-violet-600 hover:text-violet-800 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {isSendingOtp
                    ? "Sending..."
                    : otpSent
                      ? "Resend OTP"
                      : "Send OTP"}
                </span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <AuthFieldLabel>Enter OTP</AuthFieldLabel>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(formatOtp(e.target.value))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className={`${authInputClassLg} pr-11`}
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 size-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-2">
              Didn&apos;t receive OTP?{" "}
              <button
                type="button"
                onClick={
                  canResend && !isSendingOtp
                    ? () => void handleSendOtp()
                    : undefined
                }
                disabled={!canResend || isSendingOtp}
                className={`font-bold transition ${
                  canResend && !isSendingOtp
                    ? "text-violet-600 hover:underline cursor-pointer"
                    : "text-slate-400 cursor-not-allowed"
                }`}
              >
                Resend OTP{" "}
                {otpSent &&
                  !canResend &&
                  `(00:${timer < 10 ? `0${timer}` : timer})`}
              </button>
            </p>
          </div>

          {error ? (
            <p
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <AuthSubmitButton icon={<BookIcon />} disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : submitLabel}
          </AuthSubmitButton>
        </form>

        <AuthFooterLinks
          prompt={footerPrompt}
          linkHref={footerHref}
          linkLabel={footerLinkLabel}
          helpLabel="Help & Support"
        />
      </div>
    </AuthSplitLayout>
  );
}
