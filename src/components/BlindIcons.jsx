import React from 'react';

// Precision SVG icons matching the exact mockup line art style
export function RollerBlindIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Roller tube top */}
      <path d="M7 9C7 5.5 8.5 5 20 5H39C42 5 44 6.5 44 9C44 11.5 42 13 39 13H20C8.5 13 7 12.5 7 9Z" stroke="#1e293b" strokeWidth="2.2" strokeLinejoin="round" />
      {/* End cap circle on right */}
      <ellipse cx="39" cy="9" rx="3.5" ry="4" stroke="#1e293b" strokeWidth="2.2" />
      <circle cx="39" cy="9" r="1.4" fill="#1e293b" />
      {/* Left cap curve */}
      <path d="M12 5C9 5 7 6.8 7 9C7 11.2 9 13 12 13" stroke="#1e293b" strokeWidth="2.2" />
      {/* Fabric hanging down */}
      <path d="M9 13V35H37V13" stroke="#1e293b" strokeWidth="2.2" strokeLinejoin="round" fill="rgba(255,255,255,0.7)" />
      {/* Bottom hem bar */}
      <line x1="7" y1="35" x2="39" y2="35" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function VerticalBlindIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Headrail */}
      <line x1="8" y1="7" x2="46" y2="7" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
      {/* Top hanger clips */}
      <line x1="14" y1="7" x2="14" y2="10" stroke="#1e293b" strokeWidth="1.8" />
      <line x1="22" y1="7" x2="22" y2="10" stroke="#1e293b" strokeWidth="1.8" />
      <line x1="30" y1="7" x2="30" y2="10" stroke="#1e293b" strokeWidth="1.8" />
      <line x1="38" y1="7" x2="38" y2="10" stroke="#1e293b" strokeWidth="1.8" />
      {/* 4 Vertical Slats */}
      <rect x="11.5" y="10" width="5" height="26" rx="2.5" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="19.5" y="10" width="5" height="26" rx="2.5" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="27.5" y="10" width="5" height="26" rx="2.5" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="35.5" y="10" width="5" height="26" rx="2.5" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}

export function VenetianBlindIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 5 Stacked horizontal slats with smooth rounded ends */}
      <rect x="9" y="6" width="36" height="4.5" rx="2.25" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="9" y="13" width="36" height="4.5" rx="2.25" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="9" y="20" width="36" height="4.5" rx="2.25" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="9" y="27" width="36" height="4.5" rx="2.25" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="9" y="34" width="36" height="4.5" rx="2.25" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      {/* Ladder strings */}
      <line x1="18" y1="6" x2="18" y2="38" stroke="#1e293b" strokeWidth="1" strokeDasharray="1 3" />
      <line x1="36" y1="6" x2="36" y2="38" stroke="#1e293b" strokeWidth="1" strokeDasharray="1 3" />
    </svg>
  );
}

export function PanelBlindIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top track */}
      <line x1="8" y1="7" x2="46" y2="7" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
      {/* 3 Overlapping sliding panels */}
      <rect x="11" y="9" width="11" height="28" stroke="#1e293b" strokeWidth="2" fill="white" />
      <rect x="20" y="9" width="11" height="28" stroke="#1e293b" strokeWidth="2" fill="white" />
      <rect x="29" y="9" width="11" height="28" stroke="#1e293b" strokeWidth="2" fill="white" />
      {/* Right track stop */}
      <path d="M40 7V13" stroke="#1e293b" strokeWidth="1.5" />
    </svg>
  );
}

export function RomanBlindIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top headrail with cords */}
      <line x1="10" y1="6" x2="44" y2="6" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="12" y1="6" x2="12" y2="9" stroke="#1e293b" strokeWidth="1.8" />
      <line x1="42" y1="6" x2="42" y2="9" stroke="#1e293b" strokeWidth="1.8" />
      {/* 3 Cascading folded fabric tiers */}
      <rect x="11" y="9" width="32" height="8" rx="2" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="11" y="17" width="32" height="8" rx="2" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      <rect x="11" y="25" width="32" height="8" rx="2" stroke="#1e293b" strokeWidth="2" fill="rgba(255,255,255,0.8)" />
      {/* Bottom fold line */}
      <line x1="13" y1="35" x2="41" y2="35" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function OutdoorShadeIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top cassette box */}
      <rect x="8" y="7" width="38" height="7" rx="1.5" stroke="#1e293b" strokeWidth="2" fill="white" />
      {/* Side channels / posts */}
      <line x1="10" y1="14" x2="10" y2="36" stroke="#1e293b" strokeWidth="2" />
      <line x1="44" y1="14" x2="44" y2="36" stroke="#1e293b" strokeWidth="2" />
      {/* Mounting feet */}
      <line x1="8" y1="36" x2="12" y2="36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="46" y2="36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      {/* Mesh fabric area with pattern */}
      <rect x="12" y="14" width="30" height="20" fill="url(#meshPattern)" stroke="#cbd5e1" strokeWidth="1" />
      {/* Bottom weighted rail */}
      <line x1="11" y1="34" x2="43" y2="34" stroke="#1e293b" strokeWidth="2.2" />
      <defs>
        <pattern id="meshPattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.75" fill="#94a3b8" />
        </pattern>
      </defs>
    </svg>
  );
}

export function MoreIcon({ className = "blind-icon-svg" }) {
  return (
    <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="17" cy="22" r="2.8" fill="#1e293b" />
      <circle cx="27" cy="22" r="2.8" fill="#1e293b" />
      <circle cx="37" cy="22" r="2.8" fill="#1e293b" />
    </svg>
  );
}
