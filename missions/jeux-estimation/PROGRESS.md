# Mission jeux-estimation — PROGRESS

**Statut :** étape 4 terminée (Courbe.jsx intégrée au résultat)
**Prochaine action :** étape 5 (vérification navigateur — `verificateur`, critères 1,2,3,5,6,7,8)
**Blocages :** aucun

## État initial (référence)
- `src/jeux/socle/` présent (mission jeux-geste fusionnée, PR #34).
- `npm run build` : OK, aucune erreur. Sitemap généré avec `/jeux/geste-parfait`.
- `npm run lint` : OK, aucune erreur.

## Étape 2
- Créés : `src/jeux/a-vue-d-oeil/meta.js`, `Jeu.jsx`, `score.js`, `types/index.js`, `types/bocal.jsx`.
- `JeuxHome.jsx` : `A_VENIR` passé de 2 à 1.
- Flux complet : prêt → 5 s (barre de temps, requestAnimationFrame) → flou CSS → saisie numérique → résultat (vraie valeur, score via `ResultatPartage` du socle, partage D6).
- `/jeux/a-vue-d-oeil` apparaît bien dans le sitemap généré par `npm run build` (lecture générique de meta.js, critère 8 — pas touché `share-previews.js`).
- `npm run build` et `npm run lint` : OK.
- Détail des choix dans DECISIONS.md.

## Étape 3
- Chaque type scindé en `<type>.generer.js` (logique pure) + `<type>.jsx` (rendu SVG), voir DECISIONS.md.
- Créés : `ciel.generer.js`/`.jsx`, `foule.generer.js`/`.jsx`, `pois.generer.js`/`.jsx`, `allumettes.generer.js`/`.jsx` ; `bocal` refactoré en `.generer.js`+`.jsx`.
- `types/index.js` : rotation sur les 5 types.
- `missions/jeux-estimation/verifier-types.mjs` : 50 graines × 5 types, vérifie la plage et l'égalité valeur/éléments générés (ou % recalculé pour pois). `node missions/jeux-estimation/verifier-types.mjs` → OK, aucun échec.
- `npm run build` et `npm run lint` : OK.

## Étape 4
- Créés : `distribution.js` (500 réponses log-normales, graine `${slug}-courbe` distincte de l'image), `Courbe.jsx` (histogramme 20 barres, repères vraie valeur/réponse/médiane, phrase de position).
- `Jeu.jsx` : `Courbe` intégrée sous `ResultatPartage` dans l'écran de résultat.
- `npm run build` et `npm run lint` : OK.
- Reste à faire avant la vérification navigateur : rien de connu, tout commité sur `auto/jeux-estimation`.
