# Mission tokens-fix — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture D1–D9 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-26 | 1 | Ajout de `public/games` aux `globalIgnores` d'ESLint | ESLint restait bloqué indéfiniment sur les bundles minifiés des jeux (315 Ko chacun) ; sans ça, aucune session autonome ne peut valider le critère 4. Ce sont des builds tiers, pas du code source. |
