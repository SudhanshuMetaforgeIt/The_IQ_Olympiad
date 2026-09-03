/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "sans-serif"],
      },
      fontSize: {
        // Hero heading (56-64px, 700)
        hero: ["56px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }],
        "hero-desktop": ["64px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }],
        
        // Large page heading (40-48px, 700)
        "page-large": ["40px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.015em" }],
        "page-large-desktop": ["48px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.015em" }],
        
        // Page heading (32-36px, 700)
        h1: ["32px", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }],
        "h1-desktop": ["36px", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }],
        
        // Section heading (28-32px, 600-700)
        h2: ["28px", { lineHeight: "1.3", fontWeight: "700" }],
        "h2-desktop": ["32px", { lineHeight: "1.3", fontWeight: "700" }],
        
        // Subsection heading (24px, 600)
        h3: ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        
        // Card heading (18-20px, 600)
        "card-title": ["20px", { lineHeight: "1.35", fontWeight: "700" }],
        
        // Large body text (18px, 400)
        "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        
        // Normal body text (16px, 400)
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        
        // Dashboard / Menu text (14-16px, 500)
        menu: ["15px", { lineHeight: "1.5", fontWeight: "500" }],
        
        // Form labels (14px, 500-600)
        label: ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        
        // Buttons (14-16px, 600)
        button: ["15px", { lineHeight: "1.5", fontWeight: "500" }],
        
        // Table content (14px, 400)
        table: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        
        // Secondary information (13-14px, 400)
        secondary: ["13.5px", { lineHeight: "1.5", fontWeight: "400" }],
        
        // Caption / Metadata (12px, 400-500)
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
        
        // Badge text (12px, 600)
        badge: ["12px", { lineHeight: "1.4", fontWeight: "700" }],
        
        // Stat values (36-42px, 700, tabular-nums)
        stat: ["36px", { lineHeight: "1.1", fontWeight: "700" }],
        "stat-desktop": ["42px", { lineHeight: "1.1", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};
