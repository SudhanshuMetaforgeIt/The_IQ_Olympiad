"use client";

export function exportResultsToCSV(data: any[], filename = "IQ_Olympiad_Results.csv") {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }
  const headers = [
    "Student Name",
    "Class",
    "Exam Name",
    "Marks Obtained",
    "Total Marks",
    "Percentage",
    "Grade",
    "Result Status",
    "Published On",
  ];

  const rows = data.map((item) => [
    `"${item.studentName || ""}"`,
    `"${item.className || ""}"`,
    `"${item.examName || ""}"`,
    `"${item.marksObtained ?? ""}"`,
    `"${item.totalMarks ?? 200}"`,
    `"${item.percentage !== undefined ? item.percentage.toFixed(1) + "%" : ""}"`,
    `"${item.grade || ""}"`,
    `"${item.resultStatus || item.attendanceStatus || "Pass"}"`,
    `"${item.publishedOn || ""}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadStudentReport(studentName: string, examName: string) {
  const content = `====================================================
THE IQ OLYMPIAD - OFFICIAL STUDENT SCORECARD REPORT
====================================================
Student Name   : ${studentName}
Exam Name      : ${examName}
Issued Date    : ${new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
Verification   : VERIFIED & QUALIFIED
====================================================
This is an official digital scorecard report issued by
The IQ Olympiad Administration System.
====================================================`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${studentName.replace(/\s+/g, "_")}_Scorecard.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
