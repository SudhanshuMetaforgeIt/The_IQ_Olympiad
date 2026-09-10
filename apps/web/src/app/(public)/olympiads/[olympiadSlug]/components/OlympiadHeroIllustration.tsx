interface Props {
  slug?: string;
}

export default function OlympiadHeroIllustration({ slug }: Props) {
  const getSubjectTexts = () => {
    switch (slug) {
      case "ieo":
        return { b1: "LITERATURE", b2: "VOCABULARY", b3: "GRAMMAR", w1: "Read", w2: "Express", w3: "Excel" };
      case "nco":
        return { b1: "NETWORKING", b2: "SECURITY", b3: "ALGORITHMS", w1: "Code", w2: "Build", w3: "Secure" };
      case "ai-olympiad":
        return { b1: "ROBOTICS", b2: "DATA SCIENCE", b3: "NEURAL NETS", w1: "Innovate", w2: "Lead", w3: "Transform" };
      case "imo":
        return { b1: "CALCULUS", b2: "GEOMETRY", b3: "ALGEBRA", w1: "Calculate", w2: "Reason", w3: "Solve" };
      default:
        return { b1: "BIOLOGY", b2: "CHEMISTRY", b3: "PHYSICS", w1: "Think", w2: "Explore", w3: "Achieve" };
    }
  };

  const texts = getSubjectTexts();

  return (
    <div className="relative w-full max-w-[460px] h-[240px] sm:h-[260px] flex items-center justify-center select-none">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/40 via-purple-100/30 to-emerald-100/40 rounded-full blur-2xl -z-10" />

      <svg
        viewBox="0 0 480 260"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floating Science Background Elements */}
        {/* Cyan Atom */}
        <g opacity="0.65" transform="translate(40, 30)">
          <ellipse cx="25" cy="25" rx="22" ry="8" stroke="#38bdf8" strokeWidth="1.8" transform="rotate(-30 25 25)" />
          <ellipse cx="25" cy="25" rx="22" ry="8" stroke="#38bdf8" strokeWidth="1.8" transform="rotate(30 25 25)" />
          <ellipse cx="25" cy="25" rx="22" ry="8" stroke="#38bdf8" strokeWidth="1.8" transform="rotate(90 25 25)" />
          <circle cx="25" cy="25" r="3.5" fill="#0284c7" />
        </g>


        {/* DNA Helix Graphic */}
        <g opacity="0.75" transform="translate(100, 60)">
          <path d="M0,0 Q10,15 0,30 T0,60" stroke="#06b6d4" strokeWidth="2" fill="none" />
          <path d="M12,0 Q2,15 12,30 T12,60" stroke="#0891b2" strokeWidth="2" fill="none" />
          <line x1="2" y1="8" x2="10" y2="8" stroke="#0891b2" strokeWidth="1.5" />
          <line x1="1" y1="22" x2="11" y2="22" stroke="#0891b2" strokeWidth="1.5" />
          <line x1="2" y1="38" x2="10" y2="38" stroke="#0891b2" strokeWidth="1.5" />
          <line x1="1" y1="52" x2="11" y2="52" stroke="#0891b2" strokeWidth="1.5" />
        </g>

        {/* Hexagonal Molecule */}
        <g opacity="0.6" stroke="#14b8a6" strokeWidth="1.8" transform="translate(20, 120)">
          <polygon points="12,0 24,7 24,21 12,28 0,21 0,7" fill="none" />
          <circle cx="12" cy="0" r="2.5" fill="#14b8a6" />
          <circle cx="24" cy="7" r="2.5" fill="#14b8a6" />
          <circle cx="24" cy="21" r="2.5" fill="#14b8a6" />
          <circle cx="12" cy="28" r="2.5" fill="#14b8a6" />
          <circle cx="0" cy="21" r="2.5" fill="#14b8a6" />
          <circle cx="0" cy="7" r="2.5" fill="#14b8a6" />
        </g>

        {/* Stack of 3 Books */}
        {/* Bottom Book: BIOLOGY (Green) */}
        <g transform="translate(70, 160)">
          <path d="M10,0 L110,0 C116,0 120,4 120,10 L120,24 C120,30 116,34 110,34 L10,34 C4,34 0,30 0,24 L0,10 C0,4 4,0 10,0 Z" fill="#16a34a" />
          <path d="M0,6 L120,6 L120,28 L0,28 Z" fill="#15803d" />
          <path d="M120,4 L132,4 L132,30 L120,30 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <text x="60" y="21" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8">{texts.b1}</text>
        </g>

        {/* Middle Book (Orange) */}
        <g transform="translate(70, 130)">
          <path d="M10,0 L110,0 C116,0 120,4 120,10 L120,24 C120,30 116,34 110,34 L10,34 C4,34 0,30 0,24 L0,10 C0,4 4,0 10,0 Z" fill="#ea580c" />
          <path d="M0,6 L120,6 L120,28 L0,28 Z" fill="#c2410c" />
          <path d="M120,4 L132,4 L132,30 L120,30 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <text x="60" y="21" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="0.6">{texts.b2}</text>
        </g>

        {/* Top Book (Blue) */}
        <g transform="translate(70, 100)">
          <path d="M10,0 L110,0 C116,0 120,4 120,10 L120,24 C120,30 116,34 110,34 L10,34 C4,34 0,30 0,24 L0,10 C0,4 4,0 10,0 Z" fill="#2563eb" />
          <path d="M0,6 L120,6 L120,28 L0,28 Z" fill="#1d4ed8" />
          <path d="M120,4 L132,4 L132,30 L120,30 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <text x="60" y="21" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8">{texts.b3}</text>
        </g>

        {/* Microscope in Blue/Indigo */}
        <g transform="translate(205, 75)">
          {/* Eyepiece tube */}
          <rect x="26" y="8" width="10" height="24" rx="2" fill="#1e40af" transform="rotate(30 31 20)" />
          <rect x="23" y="0" width="16" height="8" rx="2" fill="#3b82f6" transform="rotate(30 31 4)" />
          {/* Objective revolving nosepiece */}
          <circle cx="48" cy="48" r="10" fill="#2563eb" />
          <rect x="44" y="56" width="6" height="14" rx="2" fill="#60a5fa" />
          {/* Curved Arm */}
          <path d="M48,46 C68,46 72,82 58,102 L58,110" stroke="#1d4ed8" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Stage */}
          <rect x="20" y="76" width="38" height="6" rx="2" fill="#1e3a8a" />
          {/* Adjustment knobs */}
          <circle cx="62" cy="74" r="5" fill="#38bdf8" />
          {/* Base */}
          <ellipse cx="44" cy="116" rx="34" ry="7" fill="#1e40af" />
          <ellipse cx="44" cy="113" rx="30" ry="5" fill="#3b82f6" />
        </g>

        {/* Plant Seedling Growing in Flask */}
        <g transform="translate(285, 100)">
          {/* Flask Body */}
          <path d="M18,34 L2,80 C0,86 4,92 11,92 L43,92 C50,92 54,86 52,80 L36,34 L36,18 L18,18 Z" fill="rgba(240,253,250,0.6)" stroke="#0d9488" strokeWidth="2.2" />
          {/* Green Liquid in Flask */}
          <path d="M6,80 L11,90 L43,90 L48,80 C44,78 38,82 32,80 C26,78 20,82 14,80 C10,79 8,80 6,80 Z" fill="#22c55e" opacity="0.75" />
          {/* Sprout stem & leaves */}
          <path d="M27,55 Q27,24 25,6" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Left Leaf */}
          <path d="M26,18 C14,14 10,4 25,2 C27,8 26,14 26,18 Z" fill="#4ade80" stroke="#15803d" strokeWidth="1.2" />
          {/* Right Leaf */}
          <path d="M26,10 C38,6 42,-4 27,-6 C25,0 26,6 26,10 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.2" />
        </g>

        {/* Dynamic Slogan */}
        <g transform="translate(355, 60)">
          <text x="20" y="0" fill="#312e81" fontSize="16" fontWeight="800" fontStyle="italic" letterSpacing="-0.3">{texts.w1}</text>
          <text x="28" y="24" fill="#3730a3" fontSize="18" fontWeight="800" fontStyle="italic" letterSpacing="-0.3">{texts.w2}</text>
          <text x="36" y="50" fill="#4338ca" fontSize="21" fontWeight="900" fontStyle="italic" letterSpacing="-0.3">{texts.w3}</text>
          {/* Dynamic Underline Swoosh */}
          <path d="M36,60 Q80,48 108,44" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
