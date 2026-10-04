# Mission kiosque-finitions — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build et lint notés dans PROGRESS.md (déjà relevés au cadrage, à reconfirmer) → session principale (Sonnet)
- [x] 2. Code mort (D2) : suppression des exports listés, puis greps du critère 2 → session principale (Sonnet)
- [x] 3. `DesignSystem.jsx` : tableau typographique et spécimens aux polices réelles (D3, première moitié) → session principale (Sonnet)
- [x] 4. Polices et primitives (D3 seconde moitié, D4) : lien Google Fonts, primitives sans consommateur, en-tête de `tokens.css`, liste de `LabTokens.jsx`. Relever avant/après les valeurs calculées des variables de la mascotte (critère 8) → session principale (Sonnet)
- [x] 5. `/lab` (D5) : `LatestIssue` en revue bleue, fiche agent « VERT DOSSIER » → session principale (Sonnet)
- [x] 6. Couverture Zine du kiosque (D6), testée avec le numéro d'essai non commité → session principale (Sonnet)
- [x] 7. Consigne en double du geste parfait (D7) → session principale (Sonnet)
- [ ] 8. `CLAUDE.md` et `CHANGELOG.md` (D8) → sous-agent (Haiku), avec la liste des PR fusionnées fournie par la session principale
- [ ] 9. Revue complète des routes (D9) : tableau dans PROGRESS.md → verificateur (Haiku). S'il ne se lance pas après une nouvelle tentative, la session principale le fait elle-même. Corrections éventuelles → session principale (Sonnet)
- [ ] 10. Vérification finale : build, lint, greps des critères 1 à 3 et 6 → session principale (Sonnet)
- [ ] 11. RAPPORT.md (PR vers `refonte-kiosque` ; ensuite : fusion de `kiosque-annexes`, `/zine` dans `share-previews.js`, synchronisation avec `main`, PR finale) → session principale (Sonnet)
