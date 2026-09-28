# Mission audit-github — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint, `node missions/audit-tokens/verifier-analyse.mjs` notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `github.js` (D2, D3, D4, D5) + fixtures + première partie de `verifier-github.mjs` (adresses, repérage, erreurs, fetch simulé). Le script passe → session principale (Sonnet)
- [x] 3. `couverture.js` (D6) + option `usagesExternes` dans `analyse` + suite de `verifier-github.mjs` ; les deux scripts passent → session principale (Sonnet)
- [x] 4. Interface : `SourceGithub.jsx`, `Couverture.jsx`, intégration dans `AuditTokens.jsx` (D7, D8), textes FR, structure EN prête ; rapport copié complété → session principale (Sonnet)
- [x] 5. Traduction EN de tous les nouveaux textes (D9) → sous-agent (Haiku)
- [ ] 6. Vérification : build, lint, scripts, grep secrets/chiffres par la session principale ; navigateur (critères 2 à 7, FR et EN, réseau limité à D11) → verificateur (Haiku), lancé au premier plan
- [ ] 7. Corrections éventuelles issues de l'étape 6, puis RAPPORT.md (avec la couverture mesurée sur misran-labs et la mission 3 à suivre) → session principale (Sonnet)
