# Mission jeux-geste — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (intégration : routes, JeuxHome, JeuPage, registry, menu, i18n)
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
