# Mission menu-mobile — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus, au cadrage)
- [ ] 2. Mesure avant correction : à 375 px, position du bouton ☰ et du premier élément de contenu sur les 7 pages du critère 1 ; en 1280 px, `top` du premier élément de `/magazine` et `/breves` (référence du critère 3). Noter dans PROGRESS.md → verificateur (Haiku)
- [ ] 3. Correction D1 : variable `--mobile-nav-offset` dans `tokens.css`, `top` du bouton et espace réservé dans `Shell.jsx` (mobile seulement) → session principale (Sonnet)
- [ ] 4. Icône 📖 dans `Sidebar.jsx` (D2) → session principale (Sonnet)
- [ ] 5. Vérification finale : build, lint, grep (critères 5-7) par la session principale ; navigateur, critères 1 à 5 avec captures → verificateur (Haiku)
- [ ] 6. RAPPORT.md → session principale (Sonnet)
