export interface StatMetric {
  id: "appeared" | "qualified" | "avg" | "merit";
  title: string;
  value: string;
  subtext: string;
  badge?: string;
  iconType: "appeared" | "qualified" | "avg" | "merit";
}

export interface ReportFilterState {
  olympiad: string;
  class: string;
  section: string;
  dateRange: string;
  search: string;
}

export interface ReportItem {
  id: string;
  name: string;
  type: "Exam-wise" | "Class-wise" | "Student-wise" | "Subject-wise";
  examOrClass: string;
  generatedOn: string;
  generatedBy: string;
  fileSize?: string;
  downloadUrl?: string;
}

export interface PerformanceTrendPoint {
  month: string;
  passPercentage: number;
  averageScore: number;
}

export interface QualifiedTrendPoint {
  month: string;
  qualifiedCount: number;
  tooltipText?: string;
}

export interface AverageTrendPoint {
  month: string;
  averageScore: number;
  tooltipText?: string;
}

export interface DonutCategory {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface QualifiedExamItem {
  id: string;
  examName: string;
  appeared: number;
  qualified: number;
  percentage: number;
  examDate: string;
}

export interface AverageScoreExamItem {
  id: string;
  examName: string;
  totalMarks: number;
  averagePercentage: number;
  highestPercentage: number;
  lowestPercentage: number;
  examDate: string;
}

export interface MeritStudentItem {
  id: string;
  rank: number;
  studentName: string;
  class: string;
  examName: string;
  scorePercentage: number;
  marksObtained: number;
  totalMarks: number;
  publishedOn: string;
}
