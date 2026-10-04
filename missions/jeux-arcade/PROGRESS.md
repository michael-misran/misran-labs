# Mission jeux-arcade — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 4 (page `/jeux/:slug`)
**Blocages :** aucun

## État initial (cadrage, 2026-10-04, `refonte-kiosque` = 07a40cd)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.
- Cadrée en parallèle de gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, kiosque-annexes et zine : respecter « Fichiers autorisés ».

## Étape 1 (exécution, 2026-10-04)
- `npm run build` : OK. `npm run lint` : OK, 0 erreur. État inchangé depuis le cadrage.

## Étape 2 (exécution, 2026-10-04)
- `src/jeux/ArcadeParts.jsx` créé : `EcranCathodique` (borne, écran cathodique, envahisseur en pixels, INSERT COIN clignotant), `MenuSelectGame` (menu « SELECT GAME » navigable au clavier, flèches + Entrée, curseur ▶ clignotant), `BoiteJeu` (jaquette de cartouche), `BarreJeu` (barre de /jeux/:slug), `CadreBorne` (cadre avec coins à vis en CSS). Couleurs d'écran cathodique en dur (#0b1a10, #111, #2a2a2a), inspirées de `KiosqueParts.CouvertureJeux` sans l'importer — même choix déjà fait là-bas.
- `jeuxText.js` : ajout de `arcadeTitre`, `joueur1`, `zeroPub`, `bravo` (fr/en). Le reste du jargon d'arcade (INSERT COIN, 1UP, HI, SELECT GAME, PRESS START, GAME OVER, MENU) reste identique en français et en anglais, non traduit.

## Étape 3 (exécution, 2026-10-04)
- `JeuxHome.jsx` réécrit : `EcranCathodique` en tête, `MenuSelectGame`, puis la grille de `BoiteJeu`. Les cartes fantômes « Bientôt » (`A_VENIR`, toujours à 0) ont été retirées : elles ne rendaient plus rien, code mort.
- `npm run build` et `npm run lint` : OK.
