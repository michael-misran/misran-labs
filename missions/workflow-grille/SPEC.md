# Mission workflow-grille — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-27. Brief de Michael : « passer les schémas de WorkflowSolo en grille ».

## Contexte
`src/lab/projects/WorkflowSolo.jsx` (page `/lab/workflow`) affiche deux `FlowDiagram` en `direction="vertical"` : `c.runFlow` (**6 étapes**, ligne ~381) et `c.unifyFlow` (**6 étapes**, ligne ~392). Le mode `direction="grid"` + `columns` existe déjà dans `src/components/diagrams/FlowDiagram.jsx` (ajouté par la mission `circuits-colonnes`, disposition en serpentin) et est utilisé par `src/lab/projects/UtilisationIA.jsx` avec `direction={isMobile ? 'vertical' : 'grid'} columns={3}`. `useIsMobile()` est déjà appelé dans WorkflowSolo (`const isMobile`, ligne ~336).

## Objectif
Même traitement que la page Utilisation de l'IA : les deux schémas en serpentin sur 3 colonnes sur ordinateur, inchangés sur mobile.

## Décisions (tranchées)
**D1.** Les deux appels deviennent `direction={isMobile ? 'vertical' : 'grid'} columns={3}`. 6 étapes → 2 lignes (1 → 2 → 3, puis 6 ← 5 ← 4).
**D2.** `FlowDiagram.jsx` n'est **pas modifié**. Aucun autre fichier source que `WorkflowSolo.jsx`.
**D3.** Aucun changement de contenu ni de libellé.

## Critères d'acceptation
1. Ordinateur (≥ 1280 px), `/lab/workflow` : les 2 schémas en serpentin sur 3 colonnes, flèches dans le bon sens, hauteur affichée au moins 2 fois plus petite qu'avant (`mesures.json`, clés `avant`/`apres`).
2. Mobile (375 px), `/lab/workflow` : `outerHTML` des 2 SVG identique à avant.
3. `/lab/utilisation-ia` : `outerHTML` des 3 SVG de FlowDiagram identique à avant, ordinateur et 375 px (non-régression).
4. Aucune erreur console sur `/lab/workflow` (FR et EN) et `/lab/utilisation-ia`.
5. `git diff main --stat` ne touche que `src/lab/projects/WorkflowSolo.jsx` et `missions/workflow-grille/`.
6. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans WorkflowSolo.jsx.
7. Tout est commité sur `auto/workflow-grille`, rien sur `main`, rien de poussé ; aucun serveur laissé en marche.

## Hors périmètre
- Tout autre schéma ou page.
