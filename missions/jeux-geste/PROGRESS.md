# Mission jeux-geste — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 7 (vérification navigateur, verificateur Haiku)
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

## Étape 4 (faite, 2026-10-01)
- `scripts/share-previews.js` : `collectJeux(rootDir)` lit génériquement `src/jeux/*/meta.js` par `import()` dynamique (comme `collectLabProjects` pour `projects.js`), valide slug/titre/accroche, ignore avec avertissement si invalide. `/jeux` ajouté en page fixe (`JEUX_FIXED`, image `og-image.png` réutilisée). `npm run build` : sitemap passe de 30 à 31 URL (`/jeux` ; `/jeux/geste-parfait` apparaîtra à l'étape 5), `dist/jeux/index.html` contient le bon titre/description dans les balises og.
- `missions/vrai-404/verifier-routes.mjs` : `/jeux/inconnu` ajouté à `attendues404`. `/jeux` et `/jeux/geste-parfait` pas ajoutés en dur (déjà couverts via `lireSitemap()`) — voir DECISIONS.md. Script rejoué : 52 adresses vérifiées, 0 échec.
- `npm run lint` : 0 erreur.

## Étapes 5-6 (faites ensemble, 2026-10-01 — voir DECISIONS.md)
- `geste-parfait/meta.js` : slug, ordre 1, icône ◎, couleur `mandarine`, titre/accroche fr/en, `demo: false`.
- `geste-parfait/Jeu.jsx` : défi du jour = `defis[numeroDuJour % 4]`, graine du jour (`generateurDuJour`) passée aux défis qui en ont besoin, essai officiel enregistré via `enregistrerResultat`, « Rejouer pour s'entraîner » qui note le score à l'écran sans l'enregistrer, texte de partage construit avec `construireTextePartage`.
- `geste-parfait/defis/chrono.jsx` : chrono qui s'efface après 3 s, arrêt par clic/toucher/Espace, score = max(0, 100 − |écart| × 20).
- `geste-parfait/defis/verre.jsx` : verser en maintenant (souris/toucher/Espace), inertie ~150 ms après relâchement, hauteur cible fixée par la graine du jour (40-85 %), score = max(0, 100 − |écart| × 5).
- `geste-parfait/defis/cercle.jsx` : tracé au pointeur uniquement (D11), refusé (sans consommer l'essai) si balayage < 300° ou rayon moyen < 40px, score selon l'écart-type des distances au centre, tracé coloré du rouge au vert selon l'écart local.
- `geste-parfait/defis/tour.jsx` : bloc qui va-et-vient à vitesse fixe, pose par clic/toucher/Espace, la partie qui dépasse tombe, score = largeur finale / largeur initiale × 100.
- Trois corrections mécaniques imposées par des règles eslint plus strictes que prévu à la SPEC (voir DECISIONS.md) : `lazy()` construit une seule fois dans `registre.js` (`react-hooks/static-components`), tous les « refs toujours à jour » écrits dans un `useEffect` (`react-hooks/refs`), état de `Jeu.jsx` initialisé par lecture paresseuse plutôt que par un effet de synchronisation (`react-hooks/set-state-in-effect`), `JeuPage.jsx` pose `key={date}` pour remonter le jeu quand `?date=` change en dev.
- `npm run build` : passe, sitemap 32 URL (`/jeux/geste-parfait` ajouté), `dist/jeux/geste-parfait/index.html` contient le bon titre/accroche dans les balises og.
- `npm run lint` : 0 erreur. `grep -rnE "#[0-9a-fA-F]{3,6}\b" src/jeux` : aucune occurrence (critère 11).
- `verifier-socle.mjs` et `verifier-routes.mjs` rejoués : tout passe (53 adresses vérifiées).
