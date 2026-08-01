import sharp from 'sharp';
import fs from 'fs';

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

// Generate 192x192
sharp('icon.svg')
  .resize(192, 192)
  .toFile('./public/icon-192.png')
  .then(() => console.log('✅ Generated public/icon-192.png'))
  .catch(err => console.error(err));

// Generate 512x512
sharp('icon.svg')
  .resize(512, 512)
  .toFile('./public/icon-512.png')
  .then(() => console.log('✅ Generated public/icon-512.png'))
  .catch(err => console.error(err));