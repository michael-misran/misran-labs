# Mission projets-fonctionnement — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 2 | Branche `auto/projets-fonctionnement` traitée comme mission malgré le préfixe `projets-` | La règle d'ignorer `auto/projets-*` vise les branches de routine `auto/projets-<date>` ; celle-ci porte un dossier de mission complet sans RAPPORT.md, sinon elle ne serait jamais exécutée |
| 2026-09-28 | 2 | Texte du lien d'accès dans `PROJ_TEXT.home.howLink` (`projetsText.js`) | `ProjetsHome` lit déjà `PROJ_TEXT` ; évite un second import |
| 2026-09-28 | 3 | Textes structurés en `blocks` typés (p, levels, tree, flow, list, cases) au lieu de champs fixes par section | Le composant reste générique et la traduction EN garde exactement la même structure |
| 2026-09-28 | 3 | Circuit en 5 étapes : `FlowDiagram` en grille 3 colonnes (desktop) et vertical (mobile) | À 375 px une ligne horizontale réduirait le texte SVG à environ 5 px |
| 2026-09-28 | 4 | Traduction EN : `en-cours` et `RAPPORT` gardés tels quels ; pas de pronom pour Michael ni Claude | Ce sont les valeurs/noms réels du code ; pronoms non précisés donc neutres |
