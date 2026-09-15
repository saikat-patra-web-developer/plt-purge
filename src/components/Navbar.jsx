import React from 'react';
import PurgeLogo from './Logo';

export function Navbar({ currentPath = '/', onNavigate }) {
  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isGeneratePage = currentPath === '/generate';

  return (
    <header className="w-full bg-white border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center cursor-pointer select-none" 
          onClick={handleLogoClick}
          title="Purge Wholesale Blinds - Home"
        >
          <PurgeLogo className="h-9 w-auto" />
        </div>

        {/* Right Action Button */}
        <div className="flex items-center">
          {isGeneratePage ? (
            <button 
              type="button" 
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-[6px] text-[14px] font-semibold transition-all cursor-pointer border border-slate-200"
              onClick={() => onNavigate('/')}
              aria-label="Back to Home"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </button>
          ) : (
            <button 
              type="button" 
              className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] text-white px-5 py-2 rounded-[6px] text-[14px] font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              onClick={() => onNavigate('/generate')}
              aria-label="Go to Generate PLT page"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              <span>Generate PLT</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
