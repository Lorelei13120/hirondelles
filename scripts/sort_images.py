#!/usr/bin/env python3
"""
Script interactif pour trier les images Telegram en "affiches" ou "photos"
et mettre à jour le JSON correspondant.

Usage: python scripts/sort_images.py
"""

import json
import os
import shutil
from pathlib import Path
from PIL import Image
import platform

ASSETS_PATH = Path("Assets")
PHOTOS_PATH = ASSETS_PATH / "telegram-images" / "photos"
AFFICHES_PATH = ASSETS_PATH / "telegram-images" / "affiches"
MESSAGES_FILE = ASSETS_PATH / "messages.json"

def open_image(image_path):
    """Ouvre l'image avec la visionneuse par défaut."""
    try:
        if platform.system() == "Windows":
            os.startfile(image_path)
        elif platform.system() == "Darwin":  # macOS
            os.system(f"open '{image_path}'")
        else:  # Linux
            os.system(f"xdg-open '{image_path}'")
    except Exception as e:
        print(f"  ⚠️  Impossible d'ouvrir l'image: {e}")

def move_image(image_name, destination_folder):
    """Déplace une image vers le dossier de destination."""
    source_path = PHOTOS_PATH / image_name
    dest_path = destination_folder / image_name
    
    try:
        shutil.move(str(source_path), str(dest_path))
        return True
    except Exception as e:
        print(f"  ❌ Erreur lors du déplacement: {e}")
        return False

def get_image_size_kb(image_path):
    """Retourne la taille de l'image en KB."""
    try:
        size_bytes = os.path.getsize(image_path)
        return size_bytes / 1024
    except:
        return 0

def sort_images():
    """Fonction principale de tri."""
    
    print("\n" + "="*60)
    print("🖼️  SCRIPT DE TRI DES IMAGES")
    print("="*60)
    
    # Charger le JSON
    try:
        with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
            messages_data = json.load(f)
    except Exception as e:
        print(f"❌ Erreur lors de la lecture de {MESSAGES_FILE}: {e}")
        return
    
    # Récupérer les images à trier
    images_to_sort = [f for f in os.listdir(PHOTOS_PATH) 
                      if f.endswith(('.jpg', '.jpeg', '.png', '.gif')) and f != '.gitkeep']
    
    if not images_to_sort:
        print("✅ Aucune image à trier! Toutes les images sont déjà triées.")
        return
    
    print(f"\n📊 {len(images_to_sort)} image(s) à trier\n")
    
    sorted_count = {"affiches": 0, "photos": 0, "skipped": 0}
    
    for idx, image_name in enumerate(images_to_sort, 1):
        image_path = PHOTOS_PATH / image_name
        size_kb = get_image_size_kb(image_path)
        
        print(f"\n[{idx}/{len(images_to_sort)}] {image_name}")
        print(f"   Taille: {size_kb:.1f} KB")
        print(f"   Chemin: {image_path}")
        
        # Proposer d'ouvrir l'image
        print("\n   Voulez-vous voir l'image? (o/n): ", end="")
        if input().lower() == "o":
            print("   ⏳ Ouverture de l'image...")
            open_image(image_path)
            print("   ✅ Image ouverte (fermez-la pour continuer)")
            input("   Appuyez sur Entrée quand vous avez fini de regarder...")
        
        # Demander le tri
        while True:
            print("\n   Est-ce une AFFICHE (a) ou une PHOTO (p)? [a/p/s=sauter]: ", end="")
            choice = input().lower()
            
            if choice == "a":
                if move_image(image_name, AFFICHES_PATH):
                    print("   ✅ Déplié vers 'affiches'")
                    sorted_count["affiches"] += 1
                    
                    # Mettre à jour le JSON avec le chemin correct
                    for msg in messages_data:
                        for i, img_path in enumerate(msg["images"]):
                            if image_name in img_path:
                                msg["images"][i] = f"telegram-images/affiches/{image_name}"
                else:
                    print("   ❌ Erreur lors du déplacement")
                break
            
            elif choice == "p":
                print("   ✅ Conservé dans 'photos'")
                sorted_count["photos"] += 1
                break
            
            elif choice == "s":
                print("   ⏭️  Image ignorée pour maintenant")
                sorted_count["skipped"] += 1
                break
            
            else:
                print("   ❌ Choix invalide. Tapez 'a', 'p', ou 's'")
    
    # Sauvegarder le JSON mis à jour
    try:
        with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
            json.dump(messages_data, f, ensure_ascii=False, indent=2)
        print(f"\n✅ JSON mis à jour: {MESSAGES_FILE}")
    except Exception as e:
        print(f"\n❌ Erreur lors de la sauvegarde du JSON: {e}")
    
    # Résumé
    print("\n" + "="*60)
    print("📊 RÉSUMÉ DU TRI")
    print("="*60)
    print(f"  Affiches: {sorted_count['affiches']}")
    print(f"  Photos: {sorted_count['photos']}")
    print(f"  Ignorées: {sorted_count['skipped']}")
    print(f"\n  Total traité: {sorted_count['affiches'] + sorted_count['photos']}/{len(images_to_sort)}")
    print("="*60 + "\n")

if __name__ == "__main__":
    if os.name == 'nt':
        import asyncio
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    
    sort_images()
