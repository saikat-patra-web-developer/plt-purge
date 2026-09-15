import React from 'react';
import PurgeLogo from './Logo';

export function Footer() {
  return (
    <footer className="w-full border-t border-sky-200/70 bg-sky-100/55 py-6 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-5 px-5 sm:flex-row sm:px-6 lg:px-10">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <PurgeLogo className="h-7.5 w-auto" />
        </div>

        {/* Right: Copyright */}
        <div className="text-[12.5px] text-slate-500">
          <span>&copy; 2026 Purge Wholesale Blinds. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
