export type CertificateStatusType = "Issued" | "Pending" | "Not Issued";
export type CertificateCategoryType = "Merit" | "Participation";
export type CertificatesViewMode = "default" | "merit" | "participation" | "pending" | "total";

export interface CertificateRecord {
  id: string;
  rank: number;
  studentName: string;
  avatarInitials: string;
  registrationId: string;
  rollNo: string;
  examName: string;
  classNum: string;
  score: string;
  percentage: string;
  certificateType: CertificateCategoryType;
  status: CertificateStatusType;
  issueDate?: string;
}

export interface CertificatesStatCardData {
  id: CertificatesViewMode;
  title: string;
  value: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
}

export interface CertificatesFilterState {
  olympiad: string;
  school: string;
  classNum: string;
  certificateTypeFilter?: string;
  categoryFilter?: string;
  dateRange?: string;
  status: string;
  searchQuery: string;
}
