# Mission jeux-majorite — PROGRESS

**Statut :** étape 3 terminée (30 questions rédigées fr/en)
**Prochaine action :** étape 4 (meta.js, Jeu.jsx — tableau, cases, croix, fin, résultat, partage)
**Blocages :** aucun

## État initial (référence)
- `src/jeux/socle/` présent (mission jeux-geste fusionnée, PR #34).
- `npm run build` : OK, aucune erreur. Sitemap généré (32 URL, `/jeux/geste-parfait`).
- `npm run lint` : OK, aucune erreur.

## Étape 2
- Créés : `src/jeux/comme-tout-le-monde/correspondance.js` (normalisation D4, distance de Levenshtein, `trouverReponse`), `questions.json` (1 question d'exemple « vacances-oubli », 6 réponses), `missions/jeux-majorite/verifier-questions.mjs`.
- `node missions/jeux-majorite/verifier-questions.mjs` : tous les tests de correspondance (critère 4) passent, ainsi que la structure de la question d'exemple. Seul le total (1/30) échoue, attendu à ce stade (voir DECISIONS.md).
- `npm run build` et `npm run lint` : OK.

## Étape 3
- `questions.json` complété à 30 questions fr/en (sujets : quotidien, maison, nourriture, vacances, travail, enfance, animaux ; aucun sujet interdit).
- `node missions/jeux-majorite/verifier-questions.mjs` : tout OK (30 questions, structure, synonymes uniques par question, correspondance D4).
- `npm run build` et `npm run lint` : OK.
- Synonymes par réponse en dessous de la fourchette indicative de D2 (volume), voir DECISIONS.md et recommandations du RAPPORT.
