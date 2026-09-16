import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Cpu, RotateCcw, X } from 'lucide-react';
import CncExportModal from './CncExportModal';

const STORAGE_KEY = 'plt_purge_state_v1';

const DEFAULT_ROWS = [
  {
    id: 1,
    location: 'Window 1',
    width: 1200,
    drop: 1500
  }
];

const loadSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {
    // fallback if localStorage is disabled or corrupted
  }
  return null;
};

const computeNextWindowNumber = (rowList) => {
  let maxNum = 1;
  (rowList || []).forEach((row) => {
    const match = String(row.location || '').match(/Window\s+(\d+)/i);
    if (match) {
      maxNum = Math.max(maxNum, parseInt(match[1], 10));
    }
  });
  return maxNum + 1;
};

function EditableLocation({ value, onChange, className = 'px-3 py-1.5' }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = (e) => {
    e.stopPropagation();
    setDraft(value);
    setIsEditing(true);
  };

  const commit = () => {
    setIsEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) {
      onChange(trimmed);
    }
  };

  const cancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            commit();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            cancel();
          }
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-[124px] rounded-[6px] border border-blue-400 bg-white px-2 py-1 text-xs font-bold text-[#1967d2] shadow-xs outline-none ring-2 ring-blue-500/20"
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleStartEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStartEdit(e);
        }
      }}
      className={`inline-flex cursor-pointer items-center rounded-[6px] bg-blue-50 ${className} text-xs font-bold text-[#1967d2] transition-colors hover:bg-blue-100 hover:text-blue-800`}
      title="Click to edit location"
    >
      {value}
    </span>
  );
}

export function GeneratorHome() {
  const [initial] = useState(() => loadSavedState());
  const [rows, setRows] = useState(() => {
    if (initial?.rows && Array.isArray(initial.rows) && initial.rows.length > 0) {
      return initial.rows;
    }
    return DEFAULT_ROWS;
  });
  const [maxBedDrop, setMaxBedDrop] = useState(() => {
    return Number(initial?.maxBedDrop) > 0 ? Number(initial.maxBedDrop) : 3000;
  });
  const [maxBedWidth, setMaxBedWidth] = useState(() => {
    return Number(initial?.maxBedWidth) > 0 ? Number(initial.maxBedWidth) : 3000;
  });
  const [axisMode, setAxisMode] = useState(() => {
    return initial?.axisMode || 'table_dxw';
  });

  const [popup, setPopup] = useState(null);
  const pendingWidthFocus = useRef(null);
  const nextWindowNumber = useRef(computeNextWindowNumber(rows));

  useEffect(() => {
    nextWindowNumber.current = computeNextWindowNumber(rows);
  }, [rows]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          rows,
          maxBedDrop,
          maxBedWidth,
          axisMode,
        })
      );
    } catch {
      // ignore storage write errors
    }
  }, [rows, maxBedDrop, maxBedWidth, axisMode]);

  useEffect(() => {
    if (pendingWidthFocus.current === null) return;
    const inputs = document.querySelectorAll(`[data-width-row="${pendingWidthFocus.current}"]`);
    Array.from(inputs).find((input) => input.offsetParent !== null)?.focus();
    pendingWidthFocus.current = null;
  }, [rows]);

  // Add new row
  const handleAddRow = () => {
    const hasBlankMeasurement = rows.some((row) => row.width === '' || row.drop === '');
    if (hasBlankMeasurement) {
      setPopup('incomplete-row');
      return;
    }
    const newId = Date.now();
    const newRow = {
      id: newId,
      location: `Window ${nextWindowNumber.current}`,
      width: '',
      drop: ''
    };
    nextWindowNumber.current += 1;
    setRows(prevRows => [...prevRows, newRow]);
    pendingWidthFocus.current = newId;
  };

  // Reset rows back to default initial state
  const handleReset = () => {
    setPopup('reset');
  };

  const confirmReset = () => {
    setRows(DEFAULT_ROWS);
    setMaxBedDrop(3000);
    setMaxBedWidth(3000);
    setAxisMode('table_dxw');
    nextWindowNumber.current = 2;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setPopup(null);
  };

  // Update a single field in a row
  const handleUpdateRow = (id, field, value) => {
    setRows(prevRows => prevRows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const isMeasurementInvalid = (row, field) => {
    const value = Number(row[field]);
    const limit = field === 'width' ? Number(maxBedWidth) : Number(maxBedDrop);
    return row[field] === '' || !Number.isFinite(value) || value < 200 || (limit > 0 && value > limit);
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
    <section id="generate" className="relative isolate w-full flex-1 overflow-hidden border-t border-sky-200/60 py-8 text-slate-900 md:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.18)_46%,transparent_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
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
            axisMode={axisMode}
            onAxisModeChange={setAxisMode}
            onMaxBedDropChange={setMaxBedDrop}
            onMaxBedWidthChange={setMaxBedWidth}
          >
          {/* Measurements Table & Actions */}
          <div className="overflow-hidden rounded-xl border border-sky-200/80 bg-sky-50/75 shadow-xs backdrop-blur-xl">
            {/* Table Header Bar */}
            <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <span className="w-2 h-2 rounded-full bg-[#1967d2]"></span>
                <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                  Measurement Queue ({rows.length} {rows.length === 1 ? 'item' : 'items'})
                </h3>
              </div>

              {/* Action Buttons: Add Row & Reset */}
              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-[6px] border border-sky-200 bg-sky-100/80 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-sky-200/80 hover:text-slate-900 cursor-pointer"
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
                  className="inline-flex items-center justify-center gap-1.5 rounded-[6px] bg-[#1967d2] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#1558b8] hover:shadow cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add Row</span>
                </button>
              </div>
            </div>

            {/* Mobile measurement cards */}
            <div className="divide-y divide-sky-100 md:hidden">
              {rows.map((row, index) => (
                <div key={row.id} className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[11px] font-black text-blue-700">{index + 1}</span>
                      <EditableLocation
                        value={row.location}
                        onChange={(newLocation) => handleUpdateRow(row.id, 'location', newLocation)}
                        className="px-2.5 py-1"
                      />
                    </div>
                    <button type="button" onClick={() => handleDeleteRow(row.id)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer" aria-label={`Delete ${row.location}`}>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Width (mm)
                      <input data-width-row={row.id} type="number" inputMode="decimal" min="200" max={maxBedWidth || undefined} step="10" value={row.width} aria-invalid={isMeasurementInvalid(row, 'width')} onChange={(e) => handleUpdateRow(row.id, 'width', e.target.value)} className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm font-bold text-slate-900 outline-none ${isMeasurementInvalid(row, 'width') ? 'border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'border-sky-200 focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]'}`} />
                    </label>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Drop (mm)
                      <input type="number" inputMode="decimal" min="200" max={maxBedDrop || undefined} step="10" value={row.drop} aria-invalid={isMeasurementInvalid(row, 'drop')} onChange={(e) => handleUpdateRow(row.id, 'drop', e.target.value)} className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm font-bold text-slate-900 outline-none ${isMeasurementInvalid(row, 'drop') ? 'border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'border-sky-200 focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]'}`} />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop measurement table */}
            <div className="hidden overflow-x-auto md:block">
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
                          <EditableLocation
                            value={row.location}
                            onChange={(newLocation) => handleUpdateRow(row.id, 'location', newLocation)}
                            className="px-3 py-1.5"
                          />
                        </td>

                        {/* Width */}
                        <td className="py-3 px-3">
                          <input
                            data-width-row={row.id}
                            type="number"
                            min="200"
                            max={maxBedWidth || undefined}
                            step="10"
                            value={row.width}
                            aria-invalid={isMeasurementInvalid(row, 'width')}
                            onChange={(e) => handleUpdateRow(row.id, 'width', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-[116px] rounded-[6px] border bg-sky-50/90 px-2 py-1.5 text-xs font-bold text-slate-900 outline-none ${isMeasurementInvalid(row, 'width') ? 'border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'border-sky-200 focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]'}`}
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
                            aria-invalid={isMeasurementInvalid(row, 'drop')}
                            onChange={(e) => handleUpdateRow(row.id, 'drop', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-[116px] rounded-[6px] border bg-sky-50/90 px-2 py-1.5 text-xs font-bold text-slate-900 outline-none ${isMeasurementInvalid(row, 'drop') ? 'border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'border-sky-200 focus:border-[#1967d2] focus:ring-1 focus:ring-[#1967d2]'}`}
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
            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">
              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
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
            <h3 id="measurement-popup-title" className="mt-4 text-lg font-black text-slate-900">{popup === 'reset' ? 'Reset measurement table?' : popup === 'incomplete-row' ? 'Complete the current row' : 'One row is required'}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{popup === 'reset' ? 'This will remove the current measurements and restore the default first row.' : popup === 'incomplete-row' ? 'Enter both Width and Drop for every window before adding another row.' : 'The measurement queue must contain at least one window. Add another row before deleting this one.'}</p>
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
