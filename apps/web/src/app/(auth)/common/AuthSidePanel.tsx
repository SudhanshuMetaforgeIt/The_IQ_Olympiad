import Image from "next/image";

const FEATURES = [
  {
    label: "AI-guided practice",
    color: "bg-violet-100 text-violet-700",
    path: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
  },
  {
    label: "Real Olympiad experience",
    color: "bg-purple-100 text-purple-700",
    path: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c2.22-.48 3.88-2.3 4.39-4.54C19.08 11.05 21 8.97 21 6.4V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
  },
  {
    label: "Instant, useful feedback",
    color: "bg-indigo-100 text-indigo-700",
    path: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  },
] as const;

type AuthSidePanelProps = {
  imageHeightClass?: string;
  badgeIcon?: "star" | "sparkle";
};

export default function AuthSidePanel({
  imageHeightClass = "h-[240px] sm:h-[280px]",
  badgeIcon = "sparkle",
}: AuthSidePanelProps) {
  return (
    <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 via-purple-50/50 to-indigo-50/40 p-6 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
      <div>
        <div className="size-12 rounded-2xl bg-violet-100 border border-violet-200/60 flex items-center justify-center text-violet-600 mb-6 shadow-sm">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            {badgeIcon === "star" ? (
              <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
            ) : (
              <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            )}
          </svg>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Practice smarter.
          <br />
          <span className="text-slate-900">Compete confidently.</span>
        </h3>

        <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
          A complete Olympiad workspace for personalised learning, real exam
          practice and meaningful progress.
        </p>

        <div
          className={`relative w-full ${imageHeightClass} rounded-3xl bg-gradient-to-br from-violet-100/70 via-purple-100/40 to-indigo-100/60 border border-purple-200/50 flex items-center justify-center overflow-hidden mb-8 shadow-inner`}
        >
          <Image
            src="/ai-teacher-3d-transparent.png"
            alt="IQ Olympiad AI Mascot"
            fill
            className="object-contain object-bottom p-4"
            priority
          />
        </div>

        <div className="space-y-3.5">
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/90 border border-purple-100/80 shadow-sm backdrop-blur-sm"
            >
              <div
                className={`size-10 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={feature.path} />
                </svg>
              </div>
              <span className="text-sm font-black text-slate-800">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
