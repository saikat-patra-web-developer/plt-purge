import React, { useState } from 'react';
import {
  RollerBlindIcon,
  VerticalBlindIcon,
  VenetianBlindIcon,
  PanelBlindIcon,
  RomanBlindIcon,
  OutdoorShadeIcon,
  MoreIcon
} from './BlindIcons';

export function BlindsIndustry() {
  const [selectedBlind, setSelectedBlind] = useState('roller');

  const blindItems = [
    {
      id: 'roller',
      name: 'Roller Blinds',
      icon: RollerBlindIcon,
      tagline: 'Drop-first nesting with top wrap and bottom hem pocket allowances',
      detail: 'Locks fabric roll grain to prevent skewing and cupping on blockout, screen, and sheer rolls up to 3200mm width.'
    },
    {
      id: 'vertical',
      name: 'Vertical Blinds',
      icon: VerticalBlindIcon,
      tagline: 'Multi-slat batch nesting with uniform drop alignment',
      detail: 'Nests 89mm and 127mm vertical louvers across roll widths, grouping drops to minimize offcut waste.'
    },
    {
      id: 'venetian',
      name: 'Venetian Blinds',
      icon: VenetianBlindIcon,
      tagline: 'Precision slat cuts with ladder tape reference points',
      detail: 'Millimetre-accurate slat sizing with pen markers for ladder cords, headrail brackets, and bottom rails.'
    },
    {
      id: 'panel',
      name: 'Panel Blinds',
      icon: PanelBlindIcon,
      tagline: 'Multi-panel sliding blinds with balanced track overlaps',
      detail: 'Maintains uniform panel widths across 3, 4, and 5-channel track systems with precise velcro wrap allowances.'
    },
    {
      id: 'roman',
      name: 'Roman Blinds',
      icon: RomanBlindIcon,
      tagline: 'Fold allowance paths and ring line stitch coordinates',
      detail: 'Calculates cascading fold heights, dowel pocket clearances, and headrail mounting offsets in clean vector geometry.'
    },
    {
      id: 'outdoor',
      name: 'Outdoor Shades',
      icon: OutdoorShadeIcon,
      tagline: 'Heavy-duty zip screen mesh with spline and weld allowances',
      detail: 'Handles heavy PVC, sunfilter mesh, and blackout outdoor fabrics with side zip retention channel tolerances.'
    },
    {
      id: 'more',
      name: 'Custom Fabrications',
      icon: MoreIcon,
      tagline: 'Skylight blinds, conservatory shades, and custom textiles',
      detail: 'Input custom drops and widths for specialty window treatments and export directly to flatbed CNC tables.'
    }
  ];

  const activeItem = blindItems.find((b) => b.id === selectedBlind) || blindItems[0];

  return (
    <section className="w-full border-t border-blue-100/60 bg-[#ecf5fe] py-14 sm:py-16" id="features">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-10">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1967d2] bg-blue-100/70 px-3 py-1 rounded-full inline-block mb-2.5">
            Fabrication Standards
          </span>
          <h2 className="mb-2 text-[27px] font-extrabold tracking-tight text-slate-900 sm:text-[32px]">
            Engineered for Wholesale Blind Fabricators
          </h2>
          <p className="mx-auto max-w-[620px] text-[14.5px] text-slate-600 sm:text-[15.5px]">
            Every blind style requires specific cutting logic. Purge preserves fabric orientation and toolpath accuracy for all standard window coverings.
          </p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {blindItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedBlind === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`group flex min-h-[112px] flex-col items-center justify-center rounded-xl p-3 text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-white select-none border text-left ${
                  isSelected ? 'bg-white shadow-md border-blue-300 ring-2 ring-blue-500/20' : 'border-transparent hover:border-slate-200'
                }`}
                onClick={() => setSelectedBlind(item.id)}
                title={item.name}
              >
                <div className="w-[52px] h-[42px] flex items-center justify-center mb-2.5">
                  <IconComponent className="w-[50px] h-[40px]" />
                </div>
                <span className={`text-[13px] font-semibold sm:text-[13.5px] lg:whitespace-nowrap transition-colors ${isSelected ? 'text-[#1967d2] font-bold' : 'text-slate-800 group-hover:text-[#1967d2]'}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Informative details card for selected blind type */}
        {activeItem && (
          <div className="mt-6 rounded-xl border border-sky-200 bg-white/85 p-5 shadow-xs backdrop-blur-sm sm:p-6 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-3.5">
              <div>
                <span className="text-xs font-bold text-[#1967d2] uppercase tracking-wide">Cutting Profile</span>
                <h3 className="text-lg font-extrabold text-slate-900">{activeItem.name}</h3>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                {activeItem.tagline}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {activeItem.detail}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlindsIndustry;
