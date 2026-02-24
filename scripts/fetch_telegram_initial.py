#!/usr/bin/env python3
"""
Script pour récupérer tous les messages du canal Telegram @hirondelles
et télécharger les images associées avec leurs métadonnées.

Usage: python scripts/fetch_telegram_initial.py
"""

import asyncio
import json
import os
from pathlib import Path
from datetime import datetime
from telethon import TelegramClient
from telethon.errors import SessionPasswordNeededError

# Configuration
API_ID = int(input("Entrez votre API_ID: "))
API_HASH = input("Entrez votre API_HASH: ")
CHANNEL_ID = -1002117925150  # ID du canal @hirondelles
SESSION_NAME = "hirondelles_session"
ASSETS_PATH = Path("Assets")
MESSAGES_FILE = ASSETS_PATH / "messages.json"
IMAGES_AFFICHES_PATH = ASSETS_PATH / "telegram-images" / "affiches"
IMAGES_PHOTOS_PATH = ASSETS_PATH / "telegram-images" / "photos"

# Créer les répertoires s'ils n'existent pas
IMAGES_AFFICHES_PATH.mkdir(parents=True, exist_ok=True)
IMAGES_PHOTOS_PATH.mkdir(parents=True, exist_ok=True)

async def main():
    """Fonction principale pour récupérer les messages du canal."""
    
    # Créer le client Telegram
    client = TelegramClient(SESSION_NAME, API_ID, API_HASH)
    
    try:
        await client.start()
        print("✅ Connecté à Telegram!")
        
        # Vérifier si l'authentification a demandé une permission
        if not await client.is_user_authorized():
            await client.request_qr_login()
            print("Veuillez scanner le code QR apparu dans Telegram.")
            print("Ou utilisez l'authentification standard avec votre numéro de téléphone.")
            await client.start()
        
        # Récupérer le canal
        try:
            channel = await client.get_entity(CHANNEL_ID)
            print(f"✅ Canal trouvé: {channel.title}")
        except Exception as e:
            print(f"❌ Erreur: Impossible de trouver le canal {CHANNEL_ID}")
            print(f"Erreur: {e}")
            return
        
        # Récupérer tous les messages
        messages_data = []
        message_count = 0
        
        print("\n📥 Récupération des messages...")
        async for message in client.iter_messages(CHANNEL_ID, reverse=True):
            message_count += 1
            
            # Ignorer les messages contenant "rappel"
            if message.text and "rappel" in message.text.lower():
                print(f"  ⏭️  Ignoré (rappel): Message {message_count}")
                continue
            
            # Créer l'objet message
            msg_obj = {
                "id": str(message.id),
                "date": message.date.isoformat(),
                "content": message.text or "",
                "images": [],
                "tags": [],
                "relatedEvent": None
            }
            
            # Télécharger les images si présentes
            if message.media:
                try:
                    # Déterminer le type de média
                    media_type = type(message.media).__name__
                    
                    if media_type == "MessageMediaPhoto" or media_type == "Photo":
                        print(f"  📷 Message {message.id}: Téléchargement de l'image...")
                        
                        # Créer le nom du fichier
                        filename = f"telegram_{message.id}_{datetime.now().timestamp()}.jpg"
                        
                        # Décider du dossier (sera trié manuellement plus tard)
                        file_path = IMAGES_PHOTOS_PATH / filename
                        
                        # Télécharger le fichier
                        await client.download_media(message.media, file=str(file_path))
                        
                        # Ajouter le chemin relatif au JSON
                        relative_path = f"telegram-images/photos/{filename}"
                        msg_obj["images"].append(relative_path)
                        print(f"    ✅ Sauvegardé: {filename}")
                    
                    elif media_type == "MessageMediaDocument":
                        print(f"  📎 Message {message.id}: Document trouvé (pas une image)")
                
                except Exception as e:
                    print(f"    ❌ Erreur lors du téléchargement: {e}")
            
            # Ajouter le message s'il contient du texte ou des images
            if msg_obj["content"] or msg_obj["images"]:
                messages_data.append(msg_obj)
                print(f"  ✅ Message {message.id} ajouté")
            
            # Progress
            if message_count % 10 == 0:
                print(f"  ... {message_count} messages traités")
        
        # Sauvegarder les données dans le JSON
        print(f"\n💾 Sauvegarde des {len(messages_data)} messages dans {MESSAGES_FILE}...")
        with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
            json.dump(messages_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Fichier sauvegardé: {MESSAGES_FILE}")
        print(f"\n📊 RÉSUMÉ:")
        print(f"  - Messages récupérés: {len(messages_data)}")
        print(f"  - Images téléchargées: {sum(len(msg['images']) for msg in messages_data)}")
        print(f"\n🔧 PROCHAINES ÉTAPES:")
        print(f"1. Vérifiez les images dans: {IMAGES_PHOTOS_PATH}")
        print(f"2. Triez les images en 'affiches' ou 'photos'")
        print(f"3. Éditez {MESSAGES_FILE} pour ajouter les tags et descriptions")
        print(f"4. Quand vous avez fini, le script React les affichera automatiquement!")
        
    except SessionPasswordNeededError:
        print("❌ Erreur: Authentification à deux facteurs requise.")
        print("Veuillez utiliser l'authentification standard avec votre numéro de téléphone.")
    
    finally:
        await client.disconnect()

if __name__ == "__main__":
    # Pour Windows: asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    if os.name == 'nt':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    
    asyncio.run(main())
