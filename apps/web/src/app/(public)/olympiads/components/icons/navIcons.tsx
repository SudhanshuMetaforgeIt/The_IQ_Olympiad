import React from "react";

export function SvgIcon({
  children,
  className = "size-4",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
    </SvgIcon>
  );
}

export function RotateCcw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </SvgIcon>
  );
}

export function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </SvgIcon>
  );
}

export function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </SvgIcon>
  );
}

export function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="m9 18 6-6-6-6" />
    </SvgIcon>
  );
}

export function Home(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </SvgIcon>
  );
}

export function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </SvgIcon>
  );
}

export function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </SvgIcon>
  );
}

export function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </SvgIcon>
  );
}

export function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <polyline points="20 6 9 17 4 12" />
    </SvgIcon>
  );
}

export function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </SvgIcon>
  );
}

export function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </SvgIcon>
  );
}

export function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </SvgIcon>
  );
}

export function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </SvgIcon>
  );
}

export function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <SvgIcon {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </SvgIcon>
  );
}
