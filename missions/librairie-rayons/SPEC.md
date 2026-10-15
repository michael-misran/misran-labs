# Mission librairie-rayons — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-10-15. Brief de Michael : « Pour le présentoir je pense qu'il est trop petit, faudrait voir comment pouvoir mettre plus de livres. » Piste retenue après maquette : « La disposition me va : cadre une mission pour mettre les rayons et les nouveautés dans la vraie librairie. »

## Contexte
L'accueil (`src/bibliotheque/Bibliotheque.jsx`, `bibliotheque.css`) est une librairie illustrée (`public/bibliotheque/librairie.jpg`, 1376 × 768, plus les versions `-halloween` et `-noel` au même cadrage). Les livres sont posés de face sur un présentoir central de 4 places (`PRESENTOIR`, positions en % de l'image) ; un clic « sort » le livre (dialogue avec sa couverture et « Lire » ou « À paraître »). Les livres sont décrits dans `src/numero/volumes.js` ; leurs couvertures sont dessinées en code par `Couverture` dans `src/numero/Etagere.jsx`. Le présentoir est plein (Misran Labs, Midnight Snack, L'Oracle du Matin, Portfolio) alors que de nouveaux livres arrivent (L'Atelier automatique sur `/atelier`, puis le Nuancier et le Carnet d'inventions).

**Maquette validée par Michael** : `screens/librairie-rayons.html` (sur le disque du dossier principal, hors Git ; elle s'ouvre avec le serveur de dev à `/screens/librairie-rayons.html`). Les couvertures y sont simplifiées : sur le site, ce sont les vraies couvertures de `Couverture`.

## Objectif
La librairie montre tous les livres : le présentoir devient « Nouveautés » (les 4 dernières parutions), et chacune des 4 colonnes d'étagères murales devient un rayon avec une plaque de laiton et ses livres posés de face. Ajouter un livre = une entrée dans `volumes.js`.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Données.** Dans `src/numero/volumes.js`, chaque volume gagne :
- `collection` : `'journaux' | 'magazines' | 'manuels' | 'carnets'` ;
- `parution` : date ISO `AAAA-MM-JJ`.
Valeurs : L'Oracle du Matin → journaux, `2026-09-29` ; Misran Labs → magazines, `2026-10-01` ; Midnight Snack → magazines, `2026-11-01` ; Portfolio → carnets, `2026-10-13` ; L'Atelier automatique → manuels, `2026-10-15`.
Trois volumes ajoutés : **L'Atelier automatique** (`to: '/atelier'`, couverture `'atelier'`), **Le Nuancier** (manuels, `to: null`, couverture `'nuancier'`, parution `null`), **Carnet d'inventions** (carnets, `to: null`, couverture `'carnet'`, parution `null`). Les champs existants (`rayon`, `hauteur`, `epaisseur`, `tranche`…) restent pour ne rien casser. Mettre à jour le commentaire d'en-tête du fichier.

**D2 — Nouveautés.** Le présentoir garde ses 4 places et leurs positions actuelles (`PRESENTOIR` : mêmes `left`, `width`, `REBORD`), mais n'est plus une liste d'id en dur : il montre les 4 volumes **parus** (`to` non nul et `parution` ≤ date du jour) les plus récents, du plus récent à gauche au plus ancien à droite. Un volume peut être à la fois en nouveauté et dans son rayon. Enseigne « Nouveautés » (FR) / « New releases » (EN) sur le rebord du présentoir, comme dans la maquette (étiquette rouge, police `--font-` existante la plus proche de Lobster Two ; si aucune ne convient, Lobster Two est déjà chargée par `index.html`). L'enseigne « Librairie du Chocolat Chaud » reste où elle est.

**D3 — Rayons.** Les 4 colonnes d'étagères, de gauche à droite : Journaux, Magazines, Manuels, Carnets (EN : Newspapers, Magazines, Manuals, Notebooks), avec un sous-titre court (maquette : « la presse du matin », « numéros et feuilletons », « modes d'emploi de l'atelier », « travaux et idées » ; traduire). Positions reprises de la maquette, en % de l'image : livres posés sur la 3ᵉ planche (`top` 34,8 %, largeur 3,7 %, ratio 5/7), centres de colonne ≈ 21,9 / 40,6 / 59,5 / 77,9 %, écart 4,5 % entre deux livres, groupe centré sur la colonne, **3 livres maximum par rayon** (au-delà : ignorer et noter en commentaire). Plaque de laiton sous les livres (`top` ≈ 43,6 %). Vérifier l'alignement sur les trois images (normale, `?saison=halloween`, `?saison=noel`).

**D4 — Même comportement partout.** Un livre de rayon se comporte comme un livre du présentoir : survol (léger soulèvement + étiquette titre), clic → le même dialogue « sorti » (couverture en grand, « Lire » ou « À paraître », « Reposer »), Échap ferme. Réutiliser `Expose` (ou l'étendre) plutôt que dupliquer. Les livres pas encore parus portent un tampon rouge « À paraître » / « Coming soon » sur leur miniature.

**D5 — Nouvelles couvertures.** Ajouter dans `Couverture` (`src/numero/Etagere.jsx` + son CSS) les modèles `'atelier'` (bleu de plan `--titre-atelier`, bandeau crème « Notice MM-1977 », titre « L'Atelier automatique » en Oswald, petit rouage), `'nuancier'` (papier crème, bandes des couleurs des titres en haut, titre « Le Nuancier ») et `'carnet'` (carnet noir à élastique rouge, étiquette « Carnet d'inventions »), dans l'esprit de la maquette mais à la qualité des couvertures existantes (lisibles en grand dans le dialogue).

**D6 — Téléphone.** Aujourd'hui la scène remplit la hauteur et est rognée sur les côtés : sur un téléphone, les colonnes 1 et 4 sont hors de l'écran. Sur les écrans étroits (moins de 700 px de large), la scène devient défilable horizontalement à l'intérieur de son cadre (pas de défilement de la page entière), centrée au départ sur le présentoir, avec une indication discrète « ← Glissez pour voir les rayons → » (EN : « ← Swipe to see the shelves → ») qui disparaît après le premier défilement. Sur ordinateur, rien ne change.

**D7 — Textes de l'interface.** Bandeau : « Choisissez un livre sur le présentoir ou dans les rayons » / « Pick a book from the display or the shelves ». Tous les nouveaux textes en FR et EN.

**D8 — Ne pas toucher** aux images de `public/bibliotheque/`, à `src/atelier/` (une autre mission y travaille), aux pages des livres eux-mêmes. Pas de dépendance, pas de nouvelle police.

## Critères d'acceptation
1. `/` à 1300 px : présentoir « Nouveautés » avec, aujourd'hui (2026-10-15), dans l'ordre : L'Atelier automatique, Portfolio, Misran Labs, L'Oracle du Matin ; 4 plaques de rayon ; 8 livres en rayon (Oracle ; Misran Labs, Midnight Snack ; Atelier, Nuancier ; Portfolio, Carnet d'inventions) ; capture jointe.
2. Clic sur chaque livre de rayon : le dialogue s'ouvre ; « Lire » mène à la bonne adresse pour les parus, « À paraître » pour Midnight Snack (avant le 1ᵉʳ novembre), le Nuancier et le Carnet d'inventions.
3. `?saison=halloween` et `?saison=noel` : livres et plaques bien posés sur les planches (captures).
4. 375 × 812 : la scène défile horizontalement dans son cadre, la page n'a pas de défilement horizontal (`document.documentElement.scrollWidth === innerWidth`), les 4 rayons sont atteignables, l'indication de glissement s'affiche puis disparaît.
5. EN : plaques, enseigne, bandeau, tampons traduits.
6. Console sans erreur.
7. `npm run build` passe ; `npm run lint` : 0 erreur.
8. Tout est commité sur `auto/librairie-rayons`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Pages des futurs livres (Nuancier, Carnet d'inventions).
- Retrait de Misran Labs ou réorganisation des dossiers du Lab.
- Nouvelles images Gemini.
