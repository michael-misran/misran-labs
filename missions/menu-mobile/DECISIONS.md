# Mission menu-mobile — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 3 | Pas d'exclusion de route pour D1 (clause d'exception non utilisée). `/lab/:slug/demo/:version?` (ex. `ProjectDemoPage.jsx` → `GameDemo.jsx`) utilise `position: fixed; inset: 0`, qui ignore le `padding-top` ajouté sur `<main>` : la démo reste plein écran, non affectée. | `position: fixed` est positionné par rapport au viewport, pas à l'ancêtre paddé. |
| 2026-09-30 | 4 | `grep -rn "✎" src/` a trouvé 2 occurrences en plus de `Sidebar.jsx` : `src/shell/registry.js` (l. 17 et 21), icône de l'onglet/barre d'état pour la rubrique Magazine (`resolveRouteMeta`). Remplacées par 📖 elles aussi. | Désignent la rubrique Magazine (D3 : « les remplacer aussi s'ils désignent la rubrique »), pas un autre sens. |
