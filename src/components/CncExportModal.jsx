import { useMemo, useState } from 'react';
import { Download, Grid2X2, Maximize2, Minus, MousePointer2, Plus, Sparkles } from 'lucide-react';
import { optimizeBedRuns } from '../utils/bedOptimizer';
import { downloadPlt, generateBedPlt } from '../utils/xiaoPlt';

const palette = ['#2dd4bf', '#60a5fa', '#c084fc', '#fbbf24', '#fb7185', '#a3e635'];
const mm = (value) => Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 });

function CuttingWorkspace({ bed, rotated }) {
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [grid, setGrid] = useState(true);
  const bedDrop = Number(bed.max_bed_drop_mm);
  const bedWidth = Number(bed.roll_width_mm);
  const length = rotated ? bedWidth : bedDrop;
  const width = rotated ? bedDrop : bedWidth;
  const orient = (item) => rotated
    ? { x: item.y, y: item.x, drop: item.width, width: item.drop }
    : item;
  const pad = Math.max(length, width) * 0.07;
  const font = Math.max(length, width) / 42;
  const chosen = selected === null ? null : bed.cuts[selected];
  const remainingArea = bed.remnants.reduce((sum, remnant) => sum + (Number(remnant.area_m2) || 0), 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-slate-900 px-4 py-3">
        <div>
          <p className="text-xs font-bold tracking-wide text-white">CUTTING WORKSPACE <span className="ml-2 font-normal text-teal-300">Run {bed.bed_number}</span></p>
          <p className="mt-1 text-[11px] text-slate-400">True scale · {rotated ? 'X = width · Y = drop' : 'X = drop · Y = width'} · mm</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Toggle grid" onClick={() => setGrid(!grid)} className={`rounded-lg p-2 hover:bg-slate-700 cursor-pointer ${grid ? 'bg-slate-800 text-teal-300' : ''}`}><Grid2X2 size={15} /></button>
          <button type="button" aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom(Math.max(1, zoom - 0.5))} className="rounded-lg p-2 hover:bg-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"><Minus size={15} /></button>
          <span className="w-10 text-center text-[11px]">{zoom * 100}%</span>
          <button type="button" aria-label="Zoom in" disabled={zoom >= 3} onClick={() => setZoom(Math.min(3, zoom + 0.5))} className="rounded-lg p-2 hover:bg-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"><Plus size={15} /></button>
          <button type="button" aria-label="Fit layout" onClick={() => setZoom(1)} className="rounded-lg p-2 hover:bg-slate-700 cursor-pointer"><Maximize2 size={15} /></button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center overflow-auto bg-slate-950 p-5" style={{ maxHeight: 680 }}>
          <svg viewBox={`${-pad} ${-pad} ${length + pad * 2} ${width + pad * 2}`} style={{ width: `${zoom * 100}%`, minWidth: 300, maxWidth: zoom === 1 ? 760 : undefined }} className="block">
            <defs>
              <pattern id={`grid-${bed.bed_number}`} width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 H 0 V 100" fill="none" stroke="#233043" strokeWidth="2" /></pattern>
              <pattern id={`hatch-${bed.bed_number}`} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line y2="40" stroke="#fbbf24" strokeWidth="4" opacity=".3" /></pattern>
            </defs>
            <rect width={length} height={width} fill="#101a29" stroke="#475569" strokeWidth="2" />
            <rect width={rotated ? length : bed.linear_pull_mm} height={rotated ? bed.linear_pull_mm : width} fill="#172432" />
            {grid && <rect width={length} height={width} fill={`url(#grid-${bed.bed_number})`} />}
            {bed.remnants.map((remnant) => { const p = orient(remnant); return <rect key={remnant.id} x={p.x} y={p.y} width={p.drop} height={p.width} fill={`url(#hatch-${bed.bed_number})`} stroke="#b88926" strokeWidth="2" />; })}
            {bed.cuts.map((cut, index) => {
              const p = orient({ x: cut.x_pos_mm, y: cut.y_pos_mm, drop: cut.drop, width: cut.width });
              const color = palette[index % palette.length];
              const labelSize = Math.min(font, p.drop / 8, p.width / 4);
              return <g key={cut.id} role="button" tabIndex="0" className="cursor-pointer" onClick={() => setSelected(index)} onKeyDown={(event) => { if (event.key === 'Enter') setSelected(index); }}>
                <rect x={p.x} y={p.y} width={p.drop} height={p.width} fill={color} fillOpacity={selected === index ? 0.4 : 0.16} stroke={selected === index ? '#fff' : color} strokeWidth={selected === index ? 7 : 3} />
                <text x={p.x + p.drop / 2} y={p.y + p.width / 2} textAnchor="middle" fill="#fff" fontSize={labelSize * 1.15} fontWeight="700">#{String(cut.item_number).padStart(2, '0')}</text>
                <text x={p.x + p.drop / 2} y={p.y + p.width / 2 + labelSize * 1.4} textAnchor="middle" fill={color} fontSize={labelSize * 0.8}>{mm(cut.width)} × {mm(cut.drop)}</text>
              </g>;
            })}
            <line x1={rotated ? 0 : bed.linear_pull_mm} y1={rotated ? bed.linear_pull_mm : 0} x2={rotated ? length : bed.linear_pull_mm} y2={rotated ? bed.linear_pull_mm : width} stroke="#fb7185" strokeWidth="5" strokeDasharray="20 12" />
          </svg>
        </div>
        <aside className="grid border-t border-slate-700 bg-slate-900/80 md:grid-cols-3">
          <div className="p-4 md:p-5"><p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Material utilization</p><p className="mt-2 text-4xl font-semibold leading-none text-teal-300">{Number(bed.efficiency_percent || 0).toFixed(1)}<span className="text-xl">%</span></p><p className="mt-2 text-xs text-slate-400">{remainingArea.toFixed(3)} m² remaining in this pull</p></div>
          <div className="border-t border-slate-700 p-4 md:border-l md:border-t-0 md:p-5"><p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><MousePointer2 size={14} />{chosen ? `Item #${chosen.item_number}` : 'Inspect a piece'}</p>{chosen ? <div className="space-y-1.5 text-xs text-slate-300"><p>{chosen.location}</p><p>{mm(chosen.width)} × {mm(chosen.drop)} mm</p><p className="text-slate-400">X {mm(chosen.x_pos_mm)} · Y {mm(chosen.y_pos_mm)}</p></div> : <p className="text-xs leading-relaxed text-slate-400">Select a rectangle to see its size and table position.</p>}</div>
          <div className="border-t border-slate-700 p-4 md:border-l md:border-t-0 md:p-5"><p className="mb-3 text-sm font-semibold text-amber-300">Remaining fabric · {bed.remnants.length} {bed.remnants.length === 1 ? 'region' : 'regions'}</p><div className="space-y-1.5">{bed.remnants.map((item) => <p key={item.id} className="text-xs text-slate-300"><span className="mr-2 font-semibold text-amber-300">R{item.id}</span>{mm(item.width)} × {mm(item.drop)} mm</p>)}</div></div>
        </aside>
      </div>
    </div>
  );
}

export default function CncExportModal({ rows, maxBedDrop, maxBedWidth, onMaxBedDropChange, onMaxBedWidthChange, children }) {
  const [axisMode, setAxisMode] = useState('table_dxw');
  const [activeRun, setActiveRun] = useState(0);
  const optimization = useMemo(() => optimizeBedRuns(rows, maxBedDrop, maxBedWidth), [rows, maxBedDrop, maxBedWidth]);
  const rotated = axisMode === 'table_wxd';
  const bed = optimization.bed_runs[activeRun] || optimization.bed_runs[0];
  const wastePercent = optimization.total_fabric_m2 ? optimization.waste_area_m2 / optimization.total_fabric_m2 * 100 : 0;

  const saveBed = (run) => downloadPlt(`PURGE_Bed-${run.bed_number}_DropX-${Math.round(run.dynamic_drop_mm)}mm_WidthY-${Math.round(run.used_width_mm)}mm.plt`, generateBedPlt(run, { pen: 1, origin: 0, rotated }));

  return <div id="cnc-export-workspace" className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 px-5 py-3 text-xs">
        <label className="flex items-center gap-1.5 text-slate-500">Table Axis Mode:<select value={axisMode} onChange={(event) => setAxisMode(event.target.value)} className="rounded-lg border border-teal-300 bg-teal-50 px-2 py-1 font-black text-teal-900"><option value="table_dxw">CNC Table (X=Drop, Y=Width)</option><option value="table_wxd">Rotated (X=Width, Y=Drop)</option></select></label>
        <label className="flex items-center gap-1.5 text-slate-500">Max Bed Drop (X):<input type="number" min="500" max="8000" step="100" value={maxBedDrop} onChange={(event) => { onMaxBedDropChange(Math.max(500, Number(event.target.value) || 3000)); setActiveRun(0); }} className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-center font-black text-slate-800" /><span className="text-[11px] font-bold text-slate-400">mm</span><button type="button" onClick={() => { onMaxBedDropChange(3200); setActiveRun(0); }} className={`rounded border px-1.5 py-0.5 text-[10px] font-extrabold cursor-pointer ${maxBedDrop === 3200 ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>3200</button><button type="button" onClick={() => { onMaxBedDropChange(3000); setActiveRun(0); }} className={`rounded border px-1.5 py-0.5 text-[10px] font-extrabold cursor-pointer ${maxBedDrop === 3000 ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>3000</button></label>
        <label className="flex items-center gap-1.5 text-slate-500">Max Bed Width (Y):<input type="number" min="500" max="8000" step="100" value={maxBedWidth} onChange={(event) => { onMaxBedWidthChange(Math.max(500, Number(event.target.value) || 3000)); setActiveRun(0); }} className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-center font-black text-slate-800" /><span className="text-[11px] font-bold text-slate-400">mm</span></label>
        <div className="ml-auto flex gap-2"><div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-center"><span className="block text-[9px] font-bold uppercase text-blue-600">Total Pull</span><strong>{optimization.total_linear_m.toFixed(3)} m</strong></div><div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-center"><span className="block text-[9px] font-bold uppercase text-amber-700">Remaining Fabric</span><strong>{optimization.waste_area_m2.toFixed(3)} m²</strong> <small>({wastePercent.toFixed(1)}%)</small></div></div>
      </div>
      {optimization.unplaced_cuts.length > 0 && <div className="border-b border-rose-200 bg-rose-50 px-5 py-2 text-xs text-rose-800">{optimization.unplaced_cuts.map((cut) => <p key={cut.id}><strong>{cut.location}:</strong> {cut.reason}</p>)}</div>}
      <div className="grid grid-cols-1 items-start gap-4 bg-slate-50 p-3 lg:grid-cols-[minmax(0,3fr)_minmax(400px,2fr)]">
        <div className="min-w-0">{children}</div>
        <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-emerald-200 bg-emerald-50 px-4 py-2.5"><div className="flex items-center gap-2 text-xs font-black text-slate-900"><Sparkles size={18} className="text-emerald-600" /> CNC Table Bed Optimization (All {rows.length} Windows)</div><button type="button" disabled={!optimization.bed_runs.length} onClick={() => optimization.bed_runs.forEach((run, index) => setTimeout(() => saveBed(run), index * 150))} className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"><Download size={13} />All Bed PLTs ({optimization.bed_runs.length})</button></div>
          <div className="p-4">
            {optimization.bed_runs.length > 1 && <div className="mb-3 flex flex-wrap gap-2">{optimization.bed_runs.map((run, index) => <button type="button" key={run.bed_number} onClick={() => setActiveRun(index)} className={`rounded-lg border px-3 py-1.5 text-xs font-bold cursor-pointer ${activeRun === index ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-200 text-slate-600'}`}>Run {run.bed_number}</button>)}</div>}
            {bed ? <><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold text-slate-600">CNC Table Bed Runs ({optimization.bed_runs.length})</span><button type="button" onClick={() => saveBed(bed)} className="inline-flex items-center gap-1.5 rounded-lg border border-teal-300 px-3 py-1.5 text-xs font-bold text-teal-700 cursor-pointer"><Download size={12} />Download Run {bed.bed_number} PLT</button></div><CuttingWorkspace bed={bed} rotated={rotated} /></> : <div className="py-16 text-center text-sm text-slate-500">No valid windows fit within the configured bed.</div>}
          </div>
        </div>
      </div>
  </div>;
}
