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
  return (
    <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
      <div className="relative flex items-start justify-between max-w-xl mx-auto px-6">
        <div className="absolute top-[20px] left-12 right-12 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />
        <div
          className="absolute top-[20px] left-12 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{
            width:
              currentStep === 1
                ? "0%"
                : currentStep === 2
                  ? "50%"
                  : "calc(100% - 6rem)",
          }}
        />

        {STEPS.map(({ step, label }) => (
          <button
            key={step}
            type="button"
            onClick={() => onStepChange(step)}
            className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div
              className={`size-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                currentStep >= step
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 ring-4 ring-white"
                  : "bg-slate-200 text-slate-500 ring-4 ring-white"
              }`}
            >
              {step}
            </div>
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
