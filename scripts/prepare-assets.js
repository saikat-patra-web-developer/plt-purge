import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedImagePath = 'C:/Users/Saikat/.gemini/antigravity/brain/3e28680c-144c-48e4-8371-358abf3e1f7d/.user_uploaded/media_1789453220811.jpg';
const imagesDir = 'public/images';
const blindsDir = 'public/images/blinds';

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(blindsDir)) fs.mkdirSync(blindsDir, { recursive: true });

async function run() {
  console.log('Generating assets from mockup...');

  // 1. Hero monitor and desk setup (1x and 2x)
  await sharp(uploadedImagePath)
    .extract({ left: 395, top: 60, width: 458, height: 380 })
    .webp({ quality: 95 })
    .toFile(path.join(imagesDir, 'hero-monitor.webp'));

  await sharp(uploadedImagePath)
    .extract({ left: 395, top: 60, width: 458, height: 380 })
    .resize(916, 760, { kernel: 'lanczos3' })
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(imagesDir, 'hero-monitor@2x.webp'));

  // 2. Cutting machine image for How It Works (1x and 2x)
  await sharp(uploadedImagePath)
    .extract({ left: 635, top: 607, width: 218, height: 199 })
    .webp({ quality: 95 })
    .toFile(path.join(imagesDir, 'cutting-machine.webp'));

  await sharp(uploadedImagePath)
    .extract({ left: 635, top: 607, width: 218, height: 199 })
    .resize(654, 597, { kernel: 'lanczos3' })
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(imagesDir, 'cutting-machine@2x.webp'));

  // 3. How It Works background banner (full machine section)
  await sharp(uploadedImagePath)
    .extract({ left: 0, top: 607, width: 853, height: 199 })
    .webp({ quality: 95 })
    .toFile(path.join(imagesDir, 'how-it-works-banner.webp'));

  // 4. Logo from mockup
  await sharp(uploadedImagePath)
    .extract({ left: 32, top: 12, width: 108, height: 38 })
    .webp({ quality: 100 })
    .toFile(path.join(imagesDir, 'purge-logo.webp'));

  // 5. Individual Blind Icons
  const icons = [
    { name: 'roller-blinds', left: 60, top: 512, width: 55, height: 42 },
    { name: 'vertical-blinds', left: 175, top: 512, width: 55, height: 42 },
    { name: 'venetian-blinds', left: 288, top: 512, width: 55, height: 42 },
    { name: 'panel-blinds', left: 400, top: 512, width: 55, height: 42 },
    { name: 'roman-blinds', left: 512, top: 512, width: 55, height: 42 },
    { name: 'outdoor-shades', left: 625, top: 512, width: 60, height: 42 },
  ];

  for (const icon of icons) {
    await sharp(uploadedImagePath)
      .extract({ left: icon.left, top: icon.top, width: icon.width, height: icon.height })
      .webp({ quality: 100 })
      .toFile(path.join(blindsDir, `${icon.name}.webp`));
  }

  // 6. Generate clean SVG for Purge Logo
  const svgLogo = `<svg viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="slat1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1e40af" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <linearGradient id="slat2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    <linearGradient id="slat3" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <!-- 3 Slats / Bars -->
  <rect x="0" y="8" width="34" height="6.5" rx="2" fill="url(#slat1)" />
  <rect x="0" y="17.5" width="38" height="6.5" rx="2" fill="url(#slat2)" />
  <rect x="0" y="27" width="30" height="6.5" rx="2" fill="url(#slat3)" />
  
  <!-- Text Purge -->
  <text x="44" y="27.5" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="28" fill="#09090b" letter-spacing="-0.5px">Purge</text>
  
  <!-- Registered Symbol -->
  <circle cx="127" cy="11.5" r="3.8" stroke="#475569" stroke-width="0.8" fill="none" />
  <text x="127" y="13.8" font-family="'Inter', sans-serif" font-size="5" font-weight="700" fill="#475569" text-anchor="middle">R</text>
  
  <!-- Subtitle WHOLESALE BLINDS -->
  <text x="45" y="38" font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="6.8" fill="#475569" letter-spacing="2.2px">WHOLESALE BLINDS</text>
</svg>`;

  fs.writeFileSync(path.join(imagesDir, 'purge-logo.svg'), svgLogo);

  // Render SVG logo to a high-res webp as well
  await sharp(Buffer.from(svgLogo))
    .resize(340, 96)
    .webp({ quality: 100 })
    .toFile(path.join(imagesDir, 'purge-logo-vector.webp'));

  console.log('All assets processed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
