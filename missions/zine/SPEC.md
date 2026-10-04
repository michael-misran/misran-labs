# Mission zine — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-04. Brief de Michael : « tu peux cadrer toutes les missions » (refonte kiosque, 9e mission : la rubrique Zine).

## Contexte
Le Zine est le titre mensuel de la maison, consacré à ce que Michael **fabrique** : ses photos, ses dessins, ses jeux à imprimer et les pages de son carnet. Il existe dans la navigation (`src/shell/NavTitres.jsx`, entrée non cliquable « bientôt ») et sur les présentoirs du kiosque (`src/kiosque/KiosqueParts.jsx`, couverture `CouvertureZine`, non cliquable). **Il n'a encore aucun contenu** : Michael fournira ses photos et dessins plus tard.

Univers visuel validé par Michael (maquettes locales `screens/fanzine-papier-v2.html` et `screens/accueil-fanzine-v2.html`) : fanzine brut, une seule couleur d'encre par numéro (rose fluo `--titre-zine` par défaut), noir massif, trame de points sur les photos, étoiles « spécial », bulles et étiquettes en lettrage BD (`--font-bd`), titres en Anton, **rendu net** (Michael a refusé le grain papier et les titres « abîmés »).

## Objectif
Poser la **structure** de la rubrique Zine, prête à recevoir le numéro 1 : le format des numéros, la page de la rubrique, la page de lecture d'un numéro et l'ouverture automatique du titre dès qu'un numéro existe. Le tout sans inventer de contenu.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** Un nouveau dossier `src/zine/` (`ZineHome.jsx`, `ZineNumero.jsx`, `ZineParts.jsx`, `zineText.js`, `numeros.js`, `numeros/` (vide sauf un `.gitkeep`), `FORMAT.md`) et un dossier `public/zine/` avec un `.gitkeep`. S'y ajoutent, **par exception** aux règles communes et uniquement pour brancher la rubrique : `src/App.jsx` (2 routes), `src/shell/NavTitres.jsx` (le Zine devient un lien s'il y a au moins un numéro), `src/shell/registry.js` (le libellé de l'onglet) et `src/kiosque/KiosqueParts.jsx` (la couverture du Zine devient un lien vers le dernier numéro s'il en existe un). Le moins de lignes possible dans ces 4 fichiers.

**D2 — Format d'un numéro** (`src/zine/numeros/<NN>.json`, documenté dans `src/zine/FORMAT.md` sur le modèle de `src/breves/FORMAT.md`) :
- les champs de tête : `numero`, `date` (AAAA-MM), `titre:{fr,en}`, `encre` (une couleur hexadécimale, `--titre-zine` par défaut), `edito:{fr,en}` ;
- puis `pages` : une liste de blocs typés.
  - `photo` : `src` (chemin dans `public/zine/<NN>/`), `legende:{fr,en}`, `trame: true|false` ;
  - `dessin` : `src`, `legende` ;
  - `texte` : `titre`, `corps` en fr et en ;
  - `carnet` : une note manuscrite, `corps:{fr,en}` ;
  - `jeu` : `titre`, `consigne`, `src` facultatif d'une image à imprimer ;
  - `bulle` : `texte:{fr,en}` ;
  - `etoile` : `texte:{fr,en}`.

  `numeros.js` charge les fichiers par `import.meta.glob`, valide chaque numéro comme le fait `src/breves/jours.js` (un numéro invalide est ignoré, avec un avertissement en console), et expose `getNumeros()` (du plus récent au plus ancien) et `getNumero(n)`.

**D3 — `/zine`.** Avec au moins un numéro : la couverture du dernier numéro en grand (tête « MISRAN ZINE » en Anton, numéro, encre du numéro, édito) et la liste des numéros précédents en petites couvertures. **Sans numéro** (le cas aujourd'hui) : une page d'attente dans l'univers zine, avec la tête « MISRAN ZINE », une étoile « Le #1 arrive ! », une bulle « Photos, dessins, jeux et carnet : en préparation à l'atelier. » et une trame de points en CSS pur. Aucune image et aucun faux contenu.

**D4 — `/zine/:numero`, la lecture.** Les blocs s'enchaînent dans une mise en page de fanzine. Les photos ont la trame de points si `trame` vaut true (même technique CSS que les maquettes : image en niveaux de gris, contraste, et calque de points en `mix-blend-mode`), les bulles et étoiles sont en lettrage BD, le carnet sur papier ligné. L'encre du numéro est appliquée par une variable CSS locale. Un numéro inconnu affiche une page « Ce numéro n'existe pas » dans le même style.

**D5 — Ouverture automatique.** `NavTitres` et la couverture du kiosque ne deviennent des liens que si `getNumeros().length > 0`. Sinon, le comportement actuel (« bientôt », `aria-disabled`) est conservé à l'identique. **Aujourd'hui rien ne change visuellement** : seule la page `/zine` (attente) devient accessible en tapant son adresse.

**D6 — Test sans contenu public.** Pour vérifier l'affichage d'un numéro, la session crée un numéro d'essai **temporaire** (blocs `texte`, `bulle`, `etoile` et `carnet`, sans image) : elle vérifie, puis **le supprime avant le dernier commit**. Aucun numéro ne doit rester dans `src/zine/numeros/`.

## Critères d'acceptation
1. Le diff ne touche que les fichiers de D1 et `missions/zine/`. `src/zine/numeros/` ne contient que `.gitkeep`.
2. `/zine` affiche la page d'attente (« Le #1 arrive »), sans erreur console. `/zine/1` affiche « Ce numéro n'existe pas ».
3. Dans `NavTitres` et sur le kiosque, le Zine est toujours non cliquable (`aria-disabled="true"`), identique à `refonte-kiosque`.
4. Le RAPPORT décrit le test du numéro d'essai (D6) : blocs rendus, ouverture automatique du lien vérifiée, puis suppression.
5. `src/zine/FORMAT.md` décrit chaque type de bloc avec un exemple JSON valide.
6. En anglais, aucun texte de `/zine` ne reste en français.
7. À 375 px, `document.documentElement.scrollWidth === window.innerWidth` sur `/zine`.
8. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur.
9. Tout est commité sur `auto/zine`, rien sur `main` ni `refonte-kiosque`, rien de poussé.

## Hors périmètre
- Le contenu du numéro 1 (photos, dessins et textes de Michael) et la version PDF imprimable du zine : à faire avec Michael.
- Un flux RSS du Zine (à ajouter quand le premier numéro existera).

## Règles communes à toutes les missions de la refonte kiosque
- **Branche** : `auto/<nom>` part de `refonte-kiosque`, pas de `main` (exception validée par Michael : la refonte sera mise en ligne d'un seul coup). La pull request de clôture vise `refonte-kiosque`.
- **Missions parallèles** : plusieurs missions de la refonte ont été cadrées en même temps, depuis le même état de `refonte-kiosque`. Pour éviter les conflits entre elles, **ne modifier que les fichiers listés dans « Fichiers autorisés »**. En particulier, ne touchez pas à `src/styles/tokens.css`, `src/i18n/ui.js`, `src/App.jsx`, `src/shell/*` ni `src/kiosque/*`, sauf mention contraire. Une valeur propre à une section (une teinte kraft, un vert d'écran…) se déclare en constante dans les fichiers de la section, de préférence dérivée des tokens existants (`color-mix`).
- **Acquis de la refonte** (déjà dans `refonte-kiosque`) : le cadre de la maison (`src/shell/Masthead.jsx`, `NavTitres.jsx`, `Defilant.jsx`, `Colophon.jsx`) et les tokens de la maison dans `src/styles/tokens.css`. Couleurs : `--titre-gazette` `#b3301d`, `--titre-magazine` `#2b3a9b`, `--titre-zine` `#ff4f8b`, `--titre-jeux` `#ff8a1f`, `--titre-lab` `#1f7a4d`. Polices : `--font-bois` (Ultra), `--font-bois-2` (Alfa Slab One), `--font-bois-3` (Rye), `--font-etiquette` (Oswald), `--font-chapo` (IM Fell English), `--font-gothique` (UnifrakturMaguntia), `--font-bd` (Comic Neue gras italique), `--font-pixel` (Press Start 2P), `--font-ecran` (VT323), `--font-machine` (Special Elite), plus Playfair Display via `--primitive-font-playfair-display` et Anton via `--primitive-font-anton`. Fonds `--bg` et `--bg2`, encre `--text` et `--border`. ADN commun : doubles filets `3px double`, ombres décalées d'encre, étiquettes en Oswald capitales espacées.
- **Référence visuelle** : `screens/accueil-kiosque.src.html` (locale, exclue de Git : la lire, ne jamais la commiter). La couverture de la section concernée dans « Sur les présentoirs » donne son univers. La page `/` (kiosque, dans `src/kiosque/KiosqueParts.jsx`) montre la version React de ces couvertures : à lire pour s'en inspirer, sans l'importer ni la modifier.
- **Aucune ressource externe ni privée** : pas d'image distante, pas de fichier de police (polices libres déjà chargées par `index.html` uniquement), rien de `src/private/`.
- **Styles en ligne** et tokens, comme le reste du site ; textes fr/en dans le fichier de textes de la section ; `resolveRouteMeta`, `document.title`, URL et données JSON inchangés sauf mention contraire.
- **Vérification navigateur** : `verificateur (Haiku)`. S'il ne se lance pas après une nouvelle tentative, la session principale fait la vérification elle-même et le note.
