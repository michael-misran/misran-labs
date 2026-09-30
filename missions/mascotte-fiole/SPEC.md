# Mission mascotte-fiole — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : ajouter au site un petit personnage en pixel art, animé au clic (« comme sur l'appli Claude »). Piste retenue : la **Fiole** (fiole de labo mignonne), avec la **Fiole toxique** (tête de mort) comme secret au 10ᵉ clic.

## Contexte
- Maquette validée par Michael : `missions/mascotte-fiole/maquette.html` (ouvrir dans un navigateur). Elle contient 4 pistes ; seules **Fiole** (`id: 'fiole'`) et **Fiole toxique** (`id: 'toxique'`) sont retenues. Les grilles 16×16 (`base`, `blink`, `look`, `sleep`, `happy`), les phrases, les particules (`FX.bubble`, `FX.poison`) et les animations CSS (`bob`, `breathe`, `wobble`, `spin`, `rise`, `zz`, `pop`) y sont la référence exacte. Fidélité visuelle > qualité du code.
- Barre d'état du site : `src/shell/Statusbar.jsx`, rendue par `src/shell/Shell.jsx` (l. ~152) sur toutes les pages. Hauteur `--chrome-height` = 32 px, fond `--bg3` (crème 200), `overflow: hidden`. En desktop : 3 textes (marque, fil d'Ariane ✛, déploiement) ; en mobile (< 768 px) : seulement le fil d'Ariane, centré.
- Le site n'a **pas** de mode sombre : le chrome reste crème (`[data-invert]` ne concerne que des sections de contenu). Le halo crème de la maquette pour le mode sombre est donc inutile.
- Langues : FR/EN via `useLanguage()` (`src/shell/LanguageContext.js`) et `src/i18n/ui.js`.
- `src/styles/tokens.css` a déjà une règle globale `prefers-reduced-motion`.
- Mission récente `menu-mobile` : sur mobile, le bouton ☰ flotte en haut ; rien ne doit être ajouté en haut de l'écran.
- État initial (2026-09-30, sur `main` b9ebe79) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
La Fiole vit à droite de la barre d'état, sur toutes les pages, en desktop comme en mobile. Elle cligne, regarde au survol, réagit au clic, s'endort, et devient la Fiole toxique quelques secondes à chaque 10ᵉ clic.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers.** Nouveau dossier `src/shell/mascotte/` :
- `sprites.js` : grilles de la Fiole et de la Fiole toxique + particules, **copiées à l'identique** de la maquette (mêmes lettres, mêmes lignes remplacées par état) ; phrases FR/EN.
- `Fiole.jsx` : le composant (états, minuteries, clic, secret).
- `fiole.css` : keyframes et classes, importé par `Fiole.jsx` (Vite le gère, aucune dépendance).
Aucune dépendance npm.

**D2 — Couleurs = tokens primitifs**, jamais d'hexa dans le composant. Correspondance des lettres : `k` → `--primitive-ink-900`, `d` → `--primitive-coral-700`, `c` → `--primitive-coral-500`, `o` → `--primitive-coral-400`, `r` → `--primitive-coral-tint-200`, `w` → `--primitive-cream-100` (verre), `h` → `--primitive-cream-50` (reflet), `E` → `--primitive-ink-900`. Les `<rect>` SVG utilisent `fill="var(--primitive-…)"`. Si le verre se confond avec le fond de la barre (`--bg3`), passer `w` en `--primitive-cream-50` et le noter dans DECISIONS.

**D3 — Taille et place.** Grille 16×16 affichée en ×2 (32×32 px), `shape-rendering: crispEdges`, `image-rendering: pixelated`. Placée à l'extrémité droite de la barre d'état, posée sur le bas de la barre, avec une marge à droite égale au padding existant (20 px). Desktop : après le texte de déploiement (garder un espace ≥ 12 px entre les deux). Mobile : le fil d'Ariane reste centré, la Fiole à droite ; si le texte centré est trop long, il est tronqué par ellipsis plutôt que de passer sous la Fiole.

**D4 — Pas de rognage, pas de débordement de page.** La Fiole ne doit pas être coupée pendant ses animations (tangage, pirouette) : sortir la Fiole de la zone `overflow: hidden` (par ex. `overflow: visible` sur le footer et `overflow: hidden` + ellipsis sur chaque texte). La **bulle de texte** et les **particules** sont rendues dans `document.body` via `createPortal` (react-dom, déjà présent) en `position: fixed`, calculées depuis `getBoundingClientRect()` de la Fiole, au-dessus de la barre. Bulle alignée pour ne jamais sortir de l'écran à droite (ancrée sur son bord droit à 8 px du bord de la fenêtre si besoin). `z-index` au-dessus du contenu, sous le menu mobile ouvert.

**D5 — Comportement** (valeurs de la maquette sauf mention) :
- Repos : `bob` (translateY −2 px, soit 1 pixel du sprite, `steps(1)`, 1,4 s) — ajusté de −6 px à l'échelle ×2.
- Clignement aléatoire toutes les 2,2 à 4,8 s (frame `blink` 140 ms).
- Survol (pointeur sur la Fiole) : frame `look`, retour à `base` en sortant.
- Clic ou Entrée/Espace : tangage `wobble` (0,6 s), frame `happy` 650 ms, 4 particules `bubble`, bulle avec une phrase au hasard (1,8 s).
- Dodo : après **30 s** sans interaction avec la Fiole (survol ou clic) → frame `sleep`, animation `breathe`, « z » qui s'envolent. Survol ou clic la réveille.
- Compteur de clics en mémoire (remis à zéro au rechargement, pas de stockage).

**D6 — Secret du 10ᵉ clic** (et 20ᵉ, 30ᵉ…). La Fiole se transforme en Fiole toxique pendant **4 s** :
- pirouette `spin` **sans translation verticale** (rotation 360° sur place, 0,8 s) pour rester dans la barre ;
- 12 particules `poison` ;
- orbites allumées (frame `happy` de la toxique) pendant 1 s, puis frame `base` de la toxique (avec son `blink` aléatoire) ;
- bulle : FR « Tu l'as bien cherché ☠ », EN « You asked for it ☠ », affichée 2,5 s ;
- puis retour à la Fiole normale (frame `base`), avec 4 particules `bubble`.
Un clic pendant la transformation ne relance pas le compteur de secret (il compte, mais la transformation en cours va à son terme).

**D7 — Phrases FR/EN.** Reprendre les 5 phrases de la Fiole de la maquette en FR. EN : « Blop! », « Experiment in progress… », « Careful, it fizzes », « Read today's Briefs? », « Secret formula: coffee ». Choisies selon `lang` de `useLanguage()`. Ces textes vivent dans `sprites.js` (pas besoin de les ajouter à `i18n/ui.js`).

**D8 — Accessibilité.** La Fiole est un `<button type="button">` sans style natif (fond transparent, sans bordure, padding 0), `aria-label` FR « Fiole, la mascotte du Lab » / EN « Flask, the Lab mascot », focus visible (le style `:focus-visible` global de `tokens.css` suffit). La bulle a `role="status"` (`aria-live="polite"`). Le SVG est `aria-hidden`.
`prefers-reduced-motion: reduce` : pas de `bob`, `breathe`, `wobble`, `spin`, ni de particules ; les changements de frame (clignement, regard, dodo, transformation toxique) et la bulle restent. Tester `window.matchMedia('(prefers-reduced-motion: reduce)')` en JS pour ne pas créer les particules.

**D9 — Nettoyage.** Toutes les minuteries (`setTimeout`) sont annulées au démontage du composant. Aucune erreur ni avertissement en console.

## Critères d'acceptation
1. Sur `/`, `/magazine`, `/breves`, `/projets`, `/lab/design-system` en 1280×900 : la Fiole est visible à droite de la barre d'état, 32×32 px (`getBoundingClientRect`), rien de rogné, et le texte de déploiement reste entier et lisible (pas de chevauchement de rectangles).
2. À 375×812 sur les mêmes pages : la Fiole est visible à droite de la barre, ne chevauche pas le fil d'Ariane (rectangles disjoints), pas de défilement horizontal (`document.documentElement.scrollWidth <= 375`).
3. Clic sur la Fiole : une bulle apparaît au-dessus de la barre, entièrement dans la fenêtre (rectangle compris entre 0 et `innerWidth`), avec une des 5 phrases de la langue courante ; elle disparaît en ~2 s.
4. 10 clics : au 10ᵉ, la Fiole toxique s'affiche (le SVG contient la tête de mort), la bulle dit « Tu l'as bien cherché ☠ » (en FR) ; après ~4 s la Fiole normale revient. Au 20ᵉ clic, ça recommence.
5. Après 30 s sans interaction : état dodo (« z » visibles) ; un survol la réveille.
6. Clavier : Tab atteint la Fiole, Entrée déclenche la réaction.
7. En anglais (bascule de langue du site) : phrases et `aria-label` en anglais.
8. Aucune erreur ni avertissement en console pendant ces tests ; en quittant une page pour une autre, pas d'erreur de minuterie.
9. `grep -rn "#[0-9a-fA-F]\{6\}" src/shell/mascotte/` ne renvoie rien (couleurs via tokens).
10. Captures jointes au RAPPORT : desktop (barre + Fiole), 375 px, bulle ouverte, Fiole toxique.
11. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
12. Tout est commité sur `auto/mascotte-fiole`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Réactions selon la page (journal sur /magazine, café sur /breves).
- Page 404 avec la Fiole toxique (« Cette page a été dissoute »).
- Déclinaison en avatar pour les réseaux sociaux (PNG 400×400).
- Compteur de clics conservé entre deux visites.
