# Mission projets — PROGRESS

**Statut :** étape 3 faite
**Prochaine action :** étape 4 (pages, routes, sidebar, registry, i18n, vue privée locale)
**Blocages :** aucun

## Étape 3 (données)
`src/projets/projetsText.js` (statuts/types/tailles + textes fr/en), `src/projets/idees.js` (validation stricte D1–D2 : clés inconnues rejetées, textes bilingues, decision/mission obligatoires selon statut), `src/projets/idees/P-001.json` (idée réelle citée par Michael, statut `proposee`, aucun chiffre inventé), `src/projets/FORMAT.md` (D8), `src/private/projets/P-001.md` (gabarit D3, hors Git, sections « à évaluer »).

## Étape 2 (direction visuelle)
Direction complète rédigée par l'expert (Opus) dans DECISIONS.md (§ Direction visuelle — étape 2, A à G). Tokens utilisés vérifiés présents dans `src/styles/tokens.css` (`--cyan`, `--violet`, `--primary`, `--error`, `--text2`, `--border-thick`, `--hover-tint`, `--radius-xs`). À suivre telle quelle aux étapes 3-4.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : 6 erreurs préexistantes (VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx).
