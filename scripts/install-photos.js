const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "../../photo");
const destDir = path.join(__dirname, "../public/images");

const mapping = {
  "hero.jpg": "забор из профлиста.jpg",
  "profnastil.jpg": "забор из профлиста 1.jpg",
  "rabitsa.jpg": "забор из рабицы.jpg",
  "3d-zabor.jpg": "забор из 3д сетки.jpg",
  "pod-klyuch.jpg": "забор из штакетника и кирпича.jpg",
  "otkatnye.jpg": "откатные ворота.jpg",
  "raspashnye.jpg": "распашные ворота.jpg",
  "kalitka.jpg": "калитка.jpg",
  "montazh.jpg": "забор из штакетника.jpg",
  "metal.jpg": "забор из штакетника.jpg",
  "demontazh.jpg": "забор из профлиста.jpg",
  "dacha.jpg": "забор из рабицы.jpg",
  "gallery-1.jpg": "забор из профлиста.jpg",
  "gallery-2.jpg": "откатные ворота.jpg",
  "gallery-3.jpg": "забор из 3д сетки.jpg",
  "gallery-4.jpg": "распашные ворота1 .jpg",
  "gallery-5.jpg": "калитка.jpg",
  "gallery-6.jpg": "забор из профлиста 1.jpg",
  "gallery-7.jpg": "забор из штакетника.jpg",
  "gallery-8.jpg": "забор из штакетника и кирпича.jpg",
};

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

for (const [dest, src] of Object.entries(mapping)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (!fs.existsSync(srcPath)) {
    console.error(`MISSING: ${src}`);
    continue;
  }
  fs.copyFileSync(srcPath, destPath);
  const kb = Math.round(fs.statSync(destPath).size / 1024);
  console.log(`✓ ${dest} ← ${src} (${kb} KB)`);
}

console.log("\nDone! Updated", Object.keys(mapping).length, "images.");
