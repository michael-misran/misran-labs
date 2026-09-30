# Mission jeux-geste — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 4 (aperçus de partage + sitemap génériques, verifier-routes.mjs)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, sur `main` 8a410ca)
- `npm run build` : passe (sitemap 30 URL, 4 flux RSS).
- `npm run lint` : 0 erreur.

## Étape 1 (faite, 2026-10-01)
- Rejoué sur `auto/jeux-geste` : `npm run build` et `npm run lint` passent toujours (identique à l'état relevé au cadrage).

## Étape 2 (faite, 2026-10-01)
- `socle/jour.js` : `dateLocaleAujourdhui`, `numeroDuJour` (n° 1 le 2026-10-01), `mulberry32` (écrit à la main), `generateurDuJour(slug, date)`. Fonctions pures, sans accès DOM/stockage, pour rester testables depuis Node.
- `socle/serie.js` : `lireResultat`, `enregistrerResultat`, `serie`, `meilleurScore` sur la clé `misran-jeux`, try/catch sur chaque accès à `localStorage`.
- `socle/partage.js` : `construireTextePartage` (forme D7), `barreEmoji`, `texteScoreAvecUnite` (une décimale, virgule/point selon la langue), `partager` (navigator.share puis repli presse-papiers). `SITE_URL` dupliqué comme dans `src/suivre/suivreText.js` (le script Node n'est pas importable côté navigateur) — voir DECISIONS.md.
- `socle/ResultatPartage.jsx` : bloc commun (score, série, bouton de partage/copie).
- `registre.js` : `import.meta.glob` sur `./*/meta.js` (eager) et `./*/Jeu.jsx` (lazy), validation (slug, titres fr/en), un meta invalide est ignoré avec `console.warn`, jamais de plantage — modèle `src/breves/jours.js`.
- `jeuxText.js` : textes fr/en communs à la rubrique.
- `missions/jeux-geste/verifier-socle.mjs` : contrôle Node (polyfill minimal de `localStorage`) du numéro de jour, du déterminisme de la graine (même slug+date ⇒ même suite ; date ou slug différents ⇒ suite différente) et du calcul de série. Tous les contrôles passent.
- `npm run build` et `npm run lint` : passent (le socle n'est encore référencé par aucune route).

## Étape 3 (faite, 2026-10-01)
- Routes `jeux` et `jeux/:slug` ajoutées dans `App.jsx` (lazy, comme les autres).
- `JeuxHome.jsx` : grille de cartes (3 colonnes desktop, 1 à mobile via `useIsMobile`), pastille « Joué aujourd'hui ✓ »/« Nouveau défi » selon `serie.js`, `A_VENIR = 2` cartes fantômes « Bientôt ».
- `JeuPage.jsx` : bandeau démo si `jeu.demo`, lecture de `?date=` en dev uniquement (`import.meta.env.DEV`), 404 si slug inconnu.
- `registry.js` : `/jeux` (icône 🎲) et `/jeux/<slug>` (« Jeux — <titre> » ou 404) pour l'onglet et la barre d'état.
- `Sidebar.jsx` : section « Jeux »/« Games » avec l'entrée 🎲, placée juste après la section Projets.
- `i18n/ui.js` : clés `navSectionJeux`, `jeuxNav` en fr/en.
- Correction en cours de route : `registre.js` construit désormais `lazy(charger)` une seule fois au chargement du module (et non dans `JeuPage` à chaque rendu) — la nouvelle règle eslint `react-hooks/static-components` interdisait de créer un composant pendant le rendu, même mémoïsé à la main.
- `npm run build` et `npm run lint` : passent.
