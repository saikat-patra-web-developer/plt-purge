import React, { useRef, useState } from 'react';
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
    if (window.confirm('Reset all blind measurements back to default?')) {
      setRows([
        {
          id: 1,
          location: 'Window 1',
          width: 1200,
          drop: 1500
        }
      ]);
      nextWindowNumber.current = 2;
    }
  };

  // Update a single field in a row
  const handleUpdateRow = (id, field, value) => {
    setRows(prevRows => prevRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Delete a row
  const handleDeleteRow = (id) => {
    if (rows.length === 1) {
      alert('You must have at least one blind in the batch.');
      return;
    }
    const updated = rows.filter(r => r.id !== id);
    setRows(updated);
  };

  const handleViewExport = () => {
    const bedDrop = Number(maxBedDrop);
    const bedWidth = Number(maxBedWidth);

    if (!Number.isFinite(bedDrop) || !Number.isFinite(bedWidth) || bedDrop <= 0 || bedWidth <= 0) {
      window.alert('Enter valid maximum bed dimensions before opening the cutting workspace.');
      return;
    }
    document.getElementById('cnc-export-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Quick stats
  const totalWidth = rows.reduce((sum, r) => sum + (Number(r.width) || 0), 0);
  const totalDrop = rows.reduce((sum, r) => sum + (Number(r.drop) || 0), 0);
  const avgWidth = rows.length ? Math.round(totalWidth / rows.length) : 0;
  const avgDrop = rows.length ? Math.round(totalDrop / rows.length) : 0;

  return (
    <section id="generate" className="flex-1 w-full bg-slate-50 border-t border-slate-200 py-10 md:py-12 text-slate-900">
      <div className="max-w-[1280px] w-full mx-auto px-6">
        {/* Section Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-100/80 text-[#1967d2] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1967d2] animate-pulse"></span>
              PLT File Generator Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Batch Blind Measurements
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Add window locations, widths, and drops to generate HPGL .PLT files.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-xl shadow-xs">
            <div className="px-3 py-1 text-center border-r border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Blinds Count</span>
              <span className="text-base font-extrabold text-[#1967d2]">{rows.length}</span>
            </div>
            <div className="px-3 py-1 text-center border-r border-slate-100">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Avg Width</span>
              <span className="text-base font-bold text-slate-700">{avgWidth} mm</span>
            </div>
            <div className="px-3 py-1 text-center">
              <span className="text-[11px] font-bold uppercase text-slate-400 block">Avg Drop</span>
              <span className="text-base font-bold text-slate-700">{avgDrop} mm</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.4fr)]">
          {/* Measurements Table & Actions */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-[6px] transition-colors cursor-pointer"
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
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11.5px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">#</th>
                    <th className="py-3 px-3 min-w-[140px]">Location</th>
                    <th className="py-3 px-3 min-w-[140px]">Width (mm)</th>
                    <th className="py-3 px-3 min-w-[140px]">Drop (mm)</th>
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
                            className="w-full bg-white border border-slate-200 rounded-[6px] px-2 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]"
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
                            className="w-full bg-white border border-slate-200 rounded-[6px] px-2 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]"
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
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1967d2] bg-white border border-slate-300 hover:border-[#1967d2] px-3.5 py-2 rounded-[6px] transition-colors cursor-pointer"
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

              {/* Generate Batch PLT Button */}
              <button
                type="button"
                onClick={handleViewExport}
                disabled={rows.length === 0}
                className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] disabled:opacity-60 text-white px-6 py-2.5 rounded-[6px] text-sm font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>View CNC Optimization ({rows.length})</span>
              </button>
            </div>
          </div>

          <CncExportModal
            rows={rows}
            maxBedDrop={Number(maxBedDrop)}
            maxBedWidth={Number(maxBedWidth)}
            onMaxBedDropChange={setMaxBedDrop}
            onMaxBedWidthChange={setMaxBedWidth}
          />

        </div>
      </div>
    </section>
  );
}

export default GeneratorHome;
