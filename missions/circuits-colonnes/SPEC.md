# Mission circuits-colonnes — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-27. Brief de Michael : « Sur la page Utilisation de l'IA, afficher les deux circuits de 10 étapes sur plusieurs colonnes sur ordinateur, empilés sur mobile. »

## Contexte
`src/lab/projects/UtilisationIA.jsx` affiche trois schémas `FlowDiagram` en `direction="vertical"` (une boîte sous l'autre) :
- `c.finalFlow` — « Le circuit final », **10 étapes** (ligne ~790)
- `c.gitFlow` — circuit Git, **8 étapes** (ligne ~778)
- `c.resumeLoop` — boucle de reprise après la limite de quota, **6 étapes** (ligne ~732)

Sur ordinateur, ces colonnes d'une seule boîte obligent à faire défiler très longtemps. `FlowDiagram` (`src/components/diagrams/FlowDiagram.jsx`) ne connaît que `horizontal` et `vertical`. Il est aussi utilisé par `WorkflowSolo.jsx` (page `/lab/workflow`, deux schémas verticaux), qui ne doit pas changer.

## Objectif
Sur ordinateur, les trois circuits de la page tiennent sur plusieurs colonnes et se lisent comme un parcours continu. Sur mobile, rien ne change.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Nouveau mode dans FlowDiagram.** `direction="grid"` + prop `columns` (défaut 3). Les modes `horizontal` et `vertical` restent **strictement identiques** (même SVG produit). Aucune nouvelle dépendance, aucun autre composant modifié.

**D2 — Disposition en serpentin.** Ligne 1 de gauche à droite, ligne 2 de droite à gauche, ligne 3 de gauche à droite, etc. Flèches horizontales entre boîtes d'une même ligne (dans le sens de lecture de la ligne) ; en bout de ligne, une flèche verticale descend vers la boîte placée juste en dessous, qui commence la ligne suivante. Une dernière ligne incomplète commence donc du côté où la ligne précédente s'est terminée. Les numéros déjà présents dans les libellés (« 1 · Brief »…) garantissent l'ordre de lecture.

**D3 — Dimensions.** Mêmes `STEP_W`, `GAP`, hauteur de boîte et styles que les autres modes. Toutes les boîtes d'un schéma ont la même hauteur. Le SVG garde `width: 100%` et `maxWidth` = sa largeur naturelle : à 3 colonnes (832 px) il se réduit légèrement pour tenir dans la colonne de texte ; c'est accepté.

**D4 — Portée.** Les **trois** schémas verticaux de la page passent en `grid` sur ordinateur (le brief parle des « deux circuits » ; la boucle de reprise a exactement le même défaut, et les traiter différemment serait incohérent). `columns={3}` pour les trois.

**D5 — Mobile.** Avec `useIsMobile()` (déjà importé dans la page) : mobile → `direction="vertical"` comme aujourd'hui ; sinon → `direction="grid" columns={3}`.

**D6 — Tokens uniquement.** Aucune couleur brute dans FlowDiagram (reprendre `var(--bg2)`, `var(--border)`, `var(--muted)`, `var(--text)`, `var(--text2)` déjà utilisés).

## Critères d'acceptation
1. Ordinateur (fenêtre ≥ 1280 px de large), `/lab/utilisation-ia` : chacun des 3 schémas est en serpentin sur 3 colonnes, avec flèches dans le bon sens, et sa hauteur affichée est **au moins 2 fois plus petite** qu'avant (hauteurs relevées avant/après dans `mesures.json`).
2. Mobile (375 px) : les 3 schémas sont verticaux, et leur SVG (`outerHTML`) est **identique** à avant.
3. `/lab/workflow` : les SVG des 2 `FlowDiagram` sont **identiques** à avant (ordinateur et 375 px).
4. Aucune erreur console sur `/lab/utilisation-ia` (FR et EN) et `/lab/workflow`.
5. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/components/diagrams/FlowDiagram.jsx` ne renvoie rien.
6. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans les fichiers modifiés.
7. Tout est commité sur `auto/circuits-colonnes`, rien sur `main`, rien de poussé.

## Hors périmètre
- Changer le contenu ou les libellés des schémas.
- Passer les schémas de `WorkflowSolo.jsx` en grille (à proposer en recommandation si pertinent).
- Refondre le style des boîtes ou des flèches.
