# Mission utilisation-ia — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-26. Brief de Michael : « Crée une entrée sous Tokens du Lab nommée Utilisation de l'IA, qui explique tout ce que l'on vient de faire depuis que l'on a décidé de ne plus utiliser l'IA locale jusqu'à maintenant. Fais des schémas, des arborescences… »

## Contexte
Le Lab liste ses dossiers dans `src/lab/projects.js` (`PROJECTS`) ; la sidebar affiche la section « Le Lab » selon `LAB_SLUGS` dans `src/shell/Sidebar.jsx`. Chaque dossier est un composant de `src/lab/projects/`. Le numéro « DOSSIER Nº 00X » est calculé par `dossierNo(slug)`, jamais saisi à la main.
Modèle de page le plus proche : `src/lab/projects/WorkflowSolo.jsx` (CaseMasthead, CaseHero, Section, SectionTitle, CaseFooter, FlowDiagram, tableau, FR/EN, `useIsMobile`). Composants de schéma existants : `src/components/diagrams/` — `FlowDiagram` (étapes), `Timeline` (jalons), `SiteMapDiagram` (arborescences avant/après).
**Toute l'histoire à raconter est dans `CONTENU.md`** (ce dossier) : c'est la seule source de faits.

## Objectif
Une nouvelle fiche du Lab, « Utilisation de l'IA », placée juste sous « Tokens du Lab » dans la sidebar, qui raconte de façon claire et visuelle la mise en place du système de missions autonomes, en FR et en EN.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Registre.** Slug `utilisation-ia`. Titre FR « Utilisation de l'IA », EN « How I use AI ». `type: 'case-study'`, `status: 'READY'`, `featured: false`, `phases: {}`. Ajouté à la fin de `PROJECTS` ; dans `LAB_SLUGS`, inséré juste après `'lab-tokens'`. Icône : un caractère du même style que les autres (ex. `◈`). Résumé FR/EN en une phrase.

**D2 — Composant.** `src/lab/projects/UtilisationIA.jsx`, calqué sur la structure de `WorkflowSolo.jsx` (en-tête de dossier, sections, pied). Textes dans un objet `CONTENT = { fr, en }` comme les autres fiches.

**D3 — Contenu.** Suivre `CONTENU.md` section par section (§0 à §12), en le rendant lisible : phrases courtes, tableaux, listes. Ne rien inventer ; garder les chiffres exacts. La page est écrite à la première personne de Michael (« j'ai… »), et la section finale (§12) dit clairement que la page a été produite par le système lui-même.

**D4 — Schémas.** Au minimum :
1. **Chronologie** de la séquence (Timeline) : IA locale abandonnée → leviers → sous-agents → objectif fondateur → incident sécurité → mise en place → exécution 13 min → clôture → skill `/mission`.
2. **Circuit d'une mission** (FlowDiagram) : brief → cadrage → branche → tâche programmée → étapes + commits → rapport → vérification → push → PR → fusion.
3. **Boucle de reprise après la limite de quota** : travail → quota épuisé → arrêt → relance 2 h plus tard → lecture de PROGRESS.md → reprise (FlowDiagram ou SVG).
4. **Organigramme des modèles** (Opus architecte / Sonnet chef de projet / Haiku exécutants / Opus expert).
5. **Local vs cloud** : où sont le « cerveau » et les « mains ».
6. **Circuit Git** : `main` ↔ branche `auto/*` ↔ prévisualisation ↔ site en ligne.
7. **Deux arborescences** (§7 et §10 de CONTENU.md) : rendu monospace lisible (bloc `pre` stylé avec les tokens, ou `SiteMapDiagram` si l'avant/après s'y prête).
Réutiliser d'abord les composants existants ; un nouveau schéma se fait en SVG en ligne dans le composant. **Aucune nouvelle dépendance.**

**D5 — Tokens uniquement.** Aucune couleur brute (hex, rgb) dans le nouveau fichier : uniquement `var(--…)` des tokens existants. Tailles de police et espacements : reprendre les pratiques de `WorkflowSolo.jsx`.

**D6 — Confidentialité.** Site et dépôt publics : aucun token (même partiel), aucun chemin `/Users/…`, aucun email. `~/.claude/` est acceptable.

**D7 — Responsive.** Lisible à 375 px de large : aucun débordement horizontal de la page (les tableaux et arborescences peuvent défiler dans leur propre conteneur, comme dans `WorkflowSolo.jsx`).

**D8 — EN.** Traduction complète et naturelle (pas mot à mot) de tous les textes, y compris les libellés des schémas.

## Critères d'acceptation
1. La sidebar affiche « Utilisation de l'IA » juste sous « Tokens du Lab », avec son numéro de dossier ; `/lab/utilisation-ia` s'affiche en FR et en EN.
2. Les §0 à §12 de `CONTENU.md` sont tous couverts ; les 7 schémas de D4 sont présents.
3. Aucune erreur console sur `/lab/utilisation-ia` (FR et EN) ni sur `/`.
4. À 375 px : pas de défilement horizontal de la page (`document.documentElement.scrollWidth <= innerWidth`).
5. `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/lab/projects/UtilisationIA.jsx` ne renvoie rien ; `grep -nE "ghp_|gho_|/Users/|@gmail" src/lab/projects/UtilisationIA.jsx` ne renvoie rien.
6. `npm run build` passe ; `npm run lint` : 6 erreurs maximum (préexistantes), aucune dans les fichiers de la mission.
7. Tout est commité sur `auto/utilisation-ia`, rien sur `main`, rien de poussé.

## Hors périmètre
- Modifier les composants de schéma existants (sauf bug bloquant, à noter).
- Toucher aux autres fiches ou à la home.
- Ajouter des images ou captures d'écran.
