export type OlympiadStatus = "Active" | "Upcoming" | "Completed" | "Inactive";

export interface OlympiadItem {
  id: string;
  name: string;
  subtitle: string;
  code: string;
  classes: string;
  category: string;
  categoryColor: string;
  status: OlympiadStatus;
  registrations: number | null;
  avatarCode: string;
  avatarBg: string;
  startDate?: string;
  startTime?: string;
  regEndDate?: string;
  regEndTime?: string;
  completedDate?: string;
  completedTime?: string;
}

export interface OlympiadStatCardData {
  id: string;
  title: string;
  value: number;
  subtitle: string;
  trend: string;
  trendColor: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  sparklineColor: string;
  sparklinePoints: string;
}

export interface CreateOlympiadFormData {
  name: string;
  subtitle: string;
  code: string;
  classes: string;
  category: string;
  status: OlympiadStatus;
  startDate?: string;
  regEndDate?: string;
}
