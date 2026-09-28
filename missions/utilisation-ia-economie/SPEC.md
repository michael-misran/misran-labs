# Mission utilisation-ia-economie — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-28. Brief de Michael : « mettre à jour la page Utilisation de l'IA avec ce que tu as demandé à Gemini, la conclusion et l'amélioration du système ».

## Contexte
- Page : `src/lab/projects/UtilisationIA.jsx` (`/lab/utilisation-ia`). Textes dans `CONTENT = { fr, en }` ; rendu à partir de la ligne ~870 : une `<Section title={…}>` par partie, schémas `Timeline`, `FlowDiagram`, `Table` et `Pre` locaux.
- **Source de faits unique : `CONTENU.md`** (ce dossier). §A Gemini, §B économie de tokens, §C passages existants à mettre à jour.
- Branche partie de `chore/economie-tokens` (PR #11, pas encore fusionnée) et non de `main` : voir DECISIONS.md.

## Décisions (tranchées)
**D1 — Deux nouvelles sections**, dans l'ordre chronologique, entre « Le push de main : un compromis » et « Bilan chiffré » :
- « Un deuxième avis : Gemini » / « A second opinion: Gemini » (§A) : contexte, limites annoncées, l'essai raté puis réussi, la question, les 5 pratiques résumées, la conclusion.
- « Économiser les tokens » / « Cutting token usage » (§B) : constat, ce qui a été fait, ce qui n'a pas été retenu, ce qui me reste.
**D2 — Un tableau par section, avec le composant `Table` existant** (pas de nouveau schéma) :
- Gemini : colonnes « Pratique citée par Gemini » / « Dans mon système » — 5 lignes (4 « oui » expliqués, la validation humaine « à la fin, par pull request »).
- Économie : colonnes « Poste » / « Avant » / « Après » — 4 lignes (tâche à vide, CLAUDE.md, reprise, build/lint).
**D3 — Histoire vs état actuel** (même règle que la mission 7) : les passages qui racontent le passé restent ; ceux qui décrivent le fonctionnement actuel sont mis à jour selon CONTENU §C.
**D4 — Aucun chiffre non sourcé.** Le pourcentage avancé par Gemini n'apparaît pas ; seule la mention « un chiffre sans source, non repris ». Résumer la réponse de Gemini avec nos mots, jamais la recopier.
**D5 — Contraintes.** Tokens CSS uniquement ; FR et EN complets (traduction naturelle) ; aucune donnée privée (ni notes de `src/private/`, ni compte, ni adresse e-mail) ; lisible à 375 px ; aucun autre fichier source modifié.

## Critères d'acceptation
1. Les deux sections de D1 existent en FR et en EN, avec leurs tableaux (D2), au bon endroit.
2. Tous les points de CONTENU §C sont appliqués, en FR et en EN.
3. `git diff chore/economie-tokens -- src/lab/projects/UtilisationIA.jsx | grep -E "^\+.*[0-9] ?%"` ne renvoie rien : aucun pourcentage dans les lignes ajoutées.
4. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/lab/projects/UtilisationIA.jsx` et `grep -nE "ghp_|gho_|/Users/|@gmail|src/private" src/lab/projects/UtilisationIA.jsx` ne renvoient rien.
5. Aucune erreur console sur `/lab/utilisation-ia` (FR et EN) et `/`. À 375 px, aucun débordement horizontal de la page.
6. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans UtilisationIA.jsx.
7. `git diff chore/economie-tokens --stat` : seuls `src/lab/projects/UtilisationIA.jsx` et `missions/utilisation-ia-economie/` sont modifiés.
8. Tout est commité sur `auto/utilisation-ia-economie`, rien sur `main`, rien de poussé ; aucun serveur laissé en marche.

## Hors périmètre
- Toute autre page, les composants de schéma, le skill /mission, les tâches programmées.
- L'idée P-003 elle-même (sa fiche et sa note privée).
