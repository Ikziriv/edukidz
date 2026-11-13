import { drawRoundedRectPath } from '../../../lib/canvasPvZPrimitives';

/**
 * Renders Plane 0 of the 2D Parallax Stage:
 * Montessori wooden studio room, panoramic arched conservatory window with sun/moon & hills,
 * interactive smartboard, and rotating wooden wall gears.
 */
export function drawMontessoriRoomBackdrop2D(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  px: number,
  py: number,
  elapsed: number,
  sleeping: boolean,
  playing: boolean
): void {
  const p0x = px * 8;
  const p0y = py * 4;

  // Classroom Studio Wall Gradient
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h);
  if (sleeping) {
    wallGrad.addColorStop(0, '#0b1020');
    wallGrad.addColorStop(0.55, '#151e36');
    wallGrad.addColorStop(1, '#0d1324');
  } else if (playing) {
    wallGrad.addColorStop(0, '#f8ebd7');
    wallGrad.addColorStop(0.58, '#eed9bc');
    wallGrad.addColorStop(1, '#dfc39d');
  } else {
    wallGrad.addColorStop(0, '#f3e9d8');
    wallGrad.addColorStop(0.58, '#e6d7c0');
    wallGrad.addColorStop(1, '#d5c1a3');
  }
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(p0x, p0y);

  // Top Maple Crown Molding Beam
  ctx.fillStyle = sleeping ? '#26324f' : '#c8ab83';
  ctx.fillRect(-30, 0, w + 60, h * 0.045);
  ctx.fillStyle = sleeping ? '#1a233a' : '#a8875c';
  ctx.fillRect(-30, h * 0.045, w + 60, 3);

  // Panoramic Arched Conservatory Window (Center-Right Backdrop)
  const winX = w * 0.24;
  const winY = h * 0.08;
  const winW = w * 0.52;
  const winH = h * 0.36;

  // Window Outer Maple Frame with PvZ Bold Inked Outline
  drawRoundedRectPath(ctx, winX - 7, winY - 7, winW + 14, winH + 14, 22);
  ctx.fillStyle = sleeping ? '#334155' : '#b89466';
  ctx.fill();
  ctx.strokeStyle = '#271202';
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // Window Sky Clipping Region
  ctx.save();
  drawRoundedRectPath(ctx, winX, winY, winW, winH, 16);
  ctx.clip();

  const skyGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
  if (sleeping) {
    skyGrad.addColorStop(0, '#070b19');
    skyGrad.addColorStop(0.55, '#1e1b4b');
    skyGrad.addColorStop(1, '#312e81');
  } else if (playing) {
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.55, '#fef08a');
    skyGrad.addColorStop(1, '#bbf7d0');
  } else {
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.6, '#bae6fd');
    skyGrad.addColorStop(1, '#dcfce7');
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(winX, winY, winW, winH);

  // Celestial Body inside Panoramic Window (Sun or Crescent Moon + Twinkling Stars)
  const orbX = winX + winW * 0.78 + px * 10;
  const orbY = winY + winH * 0.32 + py * 6;
  if (sleeping) {
    for (let i = 0; i < 16; i++) {
      const sx = winX + ((i * 97) % 100) * 0.01 * winW;
      const sy = winY + ((i * 53) % 70) * 0.01 * winH;
      const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(elapsed * 2.2 + i));
      ctx.fillStyle = `rgba(254, 240, 138, ${twinkle.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(sx, sy, (i % 2) + 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.save();
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(orbX, orbY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#141738';
    ctx.beginPath();
    ctx.arc(orbX + 8, orbY - 5, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Warm Golden PvZ-style Sun with Rotating Halo Rays
    ctx.save();
    ctx.translate(orbX, orbY);
    ctx.rotate(elapsed * 0.25);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
    ctx.lineWidth = 3;
    for (let r = 0; r < 8; r++) {
      const angle = (r * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 26, Math.sin(angle) * 26);
      ctx.lineTo(Math.cos(angle) * 35, Math.sin(angle) * 35);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 22;
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(orbX, orbY, 21, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Soft Drifting Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let c = 0; c < 3; c++) {
      const cx = winX + ((c * 0.34 * winW + elapsed * 8) % (winW + 80)) - 40;
      const cy = winY + winH * (0.26 + (c % 2) * 0.16);
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.arc(cx + 12, cy - 4, 17, 0, Math.PI * 2);
      ctx.arc(cx + 25, cy, 13, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Distant Botanical Hills inside Window
  ctx.fillStyle = sleeping ? '#14532d' : '#4ade80';
  ctx.beginPath();
  ctx.moveTo(winX, winY + winH);
  ctx.quadraticCurveTo(winX + winW * 0.3, winY + winH * 0.66, winX + winW * 0.62, winY + winH * 0.8);
  ctx.quadraticCurveTo(winX + winW * 0.82, winY + winH * 0.88, winX + winW, winY + winH * 0.72);
  ctx.lineTo(winX + winW, winY + winH);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = sleeping ? '#064e3b' : '#22c55e';
  ctx.beginPath();
  ctx.moveTo(winX, winY + winH);
  ctx.quadraticCurveTo(winX + winW * 0.45, winY + winH * 0.76, winX + winW, winY + winH * 0.84);
  ctx.lineTo(winX + winW, winY + winH);
  ctx.closePath();
  ctx.fill();

  // Window Mullion Bars
  ctx.strokeStyle = sleeping ? 'rgba(51, 65, 85, 0.85)' : 'rgba(184, 148, 102, 0.75)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.moveTo(winX, winY + winH * 0.52);
  ctx.lineTo(winX + winW, winY + winH * 0.52);
  ctx.stroke();
  ctx.restore(); // End Window Clip

  // Left Classroom Feature: Montessori Smartboard
  const boardX = w * 0.055;
  const boardY = h * 0.15;
  const boardW = w * 0.15;
  const boardH = h * 0.24;
  drawRoundedRectPath(ctx, boardX - 4, boardY - 4, boardW + 8, boardH + 8, 12);
  ctx.fillStyle = sleeping ? '#334155' : '#b48a5a';
  ctx.fill();
  ctx.strokeStyle = '#271202';
  ctx.lineWidth = 2;
  ctx.stroke();
  drawRoundedRectPath(ctx, boardX, boardY, boardW, boardH, 9);
  ctx.fillStyle = sleeping ? '#0f172a' : '#134e4a';
  ctx.fill();

  // Smartboard Botanical Diagram Graphics
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(boardX + boardW * 0.25, boardY + boardH * 0.75);
  ctx.quadraticCurveTo(boardX + boardW * 0.5, boardY + boardH * 0.3, boardX + boardW * 0.78, boardY + boardH * 0.35);
  ctx.stroke();
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(boardX + boardW * 0.78, boardY + boardH * 0.35, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.fillRect(boardX + 12, boardY + 12, boardW * 0.55, 4);
  ctx.fillRect(boardX + 12, boardY + 20, boardW * 0.38, 3);

  // Right Classroom Feature: Animated Montessori Wooden Sun & Cog Wall Gears
  const gearX = w * 0.86;
  const gearY = h * 0.22;
  ctx.save();
  ctx.translate(gearX, gearY);
  ctx.rotate(elapsed * 0.6);
  ctx.fillStyle = sleeping ? '#d97706' : '#f59e0b';
  for (let g = 0; g < 10; g++) {
    ctx.save();
    ctx.rotate((g * Math.PI) / 5);
    drawRoundedRectPath(ctx, -4, -26, 8, 10, 3);
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = sleeping ? '#1e293b' : '#fffbeb';
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Secondary Interlocking Teal Cog Gear
  ctx.save();
  ctx.translate(gearX + 34, gearY + 24);
  ctx.rotate(-elapsed * 0.9);
  ctx.fillStyle = sleeping ? '#0d9488' : '#14b8a6';
  for (let g = 0; g < 8; g++) {
    ctx.save();
    ctx.rotate((g * Math.PI) / 4);
    drawRoundedRectPath(ctx, -3, -17, 6, 7, 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Warm Wooden Studio Floor Wainscot & Plank Horizon
  const floorY = h * 0.52;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  if (sleeping) {
    floorGrad.addColorStop(0, '#161f33');
    floorGrad.addColorStop(1, '#0b101d');
  } else {
    floorGrad.addColorStop(0, '#d8be98');
    floorGrad.addColorStop(1, '#bda078');
  }
  ctx.fillStyle = floorGrad;
  ctx.fillRect(-30, floorY, w + 60, h - floorY + 30);

  // Baseboard Molding Trim
  ctx.fillStyle = sleeping ? '#26324f' : '#a88457';
  ctx.fillRect(-30, floorY - 6, w + 60, 8);
  ctx.restore();
}

