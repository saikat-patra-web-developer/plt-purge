import { test } from 'node:test';
import assert from 'node:assert/strict';
import { optimizeBedRuns } from './bedOptimizer.js';
import { generateBedPlt } from './xiaoPlt.js';

function validate(plan, expectedCount) {
  assert.equal(plan.bed_runs.reduce((sum, bed) => sum + bed.cuts.length, 0), expectedCount);
  for (const bed of plan.bed_runs) {
    const pieces = bed.cuts.map((cut) => ({ x: cut.x_pos_mm, y: cut.y_pos_mm, drop: cut.drop, width: cut.width }));
    const regions = [...pieces, ...bed.remnants];
    regions.forEach((region, index) => {
      assert.ok(region.x >= 0 && region.y >= 0);
      assert.ok(region.x + region.drop <= bed.linear_pull_mm + 0.051);
      assert.ok(region.y + region.width <= bed.roll_width_mm + 0.001);
      regions.slice(index + 1).forEach((other) => {
        const overlapX = Math.min(region.x + region.drop, other.x + other.drop) - Math.max(region.x, other.x);
        const overlapY = Math.min(region.y + region.width, other.y + other.width) - Math.max(region.y, other.y);
        assert.ok(overlapX <= 0.001 || overlapY <= 0.001);
      });
    });
  }
}

test('two half-width windows produce exact zero waste', () => {
  const plan = optimizeBedRuns([
    { id: 1, location: 'Window 1', width: 1500, drop: 2000 },
    { id: 2, location: 'Window 2', width: 1500, drop: 2000 },
  ], 3000, 3000);
  validate(plan, 2);
  assert.equal(plan.total_linear_mm, 2000);
  assert.equal(plan.waste_area_m2, 0);
  assert.equal(plan.bed_runs[0].efficiency_percent, 100);
});

test('side pockets are filled without increasing the pull', () => {
  const plan = optimizeBedRuns([
    { id: 1, width: 2000, drop: 3000 },
    { id: 2, width: 1000, drop: 1500 },
    { id: 3, width: 1000, drop: 1500 },
  ], 3000, 3000);
  validate(plan, 3);
  assert.equal(plan.total_linear_mm, 3000);
  assert.equal(plan.waste_area_m2, 0);
});

test('PLT preserves QMB X=drop and Y=width coordinates at 40 units/mm', () => {
  const content = generateBedPlt({ cuts: [{ width: 900, drop: 980, x_pos_mm: 990, y_pos_mm: 1940 }] });
  assert.ok(content.includes('PU39600 77600;'));
  assert.ok(content.includes('PD78800 113600;'));
});
