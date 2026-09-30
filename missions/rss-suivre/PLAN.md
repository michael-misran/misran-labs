# Mission rss-suivre — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `scripts/rss.js` + branchement dans `sharePreviewsPlugin` (4 flux) + balises `alternate` dans `index.html` (D1, D2) ; build puis contrôle du XML (critères 1, 2, 4) → session principale (Sonnet)
- [x] 3. Libellés Brèves et Suivre dans `registry.js` (D7) → session principale (Sonnet)
- [x] 4. Page `/suivre` (`SuivrePage.jsx`, `suivreText.js`), route, entrée de menu, clés i18n (D4, D5) ; build + lint → session principale (Sonnet)
- [ ] 5. Aperçu de partage et sitemap de `/suivre` (D3, D6) ; build (critère 5) → sous-agent (Haiku)
- [ ] 6. Vérification dans le navigateur (`npx vite preview`) : critères 3, 6, 7, 8, 9 ; captures (`/suivre` desktop et 375 px, menu) → verificateur (Haiku). Rappel : tester « Copié ✓ » en cliquant et en lisant dans un seul appel
- [ ] 7. Corrections éventuelles, vérification finale : build, lint, critère 11 (relire les URL et `@` ajoutés dans `git diff main...`) → session principale (Sonnet)
- [ ] 8. RAPPORT.md (captures, recommandations hors périmètre) → session principale (Sonnet)
