# Mission audit-grille — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint, les deux scripts existants notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `contrastes.js` (D5) + `chemins` dans `explorerDepot` (D1) + première partie de `verifier-grille.mjs`. Les trois scripts passent → session principale (Sonnet)
- [x] 3. `grille.js` (D2, D3, D6) + `priorites.js` (D7) + suite de `verifier-grille.mjs`. Les trois scripts passent → session principale (Sonnet)
- [x] 4. Interface : `Grille.jsx` avec ajustement (D4), `Matrice.jsx`, ordre de la page (D10), appel à l'action (D9), Markdown complété ; textes FR, structure EN prête → session principale (Sonnet)
- [x] 5. `RapportImprimable.jsx` + règles `@media print` + bouton « Exporter en PDF » (D8, D13) → session principale (Sonnet)
- [x] 6. Traduction EN de tous les nouveaux textes (D11) → sous-agent (Haiku)
- [ ] 7. Vérification : build, lint, scripts, grep secrets/chiffres par la session principale ; navigateur (critères 2 à 8, FR et EN, `window.print` espionné, réseau limité à D14) → verificateur (Haiku), au premier plan
- [ ] 8. Corrections éventuelles issues de l'étape 7, puis RAPPORT.md (grille obtenue sur misran-labs, suites possibles) → session principale (Sonnet)
