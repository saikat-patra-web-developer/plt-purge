import React from 'react';
import PurgeLogo from './Logo';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-6">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
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
