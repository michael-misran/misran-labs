# Mission home-magazine — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-27. Brief de Michael : « rajouter sur la home un dossier magazine » ; précision : **une mise en avant du dernier numéro**.

## Contexte
- Home : `src/modules/ArchiveHome.jsx` (route `/`). Structure : `Masthead`, bloc héros (M. PORTFOLIO + `OverviewBox` + `ProtocolPlate`), puis l'index des dossiers (grille de `FileEntry`), puis `DocFooter`. Textes dans `COPY = { fr, en }`.
- Magazine : `getIssues()` (`src/magazine/numeros.js`) renvoie les numéros **valides**, du plus récent au plus ancien. Utilitaires réutilisables : `issueNo`, `formatDateShort`, `formatDateLong`, `categoryLabel`, `CATEGORIES` (`magazineText.js`), `CategoryMark` (`MagazineParts.jsx`).
- Chaque lundi, un nouveau numéro est ajouté par la routine (un fichier JSON) : **la home doit se mettre à jour toute seule**, sans modification de code.

## Objectif
Un bloc « Magazine » sur la home qui met en avant le dernier numéro et donne envie de le lire.

## Décisions (tranchées)
**D1 — Placement.** Entre le bloc héros et l'index des dossiers (juste avant le titre de l'index).
**D2 — Contenu.** Pour `getIssues()[0]` : étiquette de rubrique (« MAGAZINE — DERNIER NUMÉRO » / « MAGAZINE — LATEST ISSUE »), Nº (`issueNo`), date, titre du numéro, édito, puis la liste des titres d'articles avec leur `CategoryMark`. Deux liens : « Lire le numéro → » (`/magazine/<date>`) et « Tous les numéros → » (`/magazine`). Textes FR/EN dans `COPY`.
**D3 — Numéro 0.** Si le dernier numéro est le numéro 0 (« Présentation »), l'afficher quand même. S'il n'y a **aucun** numéro valide, le bloc n'est pas rendu.
**D4 — Esthétique.** Même univers « archive imprimée » que la home (bordures fines, typographies mono / heading, tokens) ; il doit se distinguer des fiches de dossier (c'est la seule chose qui change chaque semaine) sans casser la page. **Tokens uniquement.** Lisible à 375 px sans débordement.
**D5 — Périmètre du code.** `ArchiveHome.jsx` (bloc + textes), éventuellement un petit composant dans `src/magazine/` s'il est réutilisable. Aucune modification des pages du magazine ni de `numeros.js`.

## Critères d'acceptation
1. `/` affiche le bloc entre le héros et l'index, en FR et en EN, avec le numéro le plus récent (aujourd'hui : Nº 001, « Prix en baisse, agents en expansion », 4 articles).
2. Les deux liens mènent à `/magazine/2026-09-28` et `/magazine`.
3. Test de mise à jour automatique : un fichier JSON de numéro **valide** ajouté temporairement (date postérieure, `numero` suivant) apparaît sur la home sans autre changement ; le fichier est ensuite **supprimé** (jamais commité).
4. Aucune erreur console sur `/` (FR et EN) et `/magazine`.
5. 375 px : pas de débordement horizontal sur `/`.
6. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/modules/ArchiveHome.jsx` ne renvoie pas de nouvelle occurrence par rapport à `main`.
7. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans les fichiers modifiés.
8. Tout est commité sur `auto/home-magazine`, rien sur `main`, rien de poussé ; aucun serveur laissé en marche.

## Hors périmètre
- Modifier le magazine, ses pages ou la routine.
- Réorganiser le reste de la home.
