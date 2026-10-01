# Mission jeux-majorite — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-01 | 2 | `verifier-questions.mjs` écrit avec son contrôle complet (30 questions, structure, synonymes partagés) dès l'étape 2, alors que `questions.json` ne contient que la question d'exemple | le script sert aussi aux tests de correspondance (critère 4), qui ont besoin d'une vraie question ; le contrôle du total (30) échoue pour l'instant (1/30), c'est attendu — il passera une fois l'étape 3 terminée |
| 2026-10-01 | 2 | Question d'exemple « vacances-oubli » complétée à 6 réponses (34/21/15/10/8/5, somme 93) à partir des 2 données par la SPEC | D2 exige 6 à 8 réponses et une somme entre 85 et 100 ; la SPEC ne donne que 2 réponses à titre d'illustration du format JSON |
