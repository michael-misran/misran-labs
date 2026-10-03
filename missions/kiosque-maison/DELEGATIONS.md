# Mission kiosque-maison — DELEGATIONS

| Date/heure | Étape | Agent | Modèle | Tâche | Résultat |
|---|---|---|---|---|---|
| 2026-10-03 | 0 | session principale | Opus 5.5 | Cadrage | Fait |
| 2026-10-04 | 2 | general-purpose | Haiku | Remplacer le lien Google Fonts de `index.html` par l'URL unique de D2 (17 familles) | Fait, vérifié (build OK) |
| 2026-10-04 | 9 | verificateur | Haiku | Vérifier dans `npx vite preview` les critères 1-2 (CSS, routes sans erreur), 3 (nav/aria-current), 4 (Defilant/reduced-motion), 5 (375px/sticky), 6 (FR/EN), 7 (Fiole) | 6/7 rapportés PASS ; le critère FR/EN rapporté FAIL était un contresens (comparait le titre FR vs EN au lieu de comparer à `refonte-kiosque`) — recorrigé par la session principale par diff Git (voir DECISIONS.md), critère en réalité PASS |
