import {
  ReportStatCardData,
  ClassDistributionItem,
  TopSchoolRecord,
  RecentReportItem,
  OlympiadParticipationItem,
  SchoolByStateItem,
  SchoolByTypeItem,
  SchoolTrendItem,
  TotalSchoolDetailedRecord,
} from "./types";

export const reportStatCardsData: ReportStatCardData[] = [
  { id: "schools", title: "Total Schools", value: "1,248", change: "↑ 8.4% vs last month", isPositive: true, colorTheme: "purple", sparklineData: [40, 48, 42, 60, 52, 65, 58, 72, 68, 80] },
  { id: "students", title: "Total Students", value: "35,217", change: "↑ 12.7% vs last month", isPositive: true, colorTheme: "green", sparklineData: [35, 45, 40, 55, 50, 68, 62, 75, 70, 85] },
  { id: "tests", title: "Tests Conducted", value: "8,965", change: "↑ 15.3% vs last month", isPositive: true, colorTheme: "orange", sparklineData: [30, 42, 38, 58, 48, 62, 55, 78, 65, 82] },
  { id: "participation", title: "Participation Rate", value: "78.62%", change: "↑ 6.8% vs last month", isPositive: true, colorTheme: "blue", sparklineData: [50, 45, 60, 55, 70, 65, 80, 72, 85, 78] },
  { id: "avg_score", title: "Avg. Score", value: "64.38%", change: "↓ 2.1% vs last month", isPositive: false, colorTheme: "red", sparklineData: [70, 65, 72, 58, 62, 50, 55, 48, 52, 45] },
];

export const schoolsByStateData: SchoolByStateItem[] = [
  { state: "Maharashtra", count: 298, percentage: "23.88%" },
  { state: "Karnataka", count: 186, percentage: "14.90%" },
  { state: "Delhi", count: 154, percentage: "12.34%" },
  { state: "Uttar Pradesh", count: 132, percentage: "10.58%" },
  { state: "Tamil Nadu", count: 118, percentage: "9.46%" },
  { state: "Others", count: 360, percentage: "28.88%" },
];

export const schoolsByTypeData: SchoolByTypeItem[] = [
  { type: "Public", count: 652, percentage: "52.24%", color: "#7c3aed" },
  { type: "Private", count: 498, percentage: "39.90%", color: "#2563eb" },
  { type: "Government", count: 98, percentage: "7.85%", color: "#10b981" },
];

export const schoolsTrendData: SchoolTrendItem[] = [
  { month: "Jun '25", registrations: 820 },
  { month: "Jul '25", registrations: 870 },
  { month: "Aug '25", registrations: 912 },
  { month: "Sep '25", registrations: 965 },
  { month: "Oct '25", registrations: 1012 },
  { month: "Nov '25", registrations: 1085 },
  { month: "Dec '25", registrations: 1120 },
  { month: "Jan '26", registrations: 1168 },
  { month: "Feb '26", registrations: 1195 },
  { month: "Mar '26", registrations: 1214 },
  { month: "Apr '26", registrations: 1237 },
  { month: "May '26", registrations: 1248 },
];

export const totalSchoolsDetailedData: TotalSchoolDetailedRecord[] = [
  { rank: 1, schoolName: "Delhi Public School", city: "New Delhi", state: "Delhi", totalStudents: "2,456", participationRate: "92.45%", averageScore: "87.64%", topOlympiad: "IMO - Mathematics" },
  { rank: 2, schoolName: "St. Xavier's School", city: "Mumbai", state: "Maharashtra", totalStudents: "1,872", participationRate: "89.72%", averageScore: "85.21%", topOlympiad: "NSO - Science" },
  { rank: 3, schoolName: "Ryan International School", city: "Bengaluru", state: "Karnataka", totalStudents: "1,456", participationRate: "88.14%", averageScore: "83.19%", topOlympiad: "IEO - English" },
  { rank: 4, schoolName: "Kendriya Vidyalaya No. 1", city: "Pune", state: "Maharashtra", totalStudents: "1,234", participationRate: "86.22%", averageScore: "81.33%", topOlympiad: "IMO - Mathematics" },
  { rank: 5, schoolName: "DAV Public School", city: "Chandigarh", state: "Chandigarh", totalStudents: "1,123", participationRate: "85.09%", averageScore: "80.12%", topOlympiad: "NSO - Science" },
];

export const classDistributionData: ClassDistributionItem[] = [
  { className: "Class 6", count: 6254, percentage: "17.8%", color: "#7c3aed" },
  { className: "Class 7", count: 7845, percentage: "22.3%", color: "#2563eb" },
  { className: "Class 8", count: 8963, percentage: "25.5%", color: "#10b981" },
  { className: "Class 9", count: 6784, percentage: "19.3%", color: "#f97316" },
  { className: "Class 10", count: 5371, percentage: "15.1%", color: "#ef4444" },
];

export const topSchoolsData: TopSchoolRecord[] = [
  { rank: 1, schoolName: "Delhi Public School", studentsCount: "2,451", avgScore: "78.45%", testsCount: "645", trend: "up" },
  { rank: 2, schoolName: "St. Xavier's School", studentsCount: "1,872", avgScore: "76.32%", testsCount: "512", trend: "up" },
  { rank: 3, schoolName: "Kendriya Vidyalaya No. 1", studentsCount: "1,623", avgScore: "74.18%", testsCount: "498", trend: "down" },
  { rank: 4, schoolName: "Ryan International School", studentsCount: "1,456", avgScore: "72.95%", testsCount: "421", trend: "up" },
  { rank: 5, schoolName: "Pathways School", studentsCount: "1,218", avgScore: "71.23%", testsCount: "389", trend: "down" },
];

export const recentReportsData: RecentReportItem[] = [
  { id: "1", reportName: "Overview Report", type: "Overview", generatedOn: "12 May 2026, 10:30 AM" },
  { id: "2", reportName: "School Performance Report", type: "Performance", generatedOn: "12 May 2026, 09:15 AM" },
  { id: "3", reportName: "Student Performance Report", type: "Student", generatedOn: "11 May 2026, 08:45 AM" },
  { id: "4", reportName: "Olympiad Wise Report", type: "Olympiad", generatedOn: "11 May 2026, 06:20 PM" },
  { id: "5", reportName: "Participation Report", type: "Participation", generatedOn: "11 May 2026, 05:10 PM" },
];

export const olympiadParticipationData: OlympiadParticipationItem[] = [
  { olympiadName: "IMO - Mathematics", studentsCount: "12,451", participationPercentage: "85.32%", percentageValue: 85.32 },
  { olympiadName: "NSO - Science", studentsCount: "10,123", participationPercentage: "80.15%", percentageValue: 80.15 },
  { olympiadName: "IEO - English", studentsCount: "7,654", participationPercentage: "72.48%", percentageValue: 72.48 },
  { olympiadName: "IGKO - GK", studentsCount: "6,221", participationPercentage: "68.91%", percentageValue: 68.91 },
  { olympiadName: "REAS - Reasoning", studentsCount: "5,214", participationPercentage: "62.37%", percentageValue: 62.37 },
];
