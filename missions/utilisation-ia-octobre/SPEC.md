# Mission utilisation-ia-octobre — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-10-05. Brief de Michael : « regarde la page Utilisation de l'IA et dis-moi s'il faut la mettre à jour avec tout ce qu'on a fait depuis » → oui, mission validée.

## Contexte
- Page : `src/lab/projects/UtilisationIA.jsx` (`/lab/utilisation-ia`). Textes dans `CONTENT = { fr, en }` ; rendu dans le composant en bas du fichier : une `<Section title={…}>` par partie, composants `Timeline`, `FlowDiagram`, `Table`, `Pre`. Dernière mise à jour du texte : mission 8 (`utilisation-ia-economie`, 28/09).
- **Source de faits unique : `CONTENU.md`** (ce dossier). §A routines, §B missions et refonte, §C Lightpanda, §D passages existants.
- Branche partie de `main` (2026-10-05, après la PR #69).

## Décisions (tranchées)
**D1 — Deux nouvelles sections**, entre « Économiser les tokens » et « Bilan chiffré » :
- « Trois routines de plus » / « Three more routines » (§A), avec son tableau.
- « La refonte kiosque » / « The kiosk redesign » (§B) : la cadence, la direction artistique, la branche d'intégration, puis « Ce que la refonte m'a appris » en liste.
**D2 — Tableau avec le composant `Table` existant**, pas de nouveau schéma : routines (§A, 4 colonnes). La section kiosque n'a pas de tableau : paragraphes + une liste, comme les sections existantes (motif `xxxLabel` + tableau de chaînes rendu en `<ul>`).
**D3 — Lightpanda** (§C) : un paragraphe (clé `tokensLightpandaP`) ajouté à la section « Économiser les tokens », avant `tokensPublishP`. Pas de nouvelle section.
**D4 — Histoire vs état actuel** (règle des missions 7 et 8) : les passages qui racontent le passé restent ; ceux qui décrivent le fonctionnement actuel sont mis à jour selon CONTENU §D.
**D5 — Contraintes.** Aucune donnée privée (liste en tête de CONTENU.md) ; aucun chiffre absent de CONTENU.md ; tokens CSS uniquement ; FR et EN complets (traduction naturelle) ; lisible à 375 px ; aucun autre fichier source modifié.

## Critères d'acceptation
1. Les deux sections de D1 existent en FR et en EN, au bon endroit, avec le tableau de D2.
2. Le paragraphe Lightpanda (D3) existe en FR et en EN ; tous les points de CONTENU §D sont appliqués en FR et en EN (6 nouveaux jalons dans `milestones`, 4 lignes ajoutées dans `statsTableRows`).
3. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/lab/projects/UtilisationIA.jsx` ne renvoie rien.
4. `grep -niE "ghp_|gho_|/Users/|@gmail|src/private|misran-labs-prive|umami|500|TikTok|crédit" src/lab/projects/UtilisationIA.jsx` ne renvoie rien.
5. Aucune erreur console sur `/lab/utilisation-ia` (FR et EN) et `/`. À 375 px, aucun débordement horizontal de la page.
6. `npm run build` passe ; `npm run lint` : 0 erreur (état initial).
7. `git diff main --stat` : seuls `src/lab/projects/UtilisationIA.jsx` et `missions/utilisation-ia-octobre/` sont modifiés.
8. Tout est commité sur `auto/utilisation-ia-octobre`, rien sur `main`, rien de poussé ; aucun serveur laissé en marche.

## Hors périmètre
- Toute autre page, les composants de schéma, le style de la page (refait par lab-dossiers).
- Les routines elles-mêmes, les agents, le skill /mission.
