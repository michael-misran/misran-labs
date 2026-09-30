# Mission apercus-partage — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 0 | Images par rubrique (3) plutôt que par page | Une image par numéro/idée demanderait Chrome au build sur Vercel ou une étape de plus dans chaque routine ; à reconsidérer plus tard |
| 2026-09-30 | 0 | Aperçus en français uniquement | Les robots de partage ne voient qu'une version du HTML ; le français est la langue par défaut du site |
| 2026-09-30 | 2 | Validation des champs requis avec `undefined`/`null`/`''` plutôt que `!value` | `numero: 0` (numéro 0 du Magazine) est une valeur valide mais falsy en JS ; un test naïf l'aurait ignoré à tort |
