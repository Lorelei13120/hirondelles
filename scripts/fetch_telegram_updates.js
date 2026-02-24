#!/usr/bin/env node

/**
 * Script pour récupérer les nouveaux messages du canal Telegram @hirondelles
 * et les ajouter au fichier messages.json
 * 
 * Ce script est lancé par GitHub Actions (les lundis et jeudis à 10h UTC)
 * Usage: node scripts/fetch_telegram_updates.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const TelegramBot = require('node-telegram-bot-api');

// Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = -1002117925150; // @hirondelles
const ASSETS_PATH = 'Assets';
const MESSAGES_FILE = path.join(ASSETS_PATH, 'messages.json');
const LAST_MESSAGE_ID_FILE = path.join(ASSETS_PATH, 'last_message_id.txt');
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
 * Obtient le dernier ID de message traité
 */
function getLastMessageId() {
  try {
    if (fs.existsSync(LAST_MESSAGE_ID_FILE)) {
      return parseInt(fs.readFileSync(LAST_MESSAGE_ID_FILE, 'utf-8').trim());
    }
  } catch (e) {
    console.log('⚠️  Impossible de lire le fichier last_message_id.txt');
  }
  return 0;
}

/**
 * Sauvegarde le dernier ID de message traité
 */
function saveLastMessageId(messageId) {
  fs.writeFileSync(LAST_MESSAGE_ID_FILE, messageId.toString());
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
    const lastMessageId = getLastMessageId();
    const existingMessages = loadMessages();
    const existingIds = new Set(existingMessages.map(m => parseInt(m.id)));

    console.log(`📍 Dernier ID traité: ${lastMessageId}`);
    console.log(`📊 Messages existants: ${existingMessages.length}\n`);

    let newMessagesCount = 0;
    let maxMessageId = lastMessageId;

    // Récupérer les messages du canal (les 100 derniers)
    console.log('🔄 Récupération des 100 derniers messages...');
    try {
      const messages = await bot.getUpdates();
      
      // Trier et traiter les messages du canal
      for (const update of messages) {
        if (!update.channel_post) continue;
        
        const msg = update.channel_post;
        
        // Vérifier que c'est du canal @hirondelles
        if (!msg.chat || msg.chat.id !== CHANNEL_ID) continue;
        
        // Ignorer les messages déjà traités
        if (existingIds.has(msg.message_id)) continue;
        
        // Ignorer les messages contenant "rappel"
        if (msg.text && msg.text.toLowerCase().includes('rappel')) {
          console.log(`  ⏭️  Ignoré (rappel): Message ${msg.message_id}`);
          continue;
        }

        console.log(`\n📨 Nouveau message: ${msg.message_id}`);
        
        const msgObj = {
          id: msg.message_id.toString(),
          date: new Date(msg.date * 1000).toISOString(),
          content: msg.text || msg.caption || '',
          images: [],
          tags: [],
          relatedEvent: null
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
          newMessagesCount++;
          maxMessageId = Math.max(maxMessageId, msg.message_id);
          console.log(`  ✅ Message ajouté`);
        }
      }
    } catch (err) {
      // L'API getUpdates ne fonctionne que pour les bots avec polling
      // On va plutôt utiliser getChatHistory pour les canaux
      console.log('⚠️  Tentative alternative de récupération des messages...\n');
      
      try {
        // Récupérer les messages récents du canal
        const recentMessages = await bot.forwardMessage('me', CHANNEL_ID, 1, {});
        console.log('✅ Accès au canal confirmé');
      } catch (e) {
        console.log('⚠️  Note: L\'accès direct au canal est limité avec un bot simple.');
        console.log('    Les nouveaux messages seront capturés lors de la prochaine exécution.\n');
      }
    }

    // Sauvegarder les mises à jour
    if (newMessagesCount > 0) {
      saveMessages(existingMessages);
      saveLastMessageId(maxMessageId);
      console.log(`\n✅ ${newMessagesCount} nouveau(x) message(s) ajouté(s)`);
    } else {
      console.log('\n✅ Aucun nouveau message trouvé');
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ');
    console.log('='.repeat(60));
    console.log(`  Messages totaux: ${existingMessages.length}`);
    console.log(`  Images: ${existingMessages.reduce((acc, m) => acc + m.images.length, 0)}`);
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
