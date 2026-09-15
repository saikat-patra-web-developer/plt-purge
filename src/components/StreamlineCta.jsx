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
    <section className="w-full bg-white py-11" id="streamline">
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-start">
        <h2 className="text-[30px] font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-2.5">
          Ready to Streamline<br />
          Your Production?
        </h2>
        <p className="text-[14.5px] text-slate-600 leading-normal mb-5.5 max-w-[420px]">
          Start generating precise PLT files for your blinds today.
        </p>

        <div>
          <button 
            type="button" 
            className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] text-white px-5.5 py-2.5 rounded-[6px] text-[14.5px] font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            onClick={handleClick}
          >
            <span>Generate PLT</span>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default StreamlineCta;
