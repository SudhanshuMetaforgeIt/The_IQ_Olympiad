"use client";

import React, { useState } from "react";
import { User, Edit3, Check, X, CheckCircle2, Camera } from "lucide-react";

export interface SuperAdminProfile {
  name: string;
  email: string;
  avatarInitials: string;
  avatarColor: string;
}

const AVATAR_COLORS = [
  "#635BFF", // Indigo
  "#7C3AED", // Purple
  "#059669", // Emerald
  "#EA580C", // Orange
  "#2563EB", // Blue
  "#DC2626", // Red
];

export default function SettingsProfileCard() {
  const [profile, setProfile] = useState<SuperAdminProfile>({
    name: "Super Admin",
    email: "superadmin@examiq.com",
    avatarInitials: "SA",
    avatarColor: "#635BFF",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<SuperAdminProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const startEditing = () => {
    setDraft({ ...profile });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const cancelEditing = () => {
    setDraft({ ...profile });
    setIsEditing(false);
  };

  const handleNameChange = (name: string) => {
    const initials = name
      .trim()
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "SA";

    setDraft((prev) => ({
      ...prev,
      name,
      avatarInitials: initials,
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setProfile(draft);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3.5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Profile
                </h3>
                {isEditing && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wide">
                    Editing
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {isEditing ? "Update your account details below" : "Manage your Super Admin account"}
              </p>
            </div>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={cancelEditing}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              title="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode */}
        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Name</span>
              <span className="font-bold text-slate-900">{profile.name}</span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Email</span>
              <span className="font-bold text-slate-900">{profile.email}</span>
            </div>

            <div className="flex items-center justify-between pb-1 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Profile Picture</span>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: profile.avatarColor }}
                >
                  {profile.avatarInitials}
                </div>
                <button
                  type="button"
                  onClick={startEditing}
                  className="px-3.5 py-1.5 rounded-lg border border-purple-200 text-purple-700 font-bold text-xs hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Inline Editable Mode */
          <form onSubmit={handleSave} className="space-y-4 animate-in fade-in duration-200">
            {/* Name input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Name</label>
              <input
                type="text"
                required
                value={draft.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="sm:w-56 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                placeholder="Admin Name"
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Email</label>
              <input
                type="email"
                required
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className="sm:w-56 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                placeholder="admin@examiq.com"
              />
            </div>

            {/* Avatar Color Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <label className="text-xs font-bold text-slate-700">Profile Picture</label>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0"
                  style={{ backgroundColor: draft.avatarColor }}
                >
                  {draft.avatarInitials}
                </div>
                <div className="flex items-center gap-1.5">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setDraft({ ...draft, avatarColor: color })}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                        draft.avatarColor === color
                          ? "scale-125 border-slate-900 ring-2 ring-purple-400"
                          : "border-transparent hover:scale-110"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="pt-6 flex justify-center">
        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            className="px-5 py-2.5 rounded-xl border border-purple-200 text-purple-700 font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 w-full justify-end">
            <button
              type="button"
              onClick={cancelEditing}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saveSuccess}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
