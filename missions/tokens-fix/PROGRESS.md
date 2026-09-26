# Mission tokens-fix — PROGRESS

**Statut :** mission terminée — RAPPORT.md écrit
**Prochaine action :** Michael — vérifier dans un vrai navigateur (critère 5), puis merge éventuel
**Blocages :** aucun. Limite : pas de navigateur réel sur l'app (serveur de dev refusé en session planifiée) → erreurs console runtime (effets, hydratation) à confirmer par Michael.

## Référence état initial (étape 1)
- `npm run build` : OK
- `npm run lint` : **6 erreurs préexistantes** (react-hooks, hors mission) dans VisuallyHidden.jsx, kit/Surface.jsx, CaseFile.jsx, GameDemo.jsx, LanguageContext.jsx, Shell.jsx. Critère 4 : pas plus de 6, et aucune dans les fichiers modifiés par la mission.
