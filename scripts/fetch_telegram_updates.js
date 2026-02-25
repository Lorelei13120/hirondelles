#!/usr/bin/env node

/**
 * Script pour récupérer les nouveaux messages du canal Telegram @hirondelles
 * et les ajouter au fichier messages.json
 *
 * Ce script est lancé par GitHub Actions (les lundis et jeudis à 9h UTC)
 * Usage: node scripts/fetch_telegram_updates.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import TelegramBot from 'node-telegram-bot-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = -1002117925150; // @hirondelles
const ASSETS_PATH = 'public/Assets';
const MESSAGES_FILE = path.join(ASSETS_PATH, 'messages.json');
const LAST_UPDATE_ID_FILE = path.join(ASSETS_PATH, 'last_update_id.txt');
const IMAGES_PHOTOS_PATH = path.join(ASSETS_PATH, 'telegram-images', 'photos');
const IMAGES_AFFICHES_PATH = path.join(ASSETS_PATH, 'telegram-images', 'affiches');

// Créer les répertoires s'ils n'existent pas
[IMAGES_PHOTOS_PATH, IMAGES_AFFICHES_PATH].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Télécharge un fichier depuis Telegram
 */
async function downloadFile(fileUrl, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(fileUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

/**
 * Obtient le dernier update_id traité
 */
function getLastUpdateId() {
  try {
    if (fs.existsSync(LAST_UPDATE_ID_FILE)) {
      return parseInt(fs.readFileSync(LAST_UPDATE_ID_FILE, 'utf-8').trim());
    }
  } catch (e) {
    console.log('⚠️  Impossible de lire le fichier last_update_id.txt');
  }
  return 0;
}

/**
 * Sauvegarde le dernier update_id traité
 */
function saveLastUpdateId(updateId) {
  fs.writeFileSync(LAST_UPDATE_ID_FILE, updateId.toString());
}

/**
 * Charge les messages existants
 */
function loadMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    }
  } catch (e) {
    console.log('⚠️  Impossible de lire messages.json, création d\'un nouveau fichier');
  }
  return [];
}

/**
 * Sauvegarde les messages
 */
function saveMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

/**
 * Fonction principale
 */
async function fetchNewMessages() {
  console.log('\n' + '='.repeat(60));
  console.log('📥 RÉCUPÉRATION DES NOUVEAUX MESSAGES TELEGRAM');
  console.log('='.repeat(60) + '\n');

  // Vérifier le token
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('❌ ERREUR: TELEGRAM_BOT_TOKEN n\'est pas défini!');
    console.error('Vérifiez que le secret GitHub est configuré correctement.');
    process.exit(1);
  }

  try {
    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    const lastUpdateId = getLastUpdateId();
    const existingMessages = loadMessages();
    const existingMessageIds = new Set(existingMessages.map(m => m.id));

    console.log(`📍 Dernier update_id traité: ${lastUpdateId}`);
    console.log(`📊 Messages existants: ${existingMessages.length}\n`);

    let newMessagesCount = 0;
    let maxUpdateId = lastUpdateId;

    // Récupérer les updates depuis le dernier update_id connu
    console.log('🔄 Récupération des nouveaux updates...');
    const offset = lastUpdateId > 0 ? lastUpdateId + 1 : 0;
    const updates = await bot.getUpdates({ offset, limit: 100, timeout: 10 });

    for (const update of updates) {
      // Mettre à jour le maxUpdateId même si on ignore le message
      maxUpdateId = Math.max(maxUpdateId, update.update_id);

      if (!update.channel_post) continue;

      const msg = update.channel_post;

      // Vérifier que c'est du canal @hirondelles
      if (!msg.chat || msg.chat.id !== CHANNEL_ID) continue;

      // Ignorer les messages déjà enregistrés (par leur message_id)
      if (existingMessageIds.has(msg.message_id.toString())) continue;

      // Ignorer les messages contenant "rappel"
      if (msg.text && msg.text.toLowerCase().includes('rappel')) {
        console.log(`  ⏭️  Ignoré (rappel): Message ${msg.message_id}`);
        continue;
      }

      console.log(`\n📨 Nouveau message: ${msg.message_id} (update: ${update.update_id})`);

      const msgObj = {
        id: msg.message_id.toString(),
        date: new Date(msg.date * 1000).toISOString(),
        content: msg.text || msg.caption || '',
        images: [],
        tags: []
      };

      // Traiter les photos
      if (msg.photo && msg.photo.length > 0) {
        const photo = msg.photo[msg.photo.length - 1]; // La plus grande version

        try {
          console.log(`  📷 Téléchargement de l'image...`);
          const file = await bot.getFile(photo.file_id);
          const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`;
          const filename = `telegram_${msg.message_id}_${Date.now()}.jpg`;
          const filepath = path.join(IMAGES_PHOTOS_PATH, filename);

          await downloadFile(fileUrl, filepath);
          msgObj.images.push(`telegram-images/photos/${filename}`);
          console.log(`    ✅ Sauvegardé: ${filename}`);
        } catch (e) {
          console.log(`    ❌ Erreur téléchargement: ${e.message}`);
        }
      }

      // Ajouter le message s'il contient du texte ou des images
      if (msgObj.content || msgObj.images.length > 0) {
        existingMessages.push(msgObj);
        existingMessageIds.add(msgObj.id);
        newMessagesCount++;
        console.log(`  ✅ Message ajouté`);
      }
    }

    // Sauvegarder les mises à jour
    if (newMessagesCount > 0) {
      saveMessages(existingMessages);
      console.log(`\n✅ ${newMessagesCount} nouveau(x) message(s) ajouté(s)`);
    } else {
      console.log('\n✅ Aucun nouveau message trouvé');
    }

    // Toujours sauvegarder le dernier update_id pour avancer l'offset
    if (maxUpdateId > lastUpdateId) {
      saveLastUpdateId(maxUpdateId);
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ');
    console.log('='.repeat(60));
    console.log(`  Messages totaux: ${existingMessages.length}`);
    console.log(`  Images: ${existingMessages.reduce((acc, m) => acc + m.images.length, 0)}`);
    console.log(`  Dernier update_id: ${maxUpdateId}`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ ERREUR:', error.message);
    if (error.message.includes('token')) {
      console.error('⚠️  Vérifiez que TELEGRAM_BOT_TOKEN est correct');
    }
    process.exit(1);
  }
}

// Lancer le script
fetchNewMessages().catch(err => {
  console.error('❌ Erreur fatale:', err);
  process.exit(1);
});
