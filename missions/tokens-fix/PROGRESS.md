# Mission tokens-fix — PROGRESS

**Statut :** étape 6 faite — LabTokens.jsx : 34 primitives documentées (4 nouvelles catégories + `--primitive-shadow-none` dans Élévation), 34 semantics avec `pointsTo`/`value`, 0 semantic sans `pointsTo`. Build OK, lint = 6 erreurs préexistantes, aucune dans LabTokens.jsx.
**Prochaine action :** étape 7 — vérification finale (rendu de la page, console, build, lint)
**Blocages :** preview « dev » indisponible en session planifiée → snapshots via `./snapshot.sh <fichier.json>` (Chrome headless). Vérifs navigateur de l'étape 7 à adapter.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : **6 erreurs préexistantes** (react-hooks, hors mission) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 4 : pas plus de 6, et aucune dans les fichiers modifiés par la mission.
