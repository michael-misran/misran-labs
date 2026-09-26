# Mission tokens-fix — PROGRESS

**Statut :** étape 5 faite — snapshot après : 120 tokens (86 d'origine + 34 primitives), **0 différence** sur les 86 d'origine, `:root` et `[data-invert]`
**Prochaine action :** étape 6 — LabTokens.jsx (catégories de primitives, `pointsTo`/`value`, aperçus, textes FR/EN)
**Blocages :** preview « dev » indisponible en session planifiée → snapshots via `./snapshot.sh <fichier.json>` (Chrome headless). Vérifs navigateur de l'étape 7 à adapter.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : **6 erreurs préexistantes** (react-hooks, hors mission) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 4 : pas plus de 6, et aucune dans les fichiers modifiés par la mission.
