import React, { useRef, useState } from 'react';
import { AlertTriangle, Cpu, RotateCcw, X } from 'lucide-react';
import CncExportModal from './CncExportModal';

export function GeneratorHome() {
  const initialRows = [
    {
      id: 1,
      location: 'Window 1',
      width: 1200,
      drop: 1500
    }
  ];

  const [rows, setRows] = useState(initialRows);
  const [maxBedDrop, setMaxBedDrop] = useState(3000);
  const [maxBedWidth, setMaxBedWidth] = useState(3000);
  const [popup, setPopup] = useState(null);
  const nextWindowNumber = useRef(2);

  // Add new row
  const handleAddRow = () => {
    const newId = Date.now();
    const newRow = {
      id: newId,
      location: `Window ${nextWindowNumber.current}`,
      width: 1000,
      drop: 1200
    };
    nextWindowNumber.current += 1;
    setRows(prevRows => [...prevRows, newRow]);
  };

  // Reset rows back to default initial state
  const handleReset = () => {
    setPopup('reset');
  };

  const confirmReset = () => {
    setRows([
      {
        id: 1,
        location: 'Window 1',
        width: 1200,
        drop: 1500
      }
    ]);
    nextWindowNumber.current = 2;
    setPopup(null);
  };

  // Update a single field in a row
  const handleUpdateRow = (id, field, value) => {
    setRows(prevRows => prevRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Delete a row
  const handleDeleteRow = (id) => {
    if (rows.length === 1) {
      setPopup('minimum-row');
      return;
    }
    const updated = rows.filter(r => r.id !== id);
    setRows(updated);
  };

  return (
    <section id="generate" className="relative isolate flex-1 w-full overflow-hidden border-t border-sky-200/60 py-10 text-slate-900 md:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.18)_46%,transparent_100%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6">
        {/* Section Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                CNC &amp; CAD Cutting Export
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Xiao-compatible cutting workspace
              </p>
            </div>
          </div>
        </div>

        <div>
          <CncExportModal
            rows={rows}
            maxBedDrop={Number(maxBedDrop)}
            maxBedWidth={Number(maxBedWidth)}
            onMaxBedDropChange={setMaxBedDrop}
            onMaxBedWidthChange={setMaxBedWidth}
          >
          {/* Measurements Table & Actions */}
          <div className="overflow-hidden rounded-xl border border-sky-200/80 bg-sky-50/75 shadow-xs backdrop-blur-xl">
            {/* Table Header Bar */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1967d2]"></span>
                <h3 className="text-base font-bold text-slate-800">
                  Measurement Queue ({rows.length} {rows.length === 1 ? 'item' : 'items'})
                </h3>
              </div>

              {/* Action Buttons: Add Row & Reset */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-sky-100/80 hover:bg-sky-200/80 border border-sky-200 px-3 py-1.5 rounded-[6px] transition-colors cursor-pointer"
                  title="Reset all rows back to default"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddRow}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1967d2] hover:bg-[#1558b8] px-3.5 py-1.5 rounded-[6px] shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add New Row</span>
                </button>
              </div>
            </div>

            {/* Editable Measurements Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <colgroup>
                  <col className="w-10" />
                  <col />
                  <col className="w-[140px]" />
                  <col className="w-[140px]" />
                  <col className="w-14" />
                </colgroup>
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">#</th>
                    <th className="py-3 px-3 min-w-[140px]">Location</th>
                    <th className="py-3 px-3 whitespace-nowrap">Width (mm)</th>
                    <th className="py-3 px-3 whitespace-nowrap">Drop (mm)</th>
                    <th className="py-3 px-3 w-10 text-center">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {rows.map((row, index) => {
                    return (
                      <tr
                        key={row.id}
                        className="transition-colors hover:bg-slate-50/60"
                      >
                        {/* Index */}
                        <td className="py-3 px-3 text-center font-bold text-xs text-slate-400">
                          {index + 1}
                        </td>

                        {/* Window Location */}
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center rounded-[6px] bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#1967d2]">
                            {row.location}
                          </span>
                        </td>

                        {/* Width */}
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            min="200"
                            max={maxBedWidth || undefined}
                            step="10"
                            value={row.width}
                            onChange={(e) => handleUpdateRow(row.id, 'width', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-[116px] bg-sky-50/90 border border-sky-200 rounded-[6px] px-2 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]"
                          />
                        </td>

                        {/* Drop */}
                        <td className="py-3 px-3">
                          <input
                            type="number"
                            min="200"
                            max={maxBedDrop || undefined}
                            step="10"
                            value={row.drop}
                            onChange={(e) => handleUpdateRow(row.id, 'drop', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-[116px] bg-sky-50/90 border border-sky-200 rounded-[6px] px-2 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]"
                          />
                        </td>

                        {/* Delete Row */}
                        <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(row.id)}
                            className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete this row"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1967d2] bg-sky-100/80 border border-sky-200 hover:border-[#1967d2] px-3.5 py-2 rounded-[6px] transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add Another Row</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 cursor-pointer"
                >
                  Reset Table
                </button>
              </div>

            </div>
          </div>

          </CncExportModal>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={() => setPopup(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-sky-200 bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="measurement-popup-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${popup === 'reset' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                {popup === 'reset' ? <RotateCcw size={20} /> : <AlertTriangle size={20} />}
              </div>
              <button type="button" onClick={() => setPopup(null)} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer" aria-label="Close popup"><X size={18} /></button>
            </div>
            <h3 id="measurement-popup-title" className="mt-4 text-lg font-black text-slate-900">{popup === 'reset' ? 'Reset measurement table?' : 'One row is required'}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{popup === 'reset' ? 'This will remove the current measurements and restore the default first row.' : 'The measurement queue must contain at least one window. Add another row before deleting this one.'}</p>
            <div className="mt-5 flex justify-end gap-2">
              {popup === 'reset' && <button type="button" onClick={() => setPopup(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer">Cancel</button>}
              <button type="button" onClick={popup === 'reset' ? confirmReset : () => setPopup(null)} className={`rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors cursor-pointer ${popup === 'reset' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'}`}>{popup === 'reset' ? 'Reset table' : 'Got it'}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GeneratorHome;
