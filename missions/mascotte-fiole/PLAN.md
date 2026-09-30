# Mission mascotte-fiole — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi, maquette rangée dans le dossier de mission → session principale (Opus 5.5)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. `src/shell/mascotte/sprites.js` : copier à l'identique depuis `maquette.html` les grilles `fiole` et `toxique` (base + états), `FX.bubble` et `FX.poison`, la table lettre → token (D2) et les phrases FR/EN (D7) → sous-agent (Haiku)
- [x] 3. `Fiole.jsx` + `fiole.css` : rendu SVG, états, clignement, survol, clic, dodo, secret du 10ᵉ clic, bulle et particules en portail, réduction des animations, nettoyage des minuteries (D4 à D9) → session principale (Sonnet)
- [ ] 4. Intégration dans `Statusbar.jsx` (desktop + mobile, sortie de l'`overflow: hidden`, ellipsis des textes) (D3, D4) ; build + lint → session principale (Sonnet)
- [ ] 5. Vérification dans le navigateur : critères 1 à 8 et 10 de la SPEC, captures → verificateur (Haiku)
- [ ] 6. Corrections éventuelles issues de l'étape 5, puis vérification finale : build, lint, grep du critère 9 → session principale (Sonnet)
- [ ] 7. RAPPORT.md (avec captures et recommandations hors périmètre) → session principale (Sonnet)
