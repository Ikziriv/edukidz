import { getPvZCheckerboardLawnColor, getPvZSquashStretch } from '../constants/botanicalRegistry';

export const PVZ_OUTLINE_COLOR = '#271202';

/**
 * Cross-browser rounded rectangle path helper for CanvasRenderingContext2D.
 */
export function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/**
 * Draws the signature PopCap / Plants vs. Zombies expressive smiling plant face
 * (big glossy comic eyes with white catchlights, rosy cheeks, and a cheerful smile)
 * on any Sunflower, Berry Sprout, or Ginger Buddy!
 */
export function drawPvZPlantFace2D(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  elapsed: number,
  seedOffset = 0
): void {
  const isBlinking = Math.sin(elapsed * 1.9 + seedOffset) > 0.95;
  const eyeDistX = radius * 0.36;
  const eyeY = cy - radius * 0.12;
  const eyeR = Math.max(1.8, radius * 0.24);

  // Rosy Cheeks
  ctx.fillStyle = 'rgba(251, 113, 133, 0.45)';
  ctx.beginPath();
  ctx.ellipse(cx - eyeDistX * 1.35, cy + radius * 0.14, eyeR * 0.85, eyeR * 0.55, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + eyeDistX * 1.35, cy + radius * 0.14, eyeR * 0.85, eyeR * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();

  if (isBlinking) {
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = Math.max(1.4, radius * 0.15);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - eyeDistX - eyeR * 0.7, eyeY);
    ctx.lineTo(cx - eyeDistX + eyeR * 0.7, eyeY);
    ctx.moveTo(cx + eyeDistX - eyeR * 0.7, eyeY);
    ctx.lineTo(cx + eyeDistX + eyeR * 0.7, eyeY);
    ctx.stroke();
  } else {
    // Expressive PvZ White Sclera + Dark Inked Outline
    [-eyeDistX, eyeDistX].forEach((ox) => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = Math.max(1.1, radius * 0.12);
      ctx.beginPath();
      ctx.ellipse(cx + ox, eyeY, eyeR, eyeR * 1.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pupil
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cx + ox + eyeR * 0.12, eyeY, eyeR * 0.62, 0, Math.PI * 2);
      ctx.fill();

      // Glossy Catchlight Dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + ox + eyeR * 0.34, eyeY - eyeR * 0.32, eyeR * 0.28, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Joyful PvZ Sunflower Smile
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = Math.max(1.3, radius * 0.15);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, cy + radius * 0.06, radius * 0.42, 0.18 * Math.PI, 0.82 * Math.PI);
  ctx.stroke();
}

/**
 * Draws a collectible Plants vs. Zombies–style scalloped Golden Sun Energy token.
 */
export function drawPvZSunToken2D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  elapsed: number
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(elapsed * 0.85);

  // Scalloped Sunburst Rays with bold comic outline
  const rays = 10;
  ctx.fillStyle = '#f59e0b';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let i = 0; i < rays * 2; i++) {
    const r = i % 2 === 0 ? radius * 1.32 : radius * 0.95;
    const angle = (i * Math.PI) / rays;
    const rx = Math.cos(angle) * r;
    const ry = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(rx, ry);
    else ctx.lineTo(rx, ry);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner Glowing Sun Core
  const grad = ctx.createRadialGradient(-radius * 0.2, -radius * 0.2, radius * 0.1, 0, 0, radius);
  grad.addColorStop(0, '#fef9c3');
  grad.addColorStop(0.65, '#facc15');
  grad.addColorStop(1, '#eab308');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.88, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws a Plants vs. Zombies–style alternating checkerboard lawn grid on a 2D canvas.
 */
export function drawPvZCheckerboardLawn2D(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  totalWidth: number,
  totalHeight: number,
  cols: number,
  rows: number,
  isNight: boolean
): void {
  const startX = centerX - totalWidth / 2;
  const startY = centerY - totalHeight / 2;
  const cellW = totalWidth / cols;
  const cellH = totalHeight / rows;

  ctx.save();
  drawRoundedRectPath(ctx, startX, startY, totalWidth, totalHeight, 12);
  ctx.clip();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const { turfColor } = getPvZCheckerboardLawnColor(c, r, isNight);
      ctx.fillStyle = turfColor;
      ctx.fillRect(startX + c * cellW, startY + r * cellH, cellW + 0.8, cellH + 0.8);
    }
  }
  ctx.restore();

  // Bold Comic Border around the Checkerboard Lawn
  drawRoundedRectPath(ctx, startX, startY, totalWidth, totalHeight, 12);
  ctx.strokeStyle = isNight ? '#064e3b' : PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.6;
  ctx.stroke();
}

/**
 * Draws an anthropomorphic Plants vs. Zombies–style Botanical Buddy (Sunflower, Berry Dew-Sprout, or Ginger Buddy)
 * with bold dark-brown comic outlines, squash-and-stretch idle bounce, blinking eyes, and a joyful grin!
 */
export function drawPvZBotanicalBuddy2D(
  ctx: CanvasRenderingContext2D,
  tx: number,
  ty: number,
  cropType: 'sunflower' | 'strawberry' | 'ginger',
  stage: 'soil' | 'seed' | 'sprout' | 'growing' | 'ripe',
  elapsed: number,
  phaseOffset = 0,
  scale = 1
): void {
  if (stage === 'soil') return;

  const { scaleX, scaleY, swayAngle } = getPvZSquashStretch(elapsed, phaseOffset, 0.055);
  const swayPx = Math.sin(elapsed * 2.8 + phaseOffset) * 2.5;

  ctx.save();
  ctx.translate(tx, ty);
  ctx.scale(scale * scaleX, scale * scaleY);

  if (stage === 'seed') {
    // Bold-outlined Seed Sprout Mound
    ctx.fillStyle = '#fde68a';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.8;
    [-5, 1, 5].forEach((ox, idx) => {
      ctx.beginPath();
      ctx.arc(ox, idx % 2 === 0 ? 1 : -2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
    return;
  }

  if (stage === 'sprout') {
    // Cute PvZ Baby Sprout with two bouncy cotyledon leaves
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 4.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.quadraticCurveTo(swayPx * 0.5, -7, swayPx, -13);
    ctx.stroke();

    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    ctx.fillStyle = '#4ade80';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(-6 + swayPx, -13, 6, 3.5, -0.35, 0, Math.PI * 2);
    ctx.ellipse(6 + swayPx, -13, 6, 3.5, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (stage === 'growing') {
    // Medium PvZ Plant Buddy with Leaf Base & Waking Eyes
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.lineTo(swayPx, -18);
    ctx.stroke();
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#22c55e';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-6 + swayPx, -14, 6.5, 0, Math.PI * 2);
    ctx.arc(6 + swayPx, -14, 6.5, 0, Math.PI * 2);
    ctx.arc(swayPx, -20, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    drawPvZPlantFace2D(ctx, swayPx, -19, 6.5, elapsed, phaseOffset);
    ctx.restore();
    return;
  }

  // RIPE STAGE: Full Anthropomorphic PvZ Botanical Buddy!
  ctx.rotate(swayAngle * 0.4);

  // Base Leaf Feet (PvZ signature 4-leaf turf base)
  ctx.fillStyle = '#22c55e';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2;
  [-1, 1].forEach((dir) => {
    ctx.beginPath();
    ctx.ellipse(dir * 9, 1, 8, 4.2, dir * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // Sturdy Stem with Dark Inked Outline
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 5.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.quadraticCurveTo(swayPx * 0.6, -12, swayPx, -24);
  ctx.stroke();

  ctx.strokeStyle = '#16a34a';
  ctx.lineWidth = 3.4;
  ctx.stroke();

  if (cropType === 'sunflower') {
    // 1. SUNNY SUNFLOWER BUDDY (Directly inspired by PvZ Sunflower in reference image!)
    const headX = swayPx;
    const headY = -25;
    const petalCount = 12;

    // Golden Petals Ring with Bold Inked Outline
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.8;
    for (let p = 0; p < petalCount; p++) {
      const a = (p * Math.PI * 2) / petalCount + elapsed * 0.25;
      const px = headX + Math.cos(a) * 11.5;
      const py = headY + Math.sin(a) * 11.5;
      ctx.beginPath();
      ctx.ellipse(px, py, 4.8, 3.2, a, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Warm Brown Face Disc
    const discGrad = ctx.createRadialGradient(headX - 2, headY - 2, 1, headX, headY, 9.5);
    discGrad.addColorStop(0, '#92400e');
    discGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = discGrad;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(headX, headY, 9.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cheerful PvZ Face on Sunflower Disc
    drawPvZPlantFace2D(ctx, headX, headY, 8.8, elapsed, phaseOffset);

    // Floating Mini Sun Energy Orb above Ripe Sunflower
    const sunFloatY = headY - 17 + Math.sin(elapsed * 3.5 + phaseOffset) * 2.5;
    drawPvZSunToken2D(ctx, headX + 11, sunFloatY, 5.2, elapsed);
  } else if (cropType === 'strawberry') {
    // 2. BERRY DEW-SPROUT BUDDY (Peashooter-inspired friendly strawberry pod!)
    const headX = swayPx;
    const headY = -23;

    // Ruby Berry Head with Comic Outline
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(headX, headY, 9.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Green Leafy Crown Cap on top of Berry Buddy
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(headX, headY - 9, 7.5, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Expressive PvZ Eyes & Smile
    drawPvZPlantFace2D(ctx, headX, headY + 1, 8.5, elapsed, phaseOffset);
  } else {
    // 3. ROOTY GINGER GUARDIAN BUDDY (Wall-Nut / Potato-Mine inspired friendly rhizome!)
    const headX = swayPx;
    const headY = -19;

    // Plump Golden-Ochre Ginger Rhizome Body with Inked Outline
    ctx.fillStyle = '#d97706';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(headX, headY, 10.5, 8.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pink Torch Ginger Blossom Antenna on top
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(headX, headY - 11, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Expressive PvZ Eyes & Smile
    drawPvZPlantFace2D(ctx, headX, headY, 8.5, elapsed, phaseOffset);
  }

  ctx.restore();
}

