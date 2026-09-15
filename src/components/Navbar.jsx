import React from 'react';
import PurgeLogo from './Logo';

export function Navbar({ onLoginClick }) {
  return (
    <header className="w-full bg-white border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-[1120px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center cursor-pointer select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <PurgeLogo className="h-9 w-auto" />
        </div>

        {/* Right Action: Login Button */}
        <div className="flex items-center">
          <button 
            type="button" 
            className="inline-flex items-center gap-1.5 bg-[#1967d2] hover:bg-[#1558b8] text-white px-5 py-2 rounded-[6px] text-[14px] font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            onClick={onLoginClick}
            aria-label="Login to account"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
