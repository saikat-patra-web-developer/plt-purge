import React from 'react';
import PurgeLogo from './Logo';

export function Footer() {
  return (
    <footer className="w-full border-t border-sky-200/70 bg-sky-100/60 py-8 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Left: Brand Logo & Mission */}
          <div className="flex flex-col gap-2 max-w-[480px]">
            <PurgeLogo className="h-8 w-auto" />
            <p className="text-xs leading-relaxed text-slate-500">
              Purge Wholesale Blinds provides high-efficiency CAD nesting tools and vector generators for automated CNC fabric cutting tables worldwide.
            </p>
          </div>

          {/* Right: Technical Entity Badges */}
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
            <span className="rounded-md border border-sky-200 bg-white/80 px-2.5 py-1">HPGL (40 units/mm)</span>
            <span className="rounded-md border border-sky-200 bg-white/80 px-2.5 py-1">AutoCAD DXF R12</span>
            <span className="rounded-md border border-sky-200 bg-white/80 px-2.5 py-1">Aeronaut Automation</span>
            <span className="rounded-md border border-sky-200 bg-white/80 px-2.5 py-1">Eastman Machine</span>
            <span className="rounded-md border border-sky-200 bg-white/80 px-2.5 py-1">Matic Cronos</span>
          </div>
        </div>

        {/* Bottom Bar: Privacy & Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-sky-200/60 pt-4 text-[12px] text-slate-500 sm:flex-row">
          <span>&copy; 2026 Purge Wholesale Blinds. All rights reserved.</span>
          <span className="text-slate-400">Client-Side Calculation · Your measurement data never leaves your browser</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
