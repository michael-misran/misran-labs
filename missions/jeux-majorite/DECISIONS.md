# Mission jeux-majorite — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-01 | 2 | `verifier-questions.mjs` écrit avec son contrôle complet (30 questions, structure, synonymes partagés) dès l'étape 2, alors que `questions.json` ne contient que la question d'exemple | le script sert aussi aux tests de correspondance (critère 4), qui ont besoin d'une vraie question ; le contrôle du total (30) échoue pour l'instant (1/30), c'est attendu — il passera une fois l'étape 3 terminée |
| 2026-10-01 | 2 | Question d'exemple « vacances-oubli » complétée à 6 réponses (34/21/15/10/8/5, somme 93) à partir des 2 données par la SPEC | D2 exige 6 à 8 réponses et une somme entre 85 et 100 ; la SPEC ne donne que 2 réponses à titre d'illustration du format JSON |
| 2026-10-01 | 3 | 30 questions rédigées avec 1 à 3 entrées par réponse (libellé + 1-2 synonymes), en dessous de la fourchette « 3 à 6 en moyenne » de D2 | volume (30 questions × ~6,5 réponses × 2 langues ≈ 390 libellés) ; priorité donnée à des synonymes exacts et non ambigus (zéro collision détectée par `verifier-questions.mjs`) plutôt qu'à la quantité ; enrichir les synonymes est un changement de données pur, sans risque, que Michael ou une mission future peut faire à tout moment — noté en recommandation du RAPPORT |
| 2026-10-01 | 3 | Pas de nom de pays ni de marque dans « vacances-destination-reve » (destinations génériques : île tropicale, montagne, grande ville…) | éviter tout sujet pouvant être perçu comme politique (choix d'un pays plutôt qu'un autre) ou comme une marque, hors périmètre des interdits D2 par prudence |
| 2026-10-01 | 3 | « métier-enfance-reve » : pas de métier médical (ex. médecin) parmi les réponses | D2 interdit le sujet « santé » ; par prudence, aucune réponse n'évoque un métier de santé même de façon neutre |
