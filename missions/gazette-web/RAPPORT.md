# Mission gazette-web — RAPPORT

**Branche** : `auto/gazette-web`, partie de `refonte-kiosque` (07a40cd). Rien commité sur `main` ni `refonte-kiosque`.
**La pull request de clôture vise `refonte-kiosque`**, pas `main` (règle commune aux missions de la refonte kiosque).
Étapes 1 à 5 faites par la routine, étapes 6 et 7 terminées en session interactive avec Michael le 2026-10-04 (la routine avait atteint sa limite hebdomadaire).

## Fait
- `src/breves/brevesText.js` : plus d'import du Magazine ; groupes `tete` et `edition`, libellés « éditions » (D5, D6).
- `src/breves/GazetteParts.jsx` (nouveau) : `GazetteTete` (tête de journal, titre gothique avec G et L rouges, oreilles « édition du matin » / « prix : un café », bandeau date / parution / nombre de brèves) et `GazetteEdition` (une avec lettrine encadrée, colonnes, autres brèves en polices « bois », sources, mot et chiffre du jour, ornement ❧).
- `src/breves/BrevesHome.jsx` réécrit : tête, édition du dernier jour, encadré « S'abonner à la Gazette » (RSS + Suivre), index « Les éditions précédentes » à points de conduite.
- `src/breves/BrevesJour.jsx` réécrit : tête, édition du jour, navigation « ← Édition précédente / Toutes les éditions / Édition suivante → », page « Pas d'édition ce jour-là ».
- `src/breves/BrevesParts.jsx` supprimé (plus aucun importeur).

## Retouche à la clôture
- Navigation de `/breves/:date` : « Toutes les éditions » se décalait quand il manquait l'édition précédente ou suivante. Grille en 3 colonnes égales.

## Critères d'acceptation
1. `git grep -nE "magazine/|lab/CaseFile|lab/caseChrome|SuivreBandeau" -- src/breves/` → vide. Diff sans `src/magazine/`, `src/lab/`, `src/kiosque/` ni `src/breves/jours/`. ✅
2. Tête « La Gazette du Lab » / « The Lab Gazette », G et L en rouge, manchette = brève `ia` du dernier jour. ✅ Note : depuis la PR #44, le titre est en Germanica et non plus en UnifrakturMaguntia comme l'écrivait la SPEC.
3. Brèves du dernier jour avec sources cliquables, mot du jour affiché. ✅
4. « Éditions précédentes » : tous les jours sauf le premier, chacun avec son lien. ✅
5. Jour le plus ancien : seulement « Édition suivante » ; jour le plus récent : seulement « Édition précédente » ; `/breves/1999-01-01` → « Pas d'édition ce jour-là ». ✅
6. En anglais, aucun texte resté en français, hors `mot.terme` (donnée monolingue). ✅
7. À 375 px : pas de débordement horizontal sur `/breves` et `/breves/<date>` ; titre gothique dans son cadre (336 px pour un cadre de 352). ✅
8. `document.title` : « The Gazette · Misran Labs », « The Gazette — October 3, 2026 · Misran Labs » (logique inchangée). ✅
9. Aucune erreur console propre à la Gazette sur `/breves`, chaque date, `/breves/1999-01-01`, `/`, `/magazine`. ✅
10. `npm run build` OK, `npm run lint` 0 erreur. ✅
11. Tout commité sur `auto/gazette-web`. ✅

## Décisions prises sans Michael
Voir `DECISIONS.md` : formats de date redéclarés localement, `BrevesParts.jsx` supprimé, commentaire reformulé pour le grep du critère 1.

## Délégations
- Cadrage : Opus 5.5. Étapes 1 à 5 : routine, Sonnet 5.5.
- Étapes 6 et 7 : session interactive, Opus 5.5 (le `verificateur` n'a pas été utilisé).

## Recommandations
- **kiosque-finitions** : supprimer `SuivreBandeau` s'il ne sert plus nulle part (le Magazine et la Gazette ne l'utilisent plus).
- Missions suivantes de la refonte : `kiosque-annexes` (pas encore démarrée), puis cadrer `kiosque-finitions`.
