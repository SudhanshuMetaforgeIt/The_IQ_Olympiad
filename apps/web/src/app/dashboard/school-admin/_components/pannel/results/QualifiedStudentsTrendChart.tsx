"use client";

import { ChevronDown } from "lucide-react";

export function QualifiedStudentsTrendChart() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-body">Qualified Students Trend</h3>
        <div className="relative">
          <select className="appearance-none bg-slate-50 border border-slate-200 text-caption font-bold text-slate-700 py-1.5 pl-3 pr-7 rounded-full cursor-pointer focus:outline-none">
            <option>All Exams</option>
            <option>NSO</option>
            <option>IMO</option>
            <option>Cyber</option>
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
          <text x="5" y="24" className="text-[9px] fill-slate-400 font-medium">1,500</text>
          <text x="5" y="54" className="text-[9px] fill-slate-400 font-medium">1,150</text>
          <text x="5" y="84" className="text-[9px] fill-slate-400 font-medium">800</text>
          <text x="5" y="114" className="text-[9px] fill-slate-400 font-medium">450</text>
          <text x="5" y="144" className="text-[9px] fill-slate-400 font-medium">0</text>

          {/* Emerald Gradient Fill under path */}
          <defs>
            <linearGradient id="emeraldGradientQualified" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 50 120 L 110 95 L 170 78 L 230 82 L 290 55 L 350 28 L 350 140 L 50 140 Z"
            fill="url(#emeraldGradientQualified)"
          />

          {/* Smooth Curved Green Line */}
          <path
            d="M 50 120 L 110 95 L 170 78 L 230 82 L 290 55 L 350 28"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data Points with Data Labels */}
          {/* Point 1: 710 */}
          <circle cx="50" cy="120" r="4" fill="#10B981" />
          <text x="50" y="110" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">710</text>

          {/* Point 2: 920 */}
          <circle cx="110" cy="95" r="4" fill="#10B981" />
          <text x="110" y="85" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">920</text>

          {/* Point 3: 1,060 */}
          <circle cx="170" cy="78" r="4" fill="#10B981" />
          <text x="170" y="68" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">1,060</text>

          {/* Point 4: 1,030 */}
          <circle cx="230" cy="82" r="4" fill="#10B981" />
          <text x="230" y="72" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">1,030</text>

          {/* Point 5: 1,240 */}
          <circle cx="290" cy="55" r="4" fill="#10B981" />
          <text x="290" y="45" textAnchor="middle" className="text-[10px] fill-slate-900 font-bold">1,240</text>

          {/* Point 6: 1,418 */}
          <circle cx="350" cy="28" r="5" fill="#047857" stroke="#FFFFFF" strokeWidth="2" />
          <text x="350" y="18" textAnchor="middle" className="text-[10px] fill-emerald-700 font-extrabold">1,418</text>
        </svg>
      </div>

      {/* Legend and X-Axis */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center space-x-1.5 text-caption font-semibold text-slate-500 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span>Qualified Students</span>
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
