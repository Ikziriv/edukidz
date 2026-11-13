import type { CharacterVisualPalette } from '../../../constants/characterRegistry';
import { getPvZSquashStretch } from '../../../constants/botanicalRegistry';
import { PVZ_OUTLINE_COLOR } from '../../../lib/canvasPvZPrimitives';

/**
 * Draws an expressive animated 2D broadcast bust character with PopCap/PvZ bold inked comic
 * outlines, squash-and-stretch speech bounce, open-face hijab/cap topology, phoneme lip-sync
 * mouth movement, eye blinks, and arm gestures for the "I Wonder Why" video reel.
 */
export function drawAnimatedBroadcastCharacter(
  ctx: CanvasRenderingContext2D,
  char: CharacterVisualPalette,
  cx: number,
  cy: number,
  scale: number,
  t: number,
  isSpeaking: boolean,
  isWondering: boolean
): void {
  ctx.save();
  ctx.translate(cx, cy);
  const bob = isSpeaking ? Math.sin(t * 9) * 3.5 : Math.sin(t * 2.4) * 2;
  ctx.translate(0, bob);

  // Subtle PopCap squash-and-stretch bounce
  const { scaleX, scaleY } = getPvZSquashStretch(t, cx * 0.01, isSpeaking ? 0.045 : 0.02);
  ctx.scale(scale * scaleX, scale * scaleY);

  // Soft ground shadow
  ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
  ctx.beginPath();
  ctx.ellipse(0, 92, 46, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Back Hijab Drape (Only Aisyah) or Back Hair Silhouette
  if (char.usesHijab) {
    ctx.fillStyle = char.secondary;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.ellipse(0, -8, 44, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (char.hasBraids) {
    // Sofia's Twin Nordic Braids hanging over shoulders
    ctx.fillStyle = char.hairColor;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.4;
    [-26, 26].forEach((bx) => {
      [0, 1, 2, 3].forEach((seg) => {
        ctx.beginPath();
        ctx.arc(bx, 2 + seg * 10, 8.5 - seg * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
      // Lavender ribbon tie
      ctx.fillStyle = '#c4b5fd';
      ctx.beginPath();
      ctx.roundRect(bx - 6, 33, 12, 5, 2.5);
      ctx.fill();
      ctx.stroke();
      // Braid tassel tip
      ctx.fillStyle = char.hairColor;
      ctx.beginPath();
      ctx.moveTo(bx - 5, 38);
      ctx.lineTo(bx + 5, 38);
      ctx.lineTo(bx, 48);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  }

  // Tailored Blazer Torso with PvZ Inked Outline
  ctx.fillStyle = char.blazer;
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(-36, 22, 72, 64, [22, 22, 12, 12]);
  ctx.fill();
  ctx.stroke();

  // Inner Cream Shirt V-Neck & Lapel Trim
  ctx.fillStyle = '#fffbeb';
  ctx.beginPath();
  ctx.moveTo(-15, 24);
  ctx.lineTo(15, 24);
  ctx.lineTo(0, 52);
  ctx.closePath();
  ctx.fill();

  // Blazer Buttons
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(0, 58, 3.2, 0, Math.PI * 2);
  ctx.arc(0, 70, 3.2, 0, Math.PI * 2);
  ctx.fill();

  // Animated Expressive Arms
  const leftWave = isSpeaking ? Math.sin(t * 7.5) * 0.35 - 0.45 : isWondering ? -0.65 : -0.15;
  const rightWave = isSpeaking ? Math.cos(t * 7.5) * 0.35 + 0.45 : 0.15;

  // Left Arm
  ctx.save();
  ctx.translate(-34, 34);
  ctx.rotate(leftWave);
  ctx.fillStyle = char.blazer;
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.roundRect(-10, 0, 16, 42, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = char.skin;
  ctx.beginPath();
  ctx.arc(-2, 44, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Right Arm
  ctx.save();
  ctx.translate(34, 34);
  ctx.rotate(rightWave);
  ctx.fillStyle = char.blazer;
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.roundRect(-6, 0, 16, 42, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = char.skin;
  ctx.beginPath();
  ctx.arc(2, 44, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Triple-Stacked Sculpted Hijab Neck Folds (Strictly for Aisyah)
  if (char.usesHijab) {
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.4;

    ctx.fillStyle = char.primary;
    ctx.beginPath();
    ctx.ellipse(0, 27, 34, 11.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = char.secondary;
    ctx.beginPath();
    ctx.ellipse(0, 20.5, 30.5, 9.5, 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = char.primary;
    ctx.beginPath();
    ctx.ellipse(0, 14, 26.5, 8, -0.03, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Emerald-Gold Hijab Brooch Pin
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(19, 21, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = char.pinColor ?? '#10b981';
    ctx.beginPath();
    ctx.arc(19, 21, 3.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Neck for Non-Hijab Characters
    ctx.fillStyle = char.skin;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.roundRect(-9, 10, 18, 16, 6);
    ctx.fill();
    ctx.stroke();
  }

  // Twin Buns (Mei-Ling) or Afro Puffs (Amara)
  if (char.hasTwinBuns) {
    ctx.fillStyle = char.hairColor;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(-27, -34, 13.5, 0, Math.PI * 2);
    ctx.arc(27, -34, 13.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Coral Silk Ribbons around Buns
    ctx.strokeStyle = '#fb7185';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(-27, -34, 10, 0.2, Math.PI * 1.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(27, -34, 10, -0.3, Math.PI * 0.9);
    ctx.stroke();

    // Five-Petal Golden Plum Blossom Hairpin on Left Bun
    const px = -21;
    const py = -26;
    ctx.fillStyle = '#fff1f2';
    for (let p = 0; p < 5; p++) {
      const angle = (p * Math.PI * 2) / 5;
      ctx.beginPath();
      ctx.arc(px + Math.cos(angle) * 4.5, py + Math.sin(angle) * 4.5, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(px, py, 2.8, 0, Math.PI * 2);
    ctx.fill();
  } else if (char.hasAfro) {
    ctx.fillStyle = char.hairColor;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(-32, -28, 18, 0, Math.PI * 2);
    ctx.arc(32, -28, 18, 0, Math.PI * 2);
    ctx.arc(0, -35, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Golden & Rose Hair Beads
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(-22, -22, 4.2, 0, Math.PI * 2);
    ctx.arc(22, -22, 4.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(-25, -16, 3.2, 0, Math.PI * 2);
    ctx.arc(25, -16, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Outer Hijab Hood Crown (Open-Face for Aisyah) or Visible Ears for Non-Hijab
  if (char.usesHijab) {
    ctx.fillStyle = char.primary;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -16, 37.5, 38.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Rim highlight on hijab crown
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -16, 33.5, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    // Soft white inner under-scarf (ciput) arch at top of forehead
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(0, -22, 26.5, 25.5, 0, Math.PI, Math.PI * 2);
    ctx.fill();
  } else {
    // Visible Ears for Non-Hijab Characters
    ctx.fillStyle = char.skin;
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(-26.5, -13, 6.2, 0, Math.PI * 2);
    ctx.arc(26.5, -13, 6.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Unoccluded Open Face Oval with PvZ Inked Outline
  ctx.fillStyle = char.skin;
  ctx.strokeStyle = PVZ_OUTLINE_COLOR;
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.ellipse(0, -14, 26, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Non-hijab Hair Bangs, Nordic Headband, or Explorer Cap
  if (!char.usesHijab) {
    ctx.fillStyle = char.hairColor;
    ctx.beginPath();
    ctx.ellipse(0, -32, 27, 14, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    if (char.hasBraids) {
      // Sofia's Parted Bangs & Pastel-Lavender Headband with Pearl Pin
      ctx.fillStyle = char.hairColor;
      ctx.beginPath();
      ctx.ellipse(-12, -31, 14, 8, -0.28, 0, Math.PI * 2);
      ctx.ellipse(12, -31, 14, 8, 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#c4b5fd';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, -19, 27.5, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(19, -34, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (char.hasTwinBuns) {
      // Mei-Ling's Curved East Asian Fringe Bangs
      ctx.fillStyle = char.hairColor;
      ctx.beginPath();
      ctx.ellipse(0, -33.5, 22, 8.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    if (char.hasCap) {
      ctx.fillStyle = char.primary;
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.ellipse(0, -33, 28, 14, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Cap visor
      ctx.fillStyle = char.secondary;
      ctx.beginPath();
      ctx.ellipse(8, -28, 22, 5.5, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  // Soft Rose Cheeks
  ctx.fillStyle = 'rgba(244, 63, 94, 0.28)';
  ctx.beginPath();
  ctx.ellipse(-15, -8, 6, 3.8, 0, 0, Math.PI * 2);
  ctx.ellipse(15, -8, 6, 3.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Periodic Blink
  const blinkCycle = (t * 0.85) % 4.2;
  const isBlinking = blinkCycle > 4.02;

  // Expressive Eyebrows
  const browLift = isWondering ? -3.5 : isSpeaking ? Math.sin(t * 6) * 1.5 - 1 : 0;
  ctx.strokeStyle = '#271c15';
  ctx.lineWidth = 2.6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(-10, -21 + browLift, 6, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(10, -21 + browLift, 6, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();

  // Eyes (4-layer studio eyes with specular catchlight)
  if (isBlinking) {
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(-15, -16);
    ctx.lineTo(-5, -16);
    ctx.moveTo(5, -16);
    ctx.lineTo(15, -16);
    ctx.stroke();
  } else {
    [-10, 10].forEach((ex) => {
      // Sclera
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = PVZ_OUTLINE_COLOR;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.ellipse(ex, -16, 5.6, 6.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Iris & Pupil
      ctx.fillStyle = char.irisColor;
      ctx.beginPath();
      ctx.arc(ex + 0.5, -16, 3.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(ex + 0.5, -16, 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Primary & Secondary Specular Highlights
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ex + 1.8, -17.8, 1.6, 0, Math.PI * 2);
      ctx.arc(ex - 1.2, -14.2, 0.85, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Round Glasses for Kenji
  if (char.hasGlasses) {
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(-10, -16, 7.5, 0, Math.PI * 2);
    ctx.arc(10, -16, 7.5, 0, Math.PI * 2);
    ctx.moveTo(-2.5, -16);
    ctx.lineTo(2.5, -16);
    ctx.stroke();
  }

  // Cute Nose
  ctx.fillStyle = 'rgba(161, 98, 7, 0.35)';
  ctx.beginPath();
  ctx.arc(0, -10, 2.2, 0, Math.PI * 2);
  ctx.fill();

  // Phoneme Lip-Sync Mouth
  if (isSpeaking) {
    const mouthOpen = 3.2 + Math.abs(Math.sin(t * 15)) * 5.8;
    const mouthWidth = 6.5 + Math.cos(t * 11) * 2.2;
    ctx.fillStyle = '#881337';
    ctx.beginPath();
    ctx.ellipse(0, -1.5, mouthWidth, mouthOpen, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tongue accent
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.ellipse(0, 1.2, mouthWidth * 0.6, mouthOpen * 0.45, 0, 0, Math.PI);
    ctx.fill();
  } else if (isWondering) {
    // Curious "O" mouth ("I Wonder Why!")
    ctx.fillStyle = '#881337';
    ctx.beginPath();
    ctx.arc(0, -2, 4.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Warm smile
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -4, 6.5, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }

  // Floating "I Wonder Why?" Question Bubble when wondering
  if (isWondering) {
    const floatY = -68 + Math.sin(t * 4) * 4;
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = PVZ_OUTLINE_COLOR;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.roundRect(22, floatY, 34, 28, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.font = '900 18px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('?', 39, floatY + 20);
  }

  // Broadcast Character Nameplate Badge at Base of Character (PvZ Seed Packet Badge Style)
  ctx.fillStyle = isSpeaking ? '#fbbf24' : 'rgba(15, 23, 42, 0.88)';
  ctx.strokeStyle = isSpeaking ? PVZ_OUTLINE_COLOR : 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.roundRect(-36, 78, 72, 20, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = isSpeaking ? '#0f172a' : '#f8fafc';
  ctx.font = '800 10.5px Fredoka, Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(char.name, 0, 91.5);

  ctx.restore();
}

