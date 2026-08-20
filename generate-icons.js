import sharp from "sharp";
import fs from "fs";

const SVG_PATH = "./public/icon.svg";

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

// Generate 192x192
sharp(SVG_PATH)
  .resize(192, 192)
  .toFile("./public/icon-192.png")
  .then(() => console.log("✅ Generated public/icon-192.png"))
  .catch((err) => console.error(err));

// Generate 512x512
sharp(SVG_PATH)
  .resize(512, 512)
  .toFile("./public/icon-512.png")
  .then(() => console.log("✅ Generated public/icon-512.png"))
  .catch((err) => console.error(err));
