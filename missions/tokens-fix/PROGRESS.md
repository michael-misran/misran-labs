# Mission tokens-fix — PROGRESS

**Statut :** étape 3 faite (primitives D1–D5 ajoutées en section 1 ; rien encore ne les consomme)
**Prochaine action :** étape 4 — semantics en alias, suppression section STRUCTURE, `[data-invert]`, commentaires
**Blocages :** preview « dev » indisponible en session planifiée → snapshots via `./snapshot.sh <fichier.json>` (Chrome headless). Vérifs navigateur de l'étape 7 à adapter.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : **6 erreurs préexistantes** (react-hooks, hors mission) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 4 : pas plus de 6, et aucune dans les fichiers modifiés par la mission.
