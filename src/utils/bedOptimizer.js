/**
 * 2D Fabric Roll & CNC Table Nesting Optimizer
 * Optimized specifically for CNC Tables (e.g. BR-SX3030) with:
 *   - Table Drop (X Axis): Dynamic drop up to physical max bed limit (default 3200 mm)
 *   - Table Width (Y Axis): Fabric roll width from database (default 3000 mm)
 *   - Zero-Wastage cutting: 0 mm gaps / common shared edges between touching blinds
 *
 * @param {Array} cuts - Array of cut objects { item_number, location, width, drop, ... }
 * @param {number} rollWidthMm - Roll width in mm (default 3000, Width Y)
 * @param {number} maxBedDropMm - Max table bed drop for one static cut in mm (default 3200, Drop X)
 * @returns {Object} Optimized roll & CNC table nesting plan with bed runs and efficiency metrics
 */
const selectBestShelfCandidates = (candidates, availableWidthMm) => {
  const capacity = Math.max(0, Math.floor(availableWidthMm));
  if (capacity <= 0 || candidates.length === 0) return [];

  // 0/1 knapsack: maximize actual cut area placed into the remaining shelf
  // width. Width is the constraint and width × drop is the useful material.
  const states = new Array(capacity + 1).fill(null);
  states[0] = { value: 0, picks: [] };

  candidates.forEach((candidate, candidateIndex) => {
    const width = Math.max(1, Math.ceil(Number(candidate.width) || 0));
    const value = (Number(candidate.width) || 0) * (Number(candidate.drop) || 0);
    if (width > capacity || value <= 0) return;

    for (let used = capacity; used >= width; used -= 1) {
      const previous = states[used - width];
      if (!previous) continue;
      const nextValue = previous.value + value;
      if (!states[used] || nextValue > states[used].value) {
        states[used] = {
          value: nextValue,
          picks: [...previous.picks, candidateIndex],
        };
      }
    }
  });

  let best = states[0];
  let bestUsedWidth = 0;
  states.forEach((state, usedWidth) => {
    if (!state) return;
    if (state.value > best.value || (state.value === best.value && usedWidth > bestUsedWidth)) {
      best = state;
      bestUsedWidth = usedWidth;
    }
  });

  return best.picks.map((index) => candidates[index]);
};

function buildFabricCuttingPlan(cuts, rollWidthMm, maxBedDropMm, useBestFit) {
  const finalRollWidth = Number(rollWidthMm) > 0 ? Number(rollWidthMm) : 3000;
  const finalMaxBedDrop = Number(maxBedDropMm) > 0 ? Number(maxBedDropMm) : 3200;

  if (!cuts || cuts.length === 0) {
    return {
      roll_width_mm: finalRollWidth,
      max_bed_drop_mm: finalMaxBedDrop,
      total_linear_mm: 0,
      total_linear_m: 0,
      total_fabric_m2: 0,
      total_cut_area_m2: 0,
      waste_area_m2: 0,
      efficiency_percent: 100,
      sections: [],
      bed_runs: []
    };
  }

  // Sort cuts descending by drop then width for optimal 2D guillotine packing
  const sortedCuts = cuts
    .map((c) => ({
      ...c,
      width: Number(c.width) || 0,
      drop: Number(c.drop) || 0
    }))
    .filter((c) => c.width > 0 && c.drop > 0)
    .sort((a, b) => {
      if (b.drop === a.drop) {
        return b.width - a.width;
      }
      return b.drop - a.drop;
    });

  if (sortedCuts.length === 0) {
    return {
      roll_width_mm: finalRollWidth,
      max_bed_drop_mm: finalMaxBedDrop,
      total_linear_mm: 0,
      total_linear_m: 0,
      total_fabric_m2: 0,
      total_cut_area_m2: 0,
      waste_area_m2: 0,
      efficiency_percent: 100,
      sections: [],
      bed_runs: []
    };
  }

  const bedRuns = [];
  let remainingCuts = [...sortedCuts];

  // Pack cuts into CNC Table Bed Runs where Drop X <= finalMaxBedDrop and Width Y <= finalRollWidth
  while (remainingCuts.length > 0) {
    let bedCuts = [];
    let bedRunningX = 0; // Starts at X=0 on the table bed
    let bedMaxUsedWidth = 0;
    let bedDynamicDrop = 0;
    const shelves = [];

    while (remainingCuts.length > 0) {
      const remainingDropOnBed = finalMaxBedDrop - bedRunningX;
      if (remainingDropOnBed <= 50) {
        // No meaningful drop space left on this bed run
        break;
      }

      // Find candidates that can fit within the remaining drop of this bed
      const eligibleForShelf = remainingCuts.filter(
        (c) => c.drop <= remainingDropOnBed && c.width <= finalRollWidth
      );

      if (eligibleForShelf.length === 0) {
        // No remaining cuts can fit within the remaining drop on this bed
        if (bedCuts.length === 0) {
          const oversized = remainingCuts.shift();
          bedCuts.push({
            ...oversized,
            x_start_mm: 0,
            x_end_mm: oversized.drop,
            x_offset_mm: 0,
            x_pos_mm: 0,
            y_pos_mm: 0,
            y_start_mm: 0,
            y_end_mm: oversized.width,
            bed_number: bedRuns.length + 1,
            shelf_number: 1,
            piece_sequence: 1,
            status: "Pending Cut"
          });
          bedDynamicDrop = oversized.drop;
          bedMaxUsedWidth = oversized.width;
        }
        break;
      }

      // Start a new shelf / row on this bed at bedRunningX
      const firstCut = eligibleForShelf[0];
      const shelfIndex = shelves.length + 1;
      let shelfDrop = firstCut.drop;
      let shelfUsedWidth = firstCut.width;
      const shelfCuts = [firstCut];

      // Remove firstCut from remaining
      const firstCutIdx = remainingCuts.indexOf(firstCut);
      if (firstCutIdx !== -1) remainingCuts.splice(firstCutIdx, 1);

      if (useBestFit) {
        // Choose the most material-efficient combination for the remaining roll
        // width instead of accepting the first cuts that happen to fit.
        const shelfCandidates = remainingCuts.filter(
          (candidate) => bedRunningX + Math.max(shelfDrop, candidate.drop) <= finalMaxBedDrop
        );
        const selectedCandidates = selectBestShelfCandidates(
          shelfCandidates,
          finalRollWidth - shelfUsedWidth,
        );
        const selectedSet = new Set(selectedCandidates);
        selectedCandidates.forEach((candidate) => {
          shelfUsedWidth += candidate.width;
          shelfDrop = Math.max(shelfDrop, candidate.drop);
          shelfCuts.push(candidate);
        });
        remainingCuts = remainingCuts.filter((candidate) => !selectedSet.has(candidate));
      } else {
        // Preserve the original first-fit plan as a fallback. A locally optimal
        // shelf can occasionally make later shelves worse, so both plans are
        // evaluated and the lower-waste complete plan wins.
        const kept = [];
        for (const candidate of remainingCuts) {
          const canFitWidth = shelfUsedWidth + candidate.width <= finalRollWidth;
          const potentialShelfDrop = Math.max(shelfDrop, candidate.drop);
          const canFitDrop = bedRunningX + potentialShelfDrop <= finalMaxBedDrop;

          if (canFitWidth && canFitDrop) {
            shelfUsedWidth += candidate.width;
            shelfDrop = potentialShelfDrop;
            shelfCuts.push(candidate);
          } else {
            kept.push(candidate);
          }
        }
        remainingCuts = kept;
      }

      // Position cuts in this shelf with 0 mm cutting gap / shared edges.
      let runningY = 0; // Along Width (Y axis)
      shelfCuts.forEach((sc, scIdx) => {
        const xStart = bedRunningX;
        const xEnd = bedRunningX + sc.drop;
        const yStart = runningY;
        const yEnd = runningY + sc.width;

        const enrichedCut = {
          ...sc,
          x_start_mm: xStart,
          x_end_mm: xEnd,
          x_offset_mm: yStart, // for backward compatibility with width-axis X
          x_pos_mm: xStart,    // CNC table X (Drop)
          y_pos_mm: yStart,    // CNC table Y (Width)
          y_start_mm: yStart,
          y_end_mm: yEnd,
          bed_number: bedRuns.length + 1,
          shelf_number: shelfIndex,
          piece_sequence: bedCuts.length + scIdx + 1,
          status: "Pending Cut",
          remaining_roll_width_mm: Math.max(0, Math.round((finalRollWidth - yEnd) * 10) / 10),
          top_direction: "Top / Face Up",
          rotation_allowed: false
        };

        bedCuts.push(enrichedCut);
        runningY += sc.width;
      });

      shelves.push({
        shelf_number: shelfIndex,
        x_start_mm: bedRunningX,
        shelf_drop_mm: shelfDrop,
        used_width_mm: shelfUsedWidth,
        cuts: shelfCuts
      });

      bedMaxUsedWidth = Math.max(bedMaxUsedWidth, shelfUsedWidth);
      bedDynamicDrop = Math.max(bedDynamicDrop, bedRunningX + shelfDrop);
      bedRunningX += shelfDrop; // Advance X to end of this shelf
    }

    if (bedCuts.length === 0 && remainingCuts.length > 0) {
      const item = remainingCuts.shift();
      bedCuts.push({
        ...item,
        x_start_mm: 0,
        x_end_mm: item.drop,
        x_offset_mm: 0,
        x_pos_mm: 0,
        y_pos_mm: 0,
        y_start_mm: 0,
        y_end_mm: item.width,
        bed_number: bedRuns.length + 1,
        shelf_number: 1,
        piece_sequence: 1,
        status: "Pending Cut"
      });
      bedDynamicDrop = item.drop;
      bedMaxUsedWidth = item.width;
    }

    const bedNumber = bedRuns.length + 1;
    const cutAreaM2 = bedCuts.reduce(
      (sum, c) => sum + ((Number(c.width) || 0) / 1000) * ((Number(c.drop) || 0) / 1000),
      0
    );
    const dynamicBedAreaM2 = (finalRollWidth / 1000) * (bedDynamicDrop / 1000);
    const bedEfficiency =
      dynamicBedAreaM2 > 0 ? Math.round((cutAreaM2 / dynamicBedAreaM2) * 1000) / 10 : 100;
    const offcutWidthMm = Math.max(0, finalRollWidth - bedMaxUsedWidth);
    const remnantAction = offcutWidthMm >= 500 ? "Keep as remnant" : "Discard offcut";
    const remnantDimensions = `${Math.round(offcutWidthMm)} × ${Math.round(bedDynamicDrop)} mm`;
    const itemNumbers = Array.from(
      new Set(bedCuts.map((c) => String(c.item_number).padStart(2, "0")))
    ).join(", ");
    bedRuns.push({
      section_number: bedNumber,
      bed_number: bedNumber,
      // Dynamic Drop X is the exact drop length needed on this table bed run
      linear_pull_mm: Math.round(bedDynamicDrop * 10) / 10,
      linear_pull_m: Math.round((bedDynamicDrop / 1000) * 1000) / 1000,
      dynamic_drop_mm: Math.round(bedDynamicDrop * 10) / 10,
      max_bed_drop_mm: finalMaxBedDrop,
      roll_width_mm: finalRollWidth,
      used_width_mm: Math.round(bedMaxUsedWidth * 10) / 10,
      offcut_width_mm: Math.round(offcutWidthMm * 10) / 10,
      remnant_action: remnantAction,
      remnant_dimensions: remnantDimensions,
      roll_instruction: `CNC BED RUN #${bedNumber} · ${finalRollWidth} mm ROLL (Y) · DYNAMIC DROP: ${Math.round(bedDynamicDrop)} mm (X) / ${finalMaxBedDrop} mm MAX · ITEMS ${itemNumbers}`,
      cut_area_m2: Math.round(cutAreaM2 * 1000) / 1000,
      total_area_m2: Math.round(dynamicBedAreaM2 * 1000) / 1000,
      efficiency_percent: bedEfficiency,
      shelves,
      cuts: bedCuts
    });
  }

  const totalLinearMm = bedRuns.reduce((sum, b) => sum + b.linear_pull_mm, 0);
  const totalLinearM = Math.round((totalLinearMm / 1000) * 1000) / 1000;
  const totalFabricM2 = Math.round(((finalRollWidth / 1000) * totalLinearM) * 1000) / 1000;
  const totalCutAreaM2 = Math.round(
    bedRuns.reduce((sum, b) => sum + b.cut_area_m2, 0) * 1000
  ) / 1000;
  const wasteAreaM2 = Math.max(0, Math.round((totalFabricM2 - totalCutAreaM2) * 1000) / 1000);
  const efficiency = totalFabricM2 > 0 ? Math.round((totalCutAreaM2 / totalFabricM2) * 1000) / 10 : 100;

  return {
    roll_width_mm: finalRollWidth,
    max_bed_drop_mm: finalMaxBedDrop,
    total_linear_mm: totalLinearMm,
    total_linear_m: totalLinearM,
    total_fabric_m2: totalFabricM2,
    total_cut_area_m2: totalCutAreaM2,
    waste_area_m2: wasteAreaM2,
    efficiency_percent: efficiency,
    sections: bedRuns,
    bed_runs: bedRuns
  };
}

const rectanglesIntersect = (a, b) => !(
  b.x >= a.x + a.width ||
  b.x + b.width <= a.x ||
  b.y >= a.y + a.height ||
  b.y + b.height <= a.y
);

const splitFreeRectangles = (freeRectangles, used) => {
  const split = [];

  freeRectangles.forEach((free) => {
    if (!rectanglesIntersect(free, used)) {
      split.push(free);
      return;
    }

    if (used.x > free.x) {
      split.push({ ...free, width: used.x - free.x });
    }
    if (used.x + used.width < free.x + free.width) {
      split.push({
        ...free,
        x: used.x + used.width,
        width: free.x + free.width - (used.x + used.width),
      });
    }
    if (used.y > free.y) {
      split.push({ ...free, height: used.y - free.y });
    }
    if (used.y + used.height < free.y + free.height) {
      split.push({
        ...free,
        y: used.y + used.height,
        height: free.y + free.height - (used.y + used.height),
      });
    }
  });

  return split.filter((rect, index, all) => (
    rect.width > 0 &&
    rect.height > 0 &&
    !all.some((other, otherIndex) => (
      otherIndex !== index &&
      (otherIndex < index || rect.x !== other.x || rect.y !== other.y || rect.width !== other.width || rect.height !== other.height) &&
      rect.x >= other.x &&
      rect.y >= other.y &&
      rect.x + rect.width <= other.x + other.width &&
      rect.y + rect.height <= other.y + other.height
    ))
  ));
};

const maxRectsOrders = [
  (a, b) => (b.drop * b.width) - (a.drop * a.width),
  (a, b) => b.drop - a.drop || b.width - a.width,
  (a, b) => b.width - a.width || b.drop - a.drop,
  (a, b) => Math.max(b.drop, b.width) - Math.max(a.drop, a.width),
];

function buildMaxRectsPlan(cuts, rollWidthMm, maxBedDropMm, orderIndex, scoreByArea) {
  const finalRollWidth = Number(rollWidthMm) > 0 ? Number(rollWidthMm) : 3000;
  const finalMaxBedDrop = Number(maxBedDropMm) > 0 ? Number(maxBedDropMm) : 3200;
  let remaining = (cuts || [])
    .map((cut, index) => ({
      ...cut,
      _optimizerId: index,
      width: Number(cut.width) || 0,
      drop: Number(cut.drop) || 0,
    }))
    .filter((cut) => cut.width > 0 && cut.drop > 0);

  if (remaining.length === 0 || remaining.some(
    (cut) => cut.width > finalRollWidth || cut.drop > finalMaxBedDrop
  )) {
    return null;
  }

  const bedRuns = [];
  const order = maxRectsOrders[orderIndex];

  while (remaining.length > 0) {
    const ordered = [...remaining].sort(order);
    let freeRectangles = [{ x: 0, y: 0, width: finalMaxBedDrop, height: finalRollWidth }];
    const placed = [];
    let usedDrop = 0;
    let usedWidth = 0;

    ordered.forEach((cut) => {
      let best = null;
      freeRectangles.forEach((free) => {
        if (cut.drop > free.width || cut.width > free.height) return;
        const nextDrop = Math.max(usedDrop, free.x + cut.drop);
        const areaRemainder = (free.width * free.height) - (cut.drop * cut.width);
        const shortRemainder = Math.min(free.width - cut.drop, free.height - cut.width);
        const score = scoreByArea
          ? [areaRemainder, nextDrop, free.x, shortRemainder, free.y]
          : [nextDrop, free.x, shortRemainder, areaRemainder, free.y];
        if (!best || score.some((value, idx) => (
          value < best.score[idx] && score.slice(0, idx).every((prior, priorIdx) => prior === best.score[priorIdx])
        ))) {
          best = { free, score };
        }
      });

      if (!best) return;
      const position = {
        x: best.free.x,
        y: best.free.y,
        width: cut.drop,
        height: cut.width,
      };
      const bedNumber = bedRuns.length + 1;
      placed.push({
        ...cut,
        x_start_mm: position.x,
        x_end_mm: position.x + cut.drop,
        x_offset_mm: position.y,
        x_pos_mm: position.x,
        y_pos_mm: position.y,
        y_start_mm: position.y,
        y_end_mm: position.y + cut.width,
        bed_number: bedNumber,
        shelf_number: 0,
        piece_sequence: placed.length + 1,
        status: "Pending Cut",
        remaining_roll_width_mm: Math.max(0, finalRollWidth - position.y - cut.width),
        top_direction: "Top / Face Up",
        rotation_allowed: false,
      });
      usedDrop = Math.max(usedDrop, position.x + cut.drop);
      usedWidth = Math.max(usedWidth, position.y + cut.width);
      freeRectangles = splitFreeRectangles(freeRectangles, position);
    });

    if (placed.length === 0) return null;
    const placedIds = new Set(placed.map((cut) => cut._optimizerId));
    remaining = remaining.filter((cut) => !placedIds.has(cut._optimizerId));
    const cleanCuts = placed.map(({ _optimizerId, ...cut }) => cut);
    const cutAreaM2 = cleanCuts.reduce(
      (sum, cut) => sum + (cut.width * cut.drop) / 1000000,
      0,
    );
    const bedAreaM2 = (finalRollWidth * usedDrop) / 1000000;
    const offcutWidth = Math.max(0, finalRollWidth - usedWidth);
    const bedNumber = bedRuns.length + 1;
    const itemNumbers = Array.from(new Set(cleanCuts.map(
      (cut) => String(cut.item_number).padStart(2, "0")
    ))).join(", ");

    bedRuns.push({
      section_number: bedNumber,
      bed_number: bedNumber,
      linear_pull_mm: Math.round(usedDrop * 10) / 10,
      linear_pull_m: Math.round((usedDrop / 1000) * 1000) / 1000,
      dynamic_drop_mm: Math.round(usedDrop * 10) / 10,
      max_bed_drop_mm: finalMaxBedDrop,
      roll_width_mm: finalRollWidth,
      used_width_mm: Math.round(usedWidth * 10) / 10,
      offcut_width_mm: Math.round(offcutWidth * 10) / 10,
      remnant_action: offcutWidth >= 500 ? "Keep as remnant" : "Discard offcut",
      remnant_dimensions: `${Math.round(offcutWidth)} × ${Math.round(usedDrop)} mm`,
      roll_instruction: `CNC BED RUN #${bedNumber} · ${finalRollWidth} mm ROLL (Y) · DYNAMIC DROP: ${Math.round(usedDrop)} mm · ITEMS ${itemNumbers}`,
      cut_area_m2: Math.round(cutAreaM2 * 1000) / 1000,
      efficiency_percent: bedAreaM2 > 0 ? Math.round((cutAreaM2 / bedAreaM2) * 1000) / 10 : 100,
      shelves: [],
      cuts: cleanCuts,
    });
  }

  const totalLinearMm = bedRuns.reduce((sum, bed) => sum + bed.linear_pull_mm, 0);
  const totalFabricM2 = (finalRollWidth * totalLinearMm) / 1000000;
  const totalCutAreaM2 = bedRuns.reduce((sum, bed) => sum + bed.cut_area_m2, 0);
  const roundedFabricArea = Math.round(totalFabricM2 * 1000) / 1000;
  const roundedCutArea = Math.round(totalCutAreaM2 * 1000) / 1000;

  return {
    roll_width_mm: finalRollWidth,
    max_bed_drop_mm: finalMaxBedDrop,
    total_linear_mm: totalLinearMm,
    total_linear_m: Math.round((totalLinearMm / 1000) * 1000) / 1000,
    total_fabric_m2: roundedFabricArea,
    total_cut_area_m2: roundedCutArea,
    waste_area_m2: Math.max(0, Math.round((roundedFabricArea - roundedCutArea) * 1000) / 1000),
    efficiency_percent: roundedFabricArea > 0
      ? Math.round((roundedCutArea / roundedFabricArea) * 1000) / 10
      : 100,
    sections: bedRuns,
    bed_runs: bedRuns,
  };
}

export function optimizeFabricRollCutting(cuts, rollWidthMm = 3000, maxBedDropMm = 3200) {
  rollWidthMm = Number.isFinite(Number(rollWidthMm)) && Number(rollWidthMm) > 0 ? Number(rollWidthMm) : 3000;
  maxBedDropMm = Number.isFinite(Number(maxBedDropMm)) && Number(maxBedDropMm) > 0 ? Number(maxBedDropMm) : 3200;
  const unplacedCuts = [];
  const validCuts = (cuts || []).filter((cut) => {
    const width = Number(cut.width);
    const drop = Number(cut.drop);
    const reason = !Number.isFinite(width) || !Number.isFinite(drop) || width <= 0 || drop <= 0
      ? 'Enter valid positive cut dimensions.'
      : width > rollWidthMm ? 'Cut width exceeds the fabric roll width.'
        : drop > maxBedDropMm ? 'Cut drop exceeds the table bed limit.' : null;
    if (reason) unplacedCuts.push({ ...cut, reason });
    return !reason;
  });
  const firstFitPlan = buildFabricCuttingPlan(validCuts, rollWidthMm, maxBedDropMm, false);
  const bestFitPlan = buildFabricCuttingPlan(validCuts, rollWidthMm, maxBedDropMm, true);

  const candidates = [firstFitPlan, bestFitPlan];
  maxRectsOrders.forEach((_, orderIndex) => {
    [false, true].forEach((scoreByArea) => {
      const plan = buildMaxRectsPlan(validCuts, rollWidthMm, maxBedDropMm, orderIndex, scoreByArea);
      if (plan) candidates.push(plan);
    });
  });

  const result = candidates.reduce((best, plan) => {
    if (plan.total_linear_mm !== best.total_linear_mm) {
      return plan.total_linear_mm < best.total_linear_mm ? plan : best;
    }
    return plan.bed_runs.length < best.bed_runs.length ? plan : best;
  });
  const beds = result.bed_runs.map((bed) => ({ ...bed, remnants: getFabricRemnants(bed) }));
  const areaBound = validCuts.reduce((sum, cut) => sum + Number(cut.width) * Number(cut.drop), 0) / rollWidthMm;
  // Pieces wider than half the roll cannot share any X interval without rotation.
  const widePieceBound = validCuts.reduce((sum, cut) => sum + (Number(cut.width) > rollWidthMm / 2 ? Number(cut.drop) : 0), 0);
  const lowerBound = Math.max(areaBound, widePieceBound, ...validCuts.map((cut) => Number(cut.drop)), 0);
  return { ...result, sections: beds, bed_runs: beds, unplaced_cuts: unplacedCuts,
    minimum_pull_bound_mm: lowerBound,
    minimum_pull_reached: unplacedCuts.length === 0 && Math.abs(result.total_linear_mm - lowerBound) < 0.01,
  };
}

// Disjoint rectangular remainder pieces within the actual pulled fabric.
// Unlike MaxRects search spaces these never overlap and can be counted safely.
export function getFabricRemnants(bed) {
  let free = [{ x: 0, y: 0, drop: Number(bed.linear_pull_mm), width: Number(bed.roll_width_mm) }];
  for (const cut of bed.cuts || []) {
    const x = Number(cut.x_pos_mm ?? cut.x_start_mm ?? 0);
    const y = Number(cut.y_pos_mm ?? cut.y_start_mm ?? 0);
    free = free.flatMap((r) => {
      const left = Math.max(r.x, x), right = Math.min(r.x + r.drop, x + Number(cut.drop));
      const top = Math.max(r.y, y), bottom = Math.min(r.y + r.width, y + Number(cut.width));
      if (left >= right || top >= bottom) return [r];
      return [
        { x: r.x, y: r.y, drop: left - r.x, width: r.width },
        { x: right, y: r.y, drop: r.x + r.drop - right, width: r.width },
        { x: left, y: r.y, drop: right - left, width: top - r.y },
        { x: left, y: bottom, drop: right - left, width: r.y + r.width - bottom },
      ].filter((piece) => piece.drop > 0.000001 && piece.width > 0.000001);
    });
  }
  return free.filter((r) => r.width > 0 && r.drop > 0).map((r, index) => ({ ...r, id: index + 1, area_m2: r.width * r.drop / 1000000 }));
}

export function optimizeFabricGroups(fabrics, maxBedDropMm = 3200) {
  const plans = fabrics.map((fabric) => ({
    ...(fabric.max_bed_drop_mm === maxBedDropMm && fabric.sections && fabric.total_linear_m != null ? {
      ...fabric,
      bed_runs: fabric.sections,
      unplaced_cuts: fabric.unplaced_cuts || [],
    } : optimizeFabricRollCutting([
      ...(fabric.sections || []).flatMap((section) => section.cuts || []),
      ...(fabric.unplaced_cuts || []),
    ], fabric.roll_width_mm, maxBedDropMm)),
    fabricName: [fabric.fabric_collection || fabric.name || 'Fabric', fabric.fabric_colour].filter(Boolean).join(' / '),
  }));
  const bedRuns = plans.flatMap((plan) => plan.bed_runs.map((bed) => ({ ...bed, fabricName: plan.fabricName })));
  bedRuns.forEach((bed, index) => { bed.bed_number = index + 1; bed.section_number = index + 1; });
  return {
    bed_runs: bedRuns,
    total_linear_m: plans.reduce((sum, plan) => sum + plan.total_linear_m, 0),
    total_fabric_m2: plans.reduce((sum, plan) => sum + plan.total_fabric_m2, 0),
    waste_area_m2: plans.reduce((sum, plan) => sum + plan.waste_area_m2, 0),
    unplaced_cuts: plans.flatMap((plan) => plan.unplaced_cuts.map((cut) => ({ ...cut, fabricName: plan.fabricName }))),
  };
}


// Adapter for the standalone PLT generator page. The optimization core above is
// kept identical to QMB's BR-SX3030 production implementation.
export function optimizeBedRuns(rows, maxBedDropMm, maxBedWidthMm) {
  return optimizeFabricRollCutting(
    (rows || []).map((row, index) => ({ ...row, item_number: index + 1 })),
    maxBedWidthMm,
    maxBedDropMm,
  );
}
