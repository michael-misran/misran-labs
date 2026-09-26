# Mission tokens-fix — PROGRESS

**Statut :** étape 4 faite (semantics et `[data-invert]` en alias, section STRUCTURE supprimée ; plus aucune valeur brute hors section 1, hors décalages d'ombre et `@media print`)
**Prochaine action :** étape 5 — `./snapshot.sh snapshot-apres.json` puis comparaison avec l'avant
**Blocages :** preview « dev » indisponible en session planifiée → snapshots via `./snapshot.sh <fichier.json>` (Chrome headless). Vérifs navigateur de l'étape 7 à adapter.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : **6 erreurs préexistantes** (react-hooks, hors mission) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 4 : pas plus de 6, et aucune dans les fichiers modifiés par la mission.
