import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Enter Measurements',
      description: 'Input your blind details',
      icon: (
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      )
    },
    {
      num: 2,
      title: 'Configure Options',
      description: (
        <>
          Select material, cutting<br />settings and preferences
        </>
      ),
      icon: (
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
    {
      num: 3,
      title: 'Generate PLT File',
      description: (
        <>
          Get a machine-ready file<br />instantly
        </>
      ),
      icon: (
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      num: 4,
      title: 'Download & Cut',
      description: (
        <>
          Send to your cutting<br />machine
        </>
      ),
      icon: (
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-[#0a192e] relative overflow-hidden py-6" id="how-it-works">
      {/* Automated CNC Flatbed Blind Cutter Machine Background on Right */}
      <div className="absolute top-0 right-0 bottom-0 h-full w-[44%] max-w-[480px] pointer-events-none hidden md:flex items-center justify-end z-10">
        <picture className="h-full w-full">
          <source srcSet="/images/how-it-works-machine-v2@2x.webp 2x, /images/how-it-works-machine-v2.webp 1x" type="image/webp" />
          <img 
            src="/images/how-it-works-machine-v2.webp" 
            alt="Automated CNC flatbed blind cutting machine" 
            className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,transparent_0%,black_15%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%)]"
            loading="lazy"
          />
        </picture>
      </div>

      {/* Subtle overlay for mobile */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 md:hidden z-10">
        <img 
          src="/images/how-it-works-machine-v2.webp" 
          alt="" 
          className="h-full w-full object-cover object-right"
        />
      </div>

      <div className="max-w-[1120px] mx-auto px-6 relative z-20">
        {/* Section Heading */}
        <div className="text-center mb-5.5">
          <h2 className="text-[26px] font-extrabold text-white tracking-tight mb-1">
            How It Works
          </h2>
          <p className="text-[13.5px] text-[#8fa0b5]">
            Get your PLT file in just a few simple steps.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="flex flex-col md:flex-row items-start justify-start gap-4 md:gap-3 max-w-[670px]">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col flex-1 min-w-[125px]">
                {/* Header: Circle Badge + Icon */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[22px] h-[22px] min-w-[22px] rounded-full bg-[#1b2d45] text-slate-200 text-[11px] font-bold flex items-center justify-center">
                    <span>{step.num}</span>
                  </div>
                  <div className="text-white flex items-center">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[13px] font-bold text-white tracking-tight leading-tight mb-1">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-[#8fa0b5] leading-[1.35]">
                  {step.description}
                </p>
              </div>

              {/* Connecting Blue Arrow (aligned with title) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-[#2563eb] pt-7 px-0.5 self-start" aria-hidden="true">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
