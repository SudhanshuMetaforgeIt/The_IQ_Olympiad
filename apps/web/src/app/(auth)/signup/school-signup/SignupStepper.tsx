"use client";

import { motion } from "framer-motion";

type SignupStep = 1 | 2 | 3;

type SignupStepperProps = {
  currentStep: SignupStep;
  onStepChange: (step: SignupStep) => void;
};

const STEPS: { step: SignupStep; label: string }[] = [
  { step: 1, label: "Admin Details" },
  { step: 2, label: "School Profile" },
  { step: 3, label: "Create Account" },
];

export default function SignupStepper({
  currentStep,
  onStepChange,
}: SignupStepperProps) {
  const progress =
    currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "calc(100% - 6rem)";

  return (
    <div className="mb-3 w-full shrink-0">
      <div className="relative mx-auto flex max-w-xl items-start justify-between px-6">
        <div className="absolute top-[20px] left-12 right-12 z-0 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
        <motion.div
          className="absolute top-[20px] left-12 z-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
          initial={false}
          animate={{ width: progress }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        {STEPS.map(({ step, label }) => (
          <button
            key={step}
            type="button"
            onClick={() => onStepChange(step)}
            className="group relative z-10 flex cursor-pointer flex-col items-center gap-2"
          >
            <motion.div
              initial={false}
              animate={{ scale: currentStep === step ? 1.08 : 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`flex size-10 items-center justify-center rounded-full text-sm font-black ${
                currentStep >= step
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-4 ring-white"
                  : "bg-slate-200 text-slate-500 ring-4 ring-white"
              }`}
            >
              {step}
            </motion.div>
            <span
              className={`text-xs font-black ${
                currentStep === step ? "text-violet-700" : "text-slate-500"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
