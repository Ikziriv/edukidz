import type { WonderFactCard } from '../../../types/story';
import {
  PVZ_OUTLINE_COLOR,
  drawPvZPlantFace2D,
  drawPvZSunToken2D
} from '../../../lib/canvasPvZPrimitives';

/**
 * Draws the animated "I Wonder Why?" Educational Cutaway Diagram on the right side of the frame
 * enhanced with PopCap / Plants vs. Zombies comic-painterly inked outlines, Smiling Plant Faces,
 * and Golden Sun Energy tokens.
 */
export function drawWonderScienceCutaway(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  diagramType: WonderFactCard['diagramType'],
  t: number,
  lang: 'en' | 'id'
): void {
  ctx.save();
  // Rounded Television Science Cutaway Card with PvZ Gold Trim
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 22);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x + 3, y + 3, w - 6, h - 6, 19);
  ctx.clip();

  // Sky & Underground Split inside the diagram
  const soilY = y + h * 0.52;
  const skyGrad = ctx.createLinearGradient(x, y, x, soilY);
  skyGrad.addColorStop(0, '#0284c7');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(x, y, w, soilY - y);

  const soilGrad = ctx.createLinearGradient(x, soilY, x, y + h);
  soilGrad.addColorStop(0, '#78350f');
  soilGrad.addColorStop(0.5, '#451a03');
  soilGrad.addColorStop(1, '#271202');
  ctx.fillStyle = soilGrad;
  ctx.fillRect(x, soilY, w, y + h - soilY);

  // Grass divider with alternating PvZ lawn turf stripes
  const stripes = 6;
  const stripeW = w / stripes;
  for (let s = 0; s < stripes; s++) {
    ctx.fillStyle = s % 2 === 0 ? '#65c428' : '#43a018';
    ctx.fillRect(x + s * stripeW, soilY - 4, stripeW + 1, 8);
  }

  const cx = x + w * 0.5;

  if (diagramType === 'seed-roots' || diagramType === 'water-cycle') {
    // Animated Sprouting Stem & Leaves
    const stemHeight = 42 + Math.sin(t * 2) * 6;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, soilY + 18);
    ctx.lineTo(cx, soilY - stemHeight);
    ctx.stroke();

    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(cx, soilY + 18);
    ctx.lineTo(cx, soilY - stemHeight);
    ctx.stroke();

    // Two Leaves
    ctx.fillStyle = '#4ade80';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx - 16, soilY - stemHeight + 8, 16, 8, -0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 16, soilY - stemHeight + 4, 16, 8, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Underground Smiling Ginger Seed / Rhizome Buddy!
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, soilY + 22, 20, 14, 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawPvZPlantFace2D(ctx, cx, soilY + 23, 12, t, 0);

    // Branching Root Hairs
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2.2;
    [-1, 0, 1].forEach((dir) => {
      ctx.beginPath();
      ctx.moveTo(cx + dir * 8, soilY + 34);
      ctx.quadraticCurveTo(
        cx + dir * 28,
        soilY + 55,
        cx + dir * 38 + Math.sin(t * 3 + dir) * 4,
        soilY + 82
      );
      ctx.stroke();
    });

    // Animated Blue H2O Molecules & Nutrients climbing UP the roots!
    for (let i = 0; i < 6; i++) {
      const prog = (t * 0.55 + i * 0.17) % 1;
      const py = soilY + 82 - prog * (82 + stemHeight - 10);
      const px = cx + Math.sin(prog * Math.PI * 2 + i) * (1 - prog) * 26;
      ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#facc15';
      ctx.beginPath();
      ctx.arc(px, py, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (diagramType === 'sound-waves') {
    // Acoustic Guitar Soundwave Harmonics
    ctx.fillStyle = '#b45309';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x + 54, soilY - 10, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(x + 54, soilY - 10, 12, 0, Math.PI * 2);
    ctx.fill();

    // Vibrating Strings & Expanding Sound Waves
    for (let ring = 1; ring <= 4; ring++) {
      const r = ((t * 45 + ring * 28) % 120) + 16;
      const alpha = Math.max(0, 1 - r / 135);
      ctx.strokeStyle = `rgba(250, 204, 21, ${alpha.toFixed(2)})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x + 58, soilY - 10, r, -0.65, 0.65);
      ctx.stroke();
    }
  } else if (diagramType === 'zoo-habitat') {
    // Sanctuary Zoo Herbivore Habitat: Acacia Tree + Baby Giraffe & Bunny
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x + w - 58, soilY - 68, 10, 72);
    ctx.fillStyle = '#15803d';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(x + w - 54, soilY - 70, 34, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Giraffe eating leaves
    const nod = Math.sin(t * 2.4) * 4;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.roundRect(cx - 28, soilY - 22, 34, 20, 8);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(cx, soilY - 16);
    ctx.lineTo(cx + 16 + nod, soilY - 58);
    ctx.stroke();
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath();
    ctx.arc(cx + 18 + nod, soilY - 60, 10, 0, Math.PI * 2);
    ctx.fill();
    // Spots
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.arc(cx - 14, soilY - 12, 3.5, 0, Math.PI * 2);
    ctx.arc(cx - 4, soilY - 10, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (diagramType === 'prayer-peace') {
    // 5 Daily Muslim Prayer Sun Arc & Sajadah Rug
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
    ctx.lineWidth = 2.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, soilY - 2, 68, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
    ctx.setLineDash([]);

    for (let i = 0; i < 5; i++) {
      const ang = Math.PI * (1.12 + i * 0.19);
      const sx = cx + Math.cos(ang) * 68;
      const sy = soilY - 2 + Math.sin(ang) * 68;
      const activeIdx = Math.floor(t * 1.2) % 5;
      ctx.fillStyle = i === activeIdx ? '#fde047' : 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.arc(sx, sy, i === activeIdx ? 7.5 : 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#059669';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.roundRect(cx - 36, soilY + 16, 72, 42, 6);
    ctx.fill();
    ctx.stroke();
  } else {
    // Photosynthesis: PvZ Sun Token -> Smiling Leaf Buddy -> O2 Bubbles
    drawPvZSunToken2D(ctx, x + 44, y + 48, 17, t);

    ctx.strokeStyle = 'rgba(254, 240, 138, 0.8)';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.lineDashOffset = -t * 24;
    ctx.beginPath();
    ctx.moveTo(x + 58, y + 54);
    ctx.lineTo(cx, soilY - 24);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#22c55e';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.ellipse(cx + 10, soilY - 22, 38, 18, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawPvZPlantFace2D(ctx, cx + 10, soilY - 22, 13, t, 0.8);

    for (let b = 0; b < 4; b++) {
      const by = soilY - 28 - ((t * 28 + b * 22) % 70);
      const bx = cx + 22 + Math.sin(t * 3 + b) * 12;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('O₂', bx, by + 3);
    }
  }

  // Top Pill Label inside Cutaway
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(x + 12, y + 10, w - 24, 24, 10);
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'center';
  const badgeText =
    diagramType === 'zoo-habitat'
      ? lang === 'id'
        ? '🦒 Satwa: Habitat Herbivora & Jerapah'
        : '🦒 Zoo: Herbivore & Giraffe Habitat'
      : diagramType === 'prayer-peace'
        ? lang === 'id'
          ? '🤲 Ibadah: Wudhu, Shalat 5 Waktu & Doa'
          : "🤲 Faith: Wudhu, 5 Daily Prayers & Du'a"
        : diagramType === 'sound-waves'
          ? lang === 'id'
            ? '🔬 Sains: Getaran Gelombang Suara'
            : '🔬 Science: Soundwave Vibrations'
          : diagramType === 'sun-photosynthesis'
            ? lang === 'id'
              ? '☀️ Sains: Proses Fotosintesis Daun'
              : '☀️ Science: Leaf Photosynthesis'
            : lang === 'id'
              ? '🌱 Sains: Kapiler Akar & Air (H₂O)'
              : '🌱 Science: Root Capillary & H₂O';
  ctx.fillText(badgeText, cx, y + 26);

  ctx.restore();
  ctx.restore();
}
