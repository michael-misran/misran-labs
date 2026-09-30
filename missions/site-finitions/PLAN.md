# Mission site-finitions — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build (taille des fichiers JS), lint, notés dans PROGRESS.md ; captures « avant » des 8 pages du critère 4, FR et EN (texte de page + erreurs console) → verificateur (Haiku)
- [x] 2. `index.html` : `lang="fr"`, balises de D2, liens favicon/apple-touch-icon → session principale (Sonnet)
- [x] 3. Favicon SVG (D1) et apple-touch-icon PNG 180×180 ; suppression de `public/vite.svg` si non référencé → session principale (Sonnet)
- [x] 4. Image de partage 1200×630 (D3) : source dans le dossier de mission, rendu PNG via Chrome headless, vérification visuelle → session principale (Sonnet)
- [x] 5. Découpage du JS (D4) : `React.lazy` + `Suspense` dans `src/App.jsx` et chargement paresseux des composants de `src/lab/projects.js` ; build et mesure des chunks → session principale (Sonnet)
- [x] 6. Vérification finale : build, lint, greps du critère 1 et tailles du critère 3 par la session principale ; captures « après » des 8 pages FR/EN, navigation par la barre latérale, console → verificateur (Haiku)
- [ ] 7. RAPPORT.md (mesures avant/après, décisions, recommandations hors périmètre) → session principale (Sonnet)
