const pair = (code, value) => `${code}\r\n${value}\r\n`;

export function generateBedDxf(bed, { rotated = false } = {}) {
  let output = '';
  output += pair(0, 'SECTION') + pair(2, 'HEADER');
  output += pair(9, '$ACADVER') + pair(1, 'AC1009');
  output += pair(9, '$INSUNITS') + pair(70, 4);
  output += pair(0, 'ENDSEC');
  output += pair(0, 'SECTION') + pair(2, 'ENTITIES');

  const line = (x1, y1, x2, y2) => {
    output += pair(0, 'LINE') + pair(8, 'CUT');
    output += pair(10, x1) + pair(20, y1) + pair(30, 0);
    output += pair(11, x2) + pair(21, y2) + pair(31, 0);
  };

  bed.cuts.forEach((cut) => {
    const x = rotated ? cut.y_pos_mm : cut.x_pos_mm;
    const y = rotated ? cut.x_pos_mm : cut.y_pos_mm;
    const xSize = rotated ? cut.width : cut.drop;
    const ySize = rotated ? cut.drop : cut.width;
    line(x, y, x + xSize, y);
    line(x + xSize, y, x + xSize, y + ySize);
    line(x + xSize, y + ySize, x, y + ySize);
    line(x, y + ySize, x, y);
  });

  output += pair(0, 'ENDSEC') + pair(0, 'EOF');
  return output;
}

export function downloadDxf(filename, content) {
  const blob = new Blob([content], { type: 'application/dxf;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
