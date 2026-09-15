export const HPGL_UNITS_PER_MM = 40;

const point = (value) => Math.round(value * HPGL_UNITS_PER_MM);

export function generateBedPlt(bed, { pen = 1, speed = 32, origin = 0, rotated = false } = {}) {
  const lines = [
    'IN;',
    ...Array.from({ length: 8 }, (_, index) => `VS${speed},${index + 1};`),
    'WU0;',
    ...Array.from({ length: 8 }, (_, index) => `PW0.350,${index + 1};`),
    'LT;',
    `SP${pen};`,
  ];

  bed.cuts.forEach((cut) => {
    const x = origin + (rotated ? cut.y_pos_mm : cut.x_pos_mm);
    const y = origin + (rotated ? cut.x_pos_mm : cut.y_pos_mm);
    const xSize = rotated ? cut.width : cut.drop;
    const ySize = rotated ? cut.drop : cut.width;
    const x0 = point(x), y0 = point(y), x1 = point(x + xSize), y1 = point(y + ySize);
    lines.push(`PU${x0} ${y0};`, `PD${x0} ${y0};`, `PD${x1} ${y0};`, `PD${x1} ${y1};`, `PD${x0} ${y1};`, `PD${x0} ${y0};`);
  });
  lines.push('SP0;');
  return `${lines.join('\r\n')}\r\n`;
}

export function downloadPlt(filename, content) {
  const blob = new Blob([content], { type: 'application/x-hpgl;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
