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
  const [selectedBlind, setSelectedBlind] = useState(null);

  const blindItems = [
    {
      id: 'roller',
      name: 'Roller Blinds',
      icon: RollerBlindIcon,
    },
    {
      id: 'vertical',
      name: 'Vertical Blinds',
      icon: VerticalBlindIcon,
    },
    {
      id: 'venetian',
      name: 'Venetian Blinds',
      icon: VenetianBlindIcon,
    },
    {
      id: 'panel',
      name: 'Panel Blinds',
      icon: PanelBlindIcon,
    },
    {
      id: 'roman',
      name: 'Roman Blinds',
      icon: RomanBlindIcon,
    },
    {
      id: 'outdoor',
      name: 'Outdoor Shades',
      icon: OutdoorShadeIcon,
    },
    {
      id: 'more',
      name: 'and more...',
      icon: MoreIcon,
    }
  ];

  return (
    <section className="w-full border-t border-blue-100/60 bg-[#ecf5fe] py-14 sm:py-16" id="features">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-[27px] font-extrabold tracking-tight text-slate-900 sm:text-[30px]">
            Built for the Blinds Industry
          </h2>
          <p className="text-[14.5px] text-slate-600">
            Designed specifically for blind manufacturers and wholesalers like Purge.
          </p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {blindItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedBlind === item.id;

            return (
              <div
                key={item.id}
                className={`group flex min-h-[112px] flex-col items-center justify-center rounded-xl p-3 text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:bg-white/60 select-none ${
                  isSelected ? 'bg-sky-100/70 shadow-sm' : ''
                }`}
                onClick={() => setSelectedBlind(isSelected ? null : item.id)}
                title={item.name}
              >
                <div className="w-[52px] h-[42px] flex items-center justify-center mb-2.5">
                  <IconComponent className="w-[50px] h-[40px]" />
                </div>
                <span className="text-[13px] font-semibold text-slate-800 sm:text-[13.5px] lg:whitespace-nowrap group-hover:text-[#1967d2] transition-colors">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BlindsIndustry;
