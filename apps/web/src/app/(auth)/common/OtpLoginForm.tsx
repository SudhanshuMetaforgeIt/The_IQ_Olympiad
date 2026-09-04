"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ApiError, loginStudent, sendOtp, verifyOtp } from "@/lib/api";
import { setAccessToken } from "@/lib/auth/token-storage";
import AuthBrandHeader from "./AuthBrandHeader";
import AuthRoleSwitcher from "./AuthRoleSwitcher";
import AuthSubmitButton, { ArrowIcon } from "./AuthSubmitButton";
import AuthFieldLabel from "./AuthFieldLabel";
import PhoneInput from "./PhoneInput";
import PasswordInput from "./PasswordInput";
import LoginMarketingLayout from "./LoginMarketingLayout";
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
  requirePassword?: boolean;
  heroImage?: string;
  heroAlt?: string;
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
  requirePassword = false,
  heroImage,
  heroAlt,
}: OtpLoginFormProps) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.",
      );
      return;
    }

    if (requirePassword && password.length < 8) {
      alert("Please enter your password (at least 8 characters).");
      return;
    }

    setIsSendingOtp(true);
    setError(null);

    try {
      const result = requirePassword
        ? await loginStudent({ phone, password })
        : await sendOtp({ phone });
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

    if (requirePassword && password.length < 8) {
      alert("Please enter your password (at least 8 characters).");
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
        if (typeof window !== "undefined") {
          localStorage.setItem("student_sidebar_open", "true");
          const credentialName = result.user?.name;
          if (credentialName && credentialName !== "Harshith Bantu") {
            localStorage.setItem("student_custom_name", credentialName);
          } else {
            localStorage.setItem("student_custom_name", "Haripriya varma");
          }
        }
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

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      await handleSendOtp();
      return;
    }
    await handleSubmit(e);
  };

  const continueLabel = otpSent
    ? isSubmitting
      ? "Verifying..."
      : "Verify OTP"
    : isSendingOtp
      ? "Sending..."
      : submitLabel;

  return (
    <LoginMarketingLayout heroImage={heroImage} heroAlt={heroAlt}>
      <div>
        <AuthBrandHeader icon="trophy" compactTitle className="mb-6" />

        <div className="mb-5">
          <span className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.18em] text-violet-600">
            WELCOME BACK
          </span>
          <h2 className="text-[1.7rem] font-black tracking-tight text-slate-900 sm:text-3xl">
            Log in to your account
          </h2>
          <p className="mt-1.5 text-sm font-medium text-slate-500">{subtitle}</p>
        </div>

        <AuthRoleSwitcher
          activeRole={role}
          onChange={onRoleChange}
          pill
          className="mb-3"
        />

        <div className="mb-6">
          <span className="inline-block rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-700">
            {pillText}
          </span>
        </div>

        <form onSubmit={(e) => void handleContinue(e)} className="space-y-5">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={otpSent ? 1 : -1}>
              {!otpSent ? (
                <motion.div
                  key="credentials"
                  custom={otpSent ? 1 : -1}
                  variants={stepVariants(hasMounted && prefersReducedMotion === true)}
                  initial={hasMounted ? "enter" : false}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <AuthFieldLabel>Mobile Number</AuthFieldLabel>
                    <PhoneInput
                      showFlag={false}
                      size="lg"
                      value={phone}
                      onChange={(e) => setPhone(formatMobileNumber(e.target.value))}
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  {requirePassword ? (
                    <div>
                      <AuthFieldLabel>Password</AuthFieldLabel>
                      <PasswordInput
                        size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            alert(
                              "Please contact Help & Support to reset your password.",
                            )
                          }
                          className="text-xs font-extrabold text-violet-600 transition hover:text-violet-800 cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  custom={otpSent ? 1 : -1}
                  variants={stepVariants(hasMounted && prefersReducedMotion === true)}
                  initial={hasMounted ? "enter" : false}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AuthFieldLabel>Enter OTP</AuthFieldLabel>
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(formatOtp(e.target.value))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className={`${authInputClassLg} py-3 pr-11`}
                    />
                    <div className="absolute right-3.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Sent to +91 {phone}.{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                        setTimer(30);
                        setCanResend(false);
                      }}
                      className="font-bold text-violet-600 hover:underline cursor-pointer"
                    >
                      Change number
                    </button>
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error ? (
            <p
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <AuthSubmitButton
            icon={<ArrowIcon />}
            disabled={isSubmitting || isSendingOtp}
          >
            {continueLabel}
          </AuthSubmitButton>
        </form>

        <p className="mt-6 text-center text-sm font-medium text-slate-500">
          {footerPrompt}{" "}
          <Link
            href={footerHref}
            className="font-extrabold text-violet-600 hover:underline"
          >
            {footerLinkLabel}
          </Link>
        </p>

        <button
          type="button"
          className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-violet-600 cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current text-violet-600" viewBox="0 0 24 24">
            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
          </svg>
          Help & Support
        </button>
      </div>
    </LoginMarketingLayout>
  );
}

function stepVariants(reduced: boolean) {
  if (reduced) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }

  return {
    enter: (direction: number) => ({ opacity: 0, x: direction * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction * -28 }),
  };
}
