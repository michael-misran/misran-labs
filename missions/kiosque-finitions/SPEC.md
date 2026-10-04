# Mission kiosque-finitions — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « cadre kiosque-finitions » (refonte kiosque : nettoyage, retouches notées pendant les clôtures, revue complète avant la mise en ligne).

## Contexte
`refonte-kiosque` (96debce) contient la maison d'édition complète : kiosque, Gazette, Magazine, Jeux, Lab, Idées/CV, Zine, Germanica, Comic Book, logo Fiole. Seule `kiosque-annexes` (Suivre, 404, aperçus, flux RSS) reste à fusionner : elle tourne **avant** cette mission, sur sa propre branche.

Ce qui traîne, relevé pendant le cadrage et les clôtures du 2026-10-04 :
- **Code mort** : dans `src/magazine/MagazineParts.jsx`, `IssueRow`, `SourceList`, `ArticleCard` et `MagazineHero` n'ont plus aucun importeur (`MagazineHero` n'est cité que dans un commentaire de `ProjetsParts.jsx`). `TabBar` de `src/lab/CaseStudyLayout.jsx` n'a aucun importeur.
- **Polices** : `index.html` charge encore Fraunces, Work Sans et JetBrains Mono. Elles ne servent plus qu'aux primitives `--primitive-font-fraunces`, `--primitive-font-work-sans` et `--primitive-font-jetbrains-mono` de `tokens.css` (sans consommateur) et au tableau typographique de `src/lab/projects/DesignSystem.jsx` (dossier 003), qui documente encore l'ancienne identité (« Fraunces · titres », « Work Sans · corps », « JetBrains Mono · technique »). Les vraies polices sont `--font-heading` = Alfa Slab One, `--font-body` = Crimson Pro, `--font-mono` = IBM Plex Mono.
- **Anciennes primitives** crème, encre-archive et corail dans `tokens.css` : certaines servent encore (la mascotte `src/shell/mascotte/sprites.js` et `fiole.css`, le bloc `[data-invert]` de `ThemeSwatch.jsx`), d'autres plus du tout.
- **`/lab`** (`src/modules/ArchiveHome.jsx`) : l'aperçu du dernier Magazine (`LatestIssue`) garde l'ancien style rose avec « N° 001 », alors que le Magazine est passé en revue bleue (« N° 1 »). La fiche agent affiche « ACCENT : CORAIL BRÛLÉ / BURNT CORAL », l'ancienne couleur.
- **Kiosque** (`src/kiosque/`) : la couverture du Zine affiche « Bientôt ! » et la légende « bientôt · mensuel » même quand un numéro existe dans `src/zine/numeros/`.
- **Le geste parfait** : la consigne du défi du jour s'affiche deux fois (`src/jeux/geste-parfait/Jeu.jsx` et `defis/cercle.jsx`, au moins pour le cercle).
- **Documentation** : la section tokens de `CLAUDE.md` et le `CHANGELOG.md` ne parlent pas de la refonte.

## Objectif
Le site de la refonte est propre (plus de code ni de police morts), cohérent d'une page à l'autre, documenté, et vérifié route par route avant la PR finale vers `main`.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Base et fichiers interdits.** Branche partie de `refonte-kiosque` (96debce) ; PR de clôture vers `refonte-kiosque`. `kiosque-annexes` tourne en parallèle : **ne pas toucher** à ses fichiers, `src/suivre/*`, `src/shell/Page404.jsx`, `scripts/share-previews.js`, `scripts/og-numero.js`, `scripts/og-numero-template.html`, `scripts/rss.js`, ni à la ligne `theme-color` de `index.html`. Tout le reste du dépôt est autorisé, en restant au périmètre des décisions ci-dessous. Ne rien toucher dans `src/private/`, `src/breves/jours/`, `src/magazine/numeros/`, `src/projets/idees/`.

**D2 — Code mort.** Supprimer `IssueRow`, `SourceList`, `ArticleCard` et `MagazineHero` de `MagazineParts.jsx`, et `TabBar` de `CaseStudyLayout.jsx`, avec les imports et constantes qui ne servent plus qu'à eux. **Garder** `MagazineMasthead` (importé par `SuivrePage.jsx`, fichier de `kiosque-annexes`) et `SuivreBandeau` (encore utilisé par Projets et `MagazineIssue.jsx`, restylé par `kiosque-annexes`). `CategoryMark` : le supprimer seulement si D5 le laisse sans importeur. Règle générale : avant de supprimer un export, `grep -rn "<nom>" src` ne doit plus renvoyer que sa définition.

**D3 — Polices.** D'abord mettre à jour le tableau typographique et les spécimens de `DesignSystem.jsx` avec les polices réelles (lire `tokens.css` : `--font-heading`, `--font-body`, `--font-mono`, et ajouter une ligne par police de la maison si le tableau s'y prête : bois, étiquette, chapô, gothique, BD, pixel, écran, machine). Ensuite retirer `Fraunces`, `Work+Sans` et `JetBrains+Mono` du lien Google Fonts de `index.html` (seulement ces trois familles, rien d'autre sur cette ligne) et leurs trois primitives de `tokens.css`. **Garder** UnifrakturMaguntia et Comic Neue : ce sont les polices de secours de Germanica et Comic Book. Le texte du prompt cité dans `src/experiences/SessionReplay.jsx` (« JetBrains Mono ») est une archive : ne pas le modifier.

**D4 — Primitives inutilisées.** Dans `tokens.css`, supprimer chaque primitive `--primitive-*` qui n'a plus aucun consommateur (recherche du nom exact dans `src/`, `index.html`, `public/` et `scripts/`, y compris dans les autres primitives et semantic de `tokens.css`). **Garder** tout ce que consomment la mascotte (`sprites.js`, `fiole.css`), le bloc `[data-invert]` et les semantic. Ne pas changer la couleur de la mascotte : sa Fiole corail fait partie de son personnage. Mettre à jour les commentaires d'en-tête de `tokens.css` qui parlent de l'ancienne identité. `LabTokens.jsx` lit ses valeurs en direct : après la suppression, `/lab/lab-tokens` ne doit afficher aucune ligne sans valeur (retirer de sa liste les tokens supprimés).

**D5 — `/lab`.** `LatestIssue` passe au style revue bleue du Magazine : bandeau `--titre-magazine`, titre en Playfair Display italique (`--primitive-font-playfair-display`), « N° 1 » sans zéros, comme `CouvertureNumero` de `src/magazine/RevueParts.jsx` (s'en inspirer, ou l'importer si c'est simple et sans changer `RevueParts.jsx`). La fiche agent : « ACCENT » devient « VERT DOSSIER » / « FILE GREEN » avec la pastille en `--titre-lab`.

**D6 — Couverture du Zine au kiosque.** Quand `getNumeros()` (de `src/zine/numeros.js`) renvoie au moins un numéro, la couverture Zine du kiosque affiche le dernier numéro (« #01 » et son titre dans la langue courante) à la place de l'étoile « Bientôt ! », et la légende devient « mensuel » / « monthly ». Sans numéro, rien ne change. Textes dans `src/kiosque/kiosqueText.js`. Tester avec un numéro d'essai `src/zine/numeros/01.json` (l'exemple complet de `src/zine/FORMAT.md`, photo remplacée par `/og-image.png`), **jamais commité** : le supprimer avant de commiter.

**D7 — Consigne en double.** Dans « Le geste parfait », chaque défi n'affiche sa consigne qu'une fois. Lire `Jeu.jsx` et les 4 défis (`defis/*.jsx`) avant de choisir où la garder. Ne changer ni les règles ni le score.

**D8 — Documentation.** `CLAUDE.md` : décrire en quelques lignes la structure des tokens après la refonte (couleurs des 5 titres, polices de la maison, polices locales Germanica et Comic Book dans `public/fonts/`). `CHANGELOG.md` : une entrée « Refonte kiosque » sous « Non publié », qui résume les missions fusionnées dans `refonte-kiosque` (lire `git log --merges refonte-kiosque`) et cette mission.

**D9 — Revue complète.** Toutes les routes, en FR et en EN, à 1366 px et à 375 px : `/`, `/breves`, `/breves/<une date>`, `/magazine`, `/magazine/<une date>`, `/zine`, `/jeux`, `/jeux/<chaque slug>`, `/lab`, `/lab/<chaque slug de visibleProjects()>`, `/lab/cv`, `/projets`, `/projets/fonctionnement`, `/projets/<un id>`, `/suivre`, une URL inexistante. Pour chacune : pas d'erreur console, pas de débordement horizontal à 375 px, aucun texte resté dans l'autre langue (hors données monolingues existantes). Tout défaut d'affichage trouvé **dans les fichiers autorisés** se corrige ; un défaut dans un fichier de `kiosque-annexes` se note seulement dans le RAPPORT.

## Critères d'acceptation
1. Le diff ne touche aucun fichier interdit par D1 (`git diff --stat refonte-kiosque...auto/kiosque-finitions`).
2. `grep -rn "IssueRow\|SourceList\|ArticleCard\|MagazineHero\|TabBar" src` ne renvoie rien (hors éventuel commentaire historique reformulé).
3. La ligne Google Fonts de `index.html` ne contient plus `Fraunces`, `Work+Sans` ni `JetBrains+Mono`, et contient toujours toutes les autres familles de `refonte-kiosque`. `grep -n "fraunces\|work-sans\|jetbrains" src/styles/tokens.css` ne renvoie rien. `DesignSystem.jsx` ne cite plus Fraunces ni Work Sans.
4. `/lab/lab-tokens` : aucune ligne dont la colonne « Valeur » est vide ou « — » pour un token de type couleur, police ou dimension.
5. `/lab` : l'aperçu du Magazine a un bandeau bleu (`rgb(43, 58, 155)`) et affiche « N° 1 » ; la fiche agent affiche « VERT DOSSIER » (FR) / « FILE GREEN » (EN).
6. Kiosque : sans numéro de Zine, la couverture affiche « Bientôt ! » comme avant ; avec le numéro d'essai, elle affiche « #01 » et son titre. Le numéro d'essai n'est pas commité (`git ls-files src/zine/numeros` ne liste que `.gitkeep`).
7. `/jeux/geste-parfait` : la consigne du défi du jour n'apparaît qu'une fois dans le texte de la page.
8. La mascotte Fiole s'affiche avec ses couleurs habituelles (mêmes valeurs calculées qu'avant pour ses variables de sprites).
9. D9 fait : le tableau des routes vérifiées (route, FR/EN, 1366/375, résultat) figure dans PROGRESS.md.
10. `npm run build` passe ; `npm run lint` : 0 erreur.
11. Tout est commité sur `auto/kiosque-finitions`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Tout fichier de `kiosque-annexes` (D1). Après sa fusion, en session avec Michael : `scripts/share-previews.js` doit connaître `/zine` (sitemap, aperçus), et vérifier si `MagazineMasthead` et `SuivreBandeau` ont encore des importeurs.
- Le contenu du Zine #1 et sa version PDF (avec Michael).
- Synchroniser `refonte-kiosque` avec `main` et la PR finale vers `main` (session interactive avec Michael).
- Changer la couleur ou le dessin de la mascotte.

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de nouvelle police, rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés.
- **Titre gothique** : partout où la mission écrit en `--font-gothique`, ajouter `wordSpacing: 'var(--font-gothique-espace, normal)'`.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.
