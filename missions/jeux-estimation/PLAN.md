# Mission jeux-estimation — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [ ] 1. Prérequis (`src/jeux/socle/` présent, sinon RAPPORT « prérequis manquant ») + état initial : build, lint notés dans PROGRESS.md → session principale (Sonnet)
- [ ] 2. `meta.js`, `Jeu.jsx` (prêt → coup d'œil 5 s → flou → saisie → résultat), score et partage (D1, D3, D4, D6) avec un seul type provisoire (bocal) ; `A_VENIR` − 1. Build + lint → session principale (Sonnet)
- [ ] 3. Les 5 types SVG de `types/` (D2) + `verifier-types.mjs` (critère 4), lancé avec `node` → session principale (Sonnet)
- [ ] 4. `Courbe.jsx` : distribution simulée déterministe, histogramme, phrase de position (D5, D7). Build + lint → session principale (Sonnet)
- [ ] 5. Vérification dans le navigateur (`npx vite preview`) : critères 1, 2, 3, 5, 6, 7, 8 ; captures desktop + 375 px (image, puis résultat) → verificateur (Haiku)
- [ ] 6. Corrections éventuelles, vérification finale : build, lint, critères 9 à 11 → session principale (Sonnet)
- [ ] 7. RAPPORT.md → session principale (Sonnet)
