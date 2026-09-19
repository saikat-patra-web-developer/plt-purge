import React from 'react';

export function StreamlineCta({ onGenerateClick }) {
  const handleClick = () => {
    if (onGenerateClick) {
      onGenerateClick();
    } else {
      document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-gradient-to-r from-blue-50/70 via-sky-50/50 to-blue-50/70 border-t border-sky-200/70 py-14 backdrop-blur-[2px] sm:py-16" id="streamline">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start px-5 sm:px-6 lg:px-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1967d2] bg-blue-100/70 px-3 py-1 rounded-full inline-block mb-3">
          Get Started in Seconds
        </span>
        <h2 className="mb-3 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-[36px]">
          Cut More Blinds with Less Fabric Waste
        </h2>
        <p className="text-[14.5px] sm:text-[16px] text-slate-600 leading-relaxed mb-6 max-w-[580px]">
          Queue your window sizes, inspect the nested bed layout, and download machine-ready HPGL PLT and DXF files. No setup, no software licensing fees, and no CAD waiting times.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <button 
            type="button" 
            className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] text-white px-6 py-3 rounded-[6px] text-[15px] font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            onClick={handleClick}
          >
            <span>Launch Cutting Workspace</span>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Instant In-Browser Execution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Standard 40 units/mm HPGL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Batch Multi-Bed ZIP Archive</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StreamlineCta;
