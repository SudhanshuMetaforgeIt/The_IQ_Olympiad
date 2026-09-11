"use client";

import { ChevronDown } from "lucide-react";

export function AppearedStudentsTrendChart() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-body">Appeared Students Trend</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="relative w-full h-48">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
          {/* Background Grid Lines */}
          <line x1="40" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="50" x2="390" y2="50" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="80" x2="390" y2="80" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="110" x2="390" y2="110" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="40" y1="140" x2="390" y2="140" stroke="#F1F5F9" strokeWidth="1" />

          {/* Y-Axis Labels */}
          <text x="5" y="24" className="text-[9px] fill-slate-400 font-medium">2K</text>
          <text x="5" y="54" className="text-[9px] fill-slate-400 font-medium">1.5K</text>
          <text x="5" y="84" className="text-[9px] fill-slate-400 font-medium">1K</text>
          <text x="5" y="114" className="text-[9px] fill-slate-400 font-medium">500</text>
          <text x="5" y="144" className="text-[9px] fill-slate-400 font-medium">0</text>

          {/* Purple Gradient Fill */}
          <defs>
            <linearGradient id="purpleGradientAppeared" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B46C1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6B46C1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 50 128 L 110 110 L 170 92 L 230 85 L 290 68 L 350 48 L 350 140 L 50 140 Z"
            fill="url(#purpleGradientAppeared)"
          />

          {/* Purple Line */}
          <path
            d="M 50 128 L 110 110 L 170 92 L 230 85 L 290 68 L 350 48"
            fill="none"
            stroke="#6B46C1"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Hollow Data Circles with Value Labels */}
          {/* Point 1: 520 */}
          <circle cx="50" cy="128" r="4.5" fill="#FFFFFF" stroke="#6B46C1" strokeWidth="2.5" />
          <text x="50" y="118" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">520</text>

          {/* Point 2: 780 */}
          <circle cx="110" cy="110" r="4.5" fill="#FFFFFF" stroke="#6B46C1" strokeWidth="2.5" />
          <text x="110" y="100" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">780</text>

          {/* Point 3: 970 */}
          <circle cx="170" cy="92" r="4.5" fill="#FFFFFF" stroke="#6B46C1" strokeWidth="2.5" />
          <text x="170" y="82" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">970</text>

          {/* Point 4: 1,040 */}
          <circle cx="230" cy="85" r="4.5" fill="#FFFFFF" stroke="#6B46C1" strokeWidth="2.5" />
          <text x="230" y="75" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">1,040</text>

          {/* Point 5: 1,250 */}
          <circle cx="290" cy="68" r="4.5" fill="#FFFFFF" stroke="#6B46C1" strokeWidth="2.5" />
          <text x="290" y="58" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">1,250</text>

          {/* Point 6: 1,418 */}
          <circle cx="350" cy="48" r="5" fill="#6B46C1" stroke="#FFFFFF" strokeWidth="2" />
          <text x="350" y="38" textAnchor="middle" className="text-[10px] fill-purple-700 font-extrabold">1,418</text>
        </svg>
      </div>

      {/* Legend & X-Axis */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center space-x-1.5 text-caption font-semibold text-slate-500 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6B46C1]" />
          <span>Appeared Students</span>
        </div>
        <div className="flex items-center justify-between w-full text-[11px] font-medium text-slate-400 pl-6 pr-2">
          <span>Apr '25</span>
          <span>May '25</span>
          <span>Jun '25</span>
          <span>Jul '25</span>
          <span>Aug '25</span>
          <span>Sep '25</span>
        </div>
      </div>
    </div>
  );
}
