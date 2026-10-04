# Mission jeux-arcade — PROGRESS

**Statut :** terminée
**Prochaine action :** clôture (push + PR vers `refonte-kiosque`, en session interactive avec Michael)
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

## Étape 4 (exécution, 2026-10-04)
- `JeuPage.jsx` : `BarreJeu` au-dessus, bandeau démo conservé, le composant du jeu rendu tel quel dans `CadreBorne` (fond clair à l'intérieur). Chemin 404 (slug inconnu → `Page404`) inchangé.
- `ResultatPartage.jsx` (habillage seulement, D1) : ajout d'une étiquette pixel « GAME OVER » / `bravo` au-dessus du score, clignotante (`.arcade-blink`, coupée sous `prefers-reduced-motion: reduce` via le `<style>` de `JeuPage.jsx`). Seuil retenu : `score >= 50` → `bravo`, sinon GAME OVER (`DECISIONS.md`). Aucune donnée ni comportement de partage modifié.
- Critère d'acceptation 1 revérifié : `git diff --stat refonte-kiosque...HEAD -- src/jeux/geste-parfait src/jeux/a-vue-d-oeil src/jeux/comme-tout-le-monde src/jeux/registre.js src/jeux/socle/jour.js src/jeux/socle/serie.js src/jeux/socle/partage.js` → vide.
- `npm run build` et `npm run lint` : OK.

## Étape 5 (exécution, 2026-10-04)
- Sous-agent `verificateur` (Haiku) lancé en avant-plan : `npx vite preview`, tous les critères 2-7 vérifiés en FR/EN, navigation clavier (flèche bas + Entrée → 2e jeu), 375px, reduced-motion. Tout OK. N'a pas pu finir une partie jusqu'à l'écran de résultat (jeux trop longs à jouer en quelques actions dans le temps imparti) — l'habillage de `ResultatPartage` (GAME OVER/BRAVO) n'a donc été vérifié qu'en relecture de code, pas en conditions réelles. Noté en recommandation du RAPPORT.

## Étape 6 (exécution, 2026-10-04)
- `RAPPORT.md` écrit. Mission terminée, prête pour la clôture (push + PR vers `refonte-kiosque`) en session interactive.
