# Mission kiosque-annexes — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build et lint notés dans PROGRESS.md → session principale (Sonnet)
- [ ] 2. Noms harmonisés : `FEEDS` dans `suivreText.js` et titres des flux dans `scripts/rss.js` (D2) → sous-agent (Haiku)
- [ ] 3. `/suivre` en bulletin d'abonnement, avec `SuivreBandeau` (D3) → session principale (Sonnet)
- [ ] 4. `Page404.jsx` en avis de recherche, et cohérence de `dist/404.html` (D4) → session principale (Sonnet)
- [ ] 5. Aperçus et images OG : `og-numero-template.html`, `og-numero.js`, les textes par défaut de `share-previews.js` et le `theme-color` (D5). Lire les scripts avant de changer quoi que ce soit → session principale (Sonnet)
- [ ] 6. Vérification finale : build, lint et greps du critère 1 par la session principale ; les autres critères dans le navigateur (1366 px et 375 px, FR et EN) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [ ] 7. RAPPORT.md (rappeler que la PR vise `refonte-kiosque`) → session principale (Sonnet)
