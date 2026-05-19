# Architecture — Collectif des Hirondelles

## Vue d'ensemble

Site vitrine SPA React + TypeScript construit par Vite, déployé en site statique sur GitHub Pages sous le sous-chemin `/hirondelles/`. Bilingue FR/DE via un Context React maison (pas de lib i18n externe).

Le contenu éditorial (actualités, événements, photos) **n'est pas saisi dans le repo** : il est aspiré automatiquement depuis le canal Telegram `@hirondelles` par un workflow GitHub Actions qui s'exécute deux fois par semaine. Le frontend ne fait que `fetch` un JSON statique servi depuis `public/Assets/`.

Cette séparation permet aux membres du collectif de publier depuis Telegram sans toucher au code, tout en gardant un site 100 % statique (zéro backend, zéro coût d'infra).

## Topologie en couches

```
┌──────────────────────────────────────────────────────────────────┐
│                      GitHub Pages (static)                       │
│              https://lorelei13120.github.io/hirondelles/         │
└──────────────────────────────────────────────────────────────────┘
                               ▲
                               │ deploy.yml (push main)
                               │
┌──────────────────────────────────────────────────────────────────┐
│                   Frontend SPA (React 19 + Vite)                 │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ src/main.tsx → App.tsx (HashRouter + Providers)            │  │
│  │   ├── QueryClientProvider                                  │  │
│  │   ├── LanguageProvider (FR/DE)                             │  │
│  │   └── TooltipProvider + Toaster + Sonner                   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                               │                                  │
│  ┌────────────┬────────────┬──┴─────────┬───────────┬─────────┐  │
│  │ pages/     │ pages/     │ pages/     │ pages/    │ pages/  │  │
│  │ Index      │ Actualites │ Evenements │ Maraichage│ Galerie │  │
│  │ (Hero +    │ (consume   │ (consume   │ (statique)│ (grid   │  │
│  │  sections) │ messages)  │ messages)  │           │ images) │  │
│  └────────────┴────────────┴────────────┴───────────┴─────────┘  │
│                               │                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ components/ — sections (HeroSection, NewsSection, …)       │  │
│  │ components/ui/ — shadcn primitives (Radix-based)           │  │
│  │ lib/ — LanguageContext, translations, utils                │  │
│  │ hooks/ — useToast, useParallax                             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                               ▲                                  │
│                               │ fetch(BASE_URL + 'Assets/...')   │
└───────────────────────────────┼──────────────────────────────────┘
                                │
┌───────────────────────────────┴──────────────────────────────────┐
│                public/Assets/ (versionné dans le repo)           │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ messages.json       — actualités + événements (Telegram)   │  │
│  │ articles.json       — pages éditoriales statiques          │  │
│  │ telegram-images/    — photos & affiches téléchargées       │  │
│  │ last_update_id.txt  — curseur d'incrément Telegram         │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                               ▲
                               │ commit + push (GitHub Actions bot)
                               │
┌──────────────────────────────────────────────────────────────────┐
│         scripts/fetch_telegram_updates.js (Node + telegraf)      │
│  Cron: 06:00 & 18:00 UTC (fetch-telegram.yml)                    │
└──────────────────────────────────────────────────────────────────┘
                               ▲
                               │ getUpdates / getFile
                               │
┌──────────────────────────────────────────────────────────────────┐
│              Canal Telegram @hirondelles (-1002117925150)        │
└──────────────────────────────────────────────────────────────────┘
```

## Catalogue des modules

| Dossier | Rôle |
|---|---|
| `src/components/` (racine) | Sections de la page d'accueil (`HeroSection`, `DescriptionSection`, `NewsSection`, `EventsSection`, `FooterSection`) + `Navbar`, `NavLink`. Chaque section gère son propre `fetch` vers `messages.json` quand nécessaire. |
| `src/components/ui/` | Composants shadcn générés (Button, Sheet, Toast, Tooltip, Sonner, Sidebar, Checkbox). Ne pas réécrire à la main — régénérer via la CLI shadcn si besoin d'évolution. |
| `src/pages/` | Une page = une route. `Index` est la home, `NotFound` capture `*`. Les pages `Actualites`/`Evenements` consomment `messages.json` et filtrent par tag. |
| `src/lib/` | Voir table « Infrastructure partagée » ci-dessous. |
| `src/hooks/` | `useToast` (intégration shadcn toast), `useParallax` (effet de défilement HeroSection). |
| `scripts/` | Outillage Node hors-frontend. `fetch_telegram_updates.js` est le seul critique (workflow). Les `fix_messages_paths.*` et `sort_images.py` sont des utilitaires ponctuels. |
| `public/Assets/` | Données + images servies tel quel. **Le frontend dépend de la stabilité du schéma `messages.json`**. |

## Infrastructure partagée (`src/lib/` & `src/hooks/`)

| Module | Rôle |
|---|---|
| `lib/LanguageContext.tsx` | Provider + hook `useLanguage()` exposant `language`, `setLanguage`, `t(key)`. Source unique de vérité pour la langue affichée. Default = `'fr'`. |
| `lib/translations.ts` | Dictionnaire plat `{ key: { fr, de } }`. Toute clé manquante en allemand fait retomber sur la clé brute (`translations[key]?.[language] || key`). |
| `lib/utils.ts` | Helper `cn()` (clsx + tailwind-merge) — convention shadcn pour merger les classes Tailwind. |
| `lib/button-variants.ts` | Variants CVA du Button shadcn extraits pour respecter la règle ESLint `react-refresh/only-export-components`. |
| `hooks/useParallax.ts` | Effet parallaxe sur le Hero, basé sur `window.scrollY`. |
| `hooks/use-toast.ts` | Wrapper shadcn pour le système de toast (Radix). |

## Pipeline d'ingestion Telegram

**Trigger** : `.github/workflows/fetch-telegram.yml` — cron `0 6,18 * * *` (2× par jour, 06h et 18h UTC ; soit 08h/20h CEST l'été, 07h/19h CET l'hiver), ou déclenchement manuel via `workflow_dispatch`. La double fréquence quotidienne est imposée par la fenêtre de rétention de 24h de la Bot API Telegram (`getUpdates` drop les updates non lus au-delà), combinée au jitter des schedules GitHub Actions.

**Étapes** :
1. Checkout du repo + setup Node 20 + `npm install`.
2. Exécution de `scripts/fetch_telegram_updates.js` avec `TELEGRAM_BOT_TOKEN` injecté depuis GitHub Secrets.
3. Le script lit `last_update_id.txt`, appelle `getUpdates` via Telegraf à partir de cet ID, télécharge les nouvelles photos via `https.get` dans `telegram-images/{photos,affiches}/`, met à jour `messages.json` et `last_update_id.txt`.
4. Si `git diff` non vide → commit `🤖 Mise à jour automatique…` + push (auteur `GitHub Actions <actions@github.com>`).
5. Le push sur `main` redéclenche `deploy.yml` qui rebuild et republie.

**Schéma `messages.json`** (consommé par `NewsSection`, `EventsSection`, `ActualitesPage`, `EvenementsPage`) :
```ts
interface TelegramMessage {
  id: string;
  date: string;        // ISO
  content: string;     // texte du message Telegram
  images: string[];    // chemins relatifs sous Assets/telegram-images/
  tags: string[];      // ex: ["actualité"], ["événement"], ["actualité","événement"]
}
```

Filtrage côté frontend : un message est exclu s'il n'a pas de `content` non-vide OU s'il est uniquement taggé `événement` (les événements seuls vivent dans `EvenementsPage`, pas dans le flux d'actualités).

**Invariant** : le schéma de `messages.json` est un contrat entre le script Node et tous les consommateurs React. Toute évolution de champ doit synchroniser les deux côtés dans le même commit.

## Flux typique d'une page (exemple : ActualitesPage)

1. **Navigation** — utilisateur arrive sur `/#/actualites` (HashRouter). React Router monte `ActualitesPage`.
2. **Mount effect** — `useEffect` initial : `fetch(import.meta.env.BASE_URL + 'Assets/messages.json')`. En prod, `BASE_URL = '/hirondelles/'` ; en dev, `BASE_URL = '/'`.
3. **Filtrage** — `data.filter(...)` retire messages vides et événements purs, puis tri décroissant par date.
4. **Render** — boucle sur les messages, applique `formatDate(msg.date, language)` (locale `fr-CH` ou `de-DE`). Images via `<img src={BASE_URL + image} onError={...}>` avec gestion du `brokenImages: Set<string>`.
5. **Scroll-to-message** — second `useEffect` lit `window.location.hash`, et si présent + chargement terminé, `scrollIntoView({ behavior: 'smooth' })` sur l'élément cible. Réagit aussi à `hashchange` pour les navigations internes (depuis `GaleriePage` vers une affiche précise).
6. **Texte UI** — chaque label vient de `t('section.news.title')` etc. ; jamais de string brute.

## Patterns imposés

### Préfixe `BASE_URL` pour tous les assets

```tsx
// ❌ Cassé en production sous /hirondelles/
fetch('/Assets/messages.json')
<img src={'/Assets/' + image} />

// ✅
fetch(import.meta.env.BASE_URL + 'Assets/messages.json')
<img src={import.meta.env.BASE_URL + image} />
```

### HashRouter + ancres pour deep-linking

```tsx
// Lien depuis la galerie vers un message précis
<Link to={`/actualites#${msg.id}`}>...</Link>

// Le scroll-to-hash est implémenté côté page cible (cf. ActualitesPage)
```

### State immuable

```tsx
setBrokenImages(prev => new Set(prev).add(imageId));   // ✅
brokenImages.add(imageId); setBrokenImages(brokenImages); // ❌ même ref, pas de re-render
```

### i18n par clé

```tsx
const { t, language } = useLanguage();
return <h1>{t('hero.title')}</h1>;
// Ajouter la clé dans translations.ts avec { fr, de } — pas de fallback "FR uniquement".
```

## Anti-patterns à éviter

- ❌ `BrowserRouter` à la place de `HashRouter` — casse le deep-link sur GitHub Pages (404 sur refresh).
- ❌ Chemins absolus hardcodés (`/Assets/...`) — fonctionnent en dev, cassent en prod sous sous-chemin.
- ❌ Édition manuelle de `messages.json` ou `last_update_id.txt` — écrasés au prochain cron.
- ❌ Strings affichées en dur dans le JSX — bypassent le système i18n.
- ❌ Mutation directe d'un state object/array/Set — pas de re-render React.
- ❌ Réécrire un composant `ui/` shadcn à la main : préférer la régénération via CLI.
- ❌ Importer `telegraf` dans `src/` — dépendance Node uniquement, gonflerait le bundle navigateur.

## Stratégie de test

Suite minimale : `vitest` + `@testing-library/react` + `jsdom` configurés via `src/test/setup.ts`. Un seul test exemple actuellement (`src/test/example.test.ts`). À étoffer si une logique métier non triviale apparaît (filtrage `messages.json`, formatage de dates, scroll-to-hash).

Pas de tests E2E configurés. Pour les changements visuels, lancer `npm run dev` et vérifier manuellement les routes principales (`/`, `/actualites`, `/evenements`, `/maraichage`, `/galerie`, deep-link `/actualites#<id>` depuis la galerie).

## Dépendances externes critiques

| Dépendance | Usage | Criticité |
|---|---|---|
| **Canal Telegram `@hirondelles`** (id `-1002117925150`) | Source unique du contenu éditorial | Si le canal est supprimé/renommé, l'ingestion s'arrête silencieusement. |
| **GitHub Actions Secret `TELEGRAM_BOT_TOKEN`** | Authentification du bot ingesteur | Sans token valide, plus de mises à jour. |
| **GitHub Pages** (env `github-pages`) | Hébergement | Le `base: /hirondelles/` est calé sur l'URL `lorelei13120.github.io/hirondelles/` — un changement de propriétaire/repo casse les chemins. |
| **`lovable-tagger`** (devDep, mode dev uniquement) | Tagging composants pour l'éditeur Lovable | N'est pas chargé en prod (`mode === 'development'`). |
