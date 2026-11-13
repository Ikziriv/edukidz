import type { LanguageCode, SelectableCharacterId } from '../../../types/story';
import { ALL_CHAR_IDS, CHARACTER_PALETTES } from '../../../constants/characterRegistry';
import { worldToStageNorm } from '../../../lib/lawnGridMath';
import { PVZ_OUTLINE_COLOR, drawRoundedRectPath } from '../../../lib/canvasPvZPrimitives';

export interface FloatingFX {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  bornAt: number;
}

export type CharPosMap = Record<
  SelectableCharacterId,
  { x: number; z: number; vx: number; vz: number; facing: number }
>;

/**
 * Renders Plane 2 of the 2D Stage:
 * All 6 depth-sorted Global Friends with PopCap / Plants vs. Zombies bold inked outlines,
 * expressive comic eyes with glossy catchlights, and live lip-sync speech badges.
 */
export function drawPvZCharactersPlane2D(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  elapsed: number,
  charPosMap: CharPosMap,
  targets: Record<SelectableCharacterId, [number, number, number]>,
  activeCharId: SelectableCharacterId,
  bounceCharId: SelectableCharacterId | null,
  hoveredCharId: SelectableCharacterId | null,
  isNarrating: boolean,
  speakingCharId: SelectableCharacterId,
  language: LanguageCode
): void {
  const sortedIds = [...ALL_CHAR_IDS].sort((a, b) => charPosMap[a].z - charPosMap[b].z);

  sortedIds.forEach((id) => {
    const spec = CHARACTER_PALETTES[id];
    const pos = charPosMap[id];
    const target = targets[id];

    const dx = target[0] - pos.x;
    const dz = target[2] - pos.z;
    const dist = Math.hypot(dx, dz);
    const isWalking = dist > 0.03;

    pos.x += dx * 0.11;
    pos.z += dz * 0.11;
    if (Math.abs(dx) > 0.015) {
      pos.facing = dx >= 0 ? 1 : -1;
    }

    const { nx, ny } = worldToStageNorm(pos.x, pos.z);
    const cx = nx * w;
    const depthScale = 0.88 + ((pos.z + 2.5) / 5.5) * 0.22;
    const walkBob = isWalking
      ? Math.abs(Math.sin(elapsed * 13)) * 6
      : Math.sin(elapsed * 2.4 + id.length) * 1.8;
    const bounceOffset = bounceCharId === id ? Math.abs(Math.sin(elapsed * 10)) * 14 : 0;
    const cy = ny * h - walkBob - bounceOffset;

    const isSelected = activeCharId === id;
    const isHovered = hoveredCharId === id;
    const isSpeakingNow = isNarrating && speakingCharId === id;
    const speechBounce = isSpeakingNow ? Math.abs(Math.sin(elapsed * 7.5)) * 5.5 : 0;

    ctx.save();
    ctx.translate(cx, cy - speechBounce);
    ctx.scale(depthScale, depthScale);

    // 1. Ground Contact Shadow & Selection Aura Ring
    ctx.fillStyle = 'rgba(15, 23, 42, 0.32)';
    ctx.beginPath();
    ctx.ellipse(0, 12 + walkBob * 0.5 + speechBounce * 0.5, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isSelected || isHovered || isSpeakingNow) {
      const pulse = 1 + Math.sin(elapsed * (isSpeakingNow ? 8 : 5)) * (isSpeakingNow ? 0.14 : 0.08);
      ctx.strokeStyle = isSpeakingNow ? '#f59e0b' : spec.primary;
      ctx.lineWidth = isSpeakingNow ? 3.6 : isSelected ? 3.2 : 2;
      ctx.beginPath();
      ctx.ellipse(0, 12, 28 * pulse, 10.5 * pulse, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 12, 22 * pulse, 8 * pulse, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 2. Animated Legs / Sneakers with Bold PvZ Inked Outlines
    const legSwing = isWalking ? Math.sin(elapsed * 13) * 5 : 0;
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.8;
    drawRoundedRectPath(ctx, -11, -6 + legSwing, 8, 16, 4);
    ctx.fill();
    ctx.stroke();
    drawRoundedRectPath(ctx, 3, -6 - legSwing, 8, 16, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = spec.primary;
    drawRoundedRectPath(ctx, -13, 7 + legSwing, 11, 6, 3);
    ctx.fill();
    ctx.stroke();
    drawRoundedRectPath(ctx, 2, 7 - legSwing, 11, 6, 3);
    ctx.fill();
    ctx.stroke();

    // 3. Tailored Blazer / Torso with Bold PvZ Inked Outline
    const armSwing = isWalking
      ? Math.sin(elapsed * 13) * 4.5
      : isSpeakingNow
        ? Math.sin(elapsed * 8) * 3.5
        : Math.sin(elapsed * 2.2) * 1.2;

    // Back Arm & Hand
    ctx.fillStyle = spec.blazer;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.8;
    drawRoundedRectPath(ctx, -21, -31 - armSwing * 0.6, 7, 18, 3.5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = spec.skin;
    ctx.beginPath();
    ctx.arc(-17.5, -12 - armSwing * 0.6, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Main Torso Blazer
    drawRoundedRectPath(ctx, -16, -34, 32, 31, 11);
    ctx.fillStyle = spec.blazer;
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Cream Inner Shirt V-Neck & Collar Lapels
    ctx.fillStyle = '#fffbeb';
    ctx.beginPath();
    ctx.moveTo(-6, -33);
    ctx.lineTo(6, -33);
    ctx.lineTo(0, -20);
    ctx.closePath();
    ctx.fill();

    // Two Front Blazer Buttons
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, -16, 1.8, 0, Math.PI * 2);
    ctx.arc(0, -10, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Front Arm & Hand
    ctx.fillStyle = spec.blazer;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 1.8;
    drawRoundedRectPath(ctx, 14, -31 + armSwing * 0.6, 7, 18, 3.5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = spec.skin;
    ctx.beginPath();
    ctx.arc(17.5, -12 + armSwing * 0.6, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Character Signature Props in 2D
    if (spec.hasGuitar) {
      ctx.save();
      ctx.translate(11, -16);
      ctx.rotate(-0.35);
      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (id === 'aisyah') {
      // Emerald Watering Can
      ctx.save();
      ctx.translate(21, -10 + armSwing * 0.5);
      ctx.fillStyle = '#10b981';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.6;
      drawRoundedRectPath(ctx, -5, -5, 10, 9, 3);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(5, -2);
      ctx.lineTo(10, -6);
      ctx.stroke();
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(10.5, -6.5, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (id === 'sofia') {
      // Lavender Botanical Sketchbook
      ctx.save();
      ctx.translate(19, -13 + armSwing * 0.5);
      ctx.rotate(0.15);
      ctx.fillStyle = '#a855f7';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.5;
      drawRoundedRectPath(ctx, -4.5, -6, 9, 11, 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(-2, -3.5, 5, 6);
      ctx.restore();
    } else if (id === 'mei') {
      // Woven Herbal Flower Basket
      ctx.save();
      ctx.translate(20, -10 + armSwing * 0.5);
      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fb7185';
      ctx.beginPath();
      ctx.arc(-2, -1.5, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(2, -1.5, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 4. Sculpted Head & Signature Headwear / Hair Topology (ONLY AISYAH WEARS HIJAB)
    if (spec.usesHijab) {
      // Aisyah's Multi-Layered Sculpted Hijab Hood
      ctx.fillStyle = spec.primary;
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(0, -50, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner white cotton under-scarf (ciput) arch over forehead
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(pos.facing * 1.1, -52, 13.8, Math.PI * 1.1, Math.PI * 1.9);
      ctx.fill();

      // Crown highlight rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -50, 17.5, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();

      // Open-face skin contour
      ctx.fillStyle = spec.skin;
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(pos.facing * 1.2, -48.8, 13.2, 13.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Three Stacked Draped Neck & Shoulder Folds Under Chin
      ctx.fillStyle = spec.secondary;
      ctx.beginPath();
      ctx.ellipse(0, -30.5, 17, 5.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = spec.primary;
      ctx.beginPath();
      ctx.ellipse(0, -33.2, 15.5, 4.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = spec.primary;
      ctx.beginPath();
      ctx.ellipse(0, -35.8, 13.8, 3.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Emerald-Gold Hijab Brooch Pin
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(11, -33.5, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = spec.pinColor ?? '#10b981';
      ctx.beginPath();
      ctx.arc(11, -33.5, 2.0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Back hair silhouette for Sofia (Nordic Braids), Mei-Ling (Twin Buns), or Amara (Afro Puffs)
      if (spec.hasBraids) {
        // Sofia's Twin Nordic Braids hanging over shoulders
        ctx.fillStyle = spec.hairColor;
        ctx.strokeStyle = PVZ_OUTLINE_COLOR;
        ctx.lineWidth = 1.8;
        [-14, 14].forEach((bx) => {
          [0, 1, 2].forEach((seg) => {
            ctx.beginPath();
            ctx.arc(bx, -41 + seg * 5.2, 4.4 - seg * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });
          // Lavender hair tie
          ctx.fillStyle = '#c4b5fd';
          ctx.beginPath();
          ctx.arc(bx, -27.5, 2.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = spec.hairColor;
        });
      }

      if (spec.hasTwinBuns) {
        // Mei-Ling's Twin Silk-Ribbon Buns
        ctx.fillStyle = spec.hairColor;
        ctx.strokeStyle = PVZ_OUTLINE_COLOR;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-14.5, -60, 7.2, 0, Math.PI * 2);
        ctx.arc(14.5, -60, 7.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Coral silk ribbons around buns
        ctx.strokeStyle = '#fb7185';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(-14.5, -60, 5.2, 0.2, Math.PI * 1.4);
        ctx.moveTo(19.5, -60);
        ctx.arc(14.5, -60, 5.2, 0, Math.PI * 1.2);
        ctx.stroke();
        // Golden 5-petal plum blossom hairpin on left bun
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(-10.5, -56.5, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (spec.hasAfro) {
        ctx.fillStyle = spec.hairColor;
        ctx.strokeStyle = PVZ_OUTLINE_COLOR;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-14.5, -60, 8.8, 0, Math.PI * 2);
        ctx.arc(14.5, -60, 8.8, 0, Math.PI * 2);
        ctx.arc(0, -64, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(-10.5, -56, 2.6, 0, Math.PI * 2);
        ctx.arc(10.5, -56, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Visible Ears for Non-Hijab Characters
      ctx.fillStyle = spec.skin;
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(-14.2, -49, 3.4, 0, Math.PI * 2);
      ctx.arc(14.2, -49, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Main Head Contour
      ctx.fillStyle = spec.skin;
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(pos.facing * 1.2, -49, 14, 14.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Upper Hair Crown & Bangs
      ctx.fillStyle = spec.hairColor;
      ctx.beginPath();
      ctx.arc(0, -53.2, 14.3, Math.PI, Math.PI * 2);
      ctx.fill();

      if (spec.hasBraids) {
        // Sofia's Parted Bangs & Pastel-Lavender Headband with Pearl Pin
        ctx.fillStyle = spec.hairColor;
        ctx.beginPath();
        ctx.ellipse(-6.5, -56, 7.5, 4.2, -0.25, 0, Math.PI * 2);
        ctx.ellipse(6.5, -56, 7.5, 4.2, 0.25, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#c4b5fd';
        ctx.lineWidth = 3.6;
        ctx.beginPath();
        ctx.arc(0, -51.5, 14.6, Math.PI * 1.08, Math.PI * 1.92);
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(10.5, -58.5, 2.6, 0, Math.PI * 2);
        ctx.fill();
      } else if (spec.hasTwinBuns) {
        // Mei-Ling's Curved East Asian Fringe Bangs
        ctx.fillStyle = spec.hairColor;
        ctx.beginPath();
        ctx.ellipse(0, -57.5, 11.5, 4.2, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (spec.hasCap) {
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = PVZ_OUTLINE_COLOR;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -55, 14.4, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        ctx.ellipse(pos.facing * 4, -55, 16, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    // 5. Expressive PopCap/PvZ Eyes, Blink Animation, Spectacles & Smile
    const eyeOffsetX = pos.facing * 2;
    const isBlinking = Math.sin(elapsed * 1.7 + id.charCodeAt(0)) > 0.96;

    if (isBlinking) {
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5.5 + eyeOffsetX, -50);
      ctx.lineTo(-1.5 + eyeOffsetX, -50);
      ctx.moveTo(2.5 + eyeOffsetX, -50);
      ctx.lineTo(6.5 + eyeOffsetX, -50);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(-4.5 + eyeOffsetX, -50, 3.1, 3.4, 0, 0, Math.PI * 2);
      ctx.ellipse(4.5 + eyeOffsetX, -50, 3.1, 3.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#27170c';
      ctx.beginPath();
      ctx.arc(-4.2 + eyeOffsetX, -49.8, 2.0, 0, Math.PI * 2);
      ctx.arc(4.8 + eyeOffsetX, -49.8, 2.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-3.6 + eyeOffsetX, -50.7, 0.9, 0, Math.PI * 2);
      ctx.arc(5.4 + eyeOffsetX, -50.7, 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    if (spec.hasGlasses) {
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(-4.5 + eyeOffsetX, -50, 4.1, 0, Math.PI * 2);
      ctx.arc(4.5 + eyeOffsetX, -50, 4.1, 0, Math.PI * 2);
      ctx.moveTo(-0.4 + eyeOffsetX, -50);
      ctx.lineTo(0.4 + eyeOffsetX, -50);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(244, 63, 94, 0.36)';
    ctx.beginPath();
    ctx.ellipse(-8 + eyeOffsetX, -46, 2.5, 1.5, 0, 0, Math.PI * 2);
    ctx.ellipse(8 + eyeOffsetX, -46, 2.5, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (isSpeakingNow) {
      const mouthOpenY = 1.3 + Math.abs(Math.sin(elapsed * 18)) * 2.6;
      ctx.fillStyle = '#9f1239';
      ctx.beginPath();
      ctx.ellipse(eyeOffsetX, -44.2, 3.5, mouthOpenY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(eyeOffsetX - 2.2, -44.2 - mouthOpenY * 0.65, 4.4, 1.2);
    } else {
      ctx.strokeStyle = '#881337';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(eyeOffsetX, -45.2, 3.3, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    }

    // 6. Floating Character Name & Live Storytelling Pill Tag
    if (isSpeakingNow || isSelected || isHovered) {
      const badgeText = isSpeakingNow
        ? `🎙️ ${spec.name} · ${language === 'id' ? 'Bercerita' : 'Speaking'}`
        : spec.name;
      const labelW = badgeText.length * 6.0 + 20;
      drawRoundedRectPath(ctx, -labelW / 2, -84, labelW, 18, 9);
      ctx.fillStyle = isSpeakingNow
        ? '#059669'
        : isSelected
          ? spec.primary
          : 'rgba(15, 23, 42, 0.85)';
      ctx.fill();
      ctx.strokeStyle = isSpeakingNow ? '#fde047' : PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9.5px "Fredoka", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, 0, -75);
    }

    ctx.restore();
  });
}

/**
 * Renders Plane 3 of the 2D Stage:
 * Foreground botanical foliage frame, watering can droplet shower,
 * floating golden fireflies / pollen motes, and rising action feedback pills.
 */
export function drawForegroundEffectsPlane2D(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  px: number,
  py: number,
  elapsed: number,
  now: number,
  sleeping: boolean,
  isWateringActive: boolean,
  floatingFxList: FloatingFX[]
): FloatingFX[] {
  const p3x = px * 42;
  const p3y = py * 20;

  ctx.save();
  ctx.translate(p3x, p3y);

  // Left & Right Foreground Botanical Silhouette Tufts
  ctx.fillStyle = sleeping ? '#064e3b' : '#15803d';
  ctx.beginPath();
  ctx.arc(-10, h + 10, h * 0.22, 0, Math.PI * 2);
  ctx.arc(w * 0.08, h + 25, h * 0.16, 0, Math.PI * 2);
  ctx.arc(w + 10, h + 10, h * 0.22, 0, Math.PI * 2);
  ctx.arc(w * 0.92, h + 25, h * 0.16, 0, Math.PI * 2);
  ctx.fill();

  // Watering Can Shower Droplet Burst
  if (isWateringActive) {
    ctx.fillStyle = '#38bdf8';
    for (let d = 0; d < 22; d++) {
      const dropX = w * 0.36 + ((d * 37) % (w * 0.28));
      const dropY = h * 0.48 + ((elapsed * 260 + d * 19) % (h * 0.22));
      ctx.beginPath();
      ctx.ellipse(dropX, dropY, 2.2, 5, 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Floating Golden Fireflies (Sleeping) or Dandelion Pollen Motes (Study/Playing)
  for (let p = 0; p < 20; p++) {
    const moteX = ((Math.sin(elapsed * 0.6 + p * 1.7) * 0.46 + 0.5) * w + p * 31) % w;
    const moteY = h * 0.14 + (Math.cos(elapsed * 0.8 + p * 2.3) * 0.4 + 0.5) * h * 0.72;
    const pulse = 0.35 + 0.65 * Math.abs(Math.sin(elapsed * 2.5 + p));

    ctx.save();
    ctx.fillStyle = sleeping
      ? `rgba(253, 224, 71, ${pulse.toFixed(2)})`
      : `rgba(255, 251, 235, ${(pulse * 0.75).toFixed(2)})`;
    if (sleeping) {
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 10;
    }
    ctx.beginPath();
    ctx.arc(moteX, moteY, sleeping ? 3.2 : 2.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Render Floating Feedback Text FX (+60G, Segar!, etc.)
  const activeFx: FloatingFX[] = [];
  for (const fx of floatingFxList) {
    const age = (now - fx.bornAt) * 0.001;
    if (age < 1.2) {
      activeFx.push(fx);
      const alpha = 1 - age / 1.2;
      const fxX = fx.x * w;
      const fxY = fx.y * h - age * 36;
      ctx.save();
      ctx.font = 'bold 13px "Fredoka", sans-serif';
      ctx.textAlign = 'center';
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      drawRoundedRectPath(ctx, fxX - 48, fxY - 11, 96, 22, 11);
      ctx.fill();
      ctx.fillStyle = fx.color;
      ctx.fillText(fx.text, fxX, fxY + 4);
      ctx.restore();
    }
  }

  ctx.restore();
  return activeFx;
}

