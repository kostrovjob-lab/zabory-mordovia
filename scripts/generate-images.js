const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../public/images");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const themes = {
  hero: { bg: "#1a1d21", accent: "#f59e0b", label: "Забор под ключ" },
  profnastil: { bg: "#374151", accent: "#6b7280", label: "Профнастил" },
  rabitsa: { bg: "#4b5563", accent: "#9ca3af", label: "Рабица" },
  "3d-zabor": { bg: "#1f2937", accent: "#10b981", label: "3D забор" },
  "pod-klyuch": { bg: "#1a1d21", accent: "#f59e0b", label: "Под ключ" },
  otkatnye: { bg: "#292524", accent: "#f59e0b", label: "Откатные ворота" },
  raspashnye: { bg: "#44403c", accent: "#d97706", label: "Распашные ворота" },
  kalitka: { bg: "#3f3f46", accent: "#fbbf24", label: "Калитка" },
  montazh: { bg: "#27272a", accent: "#f97316", label: "Монтаж" },
  metal: { bg: "#18181b", accent: "#71717a", label: "Металл" },
  demontazh: { bg: "#450a0a", accent: "#ef4444", label: "Демонтаж" },
  dacha: { bg: "#14532d", accent: "#22c55e", label: "Дача" },
};

function svg(name, theme, w = 800, h = 600) {
  const posts = 6;
  const postW = 16;
  const gap = (w - posts * postW) / (posts - 1);
  let postsSvg = "";
  let panelsSvg = "";
  for (let i = 0; i < posts; i++) {
    const x = i * (postW + gap);
    postsSvg += `<rect x="${x}" y="120" width="${postW}" height="${h - 120}" fill="#374151" rx="2"/>`;
    if (i < posts - 1) {
      panelsSvg += `<rect x="${x + postW}" y="140" width="${gap - 4}" height="80" fill="${theme.accent}" opacity="0.85"/>`;
      panelsSvg += `<rect x="${x + postW}" y="240" width="${gap - 4}" height="80" fill="${theme.accent}" opacity="0.65"/>`;
      panelsSvg += `<rect x="${x + postW}" y="340" width="${gap - 4}" height="80" fill="${theme.accent}" opacity="0.85"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${theme.bg}"/>
  <rect y="${h - 60}" width="${w}" height="60" fill="#1f2937"/>
  ${postsSvg}
  <rect x="0" y="130" width="${w}" height="8" fill="#4b5563"/>
  <rect x="0" y="320" width="${w}" height="8" fill="#4b5563"/>
  ${panelsSvg}
  <text x="${w / 2}" y="50" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="28" font-weight="bold">${theme.label}</text>
  <rect x="0" y="0" width="${w}" height="${h}" fill="#000" opacity="0.15"/>
</svg>`;
}

const mapping = {
  "hero.jpg": "hero",
  "profnastil.jpg": "profnastil",
  "rabitsa.jpg": "rabitsa",
  "3d-zabor.jpg": "3d-zabor",
  "pod-klyuch.jpg": "pod-klyuch",
  "otkatnye.jpg": "otkatnye",
  "raspashnye.jpg": "raspashnye",
  "kalitka.jpg": "kalitka",
  "montazh.jpg": "montazh",
  "metal.jpg": "metal",
  "demontazh.jpg": "demontazh",
  "dacha.jpg": "dacha",
};

for (const [file, key] of Object.entries(mapping)) {
  const content = svg(key, themes[key], file === "hero.jpg" ? 1920 : 800, file === "hero.jpg" ? 1080 : 600);
  fs.writeFileSync(path.join(dir, file.replace(".jpg", ".svg")), content);
  fs.writeFileSync(path.join(dir, file), content);
}

for (let i = 1; i <= 8; i++) {
  const keys = Object.keys(themes).filter((k) => k !== "hero");
  const key = keys[(i - 1) % keys.length];
  const content = svg(`gallery-${i}`, themes[key], 600, 450 + (i % 3) * 50);
  fs.writeFileSync(path.join(dir, `gallery-${i}.jpg`), content);
}

console.log("Generated", Object.keys(mapping).length + 8, "images");
