import React from 'react';

export function Hero({ onGenerateClick }) {
  const handleClick = () => {
    if (onGenerateClick) {
      onGenerateClick();
    } else {
      document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full overflow-hidden bg-transparent py-14 sm:py-16 lg:py-20" id="hero">
      <div className="mx-auto flex w-full max-w-[1280px] items-center px-5 sm:px-6 lg:px-10">
        {/* Left Column: Copy & Feature Highlights & CTAs */}
        <div className="flex w-full max-w-[760px] flex-col">
          <h1 className="mb-5 text-[36px] font-extrabold leading-[1.1] tracking-[-1.2px] text-slate-900 sm:text-[44px] lg:text-[52px]">
            PLT File Generator<br />
            for <span className="text-[#1967d2]">Blinds Manufacturing</span>
          </h1>

          <p className="mb-8 max-w-[560px] text-[15px] font-normal leading-[1.65] text-slate-500 sm:text-[16px]">
            Convert your blind measurements into precise PLT files, ready for cutting machines. Fast. Accurate. Reliable.
          </p>

          {/* Three Feature Pillars */}
          <div className="mb-9 grid max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {/* Save Time */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-[#1967d2] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Save Time</span>
                <span className="text-[11.5px] text-slate-400 mt-0.5">Generate files in seconds</span>
              </div>
            </div>

            {/* High Accuracy */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-[#1967d2] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">High Accuracy</span>
                <span className="text-[11.5px] text-slate-400 mt-0.5">Reduce errors</span>
              </div>
            </div>

            {/* Works with Major Cutting Machines */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-[#1967d2] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-800 leading-tight">Works with Major Cutting Machines</span>
                <span className="text-[11.5px] text-slate-400 mt-0.5">Compatible &amp; ready to use</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button 
              type="button" 
              className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] text-white px-6 py-2.5 rounded-[6px] text-[14.5px] font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              onClick={handleClick}
            >
              <span>Generate PLT</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
