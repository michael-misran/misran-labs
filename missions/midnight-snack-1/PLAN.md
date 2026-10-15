# Mission midnight-snack-1 — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, état initial → session principale (Opus 5.5)
- [ ] 1. Lire `src/portfolio/PortfolioLivre.jsx`, `portfolio.css`, `encarts.js`, `livreTexte.js` et la route `/portfolio` de `src/App.jsx` ; noter dans PROGRESS ce qui sera copié → session principale (Sonnet)
- [ ] 2. Squelette du livre : `src/midnight/` (MidnightLivre, midnight.css, midnightTexte, encarts, numero1 avec les 20 pages vides), route `/midnight` dans `App.jsx`, navigation et impression (D1, D6, D7) → session principale (Sonnet)
- [ ] 3. Couverture, sommaire + édito du raton, 4ᵉ de couverture (FR/EN) → session principale (Sonnet)
- [ ] 4. Récit 1 « Le frigo qui ne s'éteint jamais », 3 pages FR/EN, 1 300-1 600 mots (D3) → session principale (Sonnet)
- [ ] 5. Récit 2 « Commit à minuit », 3 pages FR/EN (D3) → session principale (Sonnet)
- [ ] 6. Récit 3 « La cartouche 1987 », 3 pages FR/EN (D3) → session principale (Sonnet)
- [ ] 7. Le saviez-vous ?, réclames rétro, casse-croûte du raton, courrier des insomniaques (FR/EN, faits vrais uniquement) → session principale (Sonnet)
- [ ] 8. Jeu imprimable (labyrinthe SVG + mots croisés avec solution) → session principale (Sonnet)
- [ ] 9. Pages en attente : feuilleton The Lost Cauldron et Dans la marmite (D4), encarts et prompts Gemini (D5) → session principale (Sonnet)
- [ ] 10. Vérification : build, lint, `git diff --stat main` par la session principale ; critères 2, 3, 5, 6 dans le navigateur (1366 et 375 px, FR et EN, avec et sans `?atelier`) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [ ] 11. RAPPORT.md : fait / pas fait / comment vérifier, liste des prompts Gemini à générer, et ce qu'il reste à Michael (texte de l'épisode 1, notes de « Dans la marmite », nom du coéquipier, passer `to: '/midnight'`) → session principale (Sonnet)
