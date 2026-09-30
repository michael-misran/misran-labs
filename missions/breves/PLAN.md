# Mission breves — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus, au cadrage)
- [x] 2. `src/breves/FORMAT.md` + `src/breves/jours.js` (chargement et validation, D2-D4, sur le modèle de `src/magazine/numeros.js`) → session principale (Sonnet)
- [ ] 3. Premier jour réel `src/breves/jours/2026-09-30.json` (D8, résumés fr + traduction en) → session principale (Sonnet)
- [ ] 4. `brevesText.js`, pages `BrevesHome.jsx` et `BrevesJour.jsx`, routes dans `App.jsx` (D5) → session principale (Sonnet)
- [ ] 5. Entrée de navigation `Sidebar.jsx` + libellés `ui.js` (D6) → sous-agent (Haiku)
- [ ] 6. Aperçus et sitemap dans `scripts/share-previews.js` (D7) → session principale (Sonnet)
- [ ] 7. `src/breves/EXTRACTION.md` (D9) → session principale (Sonnet)
- [ ] 8. Vérification finale : build, lint, greps (critères 6, 7, 9, 10) par la session principale ; navigateur, critères 1 à 5 → verificateur (Haiku)
- [ ] 9. RAPPORT.md (avec les étapes de clôture listées en Hors périmètre) → session principale (Sonnet)
