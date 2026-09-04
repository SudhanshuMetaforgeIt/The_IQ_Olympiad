"use client";

import React from "react";
import { recentActivities } from "./mockData";

export function RecentActivitiesCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Recent Activities</h3>
        <button
          type="button"
          className="text-xs sm:text-sm font-bold text-[#3B1EAE] hover:text-purple-900 border border-slate-200 rounded-lg px-2.5 py-1 cursor-pointer transition-colors"
        >
          View all
        </button>
      </div>

      <div className="space-y-4 mt-5">
        {recentActivities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl ${act.bg} ${act.text} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {act.title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {act.subtitle}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
