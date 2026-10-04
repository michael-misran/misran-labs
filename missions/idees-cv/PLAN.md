# Mission idees-cv — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build et lint notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `ProjetsParts.jsx` : fiche bristol, tampons de statut, en-tête de note, et textes fr/en dans `projetsText.js` (D1, D6) → session principale (Sonnet)
- [x] 3. `/projets`, `/projets/:id` et `/projets/fonctionnement` (D2, D3, D4) → session principale (Sonnet)
- [ ] 4. `/lab/cv` : la fiche agent, en vérifiant l'impression (D5) → session principale (Sonnet)
- [ ] 5. Vérification finale : build, lint et greps du critère 1 par la session principale ; les autres critères dans le navigateur (1366 px et 375 px, FR et EN) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [ ] 6. RAPPORT.md (rappeler que la PR vise `refonte-kiosque`) → session principale (Sonnet)
