# Mission circuits-colonnes — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build OK, lint 6 erreurs préexistantes → session principale (Opus)
- [x] 2. Mesures avant, **avant toute modification** : dans le navigateur, pour `/lab/utilisation-ia` (≥ 1280 px et 375 px) et `/lab/workflow` (≥ 1280 px et 375 px), relever la hauteur affichée et l'`outerHTML` de chaque SVG de `FlowDiagram`. Écrire `mesures.json` (clé `avant`) → verificateur (Haiku)
- [x] 3. `FlowDiagram.jsx` : mode `grid` en serpentin (D1–D3, D6), modes existants inchangés → session principale (Sonnet)
- [x] 4. `UtilisationIA.jsx` : les 3 schémas en `grid` / `columns={3}` sur ordinateur, `vertical` sur mobile (D4, D5) → session principale (Sonnet)
- [x] 5. Vérification : mesures après (clé `apres` dans `mesures.json`) et critères 1 à 6 ; contrôle visuel du sens des flèches sur une capture ordinateur de chaque schéma → verificateur (Haiku)
- [x] 6. Corrections éventuelles issues de l'étape 5 (si une correction échoue deux fois : `expert` (Opus)), puis RAPPORT.md → session principale (Sonnet)
