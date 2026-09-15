import React from 'react';

export function PurgeLogo({ className = "brand-logo" }) {
  return (
    <div className={`logo-wrapper ${className} inline-flex items-center gap-2.5`} aria-label="Purge Wholesale Blinds">
      <span className="flex flex-col gap-1" aria-hidden="true">
        <span className="h-1.5 w-8 rounded-full bg-blue-700" />
        <span className="h-1.5 w-9 rounded-full bg-blue-500" />
        <span className="h-1.5 w-7 rounded-full bg-sky-400" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[24px] font-black tracking-[-0.8px] text-slate-950">Purge</span>
        <span className="mt-1 text-[6px] font-extrabold tracking-[2px] text-slate-500">WHOLESALE BLINDS</span>
      </span>
    </div>
  );
}

export default PurgeLogo;
