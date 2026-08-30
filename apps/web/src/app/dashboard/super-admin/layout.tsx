import type { ReactNode } from "react";

/**
 * Super Admin Dashboard Layout
 *
 * Route base: /dashboard/super-admin
 *
 * Provides the shared administrative layout for platform
 * management, including future sidebar, header,
 * navigation, and authorization controls.
 */
export default function SuperAdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}