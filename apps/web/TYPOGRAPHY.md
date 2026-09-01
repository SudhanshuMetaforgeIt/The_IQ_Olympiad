# IQ Olympiad Production Typography System (Roboto)

This document outlines the official typography scale, font sizes, weights, and component utility mappings for The IQ Olympiad application using the **Roboto** font family.

---

## 1. Font Setup & Global Definition

- **Primary Font Family**: `Roboto` loaded via Next.js `next/font/google` in `layout.tsx`.
- **CSS Variable**: `--font-roboto`
- **Default Font Class**: `font-sans` (`Roboto, system-ui, sans-serif`)
- **Weights Loaded**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black)
- **Numeric Formatting**: `font-variant-numeric: tabular-nums` (class `.tabular-nums` / `tabular-nums`) enabled across stats and numeric values to guarantee vertical digit alignment.

---

## 2. Official Type Scale & Weight Specification

| Element | Recommended Size | Font Weight | Tailwind Token / Utility Class | Usage |
| :--- | :---: | :---: | :--- | :--- |
| **Hero heading** | **56–64px** | **700** | `text-hero` | Hero section main display headlines |
| **Large page heading** | **40–48px** | **700** | `text-page-large` | Major promo/feature page banners |
| **Page heading** | **32–36px** | **700** | `text-h1` | Top level page titles (e.g. Dashboard header title) |
| **Section heading** | **28–32px** | **700** | `text-h2` | Primary section headers |
| **Subsection heading** | **24px** | **700** | `text-h3` | Subsection headers |
| **Card heading** | **18–20px** | **700** | `text-card-title` | Widget & card component titles |
| **Large body text** | **18px** | **400** | `text-body-lg` | Lead body text & hero descriptions |
| **Normal body text** | **16px** | **400** | `text-body` | Standard default UI & paragraph body text |
| **Dashboard/menu text** | **14–16px** | **500** | `text-menu` | Sidebar navigation & menu items |
| **Form labels** | **14px** | **500** | `text-label` | Input field labels |
| **Buttons** | **14–16px** | **500** | `text-button` | Buttons and primary action triggers |
| **Table content** | **14px** | **400** | `text-table` | Data table cells & body content |
| **Secondary information** | **13–14px** | **400** | `text-secondary` | Subtitles, welcome subtext |
| **Caption / metadata** | **12px** | **500** | `text-caption` | Timestamps, metadata, micro captions |
| **Badge text** | **12px** | **700** | `text-badge` | Status pills & badge tags |
