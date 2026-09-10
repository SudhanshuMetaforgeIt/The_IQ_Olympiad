export type ResultStatusType = "Qualified" | "Not Qualified" | "Pending" | "Active" | "Registered";

export interface RankSheetRecord {
  id: string;
  rank: number;
  studentName: string;
  avatarInitials: string;
  avatarBg: string;
  registrationId: string;
  rollNo: string;
  schoolName: string;
  schoolLocation: string;
  classNum: string;
  score: string;
  percentage: string;
  status: ResultStatusType;
}

export interface StudentTotalRecord {
  id: string;
  sNo: number;
  studentName: string;
  avatarInitials: string;
  registrationId: string;
  rollNo: string;
  schoolName: string;
  schoolLocation: string;
  classNum: string;
  olympiadsRegistered: number;
  status: "Active" | "Inactive";
}

export interface RegisteredStudentRecord {
  id: string;
  sNo: number;
  studentName: string;
  avatarInitials: string;
  registrationId: string;
  rollNo: string;
  schoolName: string;
  schoolLocation: string;
  classNum: string;
  registeredOn: string;
  status: "Registered" | "Pending";
}

export interface MeritListRecord {
  id: string;
  rank: number;
  studentName: string;
  avatarInitials: string;
  registrationId: string;
  rollNo: string;
  schoolName: string;
  schoolLocation: string;
  classNum: string;
  score: string;
  percentage: string;
  medal: "Gold" | "Silver" | "Bronze";
}

export interface PublishedResultRecord {
  id: string;
  sNo: number;
  olympiadName: string;
  examCode: string;
  classRange: string;
  participatedStudents: number;
  publishedOn: string;
  publishedBy: string;
  iconBg: string;
  iconColor: string;
}

export interface ResultsStatCardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  activeBorder: string;
  pointerColor: string;
}

export interface ResultsFilterState {
  olympiad: string;
  school: string;
  classNum: string;
  status: string;
  dateRange: string;
  searchQuery: string;
  medal?: string;
}
