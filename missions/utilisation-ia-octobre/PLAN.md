# Mission utilisation-ia-octobre — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser. Procédures : `missions/README.md`.

- [x] 0. Cadrage : SPEC, PLAN, CONTENU, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus, au cadrage)
- [x] 2. Points mécaniques de CONTENU §D (1 à 6), FR et EN : jalons, bilan chiffré (recompter `ls missions/`), note, mise en abyme, « ce qui me reste », intro → sous-agent (Haiku). Lui passer CONTENU §D et le chemin de la page ; relire le diff avant de commiter.
- [x] 3. Paragraphe Lightpanda FR + EN (SPEC D3, CONTENU §C) → session principale (Sonnet)
- [x] 4. Section « Trois routines de plus » FR + EN avec son tableau (SPEC D1, D2, CONTENU §A) : clés dans CONTENT, puis `<Section>` dans le rendu après la section tokens → session principale (Sonnet)
- [x] 5. Section « La refonte kiosque » FR + EN (SPEC D1, CONTENU §B), juste après → session principale (Sonnet)
- [x] 6. Contrôles sans navigateur : build, lint, greps des critères 3, 4 et 7 → session principale (Sonnet)
- [x] 7. Contrôles navigateur : critère 5 (FR, EN, 375 px, console, `/`) → verificateur (Haiku)
- [x] 8. RAPPORT.md → session principale (Sonnet)
