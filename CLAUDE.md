# misran-labs — règles projet

Site portfolio / Lab de Michael Misran. Vite + React 19 + react-router, déployé sur Vercel.
Design tokens : `src/styles/tokens.css` (primitive → semantic → component). Depuis la refonte kiosque (2026-10), l'identité est celle d'une maison d'édition : 4 titres, chacun sa couleur (`--titre-gazette` rouge, `--titre-zine` rose, `--titre-jeux` orange, `--titre-lab` vert) et sa police (`--font-bois`/-2/-3 lettres de bois, `--font-etiquette` Oswald, `--font-chapo` IM Fell English, `--font-gothique` Germanica, `--font-bd` Comic Book, `--font-pixel` Press Start 2P, `--font-ecran` VT323, `--font-machine` Special Elite). Germanica et Comic Book sont des polices locales servies depuis `public/fonts/` (secours Google Fonts : UnifrakturMaguntia, Comic Neue).
Documentation vivante des tokens : `src/lab/projects/LabTokens.jsx` (dossier 007).

## Commandes
- Dev : `npm run dev` (port 5173, config preview « dev » dans `.claude/launch.json`)
- Build : `npm run build`
- Lint : `npm run lint`

## Missions autonomes
Travail délégué, exécuté sans Michael par la tâche programmée `misran-labs-missions`, sur des branches `auto/<nom>` ; une mission = un dossier `missions/<nom>/`. Procédures (lancer, exécuter, file d'attente, clôturer, modèles) : `missions/README.md`, à lire seulement quand on touche à une mission. Une mission non fusionnée n'existe que sur sa branche, jamais dans le `missions/` de `main`.

## Git
- Dépôt **public** : aucun secret ni donnée personnelle dans un commit ; commits signés de l'adresse masquée GitHub, jamais du Gmail.
- Session interactive : circuit et autonomie du CLAUDE.md global. Tout changement de `main` passe par une PR, et sa fusion met le site en production (Vercel).
- Routines et missions : jamais de fusion, de commit sur `main`, de rebase, de `--force` ni de déploiement. Elles peuvent seulement :
  - mission : commiter sur `auto/<nom>`, sans pousser (la clôture se fait en session interactive) ;
  - journal : pousser `auto/breves-<date>` (préparée dans le worktree `.worktrees/breves`, jamais dans le dossier de travail) et ouvrir la PR ;
  - idées : pousser `auto/projets-<date>` et ouvrir la PR ;
  - notes privées : commiter sur `auto/notes-<date>` de `src/private`, sans pousser.

## Conventions
- Priorité : fidélité visuelle > qualité du code.

## Brèves
Version web quotidienne de L’Oracle du Matin, le journal du matin (ex-Gazette du Lab, page /oracle), un jour = un fichier JSON dans `src/breves/jours/`. Format : `src/breves/FORMAT.md`. Procédure : `src/breves/EXTRACTION.md`, suivie par la routine `lab-magazine-quotidien` (nom historique : c'est la routine de la Gazette) après le PDF. Depuis le 2026-10-14, tout le journal est public : numéro complet FR/EN dans `src/breves/numeros/` et PDF dans `public/oracle/pdf/`, en plus des brèves.

## Projets
Idées numérotées P-NNN (`/projets`), une fiche publique JSON par idée dans `src/projets/idees/` (format : `src/projets/FORMAT.md`) et une note privée par idée dans `src/private/projets/` (hors Git de misran-labs, sauvegardée dans le dépôt privé). Procédure de la routine du dimanche 19 h : `src/projets/PROPOSITIONS.md`.
`src/private` est un dépôt privé à part, avec le même circuit (branches et PR).
**Décisions de Michael** (« garde 2, arrête 4 parce que… ») : prises dans la session tour de contrôle, qui met à jour `statut` et `decision` des fiches ; « on développe P-NNN » → passer la fiche en `en-cours` avec le nom de la mission, et cadrer la mission (`missions/README.md`).
