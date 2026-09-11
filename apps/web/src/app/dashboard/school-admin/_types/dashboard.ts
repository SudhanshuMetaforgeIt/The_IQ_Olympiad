export interface StatMetric {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconName: "users" | "check-square" | "clock" | "calendar" | "check-circle";
  iconBgColor: string;
  iconColor: string;
}

export interface SubjectMetric {
  id: string;
  name: string;
  iconName: "sigma" | "flask" | "book";
  iconBgColor: string;
  iconColor: string;
  borderColor: string;
  avgScore: string;
  passRate: string;
  studentCount: number;
}

export interface RegistrationStatus {
  registeredCount: number;
  registeredPercentage: number;
  pendingCount: number;
  pendingPercentage: number;
  rejectedCount: number;
  rejectedPercentage: number;
  totalStudents: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: "student" | "approval" | "creation" | "results" | "update";
  iconBgColor: string;
  iconColor: string;
}

export interface UpcomingExam {
  id: string;
  name: string;
  code: string;
  examDate: string;
  duration: string;
  registeredCount: number;
  capacityCount: number;
  status: "Open" | "Upcoming" | "Closed";
  registrationEndsDate: string;
}

export interface SchoolProfile {
  name: string;
  welcomeMessage: string;
  adminName: string;
  academicYears: string[];
  currentAcademicYear: string;
  unreadNotifications: number;
}
