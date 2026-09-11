import {
  QualifiedTrendPoint,
  AverageTrendPoint,
  DonutCategory,
  QualifiedExamItem,
  AverageScoreExamItem,
} from "./types";

export const QUALIFIED_TRENDS: QualifiedTrendPoint[] = [
  { month: "Apr '25", qualifiedCount: 780 },
  { month: "May '25", qualifiedCount: 910 },
  { month: "Jun '25", qualifiedCount: 890 },
  { month: "Jul '25", qualifiedCount: 940 },
  { month: "Aug '25", qualifiedCount: 920 },
  { month: "Sep '25", qualifiedCount: 970, tooltipText: "17 Apr 2026\n1,418 Students" },
  { month: "Oct '25", qualifiedCount: 950 },
  { month: "Nov '25", qualifiedCount: 1140 },
  { month: "Dec '25", qualifiedCount: 880 },
  { month: "Jan '26", qualifiedCount: 1010 },
];

export const AVERAGE_SCORE_TRENDS: AverageTrendPoint[] = [
  { month: "Apr '25", averageScore: 58 },
  { month: "May '25", averageScore: 66 },
  { month: "Jun '25", averageScore: 65 },
  { month: "Jul '25", averageScore: 78.4 },
  { month: "Aug '25", averageScore: 67 },
  { month: "Sep '25", averageScore: 75 },
  { month: "Oct '25", averageScore: 70 },
  { month: "Nov '25", averageScore: 82 },
  { month: "Dec '25", averageScore: 80 },
  { month: "Jan '26", averageScore: 55 },
  { month: "Feb '26", averageScore: 67 },
  { month: "Mar '26", averageScore: 75 },
];

export const QUALIFIED_EXAM_CATEGORIES: DonutCategory[] = [
  { name: "National Science Olympiad", count: 546, percentage: 89.2, color: "#10b981" },
  { name: "IMO Mathematics Olympiad", count: 362, percentage: 87.8, color: "#3b82f6" },
  { name: "Cyber Olympiad", count: 250, percentage: 86.8, color: "#7c3aed" },
  { name: "English Olympiad", count: 175, percentage: 85.5, color: "#f59e0b" },
  { name: "AI Olympiad", count: 99, percentage: 83.5, color: "#ef4444" },
];

export const AVERAGE_SCORE_EXAM_CATEGORIES: DonutCategory[] = [
  { name: "National Science Olympiad", count: 0, percentage: 78.4, color: "#3b82f6" },
  { name: "IMO Mathematics Olympiad", count: 0, percentage: 76.2, color: "#0ea5e9" },
  { name: "Cyber Olympiad", count: 0, percentage: 79.6, color: "#7c3aed" },
  { name: "English Olympiad", count: 0, percentage: 81.3, color: "#f59e0b" },
  { name: "AI Olympiad", count: 0, percentage: 77.5, color: "#10b981" },
];

export const QUALIFIED_EXAM_LIST: QualifiedExamItem[] = [
  {
    id: "qex-1",
    examName: "National Science Olympiad (NSO)",
    appeared: 612,
    qualified: 546,
    percentage: 89.22,
    examDate: "16 May 2025",
  },
  {
    id: "qex-2",
    examName: "IMO Mathematics Olympiad",
    appeared: 412,
    qualified: 362,
    percentage: 87.86,
    examDate: "16 May 2025",
  },
  {
    id: "qex-3",
    examName: "Cyber Olympiad",
    appeared: 288,
    qualified: 250,
    percentage: 86.8,
    examDate: "15 May 2025",
  },
  {
    id: "qex-4",
    examName: "English Olympiad",
    appeared: 198,
    qualified: 175,
    percentage: 88.38,
    examDate: "15 May 2025",
  },
  {
    id: "qex-5",
    examName: "AI Olympiad",
    appeared: 116,
    qualified: 99,
    percentage: 85.34,
    examDate: "14 May 2025",
  },
];

export const AVERAGE_SCORE_EXAM_LIST: AverageScoreExamItem[] = [
  {
    id: "avg-1",
    examName: "National Science Olympiad (NSO)",
    totalMarks: 60,
    averagePercentage: 78.4,
    highestPercentage: 98.3,
    lowestPercentage: 32.0,
    examDate: "16 May 2025",
  },
  {
    id: "avg-2",
    examName: "IMO Mathematics Olympiad",
    totalMarks: 60,
    averagePercentage: 76.2,
    highestPercentage: 97.0,
    lowestPercentage: 28.0,
    examDate: "16 May 2025",
  },
  {
    id: "avg-3",
    examName: "Cyber Olympiad",
    totalMarks: 60,
    averagePercentage: 79.6,
    highestPercentage: 99.0,
    lowestPercentage: 30.0,
    examDate: "15 May 2025",
  },
  {
    id: "avg-4",
    examName: "English Olympiad",
    totalMarks: 60,
    averagePercentage: 81.3,
    highestPercentage: 96.5,
    lowestPercentage: 35.0,
    examDate: "15 May 2025",
  },
  {
    id: "avg-5",
    examName: "AI Olympiad",
    totalMarks: 60,
    averagePercentage: 77.5,
    highestPercentage: 95.0,
    lowestPercentage: 26.0,
    examDate: "14 May 2025",
  },
];
