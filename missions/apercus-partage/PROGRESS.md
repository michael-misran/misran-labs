# Mission apercus-partage — PROGRESS

**Statut :** étape 1 terminée
**Prochaine action :** étape 2 (plugin `scripts/share-previews.js`)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, sur main de357bb)
- `npm run build` : passe — `index-BfD88Off.js` 319,78 kB (gzip 101,99 kB), aucun avertissement. `dist/` ne contient qu'un seul `index.html`.
- `npm run lint` : 0 erreur.
- `import('./src/lab/projects.js')` depuis Node : fonctionne, 9 projets visibles (design-system-multimarques, lost-cauldron-game, design-system, workflow, exp-003, cv, lab-tokens, utilisation-ia, audit-tokens).
- Données : 2 numéros du Magazine (2026-09-27, 2026-09-28), 5 idées (P-001 à P-005).

## Étape 1 (confirmé sur auto/apercus-partage, 2026-09-30)
- `npm run build` : passe. `find dist -name index.html` → `dist/index.html`, `dist/games/lost-cauldron-game/index.html`, `dist/games/lost-cauldron-game-v0.2/index.html` (fichiers statiques des jeux, hors périmètre du plugin). Bundle principal `index-BfD88Off.js` 319,78 kB.
- `npm run lint` : 0 erreur.
