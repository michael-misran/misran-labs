# Mission images-numeros — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [x] 1. État initial : build, lint, présence de Chrome (`ls "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`), notés dans PROGRESS.md → session principale (Sonnet)
- [x] 2. Gabarit `scripts/og-numero-template.html` (D2) et script `scripts/og-numero.js` (D1) ; image de `2026-09-28`, contrôle visuel → session principale (Sonnet)
- [x] 3. Tests des critères 2 et 3 (titre long temporaire, caractères spéciaux, erreurs et codes de sortie), fichiers temporaires supprimés avant commit → session principale (Sonnet)
- [x] 4. Rattrapage D4 (`--all`), contrôle visuel des deux images → session principale (Sonnet)
- [x] 5. Plugin D3 dans `scripts/share-previews.js` ; build ; critère 5 (dont test de repli temporaire) → session principale (Sonnet)
- [x] 6. Documentation D5 (`REDACTION.md`, `FORMAT.md`) → sous-agent (Haiku)
- [x] 7. Vérification finale : build, lint, `git diff --stat main`, greps du critère 5 → session principale (Sonnet)
- [ ] 8. RAPPORT.md (images produites, ligne de permission D6 à ajouter par Michael, test LinkedIn à faire par Michael, recommandations) → session principale (Sonnet)
