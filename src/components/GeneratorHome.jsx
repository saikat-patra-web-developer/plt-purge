import React, { useRef, useState } from 'react';

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
  const [selectedRowId, setSelectedRowId] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(null);
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
    setSelectedRowId(newId);
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
      setSelectedRowId(1);
      setDownloadNotice(null);
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
    if (selectedRowId === id) {
      setSelectedRowId(updated[0].id);
    }
  };

  // Generate PLT file for the entire batch
  const handleGenerateBatchPLT = () => {
    const bedDrop = Number(maxBedDrop);
    const bedWidth = Number(maxBedWidth);
    const invalidWindow = rows.find((row) => {
      const width = Number(row.width);
      const drop = Number(row.drop);
      return !Number.isFinite(width) || !Number.isFinite(drop) || width <= 0 || drop <= 0 || width > bedWidth || drop > bedDrop;
    });

    if (!Number.isFinite(bedDrop) || !Number.isFinite(bedWidth) || bedDrop <= 0 || bedWidth <= 0) {
      window.alert('Enter valid maximum bed dimensions before generating the PLT file.');
      return;
    }

    if (invalidWindow) {
      window.alert(`${invalidWindow.location} must be within the ${bedDrop} mm drop and ${bedWidth} mm width bed limits.`);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);

      // Construct standard HPGL/PLT syntax
      let pltContent = 'IN;SP1;IP;VS20;\n';
      let offsetX = 100;

      rows.forEach((r) => {
        const w = (Number(r.width) || 1000) * 10;
        const h = (Number(r.drop) || 1200) * 10;

        pltContent += `PA${offsetX},100;PD;PR${w},0;PR0,${h};PR-${w},0;PR0,-${h};PU;\n`;
        offsetX += w + 200;
      });

      pltContent += '\nPU;PA0,0;SP0;\n';

      const blob = new Blob([pltContent], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const filename = `PURGE_BATCH_${rows.length}_BLINDS_${new Date().toISOString().slice(0, 10)}.plt`;

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

      setDownloadNotice({
        filename,
        count: rows.length,
        size: `${(pltContent.length / 1024).toFixed(1)} KB`,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 600);
  };

  const selectedWindow = rows.find(r => r.id === selectedRowId) || rows[0];

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

        {/* Xiao cutting-bed limits */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="max-bed-drop" className="mb-1.5 block text-xs font-bold text-slate-700">
                Max Bed Drop (X)
              </label>
              <div className="relative">
                <input
                  id="max-bed-drop"
                  type="number"
                  min="1"
                  step="1"
                  value={maxBedDrop}
                  onChange={(event) => setMaxBedDrop(event.target.value)}
                  className="w-full rounded-[6px] border border-slate-300 bg-white px-3.5 py-2.5 pr-12 text-sm font-bold text-slate-900 outline-none transition-all focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-400">mm</span>
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="max-bed-width" className="mb-1.5 block text-xs font-bold text-slate-700">
                Max Bed Width (Y)
              </label>
              <div className="relative">
                <input
                  id="max-bed-width"
                  type="number"
                  min="1"
                  step="1"
                  value={maxBedWidth}
                  onChange={(event) => setMaxBedWidth(event.target.value)}
                  className="w-full rounded-[6px] border border-slate-300 bg-white px-3.5 py-2.5 pr-12 text-sm font-bold text-slate-900 outline-none transition-all focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-slate-400">mm</span>
              </div>
            </div>

            <div className="rounded-[6px] bg-blue-50 px-3.5 py-2.5 text-xs font-semibold text-[#1967d2]">
              Xiao PLT bed limits
            </div>
          </div>
        </div>

        {/* Download Notice Banner */}
        {downloadNotice && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-bold text-green-900 block">
                  Batch PLT Generated: {downloadNotice.filename}
                </span>
                <span className="text-xs text-green-700">
                  {downloadNotice.count} blind layouts compiled • {downloadNotice.size} • Generated at {downloadNotice.timestamp}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDownloadNotice(null)}
              className="text-xs font-semibold text-green-800 hover:text-green-950 p-1 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6 items-start">
          {/* Left Column: Measurements Table & Actions */}
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
                    const isSelected = row.id === selectedRowId;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedRowId(row.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50/60'
                        }`}
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
                onClick={handleGenerateBatchPLT}
                disabled={isGenerating || rows.length === 0}
                className="inline-flex items-center gap-2 bg-[#1967d2] hover:bg-[#1558b8] disabled:opacity-60 text-white px-6 py-2.5 rounded-[6px] text-sm font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Compiling Nesting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Generate Batch PLT ({rows.length})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live CAD Preview of Selected Row */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs flex flex-col">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
                  2D CAD PREVIEW
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {selectedWindow?.location}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-sky-300">
                {selectedWindow?.width} &times; {selectedWindow?.drop} mm
              </span>
            </div>

            {/* CAD Grid Simulation */}
            <div className="p-4 bg-slate-950 flex items-center justify-center min-h-[300px]">
              <svg className="w-full h-64" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background coordinate grid */}
                <defs>
                  <pattern id="cadSmallGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                  </pattern>
                  <pattern id="cadGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <rect width="80" height="80" fill="url(#cadSmallGrid)" />
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#cadGrid)" />

                {/* Main Blind Outline */}
                <g stroke="#38bdf8" strokeWidth="1.5">
                  {/* Main Fabric Sheet */}
                  <rect x="40" y="30" width="220" height="170" rx="2" stroke="#38bdf8" fill="rgba(56, 189, 248, 0.05)" />
                  <text x="50" y="50" fill="#e2e8f0" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    {selectedWindow?.location?.toUpperCase()} • {selectedWindow?.width} x {selectedWindow?.drop} mm
                  </text>
                </g>

                {/* Cutter Origin Marker */}
                <circle cx="40" cy="30" r="3.5" fill="#f43f5e" />
                <text x="48" y="25" fill="#f43f5e" fontSize="9" fontWeight="bold">
                  (0, 0)
                </text>
              </svg>
            </div>

            {/* Footer Information */}
            <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Machine Spec: <strong>Xiao-compatible HPGL/PLT</strong></span>
              <span className="text-slate-300 font-mono">Status: Ready to plot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeneratorHome;
