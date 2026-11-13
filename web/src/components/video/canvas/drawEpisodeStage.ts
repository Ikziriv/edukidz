import type { ActivityCategory } from '../../../types/story';
import {
  PVZ_OUTLINE_COLOR,
  drawPvZBotanicalBuddy2D,
  drawPvZCheckerboardLawn2D,
  drawPvZSunToken2D
} from '../../../lib/canvasPvZPrimitives';

/**
 * Draws a bespoke, episode-specific animated stage environment for all 14 daily episodes,
 * upgraded with PopCap / Plants vs. Zombies Checkerboard Lawn lanes and Smiling Botanical Buddies:
 * - Days 1-7 ('gardening'): Progressive PvZ Friendship Lawn & Smiling Sunflowers, Berry Sprouts, and Ginger Buddies!
 * - Days 8, 13, 14 ('study-learning'): Montessori Classroom Smartboard, rainbow bookshelves, and wooden songbird workshop (Day 13) or Grand Exhibition banners (Day 14).
 * - Days 9, 12 ('muslim-prayer'): Garden Musholla Pavilion arch, flowing Stone Wudhu Well, Qibla compass arch, and emerald Sajadah prayer rugs.
 * - Days 10, 11 ('zoo-visit'): Harmony Sanctuary Zoo savanna meadow, acacia tree, animated tall Giraffe, Spotted Deer, and hopping white Bunny!
 */
export function drawEpisodeBroadcastEnvironment(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dayNumber: number,
  category: ActivityCategory,
  isNight: boolean,
  t: number
): void {
  const hillY = height * 0.64;

  // Base rolling hills with PvZ comic outline
  ctx.fillStyle =
    category === 'zoo-visit'
      ? isNight
        ? '#1e291b'
        : '#84cc16'
      : category === 'study-learning' && dayNumber !== 14
        ? isNight
          ? '#1e1b4b'
          : '#fef3c7'
        : isNight
          ? '#132a23'
          : '#65c428';
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-60, height);
  ctx.quadraticCurveTo(width * 0.28, hillY - 38, width * 0.62, hillY + 10);
  ctx.quadraticCurveTo(width * 0.88, hillY + 35, width + 60, hillY - 20);
  ctx.lineTo(width + 60, height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle =
    category === 'zoo-visit'
      ? isNight
        ? '#162114'
        : '#65a30d'
      : category === 'study-learning' && dayNumber !== 14
        ? isNight
          ? '#172554'
          : '#fde68a'
        : isNight
          ? '#0f231d'
          : '#43a018';
  ctx.beginPath();
  ctx.moveTo(-60, height);
  ctx.quadraticCurveTo(width * 0.45, hillY + 8, width + 60, hillY + 22);
  ctx.lineTo(width + 60, height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Branch by episode category & dayNumber
  if (category === 'study-learning' && dayNumber !== 14) {
    // Montessori Classroom Backdrop: Glowing Interactive Smartboard + Bookshelf
    const sbW = Math.min(260, width * 0.36);
    const sbH = Math.min(125, height * 0.28);
    const sbX = width * 0.5 - sbW * 0.5;
    const sbY = height * 0.22;

    // Wooden frame with PvZ outline
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(sbX - 8, sbY - 8, sbW + 16, sbH + 16, 14);
    ctx.fill();
    ctx.stroke();

    // Glowing chalkboard / smartboard screen
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(sbX, sbY, sbW, sbH, 10);
    ctx.fill();

    // Animated diagram wave on classroom smartboard
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x <= sbW - 24; x += 8) {
      const wy = sbY + sbH * 0.55 + Math.sin(t * 4 + x * 0.06) * 16;
      if (x === 0) ctx.moveTo(sbX + 12 + x, wy);
      else ctx.lineTo(sbX + 12 + x, wy);
    }
    ctx.stroke();

    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 11px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      dayNumber === 13 ? '🐦 STEM: Rumah Burung Kenji' : '🔬 I WONDER WHY CLASSROOM',
      sbX + sbW * 0.5,
      sbY + 22
    );

    // Day 13: Wooden Birdhouse & Flying Songbirds
    if (dayNumber === 13) {
      const bhX = width * 0.16;
      const bhY = height * 0.36;
      ctx.fillStyle = '#b45309';
      ctx.fillRect(bhX - 4, bhY + 26, 8, 90);
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(bhX - 24, bhY - 10, 48, 38, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(bhX - 30, bhY - 8);
      ctx.lineTo(bhX, bhY - 30);
      ctx.lineTo(bhX + 30, bhY - 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Birdhouse hole
      ctx.fillStyle = '#271202';
      ctx.beginPath();
      ctx.arc(bhX, bhY + 8, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (category === 'zoo-visit') {
    // Harmony Sanctuary Zoo: Wooden Savanna Fence, Acacia Tree, Animated Giraffe, Deer & Bunny!
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, height * 0.58);
    ctx.lineTo(width * 0.92, height * 0.58);
    ctx.moveTo(width * 0.08, height * 0.64);
    ctx.lineTo(width * 0.92, height * 0.64);
    ctx.stroke();

    // Acacia Tree on left
    const treeX = width * 0.16;
    const treeY = height * 0.58;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(treeX - 8, treeY - 95, 16, 95);
    ctx.fillStyle = '#15803d';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.ellipse(treeX, treeY - 100, 62, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Animated Tall Giraffe on right-back
    const girX = width * 0.82;
    const girY = height * 0.58;
    const neckSwing = Math.sin(t * 2.2) * 8;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.roundRect(girX - 28, girY - 34, 52, 30, 12);
    ctx.fill();
    ctx.stroke();
    // Legs
    ctx.fillRect(girX - 22, girY - 6, 7, 28);
    ctx.fillRect(girX + 12, girY - 6, 7, 28);
    // Long Neck
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(girX - 14, girY - 26);
    ctx.lineTo(girX - 24 + neckSwing, girY - 96);
    ctx.stroke();
    // Giraffe Head
    ctx.fillStyle = '#fcd34d';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(girX - 28 + neckSwing, girY - 100, 14, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Brown Spots
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.arc(girX - 10, girY - 20, 5, 0, Math.PI * 2);
    ctx.arc(girX + 6, girY - 16, 4.5, 0, Math.PI * 2);
    ctx.arc(girX - 18 + neckSwing * 0.5, girY - 60, 4, 0, Math.PI * 2);
    ctx.fill();

    // Hopping White Bunny in foreground
    const bunX = width * 0.22 + Math.sin(t * 1.8) * 18;
    const bunHop = Math.abs(Math.sin(t * 4.5)) * 12;
    const bunY = height * 0.75 - bunHop;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(bunX, bunY, 15, 11, 0, 0, Math.PI * 2);
    ctx.arc(bunX + 12, bunY - 7, 9, 0, Math.PI * 2);
    ctx.ellipse(bunX + 10, bunY - 20, 3.2, 9, -0.15, 0, Math.PI * 2);
    ctx.ellipse(bunX + 15, bunY - 20, 3.2, 9, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (category === 'muslim-prayer') {
    // Serene Garden Musholla Pavilion Arch + Stone Wudhu Well + Emerald Sajadah Prayer Rugs
    const archX = width * 0.5;
    const archY = height * 0.52;
    ctx.strokeStyle = '#fde047';
    ctx.fillStyle = isNight ? 'rgba(6, 78, 59, 0.72)' : 'rgba(16, 185, 129, 0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(archX - 110, archY - 120, 220, 130, [90, 90, 12, 12]);
    ctx.fill();
    ctx.stroke();

    // Crescent finial on dome
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(archX, archY - 134, 10, 0, Math.PI * 2);
    ctx.fill();

    // Stone Wudhu Water Well on Left with Sparkling Water Droplets
    const wellX = width * 0.17;
    const wellY = height * 0.66;
    ctx.fillStyle = '#64748b';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.roundRect(wellX - 28, wellY - 18, 56, 36, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    for (let d = 0; d < 4; d++) {
      const dy = wellY - 28 + ((t * 35 + d * 12) % 26);
      ctx.beginPath();
      ctx.arc(wellX - 12 + d * 8, dy, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Woven Emerald Sajadah Rugs in Foreground
    for (let r = 0; r < 3; r++) {
      const rx = width * (0.28 + r * 0.22);
      const ry = height * 0.75;
      ctx.fillStyle = '#059669';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(rx - 38, ry - 12, 76, 32, 6);
      ctx.fill();
      ctx.stroke();
    }
  } else {
    // Progressive Friendship Garden (Days 1–7 & Day 14 Grand Finale)
    // PopCap / Plants vs. Zombies Checkerboard Lawn Bed in Foreground!
    drawPvZCheckerboardLawn2D(
      ctx,
      width * 0.5,
      height * 0.74,
      width * 0.68,
      58,
      5,
      2,
      isNight
    );

    // Day 2: Rainwater Clouds & Furrows
    if (dayNumber === 2) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
      ctx.lineWidth = 2;
      for (let r = 0; r < 18; r++) {
        const rx = ((r * 67 + t * 40) % (width * 0.7)) + width * 0.15;
        const ry = ((r * 43 + t * 180) % (height * 0.55)) + height * 0.18;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 4, ry + 12);
        ctx.stroke();
      }
    }

    // Day 5: Bamboo Gravity Water Canal
    if (dayNumber === 5) {
      ctx.strokeStyle = '#84cc16';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * 0.56);
      ctx.lineTo(width * 0.45, height * 0.72);
      ctx.stroke();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * 0.54);
      ctx.lineTo(width * 0.45, height * 0.7);
      ctx.stroke();
    }

    // Smiling PvZ Botanical Buddies along the 5 Checkerboard Lawn Lanes!
    const plantTypes = ['sunflower', 'strawberry', 'ginger', 'sunflower', 'strawberry'] as const;
    const growthStage: 'sprout' | 'growing' | 'ripe' =
      dayNumber <= 2 ? 'sprout' : dayNumber === 3 ? 'growing' : 'ripe';

    for (let p = 0; p < 5; p++) {
      const px = width * (0.23 + p * 0.135);
      const py = height * 0.755;
      drawPvZBotanicalBuddy2D(
        ctx,
        px,
        py,
        plantTypes[p],
        growthStage,
        t,
        p * 0.7,
        0.95
      );
    }

    // Floating Golden PvZ Sun Energy Token above the lawn on Day 4+
    if (dayNumber >= 4 && !isNight) {
      const sunTokenX = width * 0.23 + Math.sin(t * 1.4) * 14;
      const sunTokenY = height * 0.61 + Math.cos(t * 2.2) * 6;
      drawPvZSunToken2D(ctx, sunTokenX, sunTokenY, 15, t);
    }

    // Day 4+: Buzzing Honeybees around the Smiling Sunflowers
    if (dayNumber === 4 || dayNumber === 14) {
      for (let b = 0; b < 3; b++) {
        const bx = width * (0.3 + b * 0.2) + Math.cos(t * 3.5 + b * 2) * 28;
        const by = height * 0.62 + Math.sin(t * 5 + b) * 14;
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = PVZ_OUTLINE_COLOR;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(bx, by, 6, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(bx - 2, by - 4, 2, 8);
      }
    }

    // Day 7 or Day 14: Starlight Lantern Festival Garlands!
    if (dayNumber === 7 || dayNumber === 14) {
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * 0.22);
      ctx.quadraticCurveTo(width * 0.5, height * 0.32, width * 0.9, height * 0.22);
      ctx.stroke();

      const lanternColors = ['#ef4444', '#f59e0b', '#10b981', '#ec4899', '#38bdf8'];
      for (let l = 0; l < 5; l++) {
        const lx = width * (0.18 + l * 0.16);
        const ly =
          height * 0.25 + (l === 2 ? 14 : l % 2 === 1 ? 10 : 0) + Math.sin(t * 2.5 + l) * 3;
        ctx.fillStyle = 'rgba(254, 240, 138, 0.28)';
        ctx.beginPath();
        ctx.arc(lx, ly + 10, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = lanternColors[l % lanternColors.length];
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(lx - 10, ly, 20, 24, 8);
        ctx.fill();
        ctx.stroke();
      }
    }
  }
}
