export type HeroSubject = "MATHEMATICS" | "SCIENCE" | "ENGLISH" | "REASONING" | "AI";

export interface HeroSubjectEntry {
  id: HeroSubject;
  label: string;
  color: string;
}

export const HERO_SUBJECTS: HeroSubjectEntry[] = [
  { id: "MATHEMATICS", label: "Mathematics", color: "#8b5cf6" },
  { id: "SCIENCE", label: "Science", color: "#16a34a" },
  { id: "ENGLISH", label: "English", color: "#ec4899" },
  { id: "REASONING", label: "Reasoning", color: "#f59e0b" },
  { id: "AI", label: "AI", color: "#10b981" },
];

export interface SubjectDetail {
  name: string;
  badge: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  themeColor: string;
  platformColor: string;
  platformInnerColor: string;
  accentColor: string;
  cta: string;
  tagPill: string;
  tagPillColor: string;
}

export const HERO_SUBJECT_DETAILS: Record<HeroSubject, SubjectDetail> = {
  MATHEMATICS: {
    name: "Mathematics",
    badge: "NUMERICAL MASTERY",
    headline: "Conquer Numbers & Geometry",
    subtext: "Master speed calculations, algebraic thinking, and Olympiad-level logic problems.",
    ctaText: "Start Learning Mathematics →",
    ctaLink: "/subjects/mathematics",
    themeColor: "#8b5cf6",
    platformColor: "#4c1d95",
    platformInnerColor: "#7e22ce",
    accentColor: "from-purple-700 to-indigo-700",
    cta: "Start Learning Mathematics",
    tagPill: "🧮 Calculate. Visualise. Solve!",
    tagPillColor: "text-purple-900",
  },
  SCIENCE: {
    name: "Science",
    badge: "PHYSICS, CHEM & BIO",
    headline: "Explore the Laws of Science",
    subtext: "Unravel natural phenomena, scientific experimentation, and analytical reasoning.",
    ctaText: "Start Learning Science →",
    ctaLink: "/subjects/science",
    themeColor: "#06b6d4",
    platformColor: "#164e63",
    platformInnerColor: "#0891b2",
    accentColor: "from-indigo-700 to-purple-700",
    cta: "Start Learning Science",
    tagPill: "🔬 Explore. Experiment. Understand!",
    tagPillColor: "text-indigo-900",
  },
  ENGLISH: {
    name: "English",
    badge: "GRAMMAR & COMPREHENSION",
    headline: "Elevate Linguistic Edge",
    subtext: "Develop vocabulary depth, reading comprehension, and grammatical accuracy.",
    ctaText: "Start Learning English →",
    ctaLink: "/subjects/english",
    themeColor: "#ec4899",
    platformColor: "#831843",
    platformInnerColor: "#db2777",
    accentColor: "from-pink-600 to-rose-600",
    cta: "Start Learning English",
    tagPill: "📝 Read. Write. Express!",
    tagPillColor: "text-pink-900",
  },
  REASONING: {
    name: "Reasoning",
    badge: "LOGICAL & ANALYTICAL",
    headline: "Sharpen Logical Thinking",
    subtext: "Solve patterns, spatial puzzles, sequences, and deductive logic challenges.",
    ctaText: "Start Learning Reasoning →",
    ctaLink: "/subjects/reasoning",
    themeColor: "#f59e0b",
    platformColor: "#78350f",
    platformInnerColor: "#d97706",
    accentColor: "from-amber-600 to-orange-600",
    cta: "Start Learning Reasoning",
    tagPill: "🧩 Think. Analyse. Deduce!",
    tagPillColor: "text-amber-900",
  },
  AI: {
    name: "AI",
    badge: "COMPUTATIONAL THINKING",
    headline: "Master Future Technologies",
    subtext: "Understand machine learning basics, algorithms, and digital problem-solving.",
    ctaText: "Start Learning AI →",
    ctaLink: "/subjects/ai",
    themeColor: "#10b981",
    platformColor: "#064e3b",
    platformInnerColor: "#059669",
    accentColor: "from-emerald-600 to-teal-600",
    cta: "Start Learning AI",
    tagPill: "🤖 Code. Learn. Innovate!",
    tagPillColor: "text-emerald-900",
  },
};

export const LABEL_POSITIONS: Record<HeroSubject, { x: number; y: number }> = {
  MATHEMATICS: { x: 12, y: 22 },
  SCIENCE: { x: 82, y: 32 },
  ENGLISH: { x: 15, y: 78 },
  REASONING: { x: 82, y: 75 },
  AI: { x: 48, y: 12 },
};
