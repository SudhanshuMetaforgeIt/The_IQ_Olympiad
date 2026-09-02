"use client";

import React from "react";
import {
  Building2,
  Hash,
  User,
  MapPin,
  Mail,
  Phone,
  Globe,
  Edit3,
  Info,
} from "lucide-react";
import { SchoolProfileData } from "./types";

interface SchoolProfileCardProps {
  profile: SchoolProfileData;
  onEdit?: () => void;
}

export const SchoolProfileCard: React.FC<SchoolProfileCardProps> = ({ profile, onEdit }) => {
  const fields = [
    { label: "School Name", value: profile.schoolName, icon: Building2 },
    { label: "School Code", value: profile.schoolCode, icon: Hash },
    { label: "Principal Name", value: profile.principalName, icon: User },
    { label: "Address", value: profile.address, icon: MapPin },
    { label: "Email", value: profile.email, icon: Mail },
    { label: "Phone", value: profile.phone, icon: Phone },
    { label: "Website", value: profile.website, icon: Globe },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100/90 shadow-2xs flex flex-col justify-between h-full space-y-5">
      {/* Card Header with Divider */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-1">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6332ec] flex-shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              School Profile
            </h3>
            <p className="text-sm font-semibold text-slate-500 mt-0.5">View and update your school information.</p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="border border-purple-300 text-[#6332ec] font-black text-sm rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-purple-50 transition cursor-pointer flex-shrink-0"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Field List Rows */}
      <div className="space-y-3 my-auto">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-slate-50/70 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#6332ec] flex-shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-sm sm:text-base font-extrabold text-slate-700">{field.label}</span>
              </div>
              <span className="text-sm sm:text-base font-black text-slate-900 text-right max-w-[240px] truncate">
                {field.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Info Banner with top divider line & larger font size */}
      <div className="pt-4 border-t border-slate-100">
        <div className="bg-[#f5f3ff] rounded-2xl p-4 sm:p-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-[#6332ec] flex-shrink-0">
            <Info className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900">Keep your school information updated</h4>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
              This information will be used across the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
