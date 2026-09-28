# Mission audit-tokens — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, fiche P-004 passée en `en-cours` → session principale (Opus)
- [ ] 1. État initial : build, lint notés dans PROGRESS.md (vérifier qu'ils correspondent au relevé du cadrage) → session principale (Sonnet)
- [ ] 2. Moteur : `src/lab/audit/analyseTokens.js` (D2, D4, D5, D6) + `src/lab/audit/exemple.css` + `missions/audit-tokens/verifier-analyse.mjs` (D10). Le script passe → session principale (Sonnet)
- [ ] 3. Page : `src/lab/projects/AuditTokens.jsx` (D7, D8), textes FR complets, structure `{ fr, en }` prête avec EN à compléter, entrée dans `PROJECTS` (D1). La page s'affiche et analyse l'exemple → session principale (Sonnet)
- [ ] 4. Traduction EN de tous les textes de la page et des règles (D9) → sous-agent (Haiku)
- [ ] 5. Vérification : build, lint, script, grep des chiffres économiques par la session principale ; navigateur (critères 1, 2, 4, 5, 6, FR et EN) → verificateur (Haiku)
- [ ] 6. Corrections éventuelles issues de l'étape 5, puis RAPPORT.md (avec le résultat de l'audit des tokens du site, et les missions suivantes possibles) → session principale (Sonnet)
