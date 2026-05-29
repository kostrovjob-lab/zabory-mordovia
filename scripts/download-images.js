const fs = require("fs");
const path = require("path");
const https = require("https");

const dir = path.join(__dirname, "../public/images");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const images = {
  "hero.jpg": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop",
  "profnastil.jpg": "https://images.unsplash.com/photo-1589939705382-55e82f71ac41?w=800&q=80&auto=format&fit=crop",
  "rabitsa.jpg": "https://images.unsplash.com/photo-1590073242678-ac8728254434?w=800&q=80&auto=format&fit=crop",
  "3d-zabor.jpg": "https://images.unsplash.com/photo-1560518887-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
  "pod-klyuch.jpg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop",
  "otkatnye.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
  "raspashnye.jpg": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
  "kalitka.jpg": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd7?w=800&q=80&auto=format&fit=crop",
  "montazh.jpg": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
  "metal.jpg": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop",
  "demontazh.jpg": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop",
  "dacha.jpg": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop",
  "gallery-1.jpg": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "gallery-2.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop",
  "gallery-3.jpg": "https://images.unsplash.com/photo-1560518887-ce09059eeffa?w=600&q=80&auto=format&fit=crop",
  "gallery-4.jpg": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format&fit=crop",
  "gallery-5.jpg": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop",
  "gallery-6.jpg": "https://images.unsplash.com/photo-1589939705382-55e82f71ac41?w=600&q=80&auto=format&fit=crop",
  "gallery-7.jpg": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80&auto=format&fit=crop",
  "gallery-8.jpg": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`${url} => HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

async function main() {
  for (const [file, url] of Object.entries(images)) {
    const dest = path.join(dir, file);
    process.stdout.write(`Downloading ${file}... `);
    try {
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(`OK (${Math.round(size / 1024)} KB)`);
    } catch (e) {
      console.log(`FAIL: ${e.message}`);
    }
  }
  console.log("Done.");
}

main();
