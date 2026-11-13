import * as THREE from 'three';

/**
 * Procedural Painterly Textures (0 Network Cost, Instant 60fps Caching)
 * Upgraded with subtle PopCap / Plants vs. Zombies alternating checkerboard lawn squares.
 */
export function createProceduralGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 2x2 subtle PvZ checkerboard lawn quadrants
    ctx.fillStyle = '#65c428';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillRect(64, 64, 64, 64);
    ctx.fillStyle = '#4fb01c';
    ctx.fillRect(64, 0, 64, 64);
    ctx.fillRect(0, 64, 64, 64);

    // Subtle lush grass blade streaks
    for (let i = 0; i < 180; i++) {
      const x = (Math.sin(i * 12.3) * 0.5 + 0.5) * 128;
      const y = (Math.cos(i * 37.7) * 0.5 + 0.5) * 128;
      ctx.fillStyle = i % 2 === 0 ? '#86efac' : '#22c55e';
      ctx.fillRect(x, y, 2, 3);
    }
    // Tiny daisy flower dots
    for (let i = 0; i < 16; i++) {
      const x = (Math.sin(i * 71.9) * 0.5 + 0.5) * 128;
      const y = (Math.cos(i * 93.1) * 0.5 + 0.5) * 128;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

export function createProceduralSoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#3d2010';
    ctx.fillRect(0, 0, 128, 128);
    // Dark loam organic soil grains
    for (let i = 0; i < 220; i++) {
      const x = (Math.sin(i * 15.7) * 0.5 + 0.5) * 128;
      const y = (Math.cos(i * 41.3) * 0.5 + 0.5) * 128;
      ctx.fillStyle = i % 2 === 0 ? '#201008' : '#573016';
      ctx.fillRect(x, y, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

