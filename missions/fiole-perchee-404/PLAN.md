# Mission fiole-perchee-404 — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Sonnet)
- [ ] 2. Fiole paramétrable : props `scale`, `variant`, `sleeps` dans `Fiole.jsx` (défauts = comportement actuel de la barre, échelle 3), `bob` proportionnel à l'échelle, `toxique.phrases` FR/EN dans `sprites.js` (D1, D5, D7) → session principale (Sonnet)
- [ ] 3. Fiole perchée : position sur le bord haut de la barre dans `Statusbar.jsx`, ombre, `--mascotte-overhang` dans `tokens.css` + `padding-bottom` de `.shell-main` dans `Shell.jsx`, pointer-events et z-index (D2 à D4) ; build + lint → session principale (Sonnet)
- [ ] 4. Page 404 : `Page404.jsx`, textes FR/EN dans `i18n/ui.js`, route `*` dans `App.jsx`, `ProjectPage`/`ProjectDemoPage`, `resolveRouteMeta` (☠ + « Page introuvable »), meta `noindex` (D6, D8, D9) ; build + lint → session principale (Sonnet)
- [ ] 5. Fiole toxique ×4 au-dessus du titre des `NotFound` de Magazine, Brèves et Projets (D8, dernier point) → sous-agent (Haiku)
- [ ] 6. Vérification dans le navigateur : critères 1 à 11 et 13 de la SPEC, captures → verificateur (Haiku). Rappel : pour tester une bulle (1,8 s), cliquer et lire le DOM dans **un seul** appel (`browser_batch` ou un seul `javascript_tool`), sinon faux négatif (constaté mission mascotte-fiole)
- [ ] 7. Corrections éventuelles issues de l'étape 6, puis vérification finale : build, lint, grep du critère 12 → session principale (Sonnet)
- [ ] 8. RAPPORT.md (captures, recommandations hors périmètre) → session principale (Sonnet)
