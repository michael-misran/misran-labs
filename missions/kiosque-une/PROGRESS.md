# Mission kiosque-une — PROGRESS

**Statut :** étapes 1 à 7 faites
**Prochaine action :** étape 8 (RAPPORT.md)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-10-04, branche `refonte-kiosque` = 99d9d7f)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.

## Étape 1 (reconfirmation, 2026-10-04)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.

## Étapes 2 à 5 (2026-10-04)
Créé `src/kiosque/kiosqueText.js`, `KiosqueParts.jsx`, `KiosqueHome.jsx` ; route `/` → `KiosqueHome` dans `App.jsx` (index route), `/lab` inchangé (`ArchiveHome`). `npm run build` et `npm run lint` : OK après deux corrections lint (props non utilisées).

Vérification dans le navigateur (`npm run build` + `npx vite preview` + Browser pane, pas de preview « dev » en routine) à 375 px et 1366 px, FR et EN :
- Bug trouvé et corrigé : « ☞ » du kicker dupliqué (rendu une fois en span dédié, une fois dans le texte `kickerPrefix`) → retiré du texte.
- Manchette = titre `ia` du jour (2026-10-03), lien « Lire la Gazette » → `/breves/2026-10-03` : OK.
- Magazine → `/magazine/2026-09-28`, titre affiché : OK. Zine : pas de `href`, `aria-disabled="true"` : OK. Jeux → `/jeux`, 3 jeux listés : OK. Lab → `/lab`, « PIÈCES : 9 » (= `visibleProjects().length`) : OK.
- Bulletin : 4 entrées de `FEEDS` + lien `/suivre` : OK.
- 375 px : header de la maison 128 px (≤ 200 px), « MISRAN LABS » sur une ligne, `scrollWidth === innerWidth` : OK. 1366 px : 4 couvertures sur une ligne : OK.
- EN : texte intégralement traduit, sauf `mot.terme` (« Taux de conversion ») — la donnée n'a qu'une forme, comme déjà le cas sur `/breves` (`WordFigureBox`) ; pas une régression de cette mission.
- `prefers-reduced-motion: reduce` : non testable depuis le navigateur de la session (pas d'émulation de cette media feature dans les outils disponibles, contrairement à `colorScheme`) ; la règle CSS suit exactement le motif déjà en production dans `Defilant.jsx` (`@media (prefers-reduced-motion: reduce) { .x { animation: none } }`).
- Aucune erreur console sur `/`, `/lab`, `/breves`, `/magazine`, `/jeux`.
- `git grep -nE "picsum|unsplash|\.otf|\.ttf|woff2?" -- src index.html` : aucun résultat.

## Étape 6 (2026-10-04)
`Masthead.jsx` : nouveau palier `useIsMobile(600)` (D8). En dessous de 600 px : badge 46×50, label 16px, accroche masquée, h1 en `clamp(24px, 9vw, 34px)` + `nowrap`, paddings resserrés (en-tête et filet du haut). Mesuré à 375 px : en-tête de la maison 128 px (budget 200 px), titre sur une seule ligne. `npm run build` et `npm run lint` : OK.

## Étape 7 (2026-10-04)
Le sous-agent `verificateur` ne s'est pas lancé aux deux tentatives (voir DECISIONS.md) ; vérification finale faite par la session principale.
- `npm run build` : OK. `npm run lint` : OK, 0 erreur.
- `git grep -nE "picsum|unsplash|\.otf|\.ttf|woff2?" -- src index.html` : aucun résultat (critère 8).
- Critères 1 à 7 et 9 : couverts par les vérifications navigateur déjà faites et consignées aux étapes 2-5 et 6 ci-dessus (document.title, liens des 4 couvertures, bulletin, traduction EN, 375 px/1366 px, absence d'erreurs console sur les 5 pages). Seul le critère 7 (`prefers-reduced-motion`) n'a pas pu être testé en live (outils de la session sans émulation de cette media feature) — vérifié par parité de code avec `Defilant.jsx`.
