# misran-labs — règles projet

Site portfolio / Lab de Michael Misran. Vite + React 19 + react-router, déployé sur Vercel.
Design tokens : `src/styles/tokens.css` (primitive → semantic → component). Depuis la refonte kiosque (2026-10), l'identité est celle d'une maison d'édition : 5 titres, chacun sa couleur (`--titre-gazette` rouge, `--titre-magazine` bleu, `--titre-zine` rose, `--titre-jeux` orange, `--titre-lab` vert) et sa police (`--font-bois`/-2/-3 lettres de bois, `--font-etiquette` Oswald, `--font-chapo` IM Fell English, `--font-gothique` Germanica, `--font-bd` Comic Book, `--font-pixel` Press Start 2P, `--font-ecran` VT323, `--font-machine` Special Elite). Germanica et Comic Book sont des polices locales servies depuis `public/fonts/` (secours Google Fonts : UnifrakturMaguntia, Comic Neue).
Documentation vivante des tokens : `src/lab/projects/LabTokens.jsx` (dossier 007).

## Commandes
- Dev : `npm run dev` (port 5173, config preview « dev » dans `.claude/launch.json`)
- Build : `npm run build`
- Lint : `npm run lint`

## Missions autonomes
Travail délégué, exécuté sans Michael par la tâche programmée `misran-labs-missions`, sur des branches `auto/<nom>` ; une mission = un dossier `missions/<nom>/` (SPEC, PLAN, PROGRESS, DECISIONS, DELEGATIONS, RAPPORT).
**Procédures complètes** (lancer, exécuter, file d'attente, clôturer, modèles) : `missions/README.md` — à lire seulement quand on touche à une mission (« mission : … », « clôture les missions », tâche programmée).
**Lister les missions** : une mission non fusionnée n'existe **que sur sa branche**, jamais dans le `missions/` de `main`. Liste : `git for-each-ref --sort=creatordate --format='%(refname:short)' refs/heads/auto/` (hors `auto/magazine-20*`, `auto/projets-20*` et `auto/breves-20*`) ; terminée si `git show <branche>:missions/<nom>/RAPPORT.md` existe, sinon en attente.

Interdits absolus, valables dans toute session :
- Commits libres sur `auto/*` seulement (exception validée le 2026-09-26). Jamais de commit sur `main`, de merge, de rebase de `main`, de déploiement ni de `--force` par une mission ou une routine.
- **Push de `main` (compromis validé par Michael le 2026-09-27)** : autorisé **uniquement** dans une session interactive où Michael est présent, sur sa demande explicite pour ce push-là (pousser `main` met le site en production via Vercel). **Jamais** dans une routine ou une session de mission autonome. Jamais de `--force`.
- Clôture (push d'une branche de mission + pull request) : seulement en session interactive avec Michael, jamais dans une routine.
- Le dépôt est **public** : aucun secret ni donnée personnelle dans un commit.

## Conventions
- Commentaires en français.
- Priorité : fidélité visuelle > qualité du code.
- Michael n'est pas à l'aise avec Git/GitHub : expliquer chaque étape simplement, commande à lancer dans son propre bloc.

## Magazine
Veille IA hebdomadaire (/magazine), un numéro = un fichier JSON dans src/magazine/numeros/. Format : src/magazine/FORMAT.md. Procédure : src/magazine/REDACTION.md.
**Exception Git validée par Michael le 2026-09-27** : la routine du Magazine pousse sa branche auto/magazine-<date> et ouvre la pull request. Les missions ne poussent jamais. Fusionner reste toujours à Michael.

## Brèves
Version web quotidienne du Journal du matin (/breves), un jour = un fichier JSON dans `src/breves/jours/`. Format : `src/breves/FORMAT.md`. Procédure : `src/breves/EXTRACTION.md`, suivie par la routine `lab-magazine-quotidien` après le PDF. Seuls la une IA, les articles tech, le mot et le chiffre sont publics.
**Exception Git validée par Michael le 2026-09-30** : la routine du journal pousse sa branche `auto/breves-<date>` (préparée dans le worktree `.worktrees/breves`, jamais dans le dossier de travail) et ouvre la pull request. Jamais `main`. Fusionner reste à Michael.

## Projets
Idées numérotées P-NNN (`/projets`), une fiche publique JSON par idée dans `src/projets/idees/` (format : `src/projets/FORMAT.md`) et une note privée par idée dans `src/private/projets/` (hors Git de misran-labs, sauvegardée dans le dépôt privé). Procédure de la routine du dimanche 19 h : `src/projets/PROPOSITIONS.md`.
**Exception Git validée par Michael le 2026-09-27** : la routine des idées pousse sa branche `auto/projets-<date>`, ouvre la pull request et sauvegarde les notes privées dans leur dépôt privé (`git -C src/private push`). Jamais `main`. Fusionner reste à Michael.
**Décisions de Michael** (« garde 2, arrête 4 parce que… ») : prises dans la session tour de contrôle, qui met à jour `statut` et `decision` des fiches ; « on développe P-NNN » → passer la fiche en `en-cours` avec le nom de la mission, et cadrer la mission (`missions/README.md`).
