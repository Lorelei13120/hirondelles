#!/usr/bin/env node

/**
 * Script pour récupérer les nouveaux messages du canal Telegram @hirondelles
 * et les ajouter au fichier messages.json
 *
 * Ce script est lancé par GitHub Actions (les lundis et jeudis à 9h UTC)
 * MIGRÉ vers Telegraf pour meilleure maintenance et sécurité
 * Usage: node scripts/fetch_telegram_updates.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { Telegraf } from 'telegraf';

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
      // Cleanup du fichier partiel. Si unlink echoue (permissions, lock),
      // on le signale pour eviter qu'un fichier corrompu reste reference
      // dans messages.json comme une image valide (404 silencieux cote front).
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
          console.warn(`⚠️  Cleanup partial echoue pour ${filePath}: ${unlinkErr.message}`);
        }
      });
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
 * Charge les messages existants.
 *
 * IMPORTANT : on distingue strictement deux cas pour éviter d'écraser
 * tout l'historique du canal en cas de problème :
 *   - Fichier ABSENT (premier run, repo neuf) → retour `[]`, comportement normal.
 *   - Fichier PRESENT mais JSON corrompu → process.exit(1), refus d'écraser.
 *
 * Risque mitigé : si on retournait `[]` sur un parse échoué (écriture
 * partielle suite à un crash, encodage cassé), le saveMessages() suivant
 * ECRASERAIT l'historique. Les anciens messages ne reviennent pas via
 * getUpdates car ils sont au-delà de la fenêtre Telegram.
 */
function loadMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
  } catch (e) {
    console.error('❌ messages.json existe mais est corrompu :', e.message);
    console.error('❌ Refus d\'ecraser l\'historique. Restaurer le fichier depuis git ou un backup.');
    process.exit(1);
  }
}

/**
 * Sauvegarde les messages
 */
function saveMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

/**
 * Détecte le type de message (actualité ou événement)
 * Un message est un événement s'il contient:
 * - Une date (emoji 📅)
 * - Une heure (pattern HHH00 ou HH:MM)
 * - Un lieu (emoji 📍)
 */
function detectMessageTags(content) {
  if (!content || typeof content !== 'string') {
    return ['actualité'];
  }

  // Patterns pour détecter un événement
  const hasDateEmoji = content.includes('📅');
  const hasLocationEmoji = content.includes('📍');
  
  // Patterns de temps: HHH00, HH:MM, H30, 10H30, 18:00, etc.
  const timePatterns = /\d{1,2}[H:]\d{2}|\d{1,2}H\d{2}/;
  const hasTimePattern = timePatterns.test(content);

  // Si l'un des patterns est trouvé, c'est un événement
  if (hasDateEmoji || hasLocationEmoji || hasTimePattern) {
    return ['événement'];
  }

  return ['actualité'];
}

/**
 * Fonction principale avec Telegraf
 */
async function fetchNewMessages() {
  console.log('\n' + '='.repeat(60));
  console.log('📥 RÉCUPÉRATION DES NOUVEAUX MESSAGES TELEGRAM (Telegraf)');
  console.log('='.repeat(60) + '\n');

  // Vérifier le token
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('❌ ERREUR: TELEGRAM_BOT_TOKEN n\'est pas défini!');
    console.error('Vérifiez que le secret GitHub est configuré correctement.');
    process.exit(1);
  }

  try {
    const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    const lastUpdateId = getLastUpdateId();
    const existingMessages = loadMessages();
    const existingMessageIds = new Set(existingMessages.map(m => m.id));

    console.log(`📍 Dernier update_id traité: ${lastUpdateId}`);
    console.log(`📊 Messages existants: ${existingMessages.length}\n`);

    let newMessagesCount = 0;
    let maxUpdateId = lastUpdateId;

    // Récupérer les updates depuis le dernier update_id connu
    console.log('🔄 Récupération des nouveaux updates avec Telegraf...');
    const offset = lastUpdateId > 0 ? lastUpdateId + 1 : 0;
    
    try {
      const updates = await bot.telegram.getUpdates({ 
        offset, 
        limit: 100, 
        timeout: 10,
        allowed_updates: ['channel_post']
      });

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
          tags: detectMessageTags(msg.text || msg.caption || '')
        };

        // Traiter les photos avec Telegraf (API simplifiée)
        if (msg.photo && msg.photo.length > 0) {
          const photo = msg.photo[msg.photo.length - 1]; // La plus grande version

          try {
            console.log(`  📷 Téléchargement de l'image...`);
            const file = await bot.telegram.getFile(photo.file_id);
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
    } catch (apiError) {
      console.error('❌ Erreur API Telegraf:', apiError.message);
      // Middleware d'erreur Telegraf pour meilleur handling
      throw apiError;
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
    if (error.message.includes('token') || error.message.includes('401')) {
      console.error('⚠️  Vérifiez que TELEGRAM_BOT_TOKEN est correct');
    }
    process.exit(1);
  }
}

// Lancer le script avec meilleur handling
fetchNewMessages().catch(err => {
  console.error('❌ Erreur fatale:', err);
  process.exit(1);
});
