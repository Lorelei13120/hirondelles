# Collectif des Hirondelles — Contexte d'Opération et Garde-Fous Agentiques

Résolvez les problèmes sans introduire de régression ni de dette technique architecturale.

## I. Finalité

**Application** : `vite_react_shadcn_ts` — site vitrine bilingue (FR/DE) du Collectif des Hirondelles, hameau agricole de Pontareuse.
**Objectif métier** : présenter le collectif (qui sommes-nous, maraîchage, galerie) et diffuser ses actualités/événements alimentés en continu depuis le canal Telegram `@hirondelles`. Site statique déployé sur GitHub Pages (`https://lorelei13120.github.io/hirondelles/`).

## II. Architecture

**Modèle** : SPA React mono-page, organisée par feature plate. Pipeline d'ingestion Telegram découplé du frontend (GitHub Actions cron → JSON statique → fetch côté navigateur).

**Détails complets** (pipeline Telegram, flux d'une page, conventions BASE_URL, i18n) : voir [`docs/architecture.md`](./docs/architecture.md).

Topologie rapide :
- `src/components/` — sections de page (Hero, News, Events…) + UI shadcn (`ui/`)
- `src/pages/` — routes (`Index`, `Actualites`, `Evenements`, `Maraichage`, `Galerie`, `NotFound`)
- `src/lib/` — `LanguageContext`, `translations` (FR/DE), `utils` (`cn`)
- `src/hooks/` — hooks custom (`useToast`, `useParallax`)
- `scripts/` — Node : `fetch_telegram_updates.js` (ingestion canal), utilitaires de chemins/tri d'images
- `public/Assets/` — `messages.json` (source de vérité contenu), `telegram-images/`, `articles.json`
- `.github/workflows/` — `deploy.yml` (Pages) + `fetch-telegram.yml` (cron 02h & 14h UTC)

## III. Pile Technologique

*Versions contraintes par `package.json`. N'introduisez aucune dépendance alternative sans approbation.*

- **Langage** : TypeScript 5.8 (strict via `tsc`), ESM (`"type": "module"`)
- **Framework** : React 19 + Vite 7 (`@vitejs/plugin-react-swc`)
- **UI** : Tailwind 3.4 + shadcn/ui (alias `@/components/ui`) + Radix primitives + `lucide-react`
- **Routing** : `react-router-dom` v7 — **HashRouter** (déploiement sous-chemin GitHub Pages)
- **State serveur** : `@tanstack/react-query` (provider monté, usage limité)
- **Formulaires/validation** : `react-hook-form` + `zod`
- **i18n** : maison via `LanguageContext` + `translations.ts` (FR/DE)
- **Tests** : Vitest 3 + Testing Library + jsdom (suite minimale)
- **Lint** : ESLint 9 flat config + `typescript-eslint`
- **Ingestion** : `telegraf` (script Node uniquement, jamais bundlé côté navigateur)

## IV. Garde-Fous non négociables

1. **Toujours** préfixer les chemins d'assets statiques par `import.meta.env.BASE_URL` (ex : `fetch(import.meta.env.BASE_URL + 'Assets/messages.json')`). Le `base: '/hirondelles/'` du `vite.config.ts` casse tout chemin absolu hardcodé en prod.
2. **HashRouter uniquement** (pas `BrowserRouter`) : GitHub Pages ne gère pas le fallback côté serveur. Les liens vers un message spécifique utilisent `/#/route#message-id` (cf. scroll-to-hash dans `ActualitesPage.tsx`).
3. **Ne jamais éditer `public/Assets/messages.json` à la main** : ce fichier est régénéré par `fetch-telegram.yml` (2× par jour, 02h & 14h UTC, contrainte par la fenêtre 24h de la Bot API). Toute édition manuelle sera écrasée au prochain run.
4. **Tout texte affiché passe par `useLanguage()` + clé dans `translations.ts`** — pas de string littérale dans le JSX. Ajouter la paire `{ fr, de }` à chaque nouvelle clé.
5. **Aucun secret en clair** : `TELEGRAM_BOT_TOKEN` vit uniquement dans GitHub Actions Secrets. Le `.env.example` est un template, jamais une source.
6. **Immutabilité du state React** : pattern `setX(prev => new Set(prev).add(item))`, jamais de mutation in-place.

## V. Flux de Travail (Explore → Plan → Code → Verify)

1. **Exploration** — lire les composants/pages adjacents pour calquer les patterns (filtrage `messages.json` par tags, formatage de date locale via `language`).
2. **Planification** — pour tout changement non trivial (nouvelle page, modification du pipeline Telegram, refactor de routing), soumettre l'approche à l'utilisateur avant d'écrire.
3. **Implémentation** — TypeScript strict, alias `@/` pour tout import dans `src/`, composants en PascalCase, hooks préfixés `use`.
4. **Vérification** — `npm run lint` puis `npm run test` puis `npm run build` (le `base: /hirondelles/` n'est validé qu'au build).

**Auto-documentation des packages (règle transverse)** — tout nouveau module dans `src/lib/` ou `scripts/` publie en tête un commentaire JSDoc couvrant : (1) ce qu'il fait, (2) les choix non-évidents (ex : pourquoi HashRouter, pourquoi BASE_URL), (3) les invariants à préserver, (4) un exemple d'usage si l'API n'est pas évidente. Cette discipline survit au turnover ; les rationales orales disparaissent.

## VI. Commandes de Développement

```bash
npm install              # installe les dépendances
npm run dev              # serveur Vite, port 8080, HMR
npm run build            # build production (avec base /hirondelles/)
npm run build:dev        # build mode développement
npm run preview          # preview du build local
npm run lint             # ESLint sur tout le repo
npm run test             # vitest run (one-shot)
npm run test:watch       # vitest watch
node scripts/fetch_telegram_updates.js   # ingestion locale (nécessite TELEGRAM_BOT_TOKEN)
```

## VII. Maintenance documentaire

**Règle d'or** : le diff du code et le diff de la doc correspondante doivent être dans **le même commit**.

| Modification | Fichier à mettre à jour |
|---|---|
| Nouvelle route/page | `src/App.tsx` + section topologie de `docs/architecture.md` |
| Nouvelle clé i18n | `src/lib/translations.ts` (paire FR + DE obligatoire) |
| Modif du pipeline Telegram | `scripts/fetch_telegram_updates.js` + section « Pipeline d'ingestion » de `docs/architecture.md` |
| Changement du `base` Vite ou du domaine de déploiement | `vite.config.ts` + Garde-Fou §1 + workflow `deploy.yml` |
| Nouvelle dépendance critique | Section III + `package.json` |
| Nouvel anti-pattern découvert | Section « Anti-patterns » de `docs/architecture.md` |

## VIII. Contexte de Session

- **Dernier focus** : —
- **Focus immédiat** : —
