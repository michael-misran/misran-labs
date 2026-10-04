# Mission magazine-web — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « tu peux cadrer toutes les missions » (refonte kiosque, 4e mission : le Magazine).

## Contexte
Le Magazine IA hebdomadaire vit à `/magazine` (`src/magazine/MagazineHome.jsx`) et `/magazine/:date` (`MagazineIssue.jsx`), avec l'ancienne mise en page « fiche d'archive » : `MagazineParts.jsx` (MagazineMasthead, MagazineHero, CategoryMark, IssueRow, SourceList, ArticleCard) et `CaseFile`/`caseChrome` du Lab. Données dans `src/magazine/numeros.js` : `getIssues()` (du plus récent au plus ancien) et `getIssue(date)`. Un numéro : `{ numero, date, titre:{fr,en}, edito:{fr,en}, articles:[{ titre, resume, pourquoi, categorie, sources }] }` (textes en `{fr,en}`). Catégories et textes de page dans `magazineText.js` (`CATEGORIES`, `MAG_TEXT`). La page de numéro utilise `SecondarySidebarContext`, à conserver si utile.

**Attention** : `MagazineParts.jsx` et `CaseFile.jsx` sont aussi importés par d'autres sections (Projets, Suivre, ArchiveHome). Ils **ne doivent pas être modifiés** par cette mission. Les pages du Magazine cessent simplement de les utiliser.

## Objectif
Le Magazine devient un **magazine classique bleu**, sur le modèle de sa couverture du kiosque : bandeau bleu `--titre-magazine`, titres en Playfair Display italique 900, mise en page aérée façon revue hebdomadaire. Il ne dépend plus des composants d'archive.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** `src/magazine/MagazineHome.jsx`, `src/magazine/MagazineIssue.jsx`, un nouveau `src/magazine/RevueParts.jsx`, et `src/magazine/magazineText.js` (ajouts de textes seulement : ne pas renommer ce qui existe, d'autres fichiers l'importent). Rien d'autre, sauf les fichiers de suivi de la mission.

**D2 — `/magazine`, le kiosque du Magazine.**
- Une tête de revue : grand bandeau bleu avec « Le Magazine » en Playfair italique 900 blanc, et le sous-titre « L'hebdo IA du Lab, chaque lundi ».
- Le **dernier numéro en vedette** : une grande couverture à gauche (même composition que la couverture du kiosque : bandeau, numéro, date, titre, les 4 premiers articles numérotés), et à droite l'extrait de l'édito avec une lettrine, plus « Lire le numéro → ».
- Les **numéros précédents** en grille de petites couvertures, 3 colonnes puis 2, puis 1 sur mobile. Chacune pointe vers `/magazine/<date>`.
- Le lien vers le flux RSS `/magazine/rss.xml`.

**D3 — `/magazine/:date`, un numéro.**
- La couverture du numéro en tête : bandeau bleu, « N° x · date longue », titre en très grand.
- L'**édito** sur 2 colonnes, avec une lettrine bleue.
- Le **sommaire** : la liste numérotée des articles, avec ancres vers chaque article.
- Les **articles** : catégorie en `--font-etiquette` capitales, dans la couleur de la catégorie (`CATEGORIES`) ; titre en Playfair italique 900 ; résumé ; encadré « Pourquoi c'est important » (le champ `pourquoi`) sur fond bleu très clair, avec un filet bleu à gauche ; sources sous forme de liens externes (`target="_blank" rel="noopener noreferrer"`). Un filet bleu sépare les articles.
- Navigation « ← Numéro précédent / Numéro suivant → / Tous les numéros ».
- Date inconnue : une page au même style qui affiche « Ce numéro n'existe pas » et un lien vers `/magazine`.

**D4 — Responsive.** À 375 px, rien ne déborde, et les titres en Playfair sont réduits en taille fluide.

## Critères d'acceptation
1. `git grep -nE "MagazineParts|lab/CaseFile|lab/caseChrome" -- src/magazine/MagazineHome.jsx src/magazine/MagazineIssue.jsx src/magazine/RevueParts.jsx` ne renvoie rien. Le diff ne touche que les fichiers de D1 et `missions/magazine-web/`.
2. Sur `/magazine`, la vedette affiche le titre (fr) de `getIssues()[0]` et pointe vers `/magazine/<sa date>`. Chaque numéro précédent a son lien.
3. Sur `/magazine/2026-09-28`, l'édito, le sommaire (une ancre par article) et chaque article apparaissent, avec leur `pourquoi` et leurs sources cliquables.
4. `/magazine/1999-01-01` affiche « Ce numéro n'existe pas », sans erreur console.
5. En anglais, aucun texte de ces pages ne reste en français.
6. À 375 px, `document.documentElement.scrollWidth === window.innerWidth` sur les deux pages.
7. `document.title` inchangé sur `/magazine` et `/magazine/2026-09-28`. Aucune erreur console sur ces pages, ni sur `/`, `/projets` et `/suivre` (qui utilisent encore `MagazineParts`).
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
9. Tout est commité sur `auto/magazine-web`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
- Modifier `MagazineParts.jsx`, `CaseFile.jsx` ou les données (le nettoyage du code mort se fera dans la mission de finitions).
- Le flux RSS, les images OG et les aperçus de partage (mission kiosque-annexes).

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Missions parallèles** : plusieurs missions de la refonte ont été cadrées en même temps, depuis le même état de `refonte-kiosque`. Pour éviter les conflits entre elles, **ne modifier que les fichiers listés dans « Fichiers autorisés »**. En particulier, ne touchez pas à `src/styles/tokens.css`, `src/i18n/ui.js`, `src/App.jsx`, `src/shell/*` ni `src/kiosque/*`, sauf mention contraire. Une valeur propre à une section (une teinte kraft, un vert d'écran…) se déclare en constante dans les fichiers de la section, de préférence dérivée des tokens existants (`color-mix`).
- **Acquis de la refonte** (déjà dans `refonte-kiosque`) : le cadre de la maison (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`) et les tokens de la maison dans `src/styles/tokens.css`. Couleurs : `--titre-gazette` `#b3301d`, `--titre-magazine` `#2b3a9b`, `--titre-zine` `#ff4f8b`, `--titre-jeux` `#ff8a1f`, `--titre-lab` `#1f7a4d`. Polices : `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-gothique` (UnifrakturMaguntia), `--font-bd` (Comic Neue gras italique), `--font-pixel` (Press Start 2P), `--font-ecran` (VT323), `--font-machine` (Special Elite), plus Playfair Display via `--primitive-font-playfair-display` et Anton via `--primitive-font-anton`. Fonds `--bg` et `--bg2`, encre `--text` et `--border`. ADN commun : doubles filets `3px double`, ombres décalées d'encre, étiquettes en Oswald capitales espacées.
- **Référence visuelle** : `screens/accueil-kiosque.src.html` (locale, exclue de Git : la lire, ne jamais la commiter). La couverture de la section concernée dans « Sur les présentoirs » donne son univers. La page `/` (kiosque, dans `src/kiosque/KiosqueParts.jsx`) montre la version React de ces couvertures : à lire pour s'en inspirer, sans l'importer ni la modifier.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de fichier de police (polices libres déjà chargées par `index.html` uniquement), rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés sauf mention contraire.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.
