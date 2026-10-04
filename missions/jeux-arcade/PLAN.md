# Mission jeux-arcade — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build et lint notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `ArcadeParts.jsx` : l'écran cathodique, l'envahisseur en pixels, le curseur, la boîte de jeu, et les textes fr/en dans `jeuxText.js` (D1, D4) → session principale (Sonnet)
- [ ] 3. `/jeux` : la borne, le menu « SELECT GAME » au clavier et les boîtes de jeux (D2) → session principale (Sonnet)
- [ ] 4. `/jeux/:slug` : la barre de jeu, le cadre de borne et l'écran de fin de `ResultatPartage`, sans toucher aux jeux (D3) → session principale (Sonnet)
- [ ] 5. Vérification finale : build, lint et greps du critère 1 par la session principale ; les autres critères dans le navigateur (1366 px et 375 px, FR et EN) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [ ] 6. RAPPORT.md (rappeler que la PR vise `refonte-kiosque`) → session principale (Sonnet)
