import type {
  OlympiadResultRecord,
  PracticeResultRecord,
  SubjectAverageRecord,
  CouponCodeRecord,
  PerformanceTimePoint,
} from "./types";

export const RESULTS_TOP_METRICS = {
  nationalRank: 1248,
  totalStudents: 12586,
  topPercentage: 9.9,
  percentage: 87.65,
  improvementPercentage: 12.45,
  totalMedals: 5,
  goldMedals: 2,
  silverMedals: 2,
  bronzeMedals: 1,
};

export const OLYMPIAD_RESULTS_DATA: OlympiadResultRecord[] = [
  {
    id: "sci-2026",
    name: "Science Olympiad 2026",
    subjectSlug: "science",
    date: "25 Aug 2026",
    score: 84,
    totalScore: 100,
    percentage: 84.0,
    nationalRank: 1325,
    medal: "gold",
    resultStatus: "Qualified",
    iconType: "science",
  },
  {
    id: "math-2026",
    name: "Mathematics Olympiad 2026",
    subjectSlug: "mathematics",
    date: "9 Sep 2026",
    score: 90,
    totalScore: 100,
    percentage: 90.0,
    nationalRank: 982,
    medal: "gold",
    resultStatus: "Qualified",
    iconType: "math",
  },
  {
    id: "eng-2026",
    name: "English Olympiad 2026",
    subjectSlug: "english",
    date: "28 Sep 2026",
    score: 80,
    totalScore: 100,
    percentage: 80.0,
    nationalRank: 1876,
    medal: "silver",
    resultStatus: "Qualified",
    iconType: "english",
  },
  {
    id: "cyber-2026",
    name: "Cyber Olympiad 2026",
    subjectSlug: "cyber",
    date: "15 Oct 2026",
    score: 76,
    totalScore: 100,
    percentage: 76.0,
    nationalRank: 2215,
    medal: "bronze",
    resultStatus: "Participation",
    iconType: "cyber",
  },
];

export const PRACTICE_RESULTS_DATA: PracticeResultRecord[] = [
  {
    id: "practice-topic",
    testType: "Topic Practice",
    testsAttempted: 6,
    averageScore: 64,
    totalScore: 100,
    averagePercentage: 64.0,
    bestScore: 90,
    iconType: "topic",
  },
  {
    id: "practice-mock",
    testType: "Mock Tests",
    testsAttempted: 8,
    averageScore: 72,
    totalScore: 100,
    averagePercentage: 72.0,
    bestScore: 96,
    iconType: "mock",
  },
  {
    id: "practice-chapter",
    testType: "Chapter Tests",
    testsAttempted: 4,
    averageScore: 62,
    totalScore: 100,
    averagePercentage: 62.0,
    bestScore: 88,
    iconType: "chapter",
  },
];

export const TIME_SERIES_PERFORMANCE: PerformanceTimePoint[] = [
  { month: "May", percentage: 46, nationalRankPercent: 78 },
  { month: "Jun", percentage: 50, nationalRankPercent: 70 },
  { month: "Jul", percentage: 67, nationalRankPercent: 60 },
  { month: "Aug", percentage: 84, nationalRankPercent: 48 },
  { month: "Sep", percentage: 96, nationalRankPercent: 36 },
  { month: "Oct", percentage: 98, nationalRankPercent: 30 },
];

export const SUBJECT_AVERAGES: SubjectAverageRecord[] = [
  {
    subject: "Science",
    percentage: 84,
    colorClass: "bg-emerald-500",
    barColorHex: "#10B981",
  },
  {
    subject: "Mathematics",
    percentage: 90,
    colorClass: "bg-violet-600",
    barColorHex: "#8B5CF6",
  },
  {
    subject: "English",
    percentage: 80,
    colorClass: "bg-amber-500",
    barColorHex: "#F59E0B",
  },
  {
    subject: "Logical Reasoning",
    percentage: 72,
    colorClass: "bg-blue-500",
    barColorHex: "#3B82F6",
  },
  {
    subject: "Cyber",
    percentage: 76,
    colorClass: "bg-teal-500",
    barColorHex: "#14B8A6",
  },
];

export const TOPICS_BREAKDOWN = {
  totalTopics: 120,
  strongTopics: 72,
  strongPercentage: 60,
  needsImprovementTopics: 48,
  needsImprovementPercentage: 40,
};

export const COUPON_CODES: CouponCodeRecord[] = [
  {
    id: "coupon-1",
    code: "IQ2026",
    discountText: "10% OFF",
    validityText: "Valid till 30 Nov 2026",
  },
  {
    id: "coupon-2",
    code: "OLYMPIAQ50",
    discountText: "₹50 OFF",
    validityText: "Valid till 31 Dec 2026",
  },
];
