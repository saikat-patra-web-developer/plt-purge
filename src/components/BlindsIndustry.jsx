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
    <section className="w-full bg-[#ecf5fe] py-11 border-t border-blue-100/60" id="features">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="text-center mb-8.5">
          <h2 className="text-[27px] font-extrabold text-slate-900 tracking-tight mb-1.5">
            Built for the Blinds Industry
          </h2>
          <p className="text-[14.5px] text-slate-600">
            Designed specifically for blind manufacturers and wholesalers like Purge.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 items-center justify-between">
          {blindItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedBlind === item.id;

            return (
              <div
                key={item.id}
                className={`group flex flex-col items-center text-center p-2 rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 select-none ${
                  isSelected ? 'bg-white/60 shadow-sm' : ''
                }`}
                onClick={() => setSelectedBlind(isSelected ? null : item.id)}
                title={item.name}
              >
                <div className="w-[52px] h-[42px] flex items-center justify-center mb-2.5">
                  <IconComponent className="w-[50px] h-[40px]" />
                </div>
                <span className="text-[13.5px] font-semibold text-slate-800 whitespace-nowrap group-hover:text-[#1967d2] transition-colors">
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
