# Mission audit-grille — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Grille calculée par règles fixes + ajustement manuel par axe | Pas d'IA (choix de Michael) ; l'auditeur garde la main sur la note finale, c'est sa valeur ajoutée |
| 2026-09-28 | 0 | Export PDF par l'impression du navigateur | Pas de nouvelle dépendance |
| 2026-09-28 | 2 | Contrastes : chaque token est résolu dans son propre contexte ; `detectees` et `echecs` comptent les paires après le plafond de 200 | Cohérence entre la liste affichée et les compteurs de la grille ; la SPEC ne précise pas |
| 2026-09-28 | 2 | Un token dont le nom contient un mot « texte » et un mot « fond » est classé texte ; `on-X` sans token X retombe sur les fonds génériques | Cas ambigu non tranché par D5 : option la plus prudente |
