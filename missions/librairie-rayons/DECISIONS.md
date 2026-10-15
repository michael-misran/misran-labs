# Mission librairie-rayons — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-15 | 0 | Nouveautés = 4 volumes parus les plus récents (l'Oracle, quotidien, compte à sa date de lancement) | Règle simple et automatique ; Michael pourra demander que l'Oracle reste toujours en vitrine |
| 2026-10-15 | 0 | Dates de parution : Oracle 29/09 (UtilisationIA.jsx), Misran Labs 01/10 (N°1 d'octobre), Portfolio 13/10 (premier commit de src/portfolio), Atelier 15/10 (PR #141), Midnight 01/11 (volumes.js) | Seules dates disponibles dans le dépôt |
| 2026-10-15 | 0 | Cadrage fait dans un worktree (`.worktrees/cadrage-rayons`) | La tâche des missions travaillait sur auto/atelier-automatique-2 dans le dossier principal |
| 2026-10-15 | 5 | 7 livres en rayon, pas 8 | Le critère 1 de la SPEC annonce « 8 livres en rayon » mais sa propre liste entre parenthèses (Oracle ; Misran Labs, Midnight Snack ; Atelier, Nuancier ; Portfolio, Carnet d'inventions) totalise 7 — coquille de comptage au cadrage. Les 7 volumes listés sont bien tous affichés (aucun rayon ne dépasse 3, donc rien n'est ignoré) |
| 2026-10-15 | 5 | Emplacements des livres de rayon calculés par formule (plaque centrée, écart 4,5 %, D3) plutôt que recopiés un par un depuis la maquette | Résultat visuellement identique à la maquette (écart ≤ 0,3 %, vérifié dans le navigateur sur les 3 images) ; plus maintenable si un rayon gagne ou perd un livre |
| 2026-10-15 | 5 | `PRESENTOIR` perd son champ `id` (seuls `left`/`width` restent) | Les places ne pointent plus vers un volume fixe depuis le calcul des nouveautés (D2) ; le champ n'était plus utilisé |
