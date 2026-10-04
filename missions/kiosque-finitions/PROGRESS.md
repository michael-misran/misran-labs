# Mission kiosque-finitions — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 9
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

## Étape 6 — couverture Zine (2026-10-04)
- `CouvertureZine` (`src/kiosque/KiosqueParts.jsx`) : `getNumeros()[0]` était déjà importé et lu pour le lien, mais jamais pour l'affichage. Ajout d'un rendu conditionnel : avec un numéro, « #NN » (padé, remplace le `#1` statique) et son titre (badge rotatif, style BD) remplacent l'étoile « Bientôt ! » ; la légende passe de `legendeRythme` (« bientôt · mensuel ») à une nouvelle clé `legendeRythmeAvecNumero` (« mensuel »/« monthly ») ajoutée dans `src/kiosque/kiosqueText.js`. Sans numéro, rendu strictement inchangé.
- Testé avec `src/zine/numeros/01.json` (exemple complet de `FORMAT.md`, photo → `/og-image.png`) : vérifié moi-même dans le navigateur, FR et EN — « #01 » et « Premiers pas »/« First steps » affichés, légende « mensuel »/« monthly », aucune erreur console. Fichier supprimé avant ce commit (`git ls-files src/zine/numeros` → seulement `.gitkeep`), puis revérifié que la couverture revient à « Bientôt ! »/« Coming soon! » sans numéro.
- `npm run build` et lint : OK.

## Étape 7 — consigne en double du geste parfait (2026-10-04)
- Lu `Jeu.jsx` (affiche `defi.consigne[lang]` au-dessus du défi actif, pour les 4) et les 4 `defis/*.jsx` :
  - `cercle.jsx` : doublon exact de la consigne centrale → paragraphe retiré.
  - `verre.jsx` : quasi-doublon (« relâche au bon moment » vs « au bon niveau » dans la consigne centrale) → paragraphe retiré, `lang`/`useLanguage` devenus inutiles retirés aussi.
  - `tour.jsx` : quasi-doublon (« poser le bloc » vs « poser chaque bloc ») → paragraphe retiré, `lang`/`useLanguage` retirés.
  - `chrono.jsx` : deux messages différents selon l'état — celui en attente (« clique pour démarrer ») est une info distincte, gardé ; celui en cours (« arrête à 10,00 s ») redisait la consigne centrale, vidé (même motif que l'état « fini », déjà vide).
- Règles et score non touchés dans les 4 fichiers (seuls les paragraphes de consigne et les imports qu'ils rendaient inutiles ont changé).
- Vérifié dans le navigateur : le défi du jour (Cercle parfait) n'affiche plus sa consigne qu'une fois. Les 3 autres défis n'ont pas pu être testés en direct dans cette session de routine — `?date=` pour forcer un autre défi n'est actif qu'en `vite dev` (`import.meta.env.DEV`, voir `JeuPage.jsx`), refusé en routine (seul `npx vite preview` est autorisé). Vérification faite par lecture de code : même structure que `cercle.jsx` (un seul paragraphe statique, sans état propre pour `verre.jsx`/`tour.jsx` ; état `encours` vidé pour `chrono.jsx`, aucune autre branche ne réaffiche le texte supprimé).
- `npm run build` et lint : OK.

## Étape 8 — documentation (2026-10-04)
- Liste des 11 PR fusionnées dans `refonte-kiosque` (hors `main`) relevée avec `git log --merges refonte-kiosque` puis comparée à `git log main` pour trouver le point de divergence exact (`aee617c`, PR #40) : #41 kiosque-maison, #42 kiosque-une, #44 germanica-site, #45 comicbook-site, #46 logo-fiole, #47 magazine-web, #48 jeux-arcade, #49 lab-dossiers, #50 idees-cv, #51 zine, #52 gazette-web (#43 absent du log, fermée sans fusion).
- Délégué à un sous-agent Haiku, texte exact fourni par la session principale : `CLAUDE.md` (paragraphe tokens étendu : 5 couleurs de titre, polices de la maison, Germanica/Comic Book locales dans `public/fonts/`) et `CHANGELOG.md` (nouvelle section « Refonte kiosque » sous « Non publié », avant « Mission « site-avant-apres » », une puce par PR fusionnée + une pour cette mission). Diff relu : conforme, rien d'autre touché.
- `npm run build` : OK (fichiers Markdown, pas d'impact sur le lint JS).
