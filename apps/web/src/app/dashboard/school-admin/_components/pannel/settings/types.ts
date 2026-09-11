export interface SchoolProfileData {
  schoolName: string;
  schoolCode: string;
  principalName: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

export interface NotificationPreference {
  id: string;
  category: "examination" | "general";
  title: string;
  description: string;
  enabled: boolean;
  iconType: "bell" | "users" | "file-check" | "megaphone" | "inbox";
}

export interface SecuritySettingItem {
  id: string;
  title: string;
  description: string;
  statusBadge?: string;
  badgeType?: "emerald" | "blue";
  iconType: "key" | "shield" | "device" | "clock";
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  iconType: "check" | "bell" | "lock" | "login";
}
