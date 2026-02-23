

# Plan : Ajouts au site Les Hirondelles

## Resumé des changements

Trois ajouts principaux au site :
1. Une barre de navigation fixe en haut de toutes les pages
2. Une page dédiée au maraîchage (/maraichage)
3. Une page galerie photos placeholder (/galerie) -- tu fourniras les photos plus tard

---

## 1. Barre de navigation fixe

Un composant `Navbar` affiché sur toutes les pages avec :
- Le logo + nom "Les Hirondelles" (lien vers l'accueil)
- Liens : Qui sommes-nous, Maraîchage, Actualités, Événements
- Lien externe Telegram (icône)
- Menu hamburger sur mobile
- Fond semi-transparent qui devient opaque au scroll

Ce composant remplacera les headers actuels des pages Actualités et Événements pour avoir une navigation cohérente partout.

---

## 2. Page Maraîchage (/maraichage)

Une page dédiée avec :
- **Introduction** : description du projet de maraîchage hors marché, philosophie d'autosuffisance, lien avec l'occupation de Pontareuse
- **Le projet** : ce qui est cultivé (courges, légumes de saison...), la préparation des sols, le fonctionnement collectif
- **Appel à participation** : comment venir aider (chantiers participatifs, journées maraîchage), avec un lien vers Telegram pour se coordonner
- **Photos** : section placeholder prête à accueillir les photos que tu fourniras

Le contenu sera rédigé à partir de ce que j'ai trouvé sur le Telegram (récoltes, chantiers, préparation des sols).

---

## 3. Page Galerie (/galerie)

Une page avec une grille de photos. Pour l'instant, elle affichera les photos déjà intégrées au site (Pontareuse, plantations, greffes, dance day). Tu pourras me fournir d'autres photos ensuite pour la compléter.

---

## Détails techniques

- Nouveau composant : `src/components/Navbar.tsx` -- barre fixe avec `sticky top-0`, menu mobile avec un drawer
- Nouvelle page : `src/pages/MaraichagePage.tsx`
- Nouvelle page : `src/pages/GaleriePage.tsx`
- Mise à jour de `src/App.tsx` : ajout des routes `/maraichage` et `/galerie`
- Mise à jour de `src/pages/Index.tsx` : ajout du Navbar
- Suppression des headers dupliqués dans `ActualitesPage.tsx` et `EvenementsPage.tsx` (remplacés par le Navbar global)
- Le Navbar sera intégré dans `App.tsx` en dehors du `Routes` pour être présent sur toutes les pages

