# Mission tokens-fix — PROGRESS

**Statut :** étape 2 faite (snapshot avant, 86 tokens, `:root` + `[data-invert]`)
**Prochaine action :** étape 3 — primitives D1 à D5 dans tokens.css
**Blocages :** preview « dev » indisponible en session planifiée → snapshots via `./snapshot.sh <fichier.json>` (Chrome headless). Vérifs navigateur de l'étape 7 à adapter.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : **6 erreurs préexistantes** (react-hooks, hors mission) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 4 : pas plus de 6, et aucune dans les fichiers modifiés par la mission.
