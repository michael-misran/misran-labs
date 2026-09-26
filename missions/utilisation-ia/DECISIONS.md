# Mission utilisation-ia — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture D1–D8 sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-27 | 2 | `SiteMapDiagram` a ses titres de colonnes ("AVANT"/"APRÈS") codés en dur en français, non paramétrables. Pour les deux arborescences (§7, §10), on privilégiera un bloc `pre` stylé aux tokens plutôt que `SiteMapDiagram`, sauf si l'étape 3 juge que ça reste lisible tel quel. Modifier le composant est hors périmètre (sauf bug bloquant, ce n'en est pas un). | D8 exige la traduction complète y compris les libellés des schémas ; D4-7 autorise explicitement l'alternative « bloc pre stylé » si le composant ne s'y prête pas. |
