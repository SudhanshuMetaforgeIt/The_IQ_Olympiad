import { DetailedOlympiadInfo, DetailSubjectCategory } from "./types";
import { MORE_OLYMPIADS_DETAILS } from "./moreOlympiadsDetail";

export type { DetailedOlympiadInfo, DetailSubjectCategory };

export const BASE_OLYMPIADS_DETAILS_MAP: Record<string, DetailedOlympiadInfo> = {
  nso: {
    slug: "nso",
    name: "NSO",
    subtitle: "National Science Olympiad",
    description: "Test your knowledge of Physics, Chemistry and Biology through conceptual and application-based questions.",
    iconBgColor: "bg-[#e8fbe8] text-emerald-600",
    badgeText: "Registration Open",
    examDate: "Dec 07, 2025",
    duration: "50 Mins",
    classes: "7 - 12",
    participants: "8,400",
    difficulty: "Moderate",
    aboutText: "The National Science Olympiad (NSO) is designed to spark curiosity and build a strong foundation in core scientific concepts. The exam focuses on Physics, Chemistry and Biology, testing your understanding through conceptual and application-based questions.",
    whyParticipate: [
      "National level recognition",
      "Performance certificates",
      "Scholarships & prizes",
      "Builds analytical and problem-solving skills",
    ],
    eligibility: [
      "Students studying in Classes 7 – 12",
      "Open to eligible students across India",
    ],
    examPattern: {
      questions: 50,
      duration: "50 Minutes",
      questionType: "MCQ",
      negativeMarking: "No",
    },
    syllabus: [
      {
        title: "Physics",
        color: "blue",
        iconType: "atom",
        topics: ["Motion", "Force & Energy", "Electricity"],
      },
      {
        title: "Chemistry",
        color: "purple",
        iconType: "flask",
        topics: ["Matter", "Chemical Reactions", "Elements"],
      },
      {
        title: "Biology",
        color: "green",
        iconType: "leaf",
        topics: ["Cell Biology", "Human Body", "Life Processes"],
      },
    ],
    importantDates: [
      { label: "Registration Opens", date: "Oct 01, 2025", dotColor: "green" },
      { label: "Registration Closes", date: "Nov 08, 2025", dotColor: "amber" },
      { label: "Exam Date", date: "Dec 07, 2025", dotColor: "purple" },
    ],
  },
  imo: {
    slug: "imo",
    name: "IMO",
    subtitle: "International Mathematics Olympiad",
    description: "Test your problem-solving skills and mathematical reasoning in this globally recognized olympiad.",
    iconBgColor: "bg-[#f3e8ff] text-purple-700",
    badgeText: "Registration Open",
    examDate: "Nov 16, 2025",
    duration: "2 Hours",
    classes: "7 - 12",
    participants: "12,200",
    difficulty: "Challenging",
    aboutText: "The International Mathematics Olympiad (IMO) challenges students to discover the beauty of mathematics, logical deduction, and spatial pattern mastery through world-standard competitive questions.",
    whyParticipate: ["International benchmark ranking", "Prestigious merit medals & certificates", "Top percentile scholarships & cash awards", "Advanced logical & quantitative training"],
    eligibility: ["Students studying in Classes 7 – 12", "Open to all schools and independent applicants"],
    examPattern: { questions: 50, duration: "120 Minutes", questionType: "MCQ", negativeMarking: "No" },
    syllabus: [
      { title: "Algebra", color: "blue", iconType: "math", topics: ["Polynomials", "Linear Equations", "Quadratic Form"] },
      { title: "Geometry", color: "purple", iconType: "math", topics: ["Triangles & Congruence", "Circles", "Coordinate Systems"] },
      { title: "Applied Math", color: "green", iconType: "math", topics: ["Commercial Arithmetic", "Mensuration", "Probability & Stats"] },
    ],
    importantDates: [
      { label: "Registration Opens", date: "Sep 15, 2025", dotColor: "green" },
      { label: "Registration Closes", date: "Oct 25, 2025", dotColor: "amber" },
      { label: "Exam Date", date: "Nov 16, 2025", dotColor: "purple" },
    ],
  },
  "intelliquest-2026": {
    slug: "intelliquest-2026",
    name: "IntelliQuest 2025",
    subtitle: "The Grand Intellectual Championship",
    description: "India's most prestigious inter-school championship evaluating critical thinking, quantitative acumen and leadership.",
    iconBgColor: "bg-[#eef2ff] text-indigo-700",
    badgeText: "Registration Open",
    examDate: "Mar 15, 2026",
    duration: "2 Hours",
    classes: "7 - 12",
    participants: "24,500",
    difficulty: "Moderate to High",
    aboutText: "IntelliQuest brings together the brightest minds nationwide to solve multifaceted problems integrating mathematics, natural sciences, logical deduction, and future technology.",
    whyParticipate: ["National championship trophy & certificates", "₹10,00,000 scholarship prize pool", "Direct entry to Young Innovators Accelerator", "Holistic cognitive assessment scorecard"],
    eligibility: ["Students studying in Classes 7 – 12", "Individual and school-sponsored entries welcome"],
    examPattern: { questions: 75, duration: "120 Minutes", questionType: "MCQ", negativeMarking: "No" },
    syllabus: [
      { title: "Quantitative Acumen", color: "blue", iconType: "math", topics: ["Numerical Reasoning", "Applied Algebra", "Data Insights"] },
      { title: "Scientific Thinking", color: "purple", iconType: "atom", topics: ["Physics Applications", "Chemical Models", "Ecology"] },
      { title: "Emerging Tech", color: "green", iconType: "ai", topics: ["Algorithm Basics", "Cyber Principles", "Logic Systems"] },
    ],
    importantDates: [
      { label: "Registration Opens", date: "Nov 01, 2025", dotColor: "green" },
      { label: "Registration Closes", date: "Feb 10, 2026", dotColor: "amber" },
      { label: "Exam Date", date: "Mar 15, 2026", dotColor: "purple" },
    ],
  },
};

export const OLYMPIADS_DETAILS_MAP: Record<string, DetailedOlympiadInfo> = {
  ...BASE_OLYMPIADS_DETAILS_MAP,
  ...MORE_OLYMPIADS_DETAILS,
  "intelliquest-2025": BASE_OLYMPIADS_DETAILS_MAP["intelliquest-2026"],
};

export function getOlympiadDetailInfo(slug: string): DetailedOlympiadInfo {
  const normalized = slug?.toLowerCase();
  if (OLYMPIADS_DETAILS_MAP[normalized]) {
    return OLYMPIADS_DETAILS_MAP[normalized];
  }
  return OLYMPIADS_DETAILS_MAP.nso;
}
