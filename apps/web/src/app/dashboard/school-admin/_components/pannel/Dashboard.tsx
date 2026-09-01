"use client";

import { StatsSummary } from "../common/StatsSummary";
import { ClassPerformance } from "../common/ClassPerformance";
import { RegistrationChart } from "../common/RegistrationChart";
import { RecentActivity } from "../common/RecentActivity";
import { UpcomingExamsTable } from "../common/UpcomingExamsTable";
import {
  mockStatMetrics,
  mockSubjectMetrics,
  mockRegistrationStatus,
  mockActivityLogs,
  mockUpcomingExams,
} from "../../_data/mockData";

export function DashboardPanel() {
  return (
    <div className="space-y-6 w-full">
      {/* 1. Top Stat Metrics Row */}
      <section>
        <StatsSummary metrics={mockStatMetrics} />
      </section>

      {/* 2. Class & Subject Performance Section */}
      <section>
        <ClassPerformance metrics={mockSubjectMetrics} />
      </section>

      {/* 3. Middle Section: Registration Donut & Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegistrationChart data={mockRegistrationStatus} />
        <RecentActivity activities={mockActivityLogs} />
      </section>

      {/* 4. Upcoming Exams Data Table */}
      <section>
        <UpcomingExamsTable exams={mockUpcomingExams} />
      </section>
    </div>
  );
}

export default DashboardPanel;
