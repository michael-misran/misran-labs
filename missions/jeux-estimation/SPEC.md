# Mission jeux-estimation — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « l'estimation du jour : deviner un chiffre, puis voir où on se situe sur la courbe de tous les joueurs ».

**Prérequis : la mission `jeux-geste` est fusionnée dans `main`.** Elle apporte le socle `src/jeux/` (registre, jour, série, partage, page d'accueil). La branche `auto/jeux-estimation` est créée depuis `main` **après** cette fusion. Si `src/jeux/socle/` est absent de la branche : écrire le blocage dans PROGRESS.md, écrire RAPPORT.md (« prérequis manquant ») et s'arrêter.

## Contexte
- Lire `missions/jeux-geste/SPEC.md` (D1 à D11) : cette mission en réutilise toutes les conventions (dossier par jeu, `meta.js` en données pures, essai officiel quotidien, partage, série).
- Ajouter un jeu = créer `src/jeux/a-vue-d-oeil/`. Seule ligne partagée touchée : `A_VENIR` dans `src/jeux/JeuxHome.jsx`, qui perd une unité.

## Objectif
`/jeux/a-vue-d-oeil` montre chaque jour une image générée (un bocal de bonbons, un ciel étoilé…). Le joueur estime une quantité **d'un coup d'œil**, découvre la vraie valeur, son score, et sa position sur la courbe des réponses des joueurs (simulées pour l'instant, et affichées comme telles).

## Décisions (tranchées, ne pas rediscuter)

**D1 — Nom.** fr « À vue d'œil », en « Eyeball it ». Slug `a-vue-d-oeil`, icône 👁, `ordre: 2`, `demo: true`, `entrainement: false` (pas de rejeu : l'image du jour serait déjà connue).

**D2 — Images générées, jamais de faits à vérifier.** Aucune question de culture générale : la bonne réponse est **construite** par le code, donc exacte par définition, universelle et sans barrière de langue. Aucun fichier image : tout est en SVG généré depuis la graine du jour (`socle/jour.js`). 5 types en rotation (`numeroDuJour % 5`) :
1. **Bocal de bonbons.** Combien de bonbons ? N entre 40 et 400, formes et couleurs variées, avec des chevauchements plausibles (placement dans la silhouette du bocal).
2. **Ciel étoilé.** Combien d'étoiles ? N entre 80 et 600, tailles variées.
3. **Foule vue de haut.** Combien de personnes (des cercles « têtes ») ? N entre 50 et 500, regroupements irréguliers.
4. **Carte à pois.** Quel pourcentage de la surface est coloré ? La réponse va de 5 % à 70 %, le calcul se fait sur une grille fine.
5. **Allumettes en vrac.** Combien d'allumettes ? N entre 30 et 250, orientations aléatoires.
Chaque type est un module de `a-vue-d-oeil/types/` qui exporte `{ id, question{fr,en}, unite{fr,en}, generer(rng) → { valeur, Svg } }`. La valeur retournée est exactement ce qui est dessiné : si un élément est rejeté au placement, il n'est pas compté.

**D3 — Coup d'œil limité.** L'image s'affiche 5 secondes avec une barre de temps, puis se floute fortement (CSS `filter: blur`). Le chrono ne démarre qu'au clic sur « Je suis prêt », pour éviter que le chargement de la page ne mange le temps. Ensuite, le joueur saisit un nombre (clavier numérique sur mobile : `inputmode="numeric"`) et valide. Une seule réponse officielle par jour.

**D4 — Score.** Écart relatif e = |réponse − vraie| / vraie. Score = max(0, round(100 × (1 − e)), 1 décimale). Pour le type 4 (pourcentage), on prend l'écart absolu en points : score = max(0, 100 − 2 × |écart|). Emojis de partage : 🎯 si e ≤ 5 %, 🟩 si ≤ 15 %, 🟨 si ≤ 35 %, 🟥 au-delà, suivis d'une flèche ⬆️ (le joueur a sous-estimé) ou ⬇️ (il a surestimé).

**D5 — La courbe des joueurs (simulée, affichée comme telle).** `meta.demo: true` déclenche le bandeau de démo du socle. La distribution simulée est déterministe (graine du jour) : 500 réponses log-normales centrées sur 0,9 × la vraie valeur (on sous-estime en général les grandes quantités), écart-type log ≈ 0,35. Affichage : un histogramme SVG (20 barres), un trait pour la vraie valeur, un pour la réponse du joueur, un pour la médiane de la « foule ». Phrase : « Tu es plus proche que X % des joueurs » + « La foule a dit M (écart Y %) ». Le composant `Courbe.jsx` reçoit un simple tableau de réponses : le jour où une vraie base existera, seule la source des données changera.

**D6 — Partage.**
```
À vue d'œil n° 12 👁
Bocal : 🟩 ⬇️ (écart 11 %)
🔥 3 jours
misran-labs…/jeux/a-vue-d-oeil
```
On ne donne jamais la vraie valeur dans le partage, pour ne pas gâcher le jeu des autres.

**D7 — Bilingue, accessible, mobile.** Textes fr/en. Les nombres sont formatés selon la langue (`Intl.NumberFormat`). Le SVG est responsive (viewBox) et lisible à 375 px. L'image a un `aria-label` générique (« Image à estimer ») qui ne révèle pas la réponse.

## Critères d'acceptation
1. `/jeux` affiche 2 vraies cartes (Le geste parfait, À vue d'œil) + 1 « Bientôt ».
2. `/jeux/a-vue-d-oeil` affiche le bandeau de démo, puis « Je suis prêt ». L'image apparaît 5 s puis se floute, et la saisie est possible.
3. Avec `?date=` (dev), 5 jours consécutifs donnent les 5 types, et une même date donne toujours la même image et la même valeur.
4. Un contrôle Node (`missions/jeux-estimation/verifier-types.mjs`) vérifie pour 50 graines et chaque type que la valeur est dans sa plage et égale au nombre d'éléments réellement générés (ou au % calculé).
5. Après réponse : vraie valeur, score, histogramme avec les 3 repères, phrase de position. Recharger réaffiche le résultat sans nouvel essai.
6. Le texte de partage suit D6 et ne contient pas la vraie valeur.
7. À 375 px : image et histogramme lisibles, pas de défilement horizontal, clavier numérique.
8. Aperçu de partage et sitemap de `/jeux/a-vue-d-oeil` générés automatiquement (lecture générique de `jeux-geste`), sans toucher à `share-previews.js`.
9. Aucun fichier modifié hors de `src/jeux/a-vue-d-oeil/`, `missions/jeux-estimation/` et la ligne `A_VENIR` (vérifier avec `git diff --stat main...`).
10. Pas de nouvelle dépendance, pas de couleur en dur hors jetons. `build` passe, `lint` sans nouvelle erreur.
11. Tout est commité sur `auto/jeux-estimation`, rien sur `main`, rien de poussé.

## Hors périmètre
- Vraies réponses des joueurs (base de données : décision et coût à valider par Michael).
- Questions de culture générale (chiffres à sourcer).
- Rejeu ou archives des jours passés.
