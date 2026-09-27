# Mission circuits-colonnes — PROGRESS

**Statut :** étape 3 terminée (FlowDiagram mode grid)
**Prochaine action :** étape 4 (UtilisationIA.jsx en grid/columns=3 sur ordinateur, vertical sur mobile)
**Blocages :** aucun

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (react-hooks) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx.

## Mesures baseline (étape 2)
- **Desktop (1280px) — /lab/utilisation-ia :** resumeLoop 916px, gitFlow 1240px, finalFlow 1564px
- **Mobile (375px) — /lab/utilisation-ia :** resumeLoop 916px, gitFlow 1240px, finalFlow 1564px
- **Desktop (1280px) — /lab/workflow :** intakeFlow 916px, designSystemFlow 1000px
- **Mobile (375px) — /lab/workflow :** intakeFlow 916px, designSystemFlow 1000px
- **Console errors :** aucune sur les deux pages (desktop et mobile)

## Étape 3 — mode grid dans FlowDiagram.jsx
`direction="grid"` + prop `columns` (défaut 3) ajoutés. Disposition en serpentin calculée via `positions[i]` (row/col), flèches horizontales dans le sens de lecture de chaque ligne, flèche verticale en bout de ligne vers la ligne suivante (même colonne). Les branches `horizontal` et `vertical` sont restées inchangées ligne à ligne (aucune modification de leur code). Lint clean sur le fichier. `npm run build` à revérifier à l'étape 5.
