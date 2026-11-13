import type { FarmCropTile } from '../../../types/story';
import { getPvZCheckerboardLawnColor } from '../../../constants/botanicalRegistry';
import { getCropTileStageNorm, worldToStageNorm } from '../../../lib/lawnGridMath';
import {
  PVZ_OUTLINE_COLOR,
  drawRoundedRectPath,
  drawPvZBotanicalBuddy2D
} from '../../../lib/canvasPvZPrimitives';

/**
 * Renders Plane 1 of the 2D Stage:
 * Carved Maple Sandbox Island, Plants vs. Zombies Checkerboard Lawn Lanes,
 * 9 Interactive Crop Plots with Anthropomorphic Smiling Botanical Buddies,
 * Stone Water Well, Yellow Delivery Truck, Sajadah Rug, Sanctuary Zoo Corner,
 * and Ground Waypoint Ripple.
 */
export function drawPvZLawnAndCrops2D(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  elapsed: number,
  now: number,
  sleeping: boolean,
  playing: boolean,
  tiles: FarmCropTile[],
  hoveredTileId: string | null,
  truckBounceAt: number,
  waypointRipple: { x: number; z: number; bornAt: number } | null
): void {
  const islandCx = w * 0.5;
  const islandCy = h * 0.67;
  const islandRx = w * 0.41;
  const islandRy = h * 0.24;

  // Soft Ambient Floor Contact Shadow under Wooden Tray
  ctx.fillStyle = sleeping ? 'rgba(0, 0, 0, 0.65)' : 'rgba(68, 40, 14, 0.26)';
  ctx.beginPath();
  ctx.ellipse(islandCx, islandCy + 22, islandRx * 1.04, islandRy * 1.06, 0, 0, Math.PI * 2);
  ctx.fill();

  // Carved Maple Sandbox Outer Wooden Bevel Rim with Bold Inked Outline
  ctx.fillStyle = sleeping ? '#3b2d22' : '#9c7343';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.ellipse(islandCx, islandCy + 12, islandRx * 1.02, islandRy * 1.03, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = sleeping ? '#523e2f' : '#cfa977';
  ctx.beginPath();
  ctx.ellipse(islandCx, islandCy, islandRx * 1.02, islandRy * 1.02, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Lush Living Turf Surface inside the Wooden Tray (With PvZ Radial Checkerboard Lanes!)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(islandCx, islandCy, islandRx * 0.96, islandRy * 0.94, 0, 0, Math.PI * 2);
  ctx.clip();

  const turfGrad = ctx.createRadialGradient(
    islandCx,
    islandCy - islandRy * 0.2,
    islandRx * 0.1,
    islandCx,
    islandCy,
    islandRx
  );
  if (sleeping) {
    turfGrad.addColorStop(0, '#14532d');
    turfGrad.addColorStop(0.75, '#064e3b');
    turfGrad.addColorStop(1, '#022c22');
  } else if (playing) {
    turfGrad.addColorStop(0, '#4ade80');
    turfGrad.addColorStop(0.75, '#22c55e');
    turfGrad.addColorStop(1, '#15803d');
  } else {
    turfGrad.addColorStop(0, '#34d399');
    turfGrad.addColorStop(0.75, '#16a34a');
    turfGrad.addColorStop(1, '#14532d');
  }
  ctx.fillStyle = turfGrad;
  ctx.fillRect(islandCx - islandRx, islandCy - islandRy, islandRx * 2, islandRy * 2);

  // Subtle PvZ Horizontal Mowed Lawn Lanes across the Island
  const laneCount = 5;
  const laneH = (islandRy * 1.9) / laneCount;
  for (let l = 0; l < laneCount; l++) {
    if (l % 2 === 0) {
      ctx.fillStyle = sleeping ? 'rgba(255,255,255,0.03)' : 'rgba(254, 240, 138, 0.12)';
      ctx.fillRect(
        islandCx - islandRx,
        islandCy - islandRy * 0.95 + l * laneH,
        islandRx * 2,
        laneH
      );
    }
  }
  ctx.restore();

  // Decorative Stepping Stone Path Leading to Center Bed
  const stones = [
    { nx: 0.29, ny: 0.75, rx: 16, ry: 7 },
    { nx: 0.35, ny: 0.78, rx: 18, ry: 8 },
    { nx: 0.66, ny: 0.77, rx: 17, ry: 7.5 },
    { nx: 0.73, ny: 0.73, rx: 15, ry: 6.5 }
  ];
  stones.forEach((st) => {
    ctx.fillStyle = sleeping ? '#475569' : '#94a3b8';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(st.nx * w, st.ny * h, st.rx, st.ry, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = sleeping ? '#64748b' : '#cbd5e1';
    ctx.beginPath();
    ctx.ellipse(st.nx * w - 2, st.ny * h - 1.5, st.rx * 0.75, st.ry * 0.7, 0.1, 0, Math.PI * 2);
    ctx.fill();
  });

  // ========================================================================
  // INTERACTIVE 3x3 PLANTS VS. ZOMBIES CHECKERBOARD LAWN & GARDEN BED
  // ========================================================================
  const bedCenterX = w * 0.5;
  const bedCenterY = h * 0.655;
  const bedW = w * 0.27;
  const bedH = h * 0.185;

  // Timber Frame of Raised Bed with Bold Inked Outline
  drawRoundedRectPath(ctx, bedCenterX - bedW / 2 - 8, bedCenterY - bedH / 2 - 5, bedW + 16, bedH + 14, 14);
  ctx.fillStyle = sleeping ? '#451a03' : '#78350f';
  ctx.fill();
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.6;
  ctx.stroke();

  drawRoundedRectPath(ctx, bedCenterX - bedW / 2 - 4, bedCenterY - bedH / 2 - 2, bedW + 8, bedH + 6, 11);
  ctx.fillStyle = sleeping ? '#271508' : '#3f2009';
  ctx.fill();

  // Draw each of the 9 Checkerboard Lawn & Soil Crop Tiles + Smiling Botanical Buddies
  tiles.forEach((tile) => {
    const { nx, ny } = getCropTileStageNorm(tile.gridX, tile.gridZ);
    const tx = nx * w;
    const ty = ny * h;
    const tileW = w * 0.07;
    const tileH = h * 0.046;
    const isHovered = hoveredTileId === tile.id;

    // PvZ Checkerboard Turf Collar around each Soil Mound
    const { turfColor } = getPvZCheckerboardLawnColor(tile.gridX, tile.gridZ, sleeping);
    drawRoundedRectPath(ctx, tx - tileW * 0.54, ty - tileH * 0.54, tileW * 1.08, tileH * 1.08, 8);
    ctx.fillStyle = turfColor;
    ctx.fill();
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Inner Tilled Soil Mound
    drawRoundedRectPath(ctx, tx - tileW * 0.44, ty - tileH * 0.42, tileW * 0.88, tileH * 0.84, 6);
    ctx.fillStyle = tile.isWatered
      ? sleeping
        ? '#1c120c'
        : '#3b2110'
      : sleeping
      ? '#3b2516'
      : '#6b4226';
    ctx.fill();

    // Hover / Active Tool Target Highlight Ring
    if (isHovered) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.8;
      ctx.stroke();
    } else {
      ctx.strokeStyle = tile.isWatered ? 'rgba(56, 189, 248, 0.55)' : 'rgba(39, 18, 2, 0.45)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    // Watered Moisture Sheen
    if (tile.isWatered) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.beginPath();
      ctx.arc(tx - tileW * 0.24, ty + tileH * 0.16, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Anthropomorphic PvZ Botanical Buddy (Smiling Sunflower, Berry Sprout, or Ginger Buddy!)
    drawPvZBotanicalBuddy2D(
      ctx,
      tx,
      ty,
      tile.cropType,
      tile.stage,
      elapsed,
      tile.gridX * 1.7 + tile.gridZ * 2.3,
      1.05
    );
  });

  // ========================================================================
  // INTERACTIVE DIORAMA PROPS: STONE WATER WELL, TRUCK, SAJADAH & ZOO
  // ========================================================================
  // 1. Stone Water Refill Well (Right Island: nx = 0.80, ny = 0.62)
  const wellX = w * 0.8;
  const wellY = h * 0.62;
  ctx.fillStyle = sleeping ? '#334155' : '#64748b';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(wellX, wellY + 12, 26, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  drawRoundedRectPath(ctx, wellX - 24, wellY - 8, 48, 22, 8);
  ctx.fillStyle = sleeping ? '#475569' : '#94a3b8';
  ctx.fill();
  ctx.stroke();

  // Water Surface inside Well
  ctx.fillStyle = '#0ea5e9';
  ctx.beginPath();
  ctx.ellipse(wellX, wellY - 6, 19, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wooden Roof Posts & Shingle Canopy
  ctx.fillStyle = '#78350f';
  ctx.fillRect(wellX - 20, wellY - 38, 4, 32);
  ctx.fillRect(wellX + 16, wellY - 38, 4, 32);
  ctx.fillStyle = sleeping ? '#7c2d12' : '#b45309';
  ctx.beginPath();
  ctx.moveTo(wellX - 28, wellY - 34);
  ctx.lineTo(wellX, wellY - 52);
  ctx.lineTo(wellX + 28, wellY - 34);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 2. Miniature Yellow Wooden Delivery Truck (Left Island: nx = 0.19, ny = 0.69)
  const truckAge = (now - truckBounceAt) * 0.001;
  const truckBounce =
    truckAge >= 0 && truckAge < 0.6 ? Math.sin(truckAge * Math.PI * 4) * 5 * (1 - truckAge) : 0;
  const truckX = w * 0.19;
  const truckY = h * 0.69 - Math.abs(truckBounce);
  drawRoundedRectPath(ctx, truckX - 28, truckY - 18, 38, 20, 5);
  ctx.fillStyle = '#facc15';
  ctx.fill();
  ctx.stroke();
  drawRoundedRectPath(ctx, truckX + 6, truckY - 24, 20, 26, 6);
  ctx.fillStyle = '#eab308';
  ctx.fill();
  ctx.stroke();
  drawRoundedRectPath(ctx, truckX + 11, truckY - 20, 12, 10, 3);
  ctx.fillStyle = '#bae6fd';
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(truckX - 15, truckY + 3, 7, 0, Math.PI * 2);
  ctx.arc(truckX + 14, truckY + 3, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(truckX - 15, truckY + 3, 2.8, 0, Math.PI * 2);
  ctx.arc(truckX + 14, truckY + 3, 2.8, 0, Math.PI * 2);
  ctx.fill();

  // 3. Woven Emerald Sajadah Prayer Rug (Left-Front Sanctuary: nx = 0.27, ny = 0.75)
  const rugX = w * 0.27;
  const rugY = h * 0.75;
  ctx.save();
  ctx.translate(rugX, rugY);
  ctx.rotate(-0.18);
  drawRoundedRectPath(ctx, -26, -15, 52, 30, 5);
  ctx.fillStyle = sleeping ? '#065f46' : '#059669';
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.moveTo(-14, -8);
  ctx.lineTo(0, -13);
  ctx.lineTo(14, -8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 4. Sanctuary Zoo Corner: Baby Giraffe & Hopping White Bunny (Right-Front Island: nx = 0.76, ny = 0.74)
  const zooX = w * 0.76;
  const zooY = h * 0.74;
  const neckNod = Math.sin(elapsed * 2.1) * 3;
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(zooX - 10, zooY - 2, 4, 14);
  ctx.fillRect(zooX + 6, zooY - 2, 4, 14);
  drawRoundedRectPath(ctx, zooX - 14, zooY - 14, 28, 16, 7);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(zooX - 6, zooY - 12);
  ctx.lineTo(zooX - 11 + neckNod, zooY - 36);
  ctx.stroke();
  ctx.fillStyle = '#fcd34d';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(zooX - 12 + neckNod, zooY - 38, 7.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.arc(zooX - 4, zooY - 7, 2.5, 0, Math.PI * 2);
  ctx.arc(zooX + 5, zooY - 5, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(zooX - 14 + neckNod, zooY - 39, 1.8, 0, Math.PI * 2);
  ctx.fill();

  const bunnyHop = sleeping ? 0 : Math.abs(Math.sin(elapsed * 3.6)) * 6;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(zooX + 22, zooY + 2 - bunnyHop, 7, 0, Math.PI * 2);
  ctx.arc(zooX + 18, zooY - 4 - bunnyHop, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#fda4af';
  ctx.fillRect(zooX + 16, zooY - 13 - bunnyHop, 2.2, 7);
  ctx.fillRect(zooX + 20, zooY - 13 - bunnyHop, 2.2, 7);

  // ========================================================================
  // GROUND WAYPOINT RIPPLE BEACON (When walking character)
  // ========================================================================
  if (waypointRipple) {
    const wpAge = (now - waypointRipple.bornAt) * 0.001;
    if (wpAge < 1.1) {
      const { nx: wnx, ny: wny } = worldToStageNorm(waypointRipple.x, waypointRipple.z);
      const alpha = 1 - wpAge / 1.1;
      ctx.strokeStyle = `rgba(16, 185, 129, ${alpha.toFixed(2)})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(wnx * w, wny * h, 10 + wpAge * 26, 5 + wpAge * 11, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

