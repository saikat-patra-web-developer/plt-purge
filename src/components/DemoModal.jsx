import React, { useState } from 'react';

export function DemoModal({ isOpen, onClose }) {
  const [blindType, setBlindType] = useState('Roller Blind');
  const [width, setWidth] = useState(1200);
  const [drop, setDrop] = useState(1500);
  const [fabric, setFabric] = useState('Sunfilter');
  const [includeTube, setIncludeTube] = useState(true);
  const [includeRail, setIncludeRail] = useState(true);
  const [includeNotch, setIncludeNotch] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedFile({
        name: `PURGE_${blindType.replace(/\s+/g, '_').toUpperCase()}_${width}x${drop}.plt`,
        size: '14.2 KB',
        date: new Date().toLocaleTimeString(),
        commands: 842,
        cutTime: '42s'
      });
    }, 600);
  };

  const handleDownload = () => {
    if (!generatedFile) return;
    const content = `IN;SP1;PA;PU;PA0,0;PD;PR${width * 10},0;PR0,${drop * 10};PR-${width * 10},0;PR0,-${drop * 10};PU;`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = generatedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-[fadeIn_0.2s_ease]" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-[860px] p-6 text-slate-100 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4.5 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold tracking-wider text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded inline-block mb-1">
              LIVE CAD PREVIEW
            </span>
            <h3 className="text-lg font-bold text-white m-0">Purge PLT Generator Studio</h3>
          </div>
          <button className="text-2xl text-slate-400 hover:text-white leading-none p-1 rounded cursor-pointer transition-colors" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
          {/* Left: Interactive CAD Canvas */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
            <div className="flex-1 min-h-[320px] flex items-center justify-center">
              {/* CAD drawing lines simulation */}
              <svg className="w-full h-full" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background coordinate grid */}
                <defs>
                  <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                  </pattern>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)" />
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
                  </pattern>
                </defs>
                <rect width="500" height="400" fill="url(#grid)" />

                {/* Blinds pieces nested layout */}
                <g stroke="#38bdf8" strokeWidth="1.5">
                  {/* Main Fabric Sheet */}
                  <rect x="30" y="30" width="260" height="60" rx="3" stroke="#f43f5e" strokeDasharray="4 2" />
                  <text x="40" y="48" fill="#94a3b8" fontSize="10" fontFamily="monospace">PANEL 1 • {width} x {Math.round(drop * 0.3)} mm</text>

                  <rect x="30" y="105" width="260" height="60" rx="3" stroke="#38bdf8" />
                  <text x="40" y="123" fill="#94a3b8" fontSize="10" fontFamily="monospace">PANEL 2 • {width} x {Math.round(drop * 0.3)} mm</text>

                  <rect x="30" y="180" width="260" height="60" rx="3" stroke="#38bdf8" />
                  <text x="40" y="198" fill="#94a3b8" fontSize="10" fontFamily="monospace">PANEL 3 • {width} x {Math.round(drop * 0.3)} mm</text>

                  <rect x="30" y="255" width="260" height="60" rx="3" stroke="#38bdf8" />
                  <text x="40" y="273" fill="#94a3b8" fontSize="10" fontFamily="monospace">PANEL 4 • {width} x {Math.round(drop * 0.3)} mm</text>

                  <rect x="30" y="330" width="260" height="45" rx="3" stroke="#eab308" strokeDasharray="3 3" />
                  <text x="40" y="348" fill="#94a3b8" fontSize="10" fontFamily="monospace">TOP TUBE ALLOWANCE</text>

                  {/* Right Nested Pieces */}
                  <rect x="310" y="30" width="160" height="180" rx="3" stroke="#22c55e" />
                  <text x="320" y="50" fill="#94a3b8" fontSize="10" fontFamily="monospace">DROP CUT • {drop} mm</text>

                  {includeRail && (
                    <>
                      <rect x="310" y="230" width="160" height="60" rx="3" stroke="#38bdf8" />
                      <text x="320" y="250" fill="#94a3b8" fontSize="10" fontFamily="monospace">BOTTOM RAIL POCKET</text>
                    </>
                  )}

                  {includeNotch && (
                    <>
                      <rect x="310" y="305" width="160" height="70" rx="3" stroke="#a855f7" />
                      <text x="320" y="325" fill="#94a3b8" fontSize="10" fontFamily="monospace">FABRIC NOTCH SLOTS</text>
                    </>
                  )}
                </g>

                {/* Cutting pen origin indicator */}
                <circle cx="30" cy="30" r="4" fill="#f43f5e" />
                <line x1="20" y1="30" x2="40" y2="30" stroke="#f43f5e" strokeWidth="1" />
                <line x1="30" y1="20" x2="30" y2="40" stroke="#f43f5e" strokeWidth="1" />
                <text x="48" y="25" fill="#f43f5e" fontSize="9" fontWeight="bold">ORIGIN (0,0)</text>
              </svg>
            </div>

            <div className="flex justify-between px-3 py-2 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400">
              <span>Fabric: <strong className="text-slate-200">{fabric}</strong></span>
              <span>Dimensions: <strong className="text-slate-200">{width} &times; {drop} mm</strong></span>
              <span>Units: <strong className="text-slate-200">HPGL / PLT Vector</strong></span>
            </div>
          </div>

          {/* Right: Controller Sidebar matching the mockup UI */}
          <div className="bg-slate-800/70 border border-slate-700/60 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Blind Type</label>
              <select 
                className="bg-slate-900 border border-slate-700 text-slate-100 px-2.5 py-1.5 rounded text-[13px] outline-none"
                value={blindType} 
                onChange={(e) => setBlindType(e.target.value)}
              >
                <option value="Roller Blind">Roller Blind</option>
                <option value="Vertical Blind">Vertical Blind</option>
                <option value="Venetian Blind">Venetian Blind</option>
                <option value="Panel Blind">Panel Blind</option>
                <option value="Roman Blind">Roman Blind</option>
                <option value="Outdoor Shade">Outdoor Shade</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Width (mm)</label>
              <input 
                type="number" 
                className="bg-slate-900 border border-slate-700 text-slate-100 px-2.5 py-1.5 rounded text-[13px] outline-none"
                value={width} 
                onChange={(e) => setWidth(Number(e.target.value))} 
                min="200" 
                max="5000" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Drop (mm)</label>
              <input 
                type="number" 
                className="bg-slate-900 border border-slate-700 text-slate-100 px-2.5 py-1.5 rounded text-[13px] outline-none"
                value={drop} 
                onChange={(e) => setDrop(Number(e.target.value))} 
                min="200" 
                max="5000" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300">Fabric</label>
              <input 
                type="text" 
                className="bg-slate-900 border border-slate-700 text-slate-100 px-2.5 py-1.5 rounded text-[13px] outline-none"
                value={fabric} 
                onChange={(e) => setFabric(e.target.value)} 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-300 mt-1">Cutting Options</label>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeTube} 
                    onChange={(e) => setIncludeTube(e.target.checked)} 
                    className="rounded text-[#1967d2]"
                  />
                  <span>Include Tube</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeRail} 
                    onChange={(e) => setIncludeRail(e.target.checked)} 
                    className="rounded text-[#1967d2]"
                  />
                  <span>Include Bottom Rail</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeNotch} 
                    onChange={(e) => setIncludeNotch(e.target.checked)} 
                    className="rounded text-[#1967d2]"
                  />
                  <span>Include Fabric Notch</span>
                </label>
              </div>
            </div>

            <button 
              type="button" 
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2.5 rounded-[6px] text-[13.5px] font-semibold mt-2 transition-colors cursor-pointer"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? 'Calculating CAD nesting...' : 'Generate PLT'}
            </button>

            {generatedFile && (
              <div className="mt-2.5 p-2.5 bg-green-500/10 border border-green-500/30 rounded-[6px] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div>
                    <span className="text-xs font-bold text-green-400 block">{generatedFile.name}</span>
                    <span className="text-[10.5px] text-green-300">{generatedFile.size} • {generatedFile.cutTime} estimated cut</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="bg-green-600 hover:bg-green-700 text-white py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors" 
                  onClick={handleDownload}
                >
                  Download .PLT File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoModal;
