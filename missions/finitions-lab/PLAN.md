# Mission finitions-lab — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus 5.5)
- [ ] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Sonnet)
- [ ] 2. Moteur Godot partagé (D1), vérification des deux versions du jeu dans le navigateur (critères 1-2), repli si échec → session principale (Sonnet)
- [ ] 3. Lien « Suivre » sur l'accueil (D2) → session principale (Sonnet)
- [ ] 4. Relevé de référence audit : `innerText` des résultats des 3 exemples + « Tokens du site » sur `/lab/audit-tokens`, écrit dans `missions/finitions-lab/audit-avant.txt` → verificateur (Haiku)
- [ ] 5. Découpage de `AuditTokens.jsx` (D3) puis texte D4 ; build + lint → session principale (Sonnet)
- [ ] 6. Même relevé qu'à l'étape 4 → `audit-apres.txt`, comparaison (critère 4), texte D4 FR/EN (critère 5) → verificateur (Haiku)
- [ ] 7. Tokens D5 dans `tokens.css` et `LabTokens.jsx` ; copie des scripts de mesure et de snapshot (D7) ; mesure `avant` + snapshots `avant` → session principale (Sonnet)
- [ ] 8. Remplacement des espacements en dur (D6), fichier par fichier, liste des fichiers touchés dans PROGRESS → sous-agent (Haiku), relecture du diff par la session principale
- [ ] 9. Mesure `apres` + snapshots `apres`, comparaison (critères 7-9) ; corrections → session principale (Sonnet)
- [ ] 10. Vérification navigateur finale : critères 2, 3, 6, 10, captures accueil desktop + 375 px → verificateur (Haiku)
- [ ] 11. Build, lint, RAPPORT.md (avec les missions suivantes : vrai-404, menu-barre-haut) → session principale (Sonnet)
