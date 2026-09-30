# Mission apercus-partage — PROGRESS

**Statut :** étape 3 terminée
**Prochaine action :** étape 4 (tests de robustesse)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, sur main de357bb)
- `npm run build` : passe — `index-BfD88Off.js` 319,78 kB (gzip 101,99 kB), aucun avertissement. `dist/` ne contient qu'un seul `index.html`.
- `npm run lint` : 0 erreur.
- `import('./src/lab/projects.js')` depuis Node : fonctionne, 9 projets visibles (design-system-multimarques, lost-cauldron-game, design-system, workflow, exp-003, cv, lab-tokens, utilisation-ia, audit-tokens).
- Données : 2 numéros du Magazine (2026-09-27, 2026-09-28), 5 idées (P-001 à P-005).

## Étape 1 (confirmé sur auto/apercus-partage, 2026-09-30)
- `npm run build` : passe. `find dist -name index.html` → `dist/index.html`, `dist/games/lost-cauldron-game/index.html`, `dist/games/lost-cauldron-game-v0.2/index.html` (fichiers statiques des jeux, hors périmètre du plugin). Bundle principal `index-BfD88Off.js` 319,78 kB.
- `npm run lint` : 0 erreur.

## Étape 2 (2026-09-30)
- `scripts/share-previews.js` créé : lecture `dist/index.html`, remplacement précis de `<title>`, `meta description`, `og:*`, `twitter:*`, ajout/mise à jour de `<link rel="canonical">` ; échec du build si une balise attendue est introuvable ; échappement HTML de toute valeur insérée ; troncature au dernier espace avant 155 caractères (+ « … ») si le texte dépasse 160 caractères ; espaces/retours à la ligne ramenés à un seul espace.
- Lecture directe des JSON (`fs`) pour Magazine (`src/magazine/numeros/*.json`) et Idées (`src/projets/idees/*.json`) ; un fichier illisible ou sans les champs requis (`date`/`id` cohérent avec le nom de fichier, `numero`, `titre.fr`, `edito.fr`/`resume.fr`) est ignoré avec avertissement console, sans faire échouer le build.
- **Bug trouvé et corrigé pendant l'étape** : `numero: 0` (numéro 0 du Magazine, « Présentation ») était rejeté à tort par un test `if (!value)` — `0` est falsy en JS. Corrigé en testant explicitement `undefined`/`null`/`''`. Voir DECISIONS.md.
- `visibleProjects()` de `src/lab/projects.js` importé tel quel (`await import()`), pas de duplication de la liste.
- Branché dans `vite.config.js` (`plugins: [..., sharePreviewsPlugin()]`), `apply: 'build'` + hook `closeBundle`.
- Build : 19 pages générées (`/magazine`, `/magazine/2026-09-27`, `/magazine/2026-09-28`, `/projets`, `/projets/fonctionnement`, `/projets/P-001` à `P-005`, `/lab/<9 slugs>`). `find dist -name index.html` ne contient, en plus, que les deux `dist/games/*/index.html` préexistants (fichiers statiques de `public/games/`, non générés par le plugin, non listés en D2 mais non privés).
- Vérifié : `dist/magazine/2026-09-28/index.html` et `dist/index.html` référencent exactement les mêmes `/assets/*.js`/`*.css` (`diff` identique).
- `<link rel="canonical" href="https://misran-labs.vercel.app/">` ajouté dans `dist/index.html`.

## Étape 3 (2026-09-30)
Textes fixes de D2 déjà rédigés dans le plugin à l'étape 2 (`MAGAZINE_FIXED`, `PROJETS_FIXED`, `PROJETS_FONCTIONNEMENT_FIXED`). Build relancé, greps du critère 2 sur un fichier de chaque type :

```
== / (home) ==
<title>Misran Labs — le laboratoire de Michael Misran</title>
og:type=website · og:title=idem · canonical=https://misran-labs.vercel.app/

== /magazine ==
<title>Lab Magazine — veille IA hebdomadaire · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/magazine

== /magazine/2026-09-28 ==
<title>Nº 1 — Prix en baisse, agents en expansion · Lab Magazine</title>
og:type=article · canonical=https://misran-labs.vercel.app/magazine/2026-09-28

== /projets ==
<title>Projets — idées en développement · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/projets

== /projets/fonctionnement ==
<title>Comment fonctionnent les Projets · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/projets/fonctionnement

== /projets/P-001 ==
<title>P-001 — Application de prise de mandat pour agent immobilier · Misran Labs</title>
og:type=article · canonical=https://misran-labs.vercel.app/projets/P-001

== /lab/lab-tokens ==
<title>Tokens du Lab — Lab · Misran Labs</title>
og:type=website · canonical=https://misran-labs.vercel.app/lab/lab-tokens
```

`find dist -name index.html` (critère 7) :
```
dist/games/lost-cauldron-game-v0.2/index.html   ← préexistant, public/games/, hors plugin
dist/games/lost-cauldron-game/index.html        ← préexistant, public/games/, hors plugin
dist/index.html
dist/lab/audit-tokens/index.html
dist/lab/cv/index.html
dist/lab/design-system-multimarques/index.html
dist/lab/design-system/index.html
dist/lab/exp-003/index.html
dist/lab/lab-tokens/index.html
dist/lab/lost-cauldron-game/index.html
dist/lab/utilisation-ia/index.html
dist/lab/workflow/index.html
dist/magazine/2026-09-27/index.html
dist/magazine/2026-09-28/index.html
dist/magazine/index.html
dist/projets/P-001/index.html
dist/projets/P-002/index.html
dist/projets/P-003/index.html
dist/projets/P-004/index.html
dist/projets/P-005/index.html
dist/projets/fonctionnement/index.html
dist/projets/index.html
```
Aucune page privée (MAIA, Conforma, backlog) générée : ces chemins n'existent pas dans `src/App.jsx` et ne sont pas dans les données lues par le plugin.
