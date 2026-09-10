import React from "react";
import { Calendar, Lightbulb, GraduationCap, Clock, Users, BarChart2, ShieldCheck } from "lucide-react";
import { DetailedOlympiadInfo } from "../data/olympiadDetailData";

interface OlympiadDetailSidebarProps {
  data: DetailedOlympiadInfo;
}

export default function OlympiadDetailSidebar({ data }: OlympiadDetailSidebarProps) {
  const getDotClass = (dotColor: string) => {
    switch (dotColor) {
      case "green":
        return "bg-emerald-500 ring-4 ring-emerald-50";
      case "amber":
        return "bg-amber-500 ring-4 ring-amber-50";
      case "purple":
        return "bg-purple-600 ring-4 ring-purple-50";
      default:
        return "bg-purple-600 ring-4 ring-purple-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Important Dates Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <Calendar className="size-4.5 stroke-[2.2]" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Important Dates
          </h3>
        </div>

        <div className="space-y-4 pt-1">
          {data.importantDates.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <span className={`size-2 rounded-full shrink-0 ${getDotClass(item.dotColor)}`} />
                <span className="text-xs font-semibold text-slate-700">{item.label}</span>
              </div>
              <span className="text-xs font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Quick Facts Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <Lightbulb className="size-4.5 stroke-[2.2]" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Quick Facts
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-700 shrink-0">
              <GraduationCap className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Classes</span>
              <span className="text-xs font-black text-slate-900">{data.classes}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-700 shrink-0">
              <Clock className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Duration</span>
              <span className="text-xs font-black text-slate-900">{data.duration}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-700 shrink-0">
              <Users className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Participants</span>
              <span className="text-xs font-black text-slate-900">{data.participants}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-700 shrink-0">
              <BarChart2 className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Difficulty</span>
              <span className="text-xs font-black text-slate-900">{data.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Verification Note */}
        <div className="mt-4 flex items-center gap-2 pt-3.5 border-t border-slate-100 text-[11px] text-slate-500">
          <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
          <span>Officially certified curriculum and schedule</span>
        </div>
      </div>
    </div>
  );
}
