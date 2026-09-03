import { SchoolProfileData, NotificationPreference, SecuritySettingItem, ActivityItem } from "./types";

export const DEFAULT_SCHOOL_PROFILE: SchoolProfileData = {
  schoolName: "Green Valley Public School",
  schoolCode: "GVPS001",
  principalName: "Dr. Ramesh Kumar",
  address: "123 Green Valley Road, Bangalore...",
  email: "admin@gvps.edu.in",
  phone: "+91 98765 43210",
  website: "www.gvps.edu.in",
};

export const DEFAULT_NOTIFICATIONS: NotificationPreference[] = [
  {
    id: "exam",
    category: "examination",
    title: "Exam Notifications",
    description: "Receive alerts about new exams and important dates.",
    enabled: true,
    iconType: "bell",
  },
  {
    id: "registration",
    category: "examination",
    title: "Registration Alerts",
    description: "Get notified about student registrations and updates.",
    enabled: true,
    iconType: "users",
  },
  {
    id: "results",
    category: "examination",
    title: "Results Notifications",
    description: "Receive alerts when examination results are published.",
    enabled: true,
    iconType: "file-check",
  },
  {
    id: "system",
    category: "general",
    title: "System Announcements",
    description: "Receive important announcements and platform updates.",
    enabled: false,
    iconType: "megaphone",
  },
  {
    id: "digest",
    category: "general",
    title: "Weekly Activity Digest",
    description: "Receive a summary of important school activities.",
    enabled: false,
    iconType: "inbox",
  },
];

export const DEFAULT_SECURITY_ITEMS: SecuritySettingItem[] = [
  {
    id: "password",
    title: "Change Password",
    description: "Update your account password regularly for security.",
    iconType: "key",
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account.",
    statusBadge: "Enabled",
    badgeType: "emerald",
    iconType: "shield",
  },
  {
    id: "sessions",
    title: "Active Sessions",
    description: "Manage devices and sessions currently signed in.",
    statusBadge: "3 Active",
    badgeType: "blue",
    iconType: "device",
  },
  {
    id: "history",
    title: "Login History",
    description: "View your recent login activity and security events.",
    iconType: "clock",
  },
];

export const DEFAULT_RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    title: "Profile Updated",
    description: "School profile information was updated.",
    timestamp: "2 hours ago",
    iconType: "check",
  },
  {
    id: "2",
    title: "Notification Preferences Updated",
    description: "Notification settings were modified.",
    timestamp: "1 day ago",
    iconType: "bell",
  },
  {
    id: "3",
    title: "Password Changed",
    description: "Account password was successfully changed.",
    timestamp: "2 days ago",
    iconType: "lock",
  },
  {
    id: "4",
    title: "New Login Detected",
    description: "New login from Chrome on Windows.",
    timestamp: "3 days ago",
    iconType: "login",
  },
];
