# Mission midnight-snack-1 — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, état initial → session principale (Opus 5.5)
- [x] 1. Lire `src/portfolio/PortfolioLivre.jsx`, `portfolio.css`, `encarts.js`, `livreTexte.js` et la route `/portfolio` de `src/App.jsx` ; noter dans PROGRESS ce qui sera copié → session principale (Sonnet)
- [x] 2. Squelette du livre : `src/midnight/` (MidnightLivre, midnight.css, midnightTexte, encarts, numeros.js et numeros/01.js avec les 20 pages vides), route `/midnight/:numero?` dans `App.jsx`, navigation et impression (D1, D6, D7) → session principale (Sonnet)
- [x] 2b. Parution datée : page d'attente, mode `?epreuve` avec bandeau et noindex, `to` daté dans `volumes.js` (D2) → session principale (Sonnet)
- [x] 3. Couverture, sommaire + édito du raton, 4ᵉ de couverture (FR/EN) → session principale (Sonnet)
- [x] 4. Récit 1 « Le frigo qui ne s'éteint jamais », 3 pages FR/EN, 1 300-1 600 mots (D3) → session principale (Sonnet)
- [x] 5. Récit 2 « Commit à minuit », 3 pages FR/EN (D3) → session principale (Sonnet)
- [x] 6. Récit 3 « La cartouche 1987 », 3 pages FR/EN (D3) → session principale (Sonnet)
- [x] 7. Le saviez-vous ?, réclames rétro, casse-croûte du raton, courrier des insomniaques (FR/EN, faits vrais uniquement) → session principale (Sonnet)
- [x] 8. Jeu imprimable (labyrinthe SVG + mots croisés avec solution) → session principale (Sonnet)
- [x] 9. Pages en attente : feuilleton The Lost Cauldron et Dans la marmite (D4), encarts et prompts Gemini (D5) → session principale (Sonnet)
- [x] 10. Vérification : build, lint, `git diff --stat main` par la session principale ; critères 2, 3, 5, 6 dans le navigateur (1366 et 375 px, FR et EN, avec et sans `?atelier`, avec et sans `?epreuve`) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [x] 11. RAPPORT.md : fait / pas fait / comment vérifier, liste des prompts Gemini à générer, et ce qu'il reste à Michael (texte de l'épisode 1, notes de « Dans la marmite », nom du coéquipier, fusionner avant le 1er novembre ; lien d'épreuve à partager : `/midnight/1?epreuve`) → session principale (Sonnet)
