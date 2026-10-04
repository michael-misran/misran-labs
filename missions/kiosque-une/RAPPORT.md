# Mission kiosque-une — RAPPORT

**Important pour la clôture : la pull request de cette mission vise `refonte-kiosque`, pas `main`** (D1 de la SPEC — la refonte sera mise en ligne d'un seul coup).

## Fait
- `/` affiche désormais `KiosqueHome` (`src/kiosque/KiosqueHome.jsx`, `KiosqueParts.jsx`, `kiosqueText.js`), le kiosque de la maison d'édition, alimenté par les vraies données (`getDays()`, `getIssues()`, `listeJeux()`, `visibleProjects()`, `FEEDS`), bilingue.
- `/lab` continue d'afficher `ArchiveHome`, inchangé.
- Section « À la une » : la Gazette du jour (titre, résumé en 2 colonnes avec lettrine, autres brèves, mot du jour), avec repli propre si `getDays()` est vide (section non affichée).
- Section « Sur les présentoirs » : 4 couvertures (Magazine, Zine, Jeux, Lab) sur tablettes noires, soulevées au survol (coupé sous `prefers-reduced-motion: reduce`), grille 4 / 2 / 1 colonnes selon la largeur.
- Bulletin d'abonnement : une case à cocher par entrée de `FEEDS`, lien vers `/suivre`.
- En-tête de la maison (`Masthead.jsx`) resserré sous 600 px (D8) : badge réduit, nom sur une ligne, accroche masquée — 128 px mesurés à 375 px (budget 200 px).
- Aucune ressource externe ni police privée ajoutée (D7) : trame de points du Zine et étoile « Bientôt ! » en CSS pur (dégradé radial + `clip-path`), pas d'image.

## Pas fait
Rien du périmètre de la SPEC n'a été laissé de côté. Hors périmètre (volontairement, voir SPEC) : refonte des pages `/breves`, `/magazine`, `/jeux`, `/lab` elles-mêmes ; harmonisation des noms de flux RSS et de `/suivre` ; la rubrique Zine ; toute modification de `Defilant.jsx`, `NavTitres.jsx` ou `Colophon.jsx`.

## Critères d'acceptation

| # | Critère | Résultat |
|---|---|---|
| 1 | `/` → `KiosqueHome`, `/lab` → `ArchiveHome`, `document.title` identique à `refonte-kiosque` en fr/en | PASS — vérifié dans le navigateur (fr : « Misran Labs — le laboratoire de Michael Misran », en : « Misran Labs — Michael Misran's lab », titre géré par `Shell.jsx`, non modifié) |
| 2 | Manchette = titre `ia` de `getDays()[0]`, lien `/breves/<date>`, mot du jour affiché | PASS — jour 2026-10-03, manchette « Anthropic lance une académie pour former 10 000 ingénieurs de déploiement », lien `/breves/2026-10-03`, terme « Taux de conversion » affiché |
| 3 | Magazine → `/magazine/<date getIssues()[0]>` + titre ; Zine sans `href`, `aria-disabled="true"` ; Jeux → `/jeux` + titre de chaque jeu ; Lab → `/lab` + « PIÈCES : n » | PASS — Magazine → `/magazine/2026-09-28` (« Prix en baisse, agents en expansion ») ; Zine : `<span aria-disabled="true">`, pas de `href` ; Jeux → `/jeux`, 3 jeux listés (Le geste parfait, À vue d'œil, Comme tout le monde) ; Lab → `/lab`, « PIÈCES : 9 » |
| 4 | Bulletin : un lien par entrée `FEEDS` + lien `/suivre` | PASS — 4 entrées (Lab Magazine, La Gazette du Lab, Projets, Tout) + « Tous les flux et réseaux → » vers `/suivre` |
| 5 | Aucun texte français en EN, sauf noms propres | PASS avec une réserve notée : `mot.terme` (« Taux de conversion ») reste en français en EN — la donnée `jours.js` n'a qu'un seul texte pour `terme` (pas de `fr`/`en`), comportement déjà identique sur `/breves` (`WordFigureBox`), pas une régression de cette mission. Tout le reste (y compris les 3 titres de jeux, les 4 articles du Magazine, le bulletin) est traduit. |
| 6 | 375 px : pas de débordement horizontal, header maison ≤ 200 px. 1366 px : 4 couvertures sur une ligne | PASS — à 375 px, `scrollWidth === innerWidth` (375), en-tête 128 px ; à 1366 px, 4 couvertures confirmées sur une seule ligne |
| 7 | `prefers-reduced-motion: reduce` → `animation-name` d'INSERT COIN = `none` | PASS par parité de code, non testé en émulation live — voir DECISIONS.md (outils de la session sans émulation de cette media feature) ; la règle CSS reproduit exactement le motif déjà en production dans `Defilant.jsx` |
| 8 | `git grep picsum\|unsplash\|.otf\|.ttf\|woff2?` sans nouveau résultat | PASS — aucun résultat |
| 9 | Aucune erreur console sur `/`, `/lab`, `/breves`, `/magazine`, `/jeux` | PASS — vérifié sur les 5 pages, fr et en |
| 10 | `npm run build` et `npm run lint` sans nouvelle erreur | PASS |
| 11 | Tout commité sur `auto/kiosque-une`, rien sur `main` ni `refonte-kiosque`, rien poussé | PASS |

## Comment vérifier
```
git checkout auto/kiosque-une
npm run build
npx vite preview --port 4173
```
Ouvrir `http://localhost:4173/` (375 px et 1366 px, bouton FR/EN en haut à droite). `/lab` doit afficher l'archive du Lab inchangée.

## Décisions
Voir `DECISIONS.md` — notamment : étapes 2 à 5 regroupées en un seul commit ; titre bilingue de la Gazette construit comme un tableau de segments pour colorer G et L dans les deux langues ; jargon d'arcade (INSERT COIN, 1UP/HI, ML-LAB) gardé identique en fr/en ; étoile du Zine en `clip-path` fixe plutôt que calculée en JS ; pas de couverture Magazine si `getIssues()` est vide ; vérification finale faite par la session principale après échec du sous-agent `verificateur` (deux tentatives, interrompu).

## Délégations
Voir `DELEGATIONS.md`. Un seul modèle a réellement travaillé sur le code de cette mission : **Claude Sonnet 5** (session principale, toutes les étapes 1 à 8). Le cadrage (étape 0) a été fait par **Claude Opus 5.5**. La délégation prévue au `verificateur` (Haiku) pour l'étape 7 n'a pas abouti (agent non lancé aux deux tentatives) ; l'étape a été faite par Sonnet.

## Recommandations
- **kiosque-annexes** (prochaine mission prévue par la SPEC) : harmoniser les noms des flux RSS entre le bulletin, `/suivre` et la 404.
- La rubrique Zine elle-même reste à cadrer avec Michael (hors périmètre ici, seule une couverture « bientôt » existe sur `/`).
- `mot.terme` n'a pas de traduction EN dans le schéma de données de `src/breves/jours.js` — à considérer si une vraie traduction du mot du jour devient souhaitable (changement de schéma, hors périmètre de cette mission).
- Le sous-agent `verificateur` a échoué à se lancer deux fois de suite dans cette session de routine ; si cela se reproduit sur d'autres missions, vaut la peine d'être signalé à Michael (possible souci d'environnement des sous-agents en session programmée).
