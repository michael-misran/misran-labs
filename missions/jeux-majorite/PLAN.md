# Mission jeux-majorite — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. Prérequis (`src/jeux/socle/` présent, sinon RAPPORT « prérequis manquant ») + état initial : build, lint notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `correspondance.js` (D4) + `verifier-questions.mjs` avec les tests de correspondance (critère 4) et la question d'exemple seule, lancé avec `node` → session principale (Sonnet)
- [ ] 3. `questions.json` : 30 questions fr/en selon D2 (sujets, interdits, synonymes) ; relancer `verifier-questions.mjs` (critère 3) → session principale (Sonnet). Contenu rédactionnel : pas de délégation à Haiku (qualité et traduction)
- [ ] 4. `meta.js`, `Jeu.jsx` (tableau, cases, croix, fin, résultat, partage), `A_VENIR` − 1 (D1, D3, D5, D6, D7). Build + lint → session principale (Sonnet)
- [ ] 5. Vérification dans le navigateur (`npx vite preview`) : critères 1, 2, 5 à 8 ; captures desktop + 375 px (partie en cours, fin de partie) → verificateur (Haiku)
- [ ] 6. Corrections éventuelles, vérification finale : build, lint, critères 9 à 11 → session principale (Sonnet)
- [ ] 7. RAPPORT.md → session principale (Sonnet)
