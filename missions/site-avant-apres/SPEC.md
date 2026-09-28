# Mission site-avant-apres — SPEC

Rédigée par Opus (cadrage), 2026-09-28. Brief de Michael : corriger le site à partir de son propre audit (outil `/lab/audit-tokens`, P-004) pour obtenir un « avant / après » montrable. Choix validés par Michael :
- **Contraste** : corail plus foncé **sous le texte** seulement (boutons, sélection) ; le corail vif reste partout ailleurs (accents, bordures, décorations, grands blocs corail pleins).
- **Gouvernance** : CHANGELOG, CODEOWNERS, vérification automatique sur GitHub (après correction des erreurs de lint), licence « tous droits réservés ».

## Contexte
Audit du dépôt `michael-misran/misran-labs` au 2026-09-28 (clôture de `audit-grille`) : **0,8 / 3**, 6 axes évalués — Architecture 2, Couverture 2, Accessibilité 0, Composants 0, Documentation 1, Gouvernance 0.
- Contraste : `--on-primary` / `--on-selected` (crème 50 `#f8f2e7`) sur `--primary` / `--selected-surface` (corail 500 `#dd5a3e`) = **3,36:1**. Corail 700 `#b8452e` avec crème 50 = **4,80:1**.
- `var(--primary)` : 135 usages dans 50 fichiers (surtout accents, texte, bordures) ; `var(--on-primary)` : 12 usages ; `--selected-surface` : 1 ; `--on-selected` : 2.
- Couverture : valeurs en dur qui ont déjà un token (ex. `12px` ×15, `8px` ×15 ; `--space-xs` = 8px, `--space-sm` = 12px, `--radius-sm` = 8px…).
- Lint : 6 erreurs préexistantes (VisuallyHidden, Surface, CaseFile, GameDemo, LanguageContext, Shell : variable inutilisée, `react-refresh/only-export-components`, `setState` dans un effet).
- Aucun `CHANGELOG`, `CODEOWNERS`, `LICENSE`, `.github/`.
- Moteur d'audit : `src/lab/audit/` (`analyse`, `mesurerCouverture`, `extraireUsagesTokens`, `evaluerContrastes`, `reperer`, `evaluerGrille`, `prioriser`), modules purs importables par Node.
- Règles de tokens : `src/styles/tokens.css` (primitive → semantic → component) ; documentation vivante `src/lab/projects/LabTokens.jsx` (tableau `GROUPS`, `pointsTo`, `value`).

## Objectif
Le site corrigé obtient une meilleure note à son propre audit, mesurée avant et après par le même moteur, sans aucun changement visuel en dehors du corail sous le texte.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Mesure avant / après.** Script `missions/site-avant-apres/mesurer-audit.mjs` (Node, sans réseau) : liste les fichiers suivis (`git ls-files`, via `child_process.execFileSync`, sans shell), applique `reperer` (candidats tokens + échantillon de code, mêmes règles que le mode GitHub), lit les fichiers localement, puis `analyse` (avec `usagesExternes` = `extraireUsagesTokens`), `mesurerCouverture`, `evaluerContrastes`, `evaluerGrille` (avec `chemins`), `prioriser`. Écrit un résumé JSON dans `missions/site-avant-apres/mesure-<etiquette>.json` (`node … avant` / `node … apres`) : note par axe, critères, moyenne, taux de couverture, `dejaTokenisees`, échecs de contraste, sujets de la matrice. Lancé à l'étape 1 (**avant**) avant toute modification.

**D2 — Contraste (tokens).** Dans `tokens.css` :
- `:root` : nouveau semantic `--primary-surface: var(--primitive-coral-700)` et `--on-primary-surface: var(--primitive-cream-50)` ; `--selected-surface: var(--primitive-coral-700)`. **Supprimer** `--on-primary` (remplacé partout par `--on-primary-surface`). `--primary` reste corail 500 (accents).
- `[data-invert]` : `--primary-surface: var(--primitive-cream-50)`, `--on-primary-surface: var(--primitive-coral-700)`, `--on-selected: var(--primitive-coral-700)` ; supprimer `--on-primary`.
- `@media print` : adapter seulement si `--on-primary` y figure.
- Les couleurs de fond et de texte des grands blocs `[data-invert]` (`--bg`, `--text`, surfaces) **ne changent pas** (choix de Michael) : l'audit continuera de signaler ces paires, le RAPPORT l'explique.

**D3 — Contraste (composants).** Chaque élément dont le texte utilise `--on-primary` a un fond `var(--primary)` : remplacer par `background: var(--primary-surface)` + `color: var(--on-primary-surface)` (bordure assortie `--primary-surface` si la bordure suivait le fond). Les autres usages de `--primary` (texte, bordures, accents, fonds **sans** texte) ne bougent pas. Inventaire exhaustif d'abord (fichier, ligne, rôle) consigné dans `missions/site-avant-apres/INVENTAIRE.md`. Hover/active qui mélangent `--primary` (`color-mix`…) sur ces mêmes éléments : même traitement avec `--primary-surface`.

**D4 — Documentation des tokens.** `LabTokens.jsx` (`GROUPS`) : ajouter `--primary-surface`, `--on-primary-surface`, retirer `--on-primary`, mettre à jour `pointsTo` / `value` de `--selected-surface` et `--on-selected`. La page Tokens du Lab doit toujours afficher **0 erreur**.

**D5 — Valeurs en dur qui ont déjà un token.** Pour chaque valeur relevée par `dejaTokenisees` (mesure avant) : remplacer par un token **semantic** du **même rôle** (espacement → `--space-*`, rayon → `--radius-*`, bordure → `--border-*`, icône → `--icon-*`, élévation → `--elev-*`…), à valeur identique. **Jamais** une primitive dans un composant ; jamais un token d'un autre rôle juste parce que la valeur est égale (ex. une taille de police de 12px ne devient pas `--space-sm`). Les valeurs sans semantic du bon rôle (ex. tailles de police) restent en dur et sont listées dans le RAPPORT comme prochaine étape (échelle typographique). Les fichiers d'exemples de l'outil (`src/lab/audit/exemples/`) ne sont pas touchés.

**D6 — Non-régression visuelle.** Snapshot des valeurs calculées de **tous** les tokens (`getComputedStyle` sur `:root` et sur un élément `[data-invert]`) avant (étape 1) et après : fichiers `snapshot-avant.json` / `snapshot-apres.json`. Seules différences admises : les tokens de D2. En plus, sur 4 pages (accueil, `/lab/lab-tokens`, `/lab/audit-tokens`, `/projets`), les styles calculés des éléments touchés par D5 sont identiques (échantillon d'au moins 10 éléments, consigné).

**D7 — Lint.** Corriger les 6 erreurs sans changer le comportement : variable inutilisée supprimée ; `react-refresh/only-export-components` → déplacer les exports non-composants dans un fichier voisin (`…Context.js`, `….js`) et mettre à jour les imports ; `setState` dans un effet (`Shell.jsx`) → état dérivé, initialiseur paresseux ou clé, selon le cas, en gardant exactement le même comportement (vérifié dans le navigateur : menu, langue, redimensionnement). `npm run lint` : **0 erreur**.

**D8 — Gouvernance.**
- `CHANGELOG.md` (racine, français, format « Keep a Changelog » par date, sans numéros de version) : une entrée par pull request fusionnée, tirée de `git log --merges` (titre en français, une ligne par ajout important), plus une section « Non publié » pour cette mission.
- `.github/CODEOWNERS` : `* @michael-misran`.
- `.github/workflows/verifier.yml` : sur `pull_request` et `push` vers `main` ; `ubuntu-latest`, `actions/checkout@v4`, `actions/setup-node@v4` (Node 22, cache npm), `npm ci`, `npm run lint`, `npm run build`, puis les 3 scripts `node missions/audit-tokens/verifier-analyse.mjs`, `node missions/audit-github/verifier-github.mjs`, `node missions/audit-grille/verifier-grille.mjs`. Aucun secret, aucune permission d'écriture (`permissions: contents: read`), aucun déploiement (Vercel s'en charge).
- `LICENSE` : « Copyright (c) 2026 Michael Misran. Tous droits réservés. / All rights reserved. » + deux phrases FR/EN : le code est public pour être lu, aucune licence de réutilisation, de modification ou de redistribution n'est accordée sans accord écrit.

**D9 — Avant / après.** `missions/site-avant-apres/AVANT-APRES.md` : tableau des 7 axes (avant → après, critères gagnés), moyenne, couverture, nombre de valeurs déjà tokenisées restantes, échecs de contraste restants et pourquoi. Chiffres copiés des deux JSON, jamais estimés. Prévoir que la note publique (outil sur GitHub) ne bougera qu'après fusion.

## Critères d'acceptation
1. `mesure-avant.json` produit à l'étape 1, avant toute modification ; `mesure-apres.json` à la fin ; `AVANT-APRES.md` fidèle aux deux.
2. Après : axe Accessibilité en hausse ; aucune paire `on-primary-surface`/`primary-surface` ni `on-selected`/`selected-surface` sous 4,5:1 dans `:root`.
3. Après : axe Gouvernance à 3 / 3 ; moyenne strictement supérieure à l'avant.
4. `--on-primary` n'existe plus nulle part dans `src/` ; `grep` le vérifie.
5. Snapshot : seules les différences de D2 ; styles calculés identiques sur l'échantillon de D6.
6. Page Tokens du Lab : 0 erreur, FR et EN ; nouveaux tokens documentés.
7. `npm run lint` : 0 erreur ; `npm run build` passe ; les 3 scripts de vérification passent.
8. `.github/workflows/verifier.yml` est un YAML valide (lu par `node -e` avec un parseur minimal ou vérifié à l'œil : indentation, clés) et n'utilise aucun secret.
9. Aucune erreur console sur l'accueil, `/lab/lab-tokens`, `/lab/audit-tokens`, `/projets` ; menu, bascule de langue et affichage mobile inchangés.
10. Aucun secret ni donnée personnelle dans `git diff main...auto/site-avant-apres`.
11. Tout est commité sur `auto/site-avant-apres`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Changer les couleurs des grands blocs `[data-invert]` (choix de Michael).
- Échelle typographique (tokens de taille de police), Storybook, stories, tests de composants (axe Composants), `CONTRIBUTING.md`, dossier `docs/`.
- Page ou section publique « avant / après » sur le site (à décider avec Michael après la fusion).
- Toute modification du moteur d'audit.
