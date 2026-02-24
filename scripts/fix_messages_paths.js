const fs = require('fs');
const path = require('path');

const ASSETS = 'public/Assets';
const messagesFile = path.join(ASSETS, 'messages.json');
const messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));

let fixed = 0;
for (const msg of messages) {
  msg.images = msg.images.map(imgPath => {
    const filename = path.basename(imgPath);
    const inAffiches = fs.existsSync(path.join(ASSETS, 'telegram-images', 'affiches', filename));
    const inPhotos   = fs.existsSync(path.join(ASSETS, 'telegram-images', 'photos',   filename));
    if (!inPhotos && inAffiches) {
      fixed++;
      return `telegram-images/affiches/${filename}`;
    }
    return imgPath;
  });
}

fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
console.log(`✅ ${fixed} chemins corrigés dans messages.json`);
