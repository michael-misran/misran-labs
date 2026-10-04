# Mission gazette-web — PROGRESS

**Statut :** terminée
**Prochaine action :** clôture (PR vers `refonte-kiosque`)
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

## Étape 4 (exécution, 2026-10-04)
- `BrevesHome.jsx` réécrit : `GazetteTete` + `GazetteEdition` du dernier jour, encadré « S'abonner à la Gazette » (lien RSS `/breves/rss.xml` en `<a href>` classique — fichier statique, pas une route SPA — et lien `/suivre`), index « Les éditions précédentes » en lignes à points de conduite (date ... titres). Plus aucun import de `MagazineHero`, `CaseMasthead`/`CaseMetaRow`/`CaseFooter`, `SectionTitle`, `Tag`, `SuivreBandeau`, `BrevesParts`.
- `npm run build` et `npm run lint` : OK.

## Étape 5 (exécution, 2026-10-04)
- `BrevesJour.jsx` réécrit : `GazetteTete` + `GazetteEdition` du jour demandé, navigation « ← Édition précédente / Toutes les éditions / Édition suivante → » entre doubles filets. Page « Pas d'édition ce jour-là » dans le même style (même `GazetteTete`, sans date puisqu'aucun jour réel ne correspond).
- `BrevesParts.jsx` supprimé entièrement : plus aucun importeur après la réécriture de `BrevesHome.jsx`/`BrevesJour.jsx` (`grep -rln "BrevesParts" src` → vide avant suppression).
- Critère d'acceptation 1 revérifié : `git grep -nE "magazine/|lab/CaseFile|lab/caseChrome|SuivreBandeau" -- src/breves/` renvoyait 3 lignes — un commentaire de `brevesText.js` qui citait ces mots en prose (aucun import réel) — reformulé pour que le grep ne renvoie plus rien. `git diff --stat refonte-kiosque...HEAD -- src/magazine src/lab src/kiosque src/breves/jours` est vide (ces dossiers ne sont pas touchés).
- `npm run build` et `npm run lint` : OK.

## Étapes 6-7 (session interactive avec Michael, 2026-10-04)
- La routine avait coché l'étape 6 sans l'enregistrer dans Git ni la consigner ici (passage interrompu, limite hebdomadaire atteinte). Michael a demandé de finir la mission en session interactive.
- Vérification refaite dans un essai local combiné avec `refonte-kiosque` à jour (missions magazine-web, jeux-arcade, lab-dossiers, idees-cv, zine et PR Germanica déjà fusionnées) : aucun conflit.
- Retouche : navigation de `/breves/:date` en grille 3 colonnes, « Toutes les éditions » centré même sans édition voisine.
- `npm run build` OK, `npm run lint` 0 erreur.
