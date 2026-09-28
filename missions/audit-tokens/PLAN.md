# Mission audit-tokens — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, fiche P-004 passée en `en-cours` → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md (vérifier qu'ils correspondent au relevé du cadrage) → session principale (Sonnet)
- [ ] 2. Moteur, socle : `analyse.js`, `lireFichiers.js`, `lecteurs/css.js`, `regles.js` avec R1 à R7 (D2, D4 à D7) + `exemples/exemple.css` + `verifier-analyse.mjs` limité au CSS. Le script passe → session principale (Sonnet)
- [ ] 3. Moteur, JSON : `lecteurs/dtcg.js`, `lecteurs/tokensStudio.js`, détection (D3), R8 + `exemples/exemple.dtcg.json`, `exemples/exemple.tokens-studio.json` ; `verifier-analyse.mjs` complété (D11). Le script passe → session principale (Sonnet)
- [ ] 4. Page : `src/lab/projects/AuditTokens.jsx` (D8, D9), textes FR complets, structure `{ fr, en }` prête avec EN à compléter, entrée dans `PROJECTS` (D1). La page s'affiche, lit un fichier déposé et analyse les exemples → session principale (Sonnet)
- [ ] 5. Traduction EN de tous les textes de la page et des règles (D10) → sous-agent (Haiku)
- [ ] 6. Vérification : build, lint, script, grep des chiffres économiques par la session principale ; navigateur (critères 1, 2, 3, 5, 6, 7, FR et EN) → verificateur (Haiku)
- [ ] 7. Corrections éventuelles issues de l'étape 6, puis RAPPORT.md (résultat de l'audit des tokens du site + feuille de route de la SPEC) → session principale (Sonnet)
