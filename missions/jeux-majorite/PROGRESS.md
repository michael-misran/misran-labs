# Mission jeux-majorite — PROGRESS

**Statut :** étape 4 terminée (meta.js, Jeu.jsx complet)
**Prochaine action :** étape 5 (vérification navigateur — verificateur, critères 1,2,5 à 8)
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

## Étape 4
- Créés : `src/jeux/comme-tout-le-monde/meta.js` (couleur `cyan`), `Jeu.jsx`.
- Jeu complet : tableau de cases (numérotées, triées par %), saisie avec correspondance D4, croix (max 3), révélation complète en fin de partie, phrase « démo honnête » (D6), `ResultatPartage` du socle, texte de partage D5 (cases 🟩/⬛ + croix ❌, jamais de libellé).
- `JeuxHome.jsx` : `A_VENIR` 2 → 1 sur cette branche (voir DECISIONS.md pour le conflit attendu à la fusion).
- `npm run build` et `npm run lint` : OK. `/jeux/comme-tout-le-monde` apparaît dans le sitemap généré (33 URL).
