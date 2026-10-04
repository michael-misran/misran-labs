# Mission kiosque-annexes — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ».

## Étape 1 — confirmation (2026-10-04)
- `npm run build` : OK, génère bien `dist/404.html`, les 4 flux RSS et les images OG.
- `npm run lint` : un worktree orphelin `.worktrees/verif-magazine` (laissé par une autre session, hors périmètre de cette mission) est scanné par `eslint .` et remonte ~566 erreurs qui ne viennent pas de ce dépôt. Vérifié avec `npx eslint . --ignore-pattern '.worktrees/**'` : 0 erreur, 0 warning. Référence retenue pour la suite : lint propre hors ce worktree étranger.

## Étape 2 — noms harmonisés (2026-10-04)
- Délégué à un sous-agent Haiku (`DELEGATIONS.md`) : `FEEDS_BASE` dans `src/suivre/suivreText.js` et les 3 `title` dans `scripts/rss.js` (D2). Diff relu : exactement les 6 remplacements demandés, rien d'autre.
- `npm run build` relancé : `dist/magazine/rss.xml` → « Le Magazine », `dist/projets/rss.xml` → « Les idées du Lab », `dist/rss.xml` → « Tout le kiosque ». URL des flux inchangées.
