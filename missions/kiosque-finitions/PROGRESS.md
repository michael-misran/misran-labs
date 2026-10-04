# Mission kiosque-finitions — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 6
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 96debce)
- `npm run build` : OK (4 flux RSS écrits).
- `npm run lint` : OK, 0 erreur.
- `kiosque-annexes` n'est pas encore fusionnée : elle passe avant cette mission dans la file. Respecter les fichiers interdits de D1.

## Étape 1 — reconfirmation (2026-10-04)
- `npm run build` : OK, 4 flux RSS écrits, sitemap 37 URL.
- `npm run lint` (`npx eslint . --ignore-pattern '.worktrees/**'`) : 0 erreur. Un worktree orphelin `.worktrees/verif-magazine`, laissé par une autre session et hors périmètre de toute mission, pollue `eslint .` sans l'exclusion — non touché (pas dans les fichiers autorisés par D1 de cette mission non plus).

## Étape 2 — code mort (2026-10-04)
- Supprimés de `src/magazine/MagazineParts.jsx` : `MagazineHero`, `IssueRow` (+ son seul appelant d'aide `articleCountLabel`), `SourceList` (+ son seul appelant d'aide `hostnameOf`), `ArticleCard`. Imports devenus inutiles retirés : `useState`, `Stamp`, `Tag`, `useIsMobile`, `MAG_TEXT`, `issueNo`, `formatDateShort`. Gardés : `MagazineMasthead` (encore utilisé par `src/suivre/SuivrePage.jsx`, fichier de kiosque-annexes), `CategoryMark` (encore utilisé par `src/modules/ArchiveHome.jsx` — à revoir à l'étape 5/D5).
- Supprimé `TabBar` de `src/lab/CaseStudyLayout.jsx` (aucun importeur, aucune dépendance propre).
- Commentaire obsolète dans `src/projets/ProjetsParts.jsx` (citait `MagazineHero` par son nom) reformulé pour pointer vers `CaseHero` à la place (structure réellement commune).
- Critère 2 : `grep -rn "IssueRow\|SourceList\|ArticleCard\|MagazineHero\|TabBar" src` → rien. `npm run build` et lint : OK.

## Étape 3 — DesignSystem.jsx (2026-10-04)
- Tableau `fonts` (3 rôles génériques) et `roles` (spécimens) mis à jour avec les vraies polices : Alfa Slab One (`--font-heading`), Crimson Pro (`--font-body`), IBM Plex Mono (`--font-mono`), poids relevés dans le lien Google Fonts de `index.html` (seule source fiable). Les 2 mentions restantes dans l'onglet Tokens corrigées aussi (grep `Fraunces\|Work Sans\|JetBrains` sur le fichier → rien).
- Ajouté une section « Polices de la maison » (nouvel onglet FontCard) avec les 8 polices demandées par D3 : bois (Ultra), étiquette (Oswald), chapô (IM Fell English), gothique (UnifrakturMaguntia), BD (Comic Neue), pixel (Press Start 2P), écran (VT323), machine (Special Elite) — poids lus dans le même lien Google Fonts. `FontCard` applique `wordSpacing: 'var(--font-gothique-espace, normal)'` pour l'entrée gothique (règle commune des missions de la refonte).
- Vérifié moi-même dans le navigateur (`npx vite preview`) : onglet Typographies, les 2 grilles de cartes s'affichent correctement, espacement du gothique resserré.
- `npm run build` et lint ciblé : OK.

## Étape 4 — polices et primitives (2026-10-04)
- `index.html` : retiré `Fraunces`, `Work+Sans`, `JetBrains+Mono` du lien Google Fonts — seules ces 3 familles, rien d'autre (vérifié par diff complet des familles avant/après : aucune autre différence, `Chango` déjà présent dans `refonte-kiosque` reste).
- `tokens.css` : recherché chaque primitive définie (94 au total) dans `src/`, `index.html`, `public/`, `scripts/`, y compris les autres primitives/semantics de `tokens.css` lui-même. 15 sans aucun consommateur, supprimées : `--primitive-font-fraunces`, `--primitive-font-work-sans`, `--primitive-font-jetbrains-mono` (D3), `--primitive-cream-150/200/300`, `--primitive-ink-400/600/800/850`, `--primitive-ink-900-a05/a18/a22/a25`, `--primitive-coral-500-a12`. Gardées : tout ce que consomment la mascotte (`sprites.js`, `fiole.css` : cream-50/100, ink-900, ink-900-a12, la gamme corail) et `[data-invert]`.
- En-tête de `tokens.css` corrigé : il affirmait que la page « Tokens du Lab » consommait encore les anciennes primitives crème/encre/corail — faux, vérifié par grep, cette page ne les cite pas du tout. Reformulé pour dire que seules la mascotte et `[data-invert]` les consomment désormais.
- `LabTokens.jsx` : aucune de ses lignes ne citait un token supprimé (vérifié avant de toucher `tokens.css`) — rien à retirer de sa liste.
- Critère 8 (mascotte) : valeurs calculées des 8 variables consommées par `sprites.js`/`fiole.css` relevées dans `tokens.css` avant modification, puis revérifiées en direct dans le navigateur (`getComputedStyle`) après : identiques caractère pour caractère (`--primitive-ink-900: #241c16`, `--primitive-coral-700: #b8452e`, `--primitive-coral-500: #dd5a3e`, `--primitive-coral-400: #e26a50`, `--primitive-coral-tint-200: #f0c3b4`, `--primitive-cream-100: #f3ebdc`, `--primitive-cream-50: #f8f2e7`, `--primitive-ink-900-a12: rgba(36,28,22,.12)`).
- Critère 4 vérifié dans le navigateur : `/lab/lab-tokens`, 134 lignes de token, 0 ligne avec une colonne Valeur vide ou « — ».
- Critère 3 vérifié : `grep -n "fraunces\|work-sans\|jetbrains" src/styles/tokens.css` → rien ; lien Google Fonts ne contient plus les 3 familles, toutes les autres familles de `refonte-kiosque` présentes (diff complet, aucun ajout ni perte en dehors des 3 retirées).
- `npm run build` et lint : OK.

## Étape 5 — /lab (2026-10-04)
- `LatestIssue` (`src/modules/ArchiveHome.jsx`) : remplacé l'habillage archive fait main par `CouvertureNumero` de `src/magazine/RevueParts.jsx` (variante « vedette »), importé sans modifier `RevueParts.jsx` — même source `getIssues()[0]`, même forme de données que `MagazineHome.jsx`. Bandeau `--titre-magazine`, titre Playfair Display italique, « N° 1 » sans zéros. Les 3 liens (lire/tous les numéros/suivre) gardés sous la couverture. Imports devenus inutiles retirés (`issueNo`, `formatDateShort`, `CategoryMark`), prop `isMobile` du composant retirée (plus consommée).
- Fiche agent : `accentLabel` « ACCENT » → « VERT DOSSIER »/« FILE GREEN », `accentValue` « CORAIL BRÛLÉ »/« BURNT CORAL » → « VERT SAPIN »/« PINE GREEN », pastille `var(--primary)` → `var(--titre-lab)`.
- Vérifié moi-même dans le navigateur : bandeau bleu `rgb(43, 58, 155)`, « N° 1 » affiché, fiche agent « VERT DOSSIER »/« FILE GREEN » dans les deux langues, aucune erreur console.
- `npm run build` et lint : OK.
