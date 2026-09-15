import React from 'react';

export function Hero({ onLoginClick }) {
  return (
    <section className="w-full bg-white py-11 overflow-hidden" id="hero">
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-7">
        {/* Left Column: Copy & Feature Highlights & CTAs */}
        <div className="flex flex-col">
          <h1 className="text-[44px] leading-[1.15] font-extrabold text-slate-900 tracking-[-1.2px] mb-4.5">
            PLT File Generator<br />
            <span className="font-medium text-slate-900 mr-1">for</span>{' '}
            <span className="text-[#1967d2] whitespace-nowrap">Blinds Manufacturing</span>
          </h1>

          <p className="text-[15.5px] leading-[1.55] text-slate-600 max-w-[480px] mb-8">
            Convert your blind measurements into precise PLT files, ready for cutting machines. Fast. Accurate. Reliable.
          </p>

          {/* 3 Feature Highlights in a row */}
          <div className="flex flex-col sm:flex-row items-start gap-5 mb-8.5">
            {/* Feature 1: Save Time */}
            <div className="flex items-start gap-2.5 flex-1">
              <div className="w-9 h-9 min-w-9 rounded-full bg-[#eaf3fe] flex items-center justify-center text-[#1967d2]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[13.5px] font-bold text-slate-900 leading-tight mb-0.5">Save Time</h2>
                <p className="text-[11.5px] text-slate-500 leading-snug">Generate files in seconds</p>
              </div>
            </div>

            {/* Feature 2: High Accuracy */}
            <div className="flex items-start gap-2.5 flex-1">
              <div className="w-9 h-9 min-w-9 rounded-full bg-[#eaf3fe] flex items-center justify-center text-[#1967d2]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <line x1="22" y1="12" x2="18" y2="12" />
                  <line x1="6" y1="12" x2="2" y2="12" />
                  <line x1="12" y1="6" x2="12" y2="2" />
                  <line x1="12" y1="22" x2="12" y2="18" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[13.5px] font-bold text-slate-900 leading-tight mb-0.5">High Accuracy</h2>
                <p className="text-[11.5px] text-slate-500 leading-snug">Reduce errors</p>
              </div>
            </div>

            {/* Feature 3: Works with Major Cutting Machines */}
            <div className="flex items-start gap-2.5 flex-1">
              <div className="w-9 h-9 min-w-9 rounded-full bg-[#eaf3fe] flex items-center justify-center text-[#1967d2]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[13.5px] font-bold text-slate-900 leading-tight mb-0.5">
                  Works with Major<br />Cutting Machines
                </h2>
                <p className="text-[11.5px] text-slate-500 leading-snug">Compatible & ready to use</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <button 
              type="button" 
              className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] text-white px-6 py-2.5 rounded-[6px] text-[14.5px] font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              onClick={onLoginClick}
            >
              <span>Login to Get Started</span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: High-fidelity Monitor & Desk Mockup WebP */}
        <div className="flex items-center justify-center relative">
          <div className="w-full max-w-[540px] relative hover:scale-[1.008] transition-transform duration-300">
            <picture>
              <source srcSet="/images/hero-monitor@2x.webp 2x, /images/hero-monitor.webp 1x" type="image/webp" />
              <img 
                src="/images/hero-monitor.webp" 
                alt="Purge PLT File Generator CAD software displayed on monitor with cutting settings" 
                className="w-full h-auto block object-contain"
                loading="eager"
                width="916"
                height="760"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
