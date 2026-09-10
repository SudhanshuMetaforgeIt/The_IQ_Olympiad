"use client";

import React, { useState } from "react";
import { FileText, Edit3, GraduationCap, Trophy, Globe, Award, Sparkles, Check, X, CheckCircle2 } from "lucide-react";

export interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  logoIcon: "GraduationCap" | "Trophy" | "Globe" | "Award" | "Sparkles";
  logoBgColor: string;
}

const LOGO_OPTIONS = [
  { id: "GraduationCap" as const, Icon: GraduationCap },
  { id: "Trophy" as const, Icon: Trophy },
  { id: "Globe" as const, Icon: Globe },
  { id: "Award" as const, Icon: Award },
  { id: "Sparkles" as const, Icon: Sparkles },
];

export default function SettingsPlatformCard() {
  const [platform, setPlatform] = useState<PlatformSettings>({
    platformName: "The IQ Olympiad",
    supportEmail: "support@examiq.com",
    supportPhone: "+91 98765 43210",
    logoIcon: "GraduationCap",
    logoBgColor: "#6332ec",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<PlatformSettings>(platform);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const startEditing = () => {
    setDraft({ ...platform });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const cancelEditing = () => {
    setDraft({ ...platform });
    setIsEditing(false);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPlatform(draft);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 600);
  };

  const renderIcon = (iconName: PlatformSettings["logoIcon"], className = "w-5 h-5") => {
    switch (iconName) {
      case "Trophy":
        return <Trophy className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "Award":
        return <Award className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      case "GraduationCap":
      default:
        return <GraduationCap className={className} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full font-sans transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3.5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Platform
                </h3>
                {isEditing && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wide">
                    Editing
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {isEditing ? "Update platform details below" : "Basic platform information"}
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
              <span className="font-semibold text-slate-700">Platform Name</span>
              <span className="font-bold text-slate-900">{platform.platformName}</span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Platform Logo</span>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: platform.logoBgColor }}
                >
                  {renderIcon(platform.logoIcon)}
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

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Support Email</span>
              <span className="font-bold text-slate-900">{platform.supportEmail}</span>
            </div>

            <div className="flex items-center justify-between pb-1 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Support Phone</span>
              <span className="font-bold text-slate-900">{platform.supportPhone}</span>
            </div>
          </div>
        ) : (
          /* Inline Editable Mode */
          <form onSubmit={handleSave} className="space-y-4 animate-in fade-in duration-200">
            {/* Platform Name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Platform Name</label>
              <input
                type="text"
                required
                value={draft.platformName}
                onChange={(e) => setDraft({ ...draft, platformName: e.target.value })}
                className="sm:w-56 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                placeholder="The IQ Olympiad"
              />
            </div>

            {/* Platform Logo Picker */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Platform Logo</label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-xs shrink-0"
                  style={{ backgroundColor: draft.logoBgColor }}
                >
                  {renderIcon(draft.logoIcon, "w-4 h-4")}
                </div>
                <div className="flex items-center gap-1">
                  {LOGO_OPTIONS.map(({ id, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDraft({ ...draft, logoIcon: id })}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        draft.logoIcon === id
                          ? "bg-purple-600 text-white border-purple-600 shadow-2xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Email */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-100">
              <label className="text-xs font-bold text-slate-700">Support Email</label>
              <input
                type="email"
                required
                value={draft.supportEmail}
                onChange={(e) => setDraft({ ...draft, supportEmail: e.target.value })}
                className="sm:w-56 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                placeholder="support@examiq.com"
              />
            </div>

            {/* Support Phone */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1">
              <label className="text-xs font-bold text-slate-700">Support Phone</label>
              <input
                type="tel"
                required
                value={draft.supportPhone}
                onChange={(e) => setDraft({ ...draft, supportPhone: e.target.value })}
                className="sm:w-56 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
                placeholder="+91 98765 43210"
              />
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
            <span>Edit Settings</span>
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
