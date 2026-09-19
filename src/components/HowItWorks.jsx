export function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Queue Window Sizes',
      description: (
        <>
          Enter width &amp; drop in millimetres.<br />Custom location tags keep cuts organized.
        </>
      ),
      icon: (
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      )
    },
    {
      num: 2,
      title: 'Configure Bed Limits',
      description: (
        <>
          Set maximum bed drop, roll width,<br />and your table&apos;s coordinate axis.
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
      title: 'Algorithmic Nesting',
      description: (
        <>
          Purge calculates lowest linear pull<br />while locking fabric grain alignment.
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
          Export machine-ready PLT or DXF<br />files singly or as a batch ZIP.
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
    <section className="relative w-full overflow-hidden bg-[#0a192e] py-14 sm:py-16" id="how-it-works">
      <div className="relative z-20 mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 px-3 py-1 rounded-full inline-block mb-2.5">
            Operator Workflow
          </span>
          <h2 className="mb-2 text-[27px] font-extrabold tracking-tight text-white sm:text-[32px]">
            From Measurement Sheet to Cutting Table
          </h2>
          <p className="mx-auto max-w-[560px] text-[13.5px] sm:text-[14.5px] text-[#8fa0b5]">
            Generate ready-to-run vector cut files in under two minutes without opening AutoCAD.
          </p>
        </div>

        {/* 4 Steps Row with Perfectly Centered Arrows */}
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, idx) => (
              <div key={step.num} className="group relative flex min-h-[150px] min-w-0 flex-col items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/50 p-5 text-center shadow-lg shadow-slate-950/10 transition-colors hover:border-blue-500/40 hover:bg-slate-900/70 sm:p-6">
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
                <h3 className="mb-1.5 text-[14px] font-bold leading-tight tracking-tight text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[12px] leading-[1.45] text-[#8fa0b5]">
                  {step.description}
                </p>
              {idx < steps.length - 1 && (
                <div className="absolute -right-[25px] top-1/2 hidden -translate-y-1/2 items-center justify-center text-[#3b82f6] lg:flex" aria-hidden="true">
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
