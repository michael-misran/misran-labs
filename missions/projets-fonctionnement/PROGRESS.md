# Mission projets-fonctionnement — PROGRESS

**Statut :** en cours (étapes 2 et 3 terminées)
**Prochaine action :** étape 4 — traduction EN par un sous-agent Haiku (remplir `FONCT_TEXT.en.sections` dans `src/projets/fonctionnementText.js`, même structure que `fr`, y compris les 4 arborescences ; les commentaires après `←` se traduisent, les noms de fichiers non)
**Blocages :** aucun

## État initial (2026-09-28, depuis main cb943a6)
- `npm run build` : OK (avertissement de taille de chunk, préexistant)
- `npm run lint` : 6 erreurs, préexistantes, hors périmètre

## Étape 2 (2026-09-28)
- Route `projets/fonctionnement` avant `projets/:id`, squelette de page, lien « Comment ça marche → » dans `ProjetsHome.jsx`.

## Étape 3 (2026-09-28)
- `fonctionnementText.js` : sections FR complètes (§0 à §8) sous forme de blocs (`p`, `levels`, `tree`, `flow`, `list`, `cases`) ; `en.sections` volontairement vide jusqu'à l'étape 4.
- `ProjetsFonctionnement.jsx` : rendu des blocs, `Pre` copié de UtilisationIA, `FlowDiagram` (grille 3 colonnes sur desktop, vertical sur mobile), deux cas en colonnes (empilés sur mobile).
- Build OK ; `eslint src/projets` : 0 erreur ; greps couleurs/secrets : vides.
