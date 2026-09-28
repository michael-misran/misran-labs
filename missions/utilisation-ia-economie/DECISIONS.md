# Mission utilisation-ia-economie — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Branche créée depuis `chore/economie-tokens` (PR #11) et non depuis `main`. | La page décrit `missions/README.md`, et la tâche programmée lit ce fichier : il doit exister sur la branche. Si Michael fusionne la PR #11 avant celle-ci, la PR de la mission ne montrera que ses propres changements. |
| 2026-09-28 | 0 | Pas de nouveau schéma, deux tableaux avec `Table`. | Contenu comparatif (avant/après, pratique/système) : un tableau est plus lisible et moins coûteux qu'un nouveau diagramme. |
