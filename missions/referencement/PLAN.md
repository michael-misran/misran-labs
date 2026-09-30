# Mission referencement — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build (nombre de pages d'aperçu), lint, notés dans PROGRESS.md → session principale (Sonnet)
- [ ] 2. `sitemap.xml` dans `scripts/share-previews.js` (D1) : champ `lastmod`, échappement XML, écriture, ligne de console ; build ; vérifications du critère 2 (`xmllint`, greps) copiées dans PROGRESS.md → session principale (Sonnet)
- [ ] 3. `public/robots.txt` (D2) ; build ; critère 3 → sous-agent (Haiku)
- [ ] 4. Titre d'onglet (D3) dans `src/shell/Shell.jsx` (+ `src/i18n/ui.js` si pertinent) → session principale (Sonnet)
- [ ] 5. Vérification finale : build, lint, `curl` du critère 4 sur `npx vite preview` par la session principale ; titres d'onglet du critère 5 (FR/EN, bascule de langue, navigation barre latérale, console) → verificateur (Haiku)
- [ ] 6. RAPPORT.md (extraits du sitemap, titres avant/après, marche à suivre Google Search Console pour Michael, recommandations) → session principale (Sonnet)
