# Mission projets-fonctionnement — PROGRESS

**Statut :** en cours (étapes 2 à 4 terminées)
**Prochaine action :** étape 5 — vérification dans le navigateur (critères 1 à 7) par l'agent `verificateur` (Haiku). En routine : `npm run build` puis `npx vite preview`, pas la preview « dev ».
**Blocages :** aucun

## État initial (2026-09-28, depuis main cb943a6)
- `npm run build` : OK (avertissement de taille de chunk, préexistant)
- `npm run lint` : 6 erreurs, préexistantes, hors périmètre

## Étape 2 (2026-09-28)
- Route `projets/fonctionnement` avant `projets/:id`, squelette de page, lien « Comment ça marche → » dans `ProjetsHome.jsx`.

## Étape 3 (2026-09-28)
- `fonctionnementText.js` : sections FR complètes (§0 à §8) en blocs typés ; `ProjetsFonctionnement.jsx` : rendu des blocs, `Pre` copié, `FlowDiagram` (grille desktop / vertical mobile), deux cas en colonnes.

## Étape 4 (2026-09-28)
- Traduction EN complète par un sous-agent Haiku (9 sections, 4 arborescences EN), relue par la session principale : corrigé `in-progress` → `en-cours` (valeur réelle du statut), `REPORT` → `RAPPORT` (nom du fichier), et pronoms genrés remplacés.
- Build OK ; `eslint src/projets` : 0 erreur ; greps couleurs/secrets : vides.
