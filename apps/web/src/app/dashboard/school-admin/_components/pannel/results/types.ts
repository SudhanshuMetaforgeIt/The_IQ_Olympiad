export interface ResultRecord {
  id: string;
  studentName: string;
  className: string;
  examName: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  avgScorePercentage?: number;
  grade: string;
  gradeBg: string;
  resultStatus: "Pass" | "Fail";
  publishedOn: string;
  avatarBg: string;
  avatarUrl?: string;
}

export interface AppearedStudentRecord {
  id: string;
  studentName: string;
  className: string;
  examName: string;
  registrationNo: string;
  examDate: string;
  attendanceStatus: "Present" | "Absent";
  status: "Appeared" | "Absent";
  avatarInitial: string;
  avatarColor: string;
  avatarUrl?: string;
}

export interface ExamPassRate {
  examName: string;
  rate: number;
  color: string;
}

export interface SubjectPerformance {
  subject: string;
  percentage: number;
}

export type ActiveCardType = "all" | "appeared" | "qualified" | "avg_score" | "merit";
