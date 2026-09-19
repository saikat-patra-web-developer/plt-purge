import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is a PLT file and why do blind cutting tables use it?',
      a: 'A PLT file is an HPGL (Hewlett-Packard Graphics Language) vector cut file. Industrial CNC flatbed cutting tables—such as those manufactured by Aeronaut Automation, Eastman Machine Company, and Matic—rely on PLT instructions to guide ultrasonic cutting wheels, laser heads, and rotary crush knives. Purge formats all PLT coordinates at the standard 40 units per millimetre resolution, ensuring sub-millimetre precision without scaling errors.'
    },
    {
      q: 'How does Purge ensure fabric grain and weave direction stay locked?',
      a: 'Standard nesting software often rotates rectangular pieces 90 degrees to cram more cuts into empty pockets. In the blinds industry, rotating fabric rotates the warp and weft weave, causing roller blinds to skew, cup, or hang crooked. Purge strictly locks grain orientation: every window drop remains parallel to your roll length (or roll width, depending on your selected axis mode).'
    },
    {
      q: 'Which cutting machine brands and CAM software are supported?',
      a: 'Purge outputs clean, vendor-neutral HPGL PLT and AutoCAD R12 DXF files. It is tested and compatible with Aeronaut Automation (Elektron, Cam-Tek), Eastman Machine Company, Matic (M1, Cronos Ultimate), Carlson Design plotters, Asco, and Solarise CNC tables. The DXF files can also be opened directly in AutoCAD, DraftSight, or any standard CAD/CAM suite.'
    },
    {
      q: 'Can I export DXF files for standard CAD software alongside PLT?',
      a: 'Yes. Purge exports both HPGL PLT and AutoCAD R12 DXF formats for every calculated bed run. The DXF files contain closed POLYLINE entities measured in millimetres, making it effortless to inspect cut layouts or apply machine-specific lead-ins in your CAM software.'
    },
    {
      q: 'Do I need to install software, create an account, or pay license fees?',
      a: 'No. Purge is a 100% browser-based fabrication tool. All nesting calculations run instantly on your machine with zero server delays, no subscriptions, and no software installations. Your shop measurements stay completely private on your workstation.'
    },
    {
      q: 'How does the batch ZIP download work for large commercial orders?',
      a: 'When an order exceeds the physical capacity of a single table pull, Purge groups the windows into sequential bed runs (e.g. Bed 1, Bed 2, Bed 3). Clicking "All PLT Zip" or "All DXF Zip" bundles every run into a single compressed archive named with the date, drops, and widths, ready for your cutting table operator to run in sequence.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full border-t border-sky-200/70 bg-gradient-to-b from-sky-50/60 to-white py-14 sm:py-18" id="faq">
      <div className="mx-auto w-full max-w-[960px] px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-[#1967d2] text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle size={14} />
            <span>Technical Reference &amp; FAQs</span>
          </div>
          <h2 className="text-[27px] font-extrabold tracking-tight text-slate-900 sm:text-[34px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-[14px] text-slate-600 sm:text-[15.5px]">
            Everything you need to know about CNC blind cutting formats, nesting logic, and machine compatibility.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-sky-200/80 bg-white/90 shadow-xs transition-all hover:border-blue-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-[15px] sm:text-[16px] font-bold text-slate-800 transition-colors hover:text-[#1967d2] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-[#1967d2]' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-sky-50/30 px-5 pb-5 pt-3.5 text-[14px] leading-relaxed text-slate-600">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Technical Note */}
        <div className="mt-8 rounded-xl border border-blue-200/80 bg-blue-50/50 p-4 text-center text-xs text-slate-600">
          <strong className="text-slate-900">Need custom HPGL pen speeds or machine tool commands?</strong>{' '}
          Our PLT export uses industry-standard <code className="rounded bg-white px-1.5 py-0.5 font-mono font-bold text-blue-700">IN; SP1; VS32;</code> pen up/down commands compatible with all modern cutting tables.
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
