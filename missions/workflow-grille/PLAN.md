# Mission workflow-grille — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build OK, lint 6 erreurs préexistantes → session principale (Opus)
- [x] 2. Mesures avant, **avant toute modification** : hauteurs et `outerHTML` des SVG de FlowDiagram sur `/lab/workflow` et `/lab/utilisation-ia`, à ≥ 1280 px et 375 px → `mesures.json` (clé `avant`) → verificateur (Haiku). S'il n'a pas accès au navigateur, la session principale fait la mesure et le note dans DECISIONS.md.
- [x] 3. `WorkflowSolo.jsx` : les 2 schémas en grille sur ordinateur (D1) → session principale (Sonnet)
- [ ] 4. Vérification des critères 1 à 7 (mesures `apres`, comparaison, capture ordinateur des 2 schémas pour le sens des flèches) → verificateur (Haiku), même repli qu'à l'étape 2
- [ ] 5. RAPPORT.md → session principale (Sonnet)
