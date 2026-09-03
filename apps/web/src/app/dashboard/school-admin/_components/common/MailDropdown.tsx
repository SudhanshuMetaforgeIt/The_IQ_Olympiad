"use client";

import React, { useState } from "react";
import {
  Mail,
  X,
  Clock,
  CheckCheck,
  ArrowLeft,
  Paperclip,
  Reply,
  Trash2,
  Tag,
  UserCheck,
} from "lucide-react";

export interface MailItem {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  preview: string;
  fullBody: string[];
  time: string;
  date: string;
  read: boolean;
  tag: string;
  tagBg: string;
  tagText: string;
  attachments?: { name: string; size: string }[];
}

const INITIAL_MAILS: MailItem[] = [
  {
    id: "mail-1",
    senderName: "IQ Olympiad Support Team",
    senderEmail: "support@iqolympiad.org",
    subject: "NSO 2026 Registration Guidelines & Schedule Update",
    preview: "Dear School Administrator, please review the updated timetable for the upcoming National Science Olympiad exams...",
    fullBody: [
      "Dear School Administrator,",
      "We are pleased to share the updated official schedule and student registration guidelines for the upcoming National Science Olympiad (NSO 2026).",
      "Key Instructions:",
      "1. Ensure all student details are verified under the 'Students' panel before June 15, 2026.",
      "2. Admit cards will be generated automatically 5 days prior to the examination date.",
      "3. Online proctoring trial tests will be available for all registered students starting next Monday.",
      "If you have any questions or require custom assistance for your school, reply directly to this mail or contact your assigned regional coordinator.",
      "Best regards,",
      "The IQ Olympiad Operations Team",
    ],
    time: "10:15 AM",
    date: "Today, June 3, 2026",
    read: false,
    tag: "Official Notice",
    tagBg: "bg-purple-100",
    tagText: "text-purple-700",
    attachments: [{ name: "NSO_2026_Exam_Schedule.pdf", size: "1.4 MB" }],
  },
  {
    id: "mail-2",
    senderName: "Dr. Rajesh Kumar (Regional Director)",
    senderEmail: "director@iqolympiad.org",
    subject: "Congratulations on Top 10 Qualification Rate!",
    preview: "Your school has secured an exceptional 87.3% qualification rate in the preliminary round...",
    fullBody: [
      "Respected Principal & School Administrator,",
      "On behalf of the IQ Olympiad Governing Board, I extend my heartfelt congratulations to your institution!",
      "Your students achieved an outstanding 87.31% qualification rate across all registered Olympiad subjects, placing Green Valley Public School among the Top 10 performing schools in the region.",
      "Special mention to student Aarav Sharma for securing 99.2% percentile in NSO.",
      "Merit certificates and trophy distribution details for the annual ceremony will be communicated shortly.",
      "Warm regards,",
      "Dr. Rajesh Kumar",
      "Regional Director, IQ Olympiad Council",
    ],
    time: "Yesterday, 4:30 PM",
    date: "June 2, 2026",
    read: false,
    tag: "Commendation",
    tagBg: "bg-emerald-100",
    tagText: "text-emerald-700",
  },
  {
    id: "mail-3",
    senderName: "Finance & Accounts Dept",
    senderEmail: "billing@iqolympiad.org",
    subject: "Bulk Exam Registration Invoice #INV-2026-891",
    preview: "Thank you for completing the student bulk registration. Your official tax invoice statement is attached...",
    fullBody: [
      "Hello School Administrator,",
      "Thank you for completing the bulk exam registration for 1,624 student entries across NSO, IMO, and ICO Olympiads.",
      "Invoice Details:",
      "- Invoice Number: #INV-2026-891",
      "- Total Registered Entries: 1,624 Students",
      "- Payment Status: Paid & Confirmed",
      "You can download your official tax invoice and student receipt breakdown attached below.",
      "Sincerely,",
      "Accounts Department",
      "The IQ Olympiad Secretariat",
    ],
    time: "May 28, 2026",
    date: "May 28, 2026",
    read: false,
    tag: "Invoice & Billing",
    tagBg: "bg-blue-100",
    tagText: "text-blue-700",
    attachments: [{ name: "Invoice_INV_2026_891.pdf", size: "480 KB" }],
  },
];

interface MailDropdownProps {
  onClose: () => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export function MailDropdown({ onClose, unreadCount, setUnreadCount }: MailDropdownProps) {
  const [mails, setMails] = useState<MailItem[]>(INITIAL_MAILS);
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);

  const handleOpenMail = (mail: MailItem) => {
    setSelectedMail(mail);
    if (!mail.read) {
      setMails((prev) =>
        prev.map((m) => (m.id === mail.id ? { ...m, read: true } : m))
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    }
  };

  const handleMarkAllRead = () => {
    setMails((prev) => prev.map((m) => ({ ...m, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[92vw] sm:w-[540px] md:w-[600px] bg-white border border-slate-200/90 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 font-sans">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center space-x-3">
          {selectedMail ? (
            <button
              onClick={() => setSelectedMail(null)}
              className="p-2 text-slate-600 hover:bg-slate-200/60 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              <span>Back</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              {selectedMail ? "Mail Details" : "Inbox Messages"}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {selectedMail ? selectedMail.tag : `${unreadCount} new messages`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {!selectedMail && unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            aria-label="Close Mail Dropdown"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Container: Mail List or Selected Mail Detail View */}
      {selectedMail ? (
        /* Mail Detail View */
        <div className="p-6 max-h-[520px] overflow-y-auto space-y-5">
          {/* Mail Subject & Tag */}
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <span
                className={`text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider ${selectedMail.tagBg} ${selectedMail.tagText}`}
              >
                {selectedMail.tag}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {selectedMail.date}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {selectedMail.subject}
            </h2>
          </div>

          {/* Sender Details */}
          <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-base shrink-0 shadow-sm">
              {selectedMail.senderName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-slate-900 truncate">
                {selectedMail.senderName}
              </h4>
              <p className="text-xs font-semibold text-slate-500 truncate mt-0.5">
                {selectedMail.senderEmail}
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400 shrink-0">
              {selectedMail.time}
            </span>
          </div>

          {/* Full Body Paragraphs */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed border-t border-b border-slate-100 py-4">
            {selectedMail.fullBody.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Attachments if any */}
          {selectedMail.attachments && selectedMail.attachments.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Paperclip className="w-4 h-4" /> Attachments ({selectedMail.attachments.length})
              </span>
              {selectedMail.attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs sm:text-sm font-bold text-purple-900"
                >
                  <span className="truncate">{att.name}</span>
                  <span className="text-xs text-purple-600 font-semibold shrink-0 ml-3">
                    {att.size}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => setSelectedMail(null)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-extrabold rounded-xl transition cursor-pointer"
            >
              Back to Inbox
            </button>
            <button
              onClick={() => alert(`Replying to ${selectedMail.senderEmail}`)}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Reply className="w-4 h-4" />
              <span>Reply Message</span>
            </button>
          </div>
        </div>
      ) : (
        /* Inbox Mail List */
        <div className="max-h-[480px] overflow-y-auto divide-y divide-slate-100">
          {mails.map((mail) => (
            <div
              key={mail.id}
              onClick={() => handleOpenMail(mail)}
              className={`p-5 transition-colors cursor-pointer flex items-start space-x-4 ${
                !mail.read ? "bg-purple-50/40 hover:bg-purple-50/70" : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                {mail.senderName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-black text-slate-900 truncate">
                    {mail.senderName}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {mail.time}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-purple-900 truncate mt-0.5">
                  {mail.subject}
                </h5>
                <p className="text-xs font-medium text-slate-600 mt-1 line-clamp-2 leading-snug">
                  {mail.preview}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${mail.tagBg} ${mail.tagText}`}
                  >
                    {mail.tag}
                  </span>
                  {!mail.read && (
                    <span className="text-[10px] font-extrabold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown Footer */}
      {!selectedMail && (
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <span className="text-xs font-bold text-purple-700 hover:underline cursor-pointer">
            View All Mail Messages
          </span>
        </div>
      )}
    </div>
  );
}
