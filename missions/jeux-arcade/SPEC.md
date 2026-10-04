# Mission jeux-arcade — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « tu peux cadrer toutes les missions » (refonte kiosque, 5e mission : les Jeux). Michael avait demandé : « pour les jeux je vois plus un truc genre retro gaming ».

## Contexte
`/jeux` (`src/jeux/JeuxHome.jsx`) liste les jeux sous forme de cartes (icône emoji, titre, accroche, pastille « Nouveau défi »). `/jeux/:slug` (`src/jeux/JeuPage.jsx`) encadre le composant du jeu (`<slug>/Jeu.jsx`). Le registre `src/jeux/registre.js` fournit `listeJeux()` et `getJeu(slug)`, avec pour chaque jeu `slug`, `ordre`, `icone`, `couleur`, `titre:{fr,en}`, `accroche:{fr,en}`, `demo` et `entrainement`. Les textes sont dans `src/jeux/jeuxText.js` (`jt`). Le socle commun est dans `src/jeux/socle/` (`jour.js`, `serie.js`, `partage.js`, `ResultatPartage.jsx`). Il y a aujourd'hui trois jeux : `geste-parfait`, `a-vue-d-oeil` et `comme-tout-le-monde`.

## Objectif
La rubrique Jeux devient une **salle d'arcade rétro**, dans l'esprit de sa couverture du kiosque (boîte de jeu, écran cathodique, « INSERT COIN », polices pixel), **sans toucher à la mécanique des jeux**.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** `src/jeux/JeuxHome.jsx`, `src/jeux/JeuPage.jsx`, `src/jeux/jeuxText.js` (ajouts seulement), un nouveau `src/jeux/ArcadeParts.jsx` et `src/jeux/socle/ResultatPartage.jsx` (habillage seulement). **Interdit** : les dossiers des jeux (`src/jeux/<slug>/`), `registre.js`, `jour.js`, `serie.js` et `partage.js`. Aucun calcul de score, de série ou de partage ne doit changer.

**D2 — `/jeux`, l'écran de sélection.**
- **En tête, une borne** : grand écran cathodique (fond vert très sombre, lignes de balayage en CSS, bords arrondis, ombre intérieure). On y lit « LES JEUX » en `--font-pixel` orange `--titre-jeux`, les scores « 1UP / HI » en vert, un envahisseur en pixels (`box-shadow` sur un carré de 4 px), et « INSERT COIN » qui clignote.
- **Dessous, l'écran « SELECT GAME »** : un menu vertical façon jeu vidéo. Chaque jeu est une ligne en `--font-ecran` (VT323) majuscule, avec son icône. Le jeu survolé ou sélectionné au clavier est marqué d'un curseur ▶ clignotant, et son accroche s'affiche dessous. Les flèches haut et bas déplacent la sélection, Entrée lance le jeu, et chaque ligne reste un vrai lien `/jeux/<slug>`.
- **Puis les jeux en « boîtes »** : une grille de cartes façon jaquette de cartouche, chacune pointant vers son jeu. Fond quadrillé noir, titre en `--font-pixel`, accroche en VT323, et un pied « 1 JOUEUR · 0 € · 0 PUB » avec un bouton « PRESS START ».
- Les jeux marqués `demo` ou `entrainement` gardent l'indication qu'ils avaient. Le reprendre de l'existant.

**D3 — `/jeux/:slug`, le cadre d'un jeu.**
- Une barre de jeu en haut : « ◀ MENU » (lien `/jeux`), le titre du jeu en `--font-pixel` et l'accroche en VT323.
- **Le composant du jeu est rendu tel quel**, dans une zone claire et lisible : pas de fond noir sous le jeu, car ses styles supposent un fond clair. On l'entoure seulement d'un cadre de borne (bordure épaisse arrondie, coins à vis en CSS).
- `ResultatPartage` reçoit un habillage d'écran de fin (« GAME OVER » ou « BRAVO ! », en pixels) sans changer ses données ni son comportement de partage.
- Slug inconnu : le comportement actuel est conservé (404).

**D4 — Accessibilité.** Le clignotement et les animations sont coupés avec `prefers-reduced-motion: reduce`. Les textes en Press Start 2P restent courts (titres, étiquettes) : les phrases longues sont en VT323 ou en `--font-body`. Le contraste du texte doit rester lisible.

## Critères d'acceptation
1. Le diff ne touche que les fichiers de D1 et `missions/jeux-arcade/`. `git diff --stat refonte-kiosque...auto/jeux-arcade -- src/jeux/geste-parfait src/jeux/a-vue-d-oeil src/jeux/comme-tout-le-monde src/jeux/registre.js src/jeux/socle/jour.js src/jeux/socle/serie.js src/jeux/socle/partage.js` est vide.
2. Sur `/jeux`, chaque jeu de `listeJeux()` apparaît dans le menu et dans les boîtes, avec un lien vers `/jeux/<slug>`. Avec le clavier, flèche bas puis Entrée mène au 2e jeu.
3. Sur `/jeux/<chaque slug>`, le jeu s'affiche et une partie peut se jouer jusqu'à l'écran de résultat, sans erreur console. Le bouton de partage fonctionne comme avant.
4. Avec `prefers-reduced-motion: reduce` émulé, l'`animation-name` de « INSERT COIN » et du curseur ▶ vaut `none`.
5. En anglais, aucun texte de ces pages ne reste en français (hors jargon d'arcade identique : INSERT COIN, 1UP, PRESS START, GAME OVER).
6. À 375 px, `document.documentElement.scrollWidth === window.innerWidth` sur `/jeux` et `/jeux/<un slug>`.
7. `document.title` inchangé sur `/jeux` et `/jeux/<slug>`. Aucune erreur console.
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
9. Tout est commité sur `auto/jeux-arcade`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
- Restyler l'intérieur des jeux (à proposer en recommandation si un jeu jure avec le cadre).
- Ajouter un jeu, ou changer les règles et les scores.
- Les aperçus de partage des jeux (mission kiosque-annexes).

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Missions parallèles** : plusieurs missions de la refonte ont été cadrées en même temps, depuis le même état de `refonte-kiosque`. Pour éviter les conflits entre elles, **ne modifier que les fichiers listés dans « Fichiers autorisés »**. En particulier, ne touchez pas à `src/styles/tokens.css`, `src/i18n/ui.js`, `src/App.jsx`, `src/shell/*` ni `src/kiosque/*`, sauf mention contraire. Une valeur propre à une section (une teinte kraft, un vert d'écran…) se déclare en constante dans les fichiers de la section, de préférence dérivée des tokens existants (`color-mix`).
- **Acquis de la refonte** (déjà dans `refonte-kiosque`) : le cadre de la maison (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`) et les tokens de la maison dans `src/styles/tokens.css`. Couleurs : `--titre-gazette` `#b3301d`, `--titre-magazine` `#2b3a9b`, `--titre-zine` `#ff4f8b`, `--titre-jeux` `#ff8a1f`, `--titre-lab` `#1f7a4d`. Polices : `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-gothique` (UnifrakturMaguntia), `--font-bd` (Comic Neue gras italique), `--font-pixel` (Press Start 2P), `--font-ecran` (VT323), `--font-machine` (Special Elite), plus Playfair Display via `--primitive-font-playfair-display` et Anton via `--primitive-font-anton`. Fonds `--bg` et `--bg2`, encre `--text` et `--border`. ADN commun : doubles filets `3px double`, ombres décalées d'encre, étiquettes en Oswald capitales espacées.
- **Référence visuelle** : `screens/accueil-kiosque.src.html` (locale, exclue de Git : la lire, ne jamais la commiter). La couverture de la section concernée dans « Sur les présentoirs » donne son univers. La page `/` (kiosque, dans `src/kiosque/KiosqueParts.jsx`) montre la version React de ces couvertures : à lire pour s'en inspirer, sans l'importer ni la modifier.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de fichier de police (polices libres déjà chargées par `index.html` uniquement), rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés sauf mention contraire.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.
