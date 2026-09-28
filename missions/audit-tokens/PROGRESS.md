# Mission audit-tokens — PROGRESS

**Statut :** étapes 1 et 2 faites (moteur CSS + R1 à R7, script de vérification vert)
**Prochaine action :** étape 3 (lecteurs DTCG et Tokens Studio, détection JSON déjà en place dans `lireFichiers.js`, R8, deux exemples JSON, compléter `verifier-analyse.mjs`)
**Blocages :** aucun

## Notes pour l'étape 3
- `lireFichiers.js` détecte déjà DTCG / Tokens Studio / JSON invalide / JSON sans token. Il attend les lecteurs via `enregistrerLecteurJson(format, lecteur)` : à remplacer par de simples imports directs (pas d'import circulaire réel), et supprimer l'avertissement « pas encore pris en charge ».
- Un lecteur JSON renvoie `{ tokens, declarations: [], avertissements }` ; chaque token porte `format`, `repli: []`, `references`.
- Tokens du site (`tokens.css`) : 153 tokens, 0 erreur, 3 avertissements, 56 infos.

## État initial (relevé au cadrage, 2026-09-28, confirmé à l'étape 1)
- `npm run build` : OK (avertissement de taille de chunk, préexistant).
- `npm run lint` : 6 erreurs, 0 avertissement (préexistantes : VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell).
