# Mission jeux-majorite — PROGRESS

**Statut :** étape 2 terminée (correspondance.js + verifier-questions.mjs, tests de correspondance OK)
**Prochaine action :** étape 3 (rédiger les 30 questions de questions.json, contenu rédactionnel — pas de délégation)
**Blocages :** aucun

## État initial (référence)
- `src/jeux/socle/` présent (mission jeux-geste fusionnée, PR #34).
- `npm run build` : OK, aucune erreur. Sitemap généré (32 URL, `/jeux/geste-parfait`).
- `npm run lint` : OK, aucune erreur.

## Étape 2
- Créés : `src/jeux/comme-tout-le-monde/correspondance.js` (normalisation D4, distance de Levenshtein, `trouverReponse`), `questions.json` (1 question d'exemple « vacances-oubli », 6 réponses), `missions/jeux-majorite/verifier-questions.mjs`.
- `node missions/jeux-majorite/verifier-questions.mjs` : tous les tests de correspondance (critère 4) passent, ainsi que la structure de la question d'exemple. Seul le total (1/30) échoue, attendu à ce stade (voir DECISIONS.md).
- `npm run build` et `npm run lint` : OK.
