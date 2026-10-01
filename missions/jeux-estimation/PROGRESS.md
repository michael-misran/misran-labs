# Mission jeux-estimation — PROGRESS

**Statut :** étape 2 terminée (meta.js, Jeu.jsx complet avec le type bocal, score D4, partage D6)
**Prochaine action :** étape 3 (les 4 types SVG restants + verifier-types.mjs)
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
