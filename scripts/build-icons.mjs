import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public");
mkdirSync(join(out, "icons"), { recursive: true });

function letterE(size, safe = 0) {
  const pad = size * (0.22 + safe);
  const x = pad;
  const y = pad;
  const w = size - pad * 2;
  const h = size - pad * 2;
  const stem = w * 0.22;
  const bar = h * 0.16;
  const gap = (h - bar * 3) / 2;
  const midY = y + bar + gap;
  const botY = y + h - bar;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${bar}" fill="#F4F5F7"/>
    <rect x="${x}" y="${midY}" width="${w * 0.78}" height="${bar}" fill="#F4F5F7"/>
    <rect x="${x}" y="${botY}" width="${w}" height="${bar}" fill="#F4F5F7"/>
    <rect x="${x}" y="${y}" width="${stem}" height="${h}" fill="#F4F5F7"/>
  `;
}

function svg(size, safe = 0) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#07080C"/>
  ${letterE(size, safe)}
</svg>`;
}

async function writePng(path, size, safe) {
  await sharp(Buffer.from(svg(size, safe)))
    .png({ compressionLevel: 9 })
    .toFile(path);
}

await writePng(join(out, "apple-touch-icon.png"), 180, 0);
await writePng(join(out, "icons/icon-192.png"), 192, 0);
await writePng(join(out, "icons/icon-512.png"), 512, 0);
await writePng(join(out, "icons/icon-maskable-192.png"), 192, 0.08);
await writePng(join(out, "icons/icon-maskable-512.png"), 512, 0.08);
console.log("Wrote opaque PWA icons");
