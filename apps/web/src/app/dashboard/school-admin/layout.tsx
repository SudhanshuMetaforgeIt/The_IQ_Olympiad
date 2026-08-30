import type { ReactNode } from "react";

/**
 * School Admin Dashboard Layout
 *
 * Route base: /dashboard/school-admin
 *
 * Provides the shared layout structure for all school
 * administration pages, including future sidebar,
 * header, navigation, and authorization controls.
 */
export default function SchoolAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}