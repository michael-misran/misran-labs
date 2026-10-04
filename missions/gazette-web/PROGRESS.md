# Mission gazette-web — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 4 (`/breves`)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-10-04, branche `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.

## Étape 1 (exécution, 2026-10-04)
- `npm run build` : OK. `npm run lint` : OK, 0 erreur. État inchangé depuis le cadrage.
- Repéré en lisant le code : `brevesText.js` importe et ré-exporte `formatDateShort`/`formatDateLong` depuis `src/magazine/magazineText.js`. Le critère d'acceptation 1 (`git grep -nE "magazine/..." -- src/breves/`) s'applique à tout `src/breves/`, y compris ce fichier : cet import doit être retiré, les deux fonctions redéclarées localement dans `brevesText.js` (seul `rubriqueLabel` est importé depuis l'extérieur — `src/kiosque/KiosqueParts.jsx` — donc retirer le ré-export est sans risque).

## Étapes 2-3 (exécution, 2026-10-04)
- `brevesText.js` réécrit : plus d'import de `magazine/magazineText.js` (`formatDateShort`/`formatDateLong` redéclarées localement). Ajout des groupes `tete` (oreilles, titre segmenté G/L, devise, « paraît chaque matin », compteur de brèves) et `edition` (kicker, libellé des sources). Valeurs changées (pas de clé renommée) pour coller aux libellés D5/D6 : `previousDaysTitle` → « Les éditions précédentes », `empty` → « Aucune édition pour l'instant. », `previousDay`/`nextDay` → « ← Édition précédente »/« Édition suivante → », `notFoundTitle` → « Pas d'édition ce jour-là ». Ajout de `home.subscribeTitle`/`subscribeBody`/`rssLabel`/`suivreLabel` (D5).
- `GazetteParts.jsx` créé : `GazetteTete` (tête de journal, D3, avec `wordSpacing: var(--font-gothique-espace, normal)` pour l'ajout Germanica du 2026-10-04), `GazetteEdition` (une + autres brèves + sources + mot/chiffre + ornement ❧, D4), et des sous-composants locaux non exportés (`SourcesGazette`, `Ornement`, `EncadreMot`, `EncadreChiffre`). Lettrine encadrée en `--font-bois-3` via `::first-letter` (`<style>` dans `GazetteEdition`, même technique que `JeuxHome`/`MagazineHome`). Polices « bois » alternées (`BOIS_FONTS`) pour les titres des autres brèves.
- `npm run build` et `npm run lint` : OK (pas encore branché dans les pages, étapes 4-5).
