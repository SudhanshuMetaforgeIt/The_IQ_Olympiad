export interface OlympiadResultRecord {
  id: string;
  name: string;
  subjectSlug: string;
  date: string;
  score: number;
  totalScore: number;
  percentage: number;
  nationalRank: number;
  totalStudents?: number;
  medal: "gold" | "silver" | "bronze" | "none";
  resultStatus: "Qualified" | "Participation" | "Not Qualified";
  iconType: "science" | "math" | "english" | "cyber" | "reasoning" | "iq";
}

export interface PracticeResultRecord {
  id: string;
  testType: string;
  testsAttempted: number;
  averageScore: number;
  totalScore: number;
  averagePercentage: number;
  bestScore: number;
  iconType: "topic" | "mock" | "chapter";
}

export interface SubjectAverageRecord {
  subject: string;
  percentage: number;
  colorClass: string;
  barColorHex: string;
}

export interface CouponCodeRecord {
  id: string;
  code: string;
  discountText: string;
  validityText: string;
}

export interface PerformanceTimePoint {
  month: string;
  percentage: number;
  nationalRankPercent: number; // For plotting relative rank curve
}

export interface ResultsTopMetrics {
  nationalRank: number;
  totalStudents: number;
  topPercentage: number;
  percentage: number;
  improvementPercentage: number;
  totalMedals: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
}
