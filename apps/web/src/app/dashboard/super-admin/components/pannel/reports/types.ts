export type ReportsViewMode = "default" | "schools" | "students" | "tests" | "participation" | "avg_score";

export interface ReportStatCardData {
  id: ReportsViewMode;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  colorTheme: "purple" | "green" | "orange" | "blue" | "red";
  sparklineData: number[];
}

export interface ReportsFilterState {
  olympiad: string;
  school: string;
  classNum: string;
  city?: string;
  state?: string;
  dateRange: string;
  searchQuery: string;
}

export interface ClassDistributionItem {
  className: string;
  count: number;
  percentage: string;
  color: string;
}

export interface TopSchoolRecord {
  rank: number;
  schoolName: string;
  studentsCount: string;
  avgScore: string;
  testsCount: string;
  trend: "up" | "down";
}

export interface SchoolByStateItem {
  state: string;
  count: number;
  percentage: string;
}

export interface SchoolByTypeItem {
  type: string;
  count: number;
  percentage: string;
  color: string;
}

export interface SchoolTrendItem {
  month: string;
  registrations: number;
}

export interface TotalSchoolDetailedRecord {
  rank: number;
  schoolName: string;
  city: string;
  state: string;
  totalStudents: string;
  participationRate: string;
  averageScore: string;
  topOlympiad: string;
}

export interface RecentReportItem {
  id: string;
  reportName: string;
  type: string;
  generatedOn: string;
}

export interface OlympiadParticipationItem {
  olympiadName: string;
  studentsCount: string;
  participationPercentage: string;
  percentageValue: number;
}
