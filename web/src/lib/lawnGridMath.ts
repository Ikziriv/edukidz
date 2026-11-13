export const STAR_QUEST_SPOTS: Array<{
  id: string;
  normX: number;
  normY: number;
  label: { id: string; en: string };
}> = [
  { id: 'star-1', normX: 0.19, normY: 0.42, label: { id: 'Bintang Rak Pelangi', en: 'Rainbow Shelf Star' } },
  { id: 'star-2', normX: 0.52, normY: 0.27, label: { id: 'Bintang Papan Pintar', en: 'Smartboard Star' } },
  { id: 'star-3', normX: 0.83, normY: 0.62, label: { id: 'Bintang Sumur Taman', en: 'Garden Well Star' } }
];

/**
 * Converts 3D island coordinates (x in [-2.95..2.95], z in [-2.95..2.95])
 * into normalized 2D stage coordinates [0..1] on the isometric sandbox island.
 */
export function worldToStageNorm(x: number, z: number): { nx: number; ny: number } {
  const nx = 0.5 + x / 6.6;
  const ny = 0.64 + z / 7.2;
  return { nx, ny };
}

/**
 * Inverse mapping from normalized 2D stage coordinates [0..1] to 3D island coordinates.
 */
export function stageNormToWorld(nx: number, ny: number): [number, number, number] {
  const rawX = (nx - 0.5) * 6.6;
  const rawZ = (ny - 0.64) * 7.2;
  const maxR = 2.85;
  const dist = Math.hypot(rawX, rawZ);
  const scale = dist > maxR ? maxR / dist : 1;
  return [Number((rawX * scale).toFixed(2)), -0.02, Number((rawZ * scale).toFixed(2))];
}

/**
 * Computes the normalized [0..1] center of each of the 9 crop tiles in the 3x3 raised garden bed.
 */
export function getCropTileStageNorm(gridX: number, gridZ: number): { nx: number; ny: number } {
  const colOffset = gridX - 1; // -1, 0, +1
  const rowOffset = gridZ - 1; // -1, 0, +1
  const nx = 0.5 + colOffset * 0.078 + rowOffset * 0.012;
  const ny = 0.655 + rowOffset * 0.056;
  return { nx, ny };
}

