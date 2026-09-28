# Mission utilisation-ia-economie — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser. Procédures : `missions/README.md`.

- [x] 0. Cadrage : SPEC, PLAN, CONTENU, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus, au cadrage)
- [x] 2. Points mécaniques de CONTENU §C (1 à 7), FR et EN : arborescence, organigramme, tableau des modèles, boucle de reprise, circuit final, chronologie, bilan chiffré, mise en abyme → sous-agent (Haiku). Lui passer CONTENU §C et le chemin de la page ; relire le diff avant de commiter.
- [x] 3. Section « Un deuxième avis : Gemini » FR + EN, avec son tableau (SPEC D1, D2, D4) : clés dans CONTENT, puis `<Section>` dans le rendu après `mainPushTitle` → session principale (Sonnet)
- [x] 4. Section « Économiser les tokens » FR + EN, avec son tableau (SPEC D1, D2) : juste après la section Gemini → session principale (Sonnet)
- [ ] 5. Contrôles sans navigateur : build, lint, greps des critères 3, 4 et 7 → session principale (Sonnet)
- [ ] 6. Contrôles navigateur : critère 5 (FR, EN, 375 px, console, `/`) → verificateur (Haiku)
- [ ] 7. RAPPORT.md → session principale (Sonnet)
