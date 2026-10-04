# Mission zine — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build et lint notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `src/zine/` : `numeros.js` (chargement et validation), `FORMAT.md` et `numeros/.gitkeep`, plus `public/zine/.gitkeep` (D2) → session principale (Sonnet)
- [x] 3. `ZineParts.jsx`, `ZineHome.jsx` (avec la page d'attente) et `zineText.js` fr/en (D3) → session principale (Sonnet)
- [x] 4. `ZineNumero.jsx` : rendu de chaque type de bloc, encre locale et page « Ce numéro n'existe pas » (D4) → session principale (Sonnet)
- [ ] 5. Branchement : routes dans `App.jsx`, `registry.js`, ouverture automatique dans `NavTitres.jsx` et `KiosqueParts.jsx` (D1, D5) → session principale (Sonnet)
- [ ] 6. Test avec un numéro d'essai temporaire, puis sa suppression (D6) → session principale (Sonnet)
- [ ] 7. Vérification finale : build, lint et greps du critère 1 par la session principale ; les autres critères dans le navigateur (1366 px et 375 px, FR et EN) → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même.
- [ ] 8. RAPPORT.md (rappeler que la PR vise `refonte-kiosque`) → session principale (Sonnet)
