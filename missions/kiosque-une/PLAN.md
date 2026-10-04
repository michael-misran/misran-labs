# Mission kiosque-une — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build, lint (déjà relevés au cadrage, à reconfirmer) → session principale (Sonnet)
- [x] 2. Squelette : `src/kiosque/KiosqueHome.jsx`, `KiosqueParts.jsx`, `kiosqueText.js` (fr/en), route `/` → `KiosqueHome` dans `App.jsx`, titres de section (D2, D3) → session principale (Sonnet)
- [x] 3. À la une : la Gazette du jour avec les vraies données (D4) → session principale (Sonnet)
- [x] 4. Présentoirs : les 4 couvertures, les tablettes, les légendes, le survol, la grille responsive, `prefers-reduced-motion` (D5, D7) → session principale (Sonnet)
- [x] 5. Bulletin d'abonnement depuis `FEEDS` (D6) → session principale (Sonnet)
- [ ] 6. En-tête compact sur mobile dans `Masthead.jsx` (D8) → session principale (Sonnet)
- [ ] 7. Vérification finale : build, lint et grep du critère 8 par la session principale ; critères 1 à 7 et 9 dans le navigateur (1366 px et 375 px, FR et EN) → verificateur (Haiku)
- [ ] 8. RAPPORT.md (rappeler que la PR vise `refonte-kiosque`, puis lister les missions suivantes) → session principale (Sonnet)
