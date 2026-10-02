# Mission jeux-estimation — RAPPORT

## Fait
- Prérequis vérifié : `src/jeux/socle/` présent (mission `jeux-geste` fusionnée, PR #34).
- Deuxième jeu **À vue d'œil** (`src/jeux/a-vue-d-oeil/`) : estimation d'une quantité en un coup d'œil (5 s), puis position sur une courbe de réponses simulées.
  - `meta.js` : slug `a-vue-d-oeil`, icône 👁, couleur `violet`, `demo: true`, `entrainement: false`.
  - `Jeu.jsx` : flux `prêt` → `regarder` (5 s, barre de temps via `requestAnimationFrame`) → `reponse` (image floutée `blur(14px)`, saisie numérique `inputmode="numeric"`) → `resultat` (vraie valeur, score, `ResultatPartage` du socle, `Courbe`). Résultat persistant (`localStorage`, clé commune `misran-jeux`) : un rechargement réaffiche directement le résultat du jour sans nouvel essai.
  - `score.js` : écart relatif et score (D4) pour les 4 types « à compter », écart absolu en points pour le type pourcentage (« pois ») ; classification emoji 🎯/🟩/🟨/🟥 et flèche ⬆️/⬇️.
  - 5 types en rotation (`src/jeux/a-vue-d-oeil/types/`, `numeroDuJour % 5`), chacun scindé en `<type>.generer.js` (logique pure, sans JSX, testable depuis Node) et `<type>.jsx` (rendu SVG) :
    1. **Bocal** — bonbons placés dans une silhouette de bocal avec chevauchement partiel toléré (40 à 400).
    2. **Ciel étoilé** — étoiles à tailles/opacités variées (80 à 600).
    3. **Foule vue de haut** — têtes réparties en grappes irrégulières (50 à 500).
    4. **Carte à pois** — grille 30×30 coloriée par croissance organique depuis plusieurs graines (5 % à 70 %).
    5. **Allumettes en vrac** — bâtonnets dispersés à orientation aléatoire (30 à 250).
  - `distribution.js` : 500 réponses simulées log-normales (centrées sur 0,9 × la vraie valeur, écart-type log 0,35), graine du jour distincte de celle de l'image (`${slug}-courbe`), 100 % déterministe.
  - `Courbe.jsx` : histogramme SVG 20 barres, 3 repères (vraie valeur, réponse du joueur, médiane de la foule), phrase de percentile et phrase sur la réponse de la foule.
  - `JeuxHome.jsx` : `A_VENIR` passé de 2 à 1 (3e emplacement toujours « Bientôt »).
- `missions/jeux-estimation/verifier-types.mjs` : contrôle Node, 50 graines × 5 types, vérifie que chaque valeur est dans sa plage et égale au nombre d'éléments réellement générés (ou au pourcentage recalculé depuis la grille pour « pois ») — tous les contrôles passent.

## Pas fait
Rien du périmètre de la SPEC n'a été laissé de côté (voir « Hors périmètre » ci-dessous pour ce qui était explicitement exclu).

## Critères d'acceptation
1. **OK** — `/jeux` affiche 2 vraies cartes (Le geste parfait, À vue d'œil) + 1 « Bientôt » (vérifié en direct par le verificateur).
2. **OK** — bandeau de démo affiché, bouton « Je suis prêt », image visible 5 s avec barre de temps puis flou fort, saisie numérique possible ensuite (vérifié en direct).
3. **OK (version allégée)** — la page du jour s'affiche sans erreur console avec un des 5 types attendus ; `?date=` n'a pas pu être exercé (même limitation d'environnement que la mission `jeux-geste` : `import.meta.env.DEV` vaut toujours `false` dans tout ce que produit `vite build`, y compris `npx vite preview` — voir DECISIONS.md de `jeux-geste`). La rotation et le déterminisme sont néanmoins garantis par construction (`TYPES[numeroDuJour % TYPES.length]`, graine = hash(slug+date)) et vérifiés indépendamment par `verifier-types.mjs` (déterminisme implicite : même graine en entrée → même sortie, testé sur 50 graines par type) et par calcul manuel.
4. **OK** — `node missions/jeux-estimation/verifier-types.mjs` : 50 graines × 5 types, aucun échec.
5. **OK** — après réponse : vraie valeur, score, histogramme avec les 3 repères, phrase de position affichés (vérifié en direct : 309 étoiles, réponse 100, score 32,4 %, médiane 281, écart 9 %, « plus proche que 3 % des joueurs »). Rechargement : résultat réaffiché directement, mêmes valeurs, série « 🔥 1 jour » conservée.
6. **OK** — texte de partage conforme à D6 (titre + numéro + icône, type + emoji + flèche + écart, série, domaine), vraie valeur absente du texte. Confirmé par relecture du code à partir des valeurs réelles observées (309/100/32,4 %) : la lecture directe du presse-papiers (`navigator.clipboard.readText()`) a échoué dans le navigateur du sous-agent de vérification (voir DECISIONS.md) — risque résiduel faible, la fonction `construireTexte` est une simple concaténation de chaînes sans branche non testée.
7. **OK** — à 375 px : pas de défilement horizontal, image et histogramme lisibles, `inputmode="numeric"` confirmé sur le champ de saisie (vérifié en direct, captures prises).
8. **OK** — `/jeux/a-vue-d-oeil` présent dans `dist/sitemap.xml` (33 URL au total), généré par la lecture générique de `meta.js` dans `share-previews.js` (fichier non modifié).
9. **OK** — `git diff --stat main...auto/jeux-estimation` : seuls `src/jeux/a-vue-d-oeil/**`, `missions/jeux-estimation/**` et la ligne `A_VENIR` de `src/jeux/JeuxHome.jsx` sont modifiés.
10. **OK** — `package.json`/`package-lock.json` inchangés ; aucune couleur en dur hors des illustrations SVG générées dans `types/` (précédent déjà posé par `geste-parfait/defis/cercle.jsx`) — vérifié par grep sur `Jeu.jsx`, `Courbe.jsx`, `score.js`, `distribution.js`. `npm run build` et `npm run lint` : OK, 0 nouvelle erreur.
11. **OK** — tout commité sur `auto/jeux-estimation` (`git status` propre), rien sur `main`, rien poussé.

## Comment vérifier
1. `npm run build` puis `npx vite preview`.
2. Ouvrir `/jeux` : 2 cartes + 1 « Bientôt ». Ouvrir `/jeux/a-vue-d-oeil` : bandeau démo, « Je suis prêt », image 5 s puis flou, saisie, résultat avec courbe et partage.
3. `node missions/jeux-estimation/verifier-types.mjs` pour le contrôle automatisé des 5 types (critère 4).
4. Pour voir les 5 types sur 5 jours consécutifs (critère 3, nécessite le vrai serveur de dev) : `npm run dev`, puis `/jeux/a-vue-d-oeil?date=2026-10-01` à `2026-10-05`.

## Décisions (voir DECISIONS.md pour le détail complet)
- Couleur de carte `violet` (geste-parfait a déjà pris `mandarine`).
- Ajout d'un champ `nom{fr,en}` à l'interface de type (non listé par D2, nécessaire pour le texte de partage D6).
- Texte de partage construit localement dans `Jeu.jsx` plutôt que via `socle/partage.js#construireTextePartage` : le format D6 n'inclut pas la barre 10 cases ni le score chiffré que la fonction commune ajoute toujours.
- Chaque type scindé en `<type>.generer.js` (logique pure) + `<type>.jsx` (rendu) : `verifier-types.mjs` doit importer la logique directement depuis Node, qui ne transforme pas le JSX.
- « Carte à pois » : grille 30×30 remplie par croissance depuis plusieurs graines (flood-fill aléatoire) plutôt que des pois ronds classiques, pour un pourcentage exact et un contour organique.
- Couleurs des illustrations générées (bonbons, têtes, allumettes) en dur (hex), comme le précédent `cercle.jsx` : le contenu généré n'est pas le chrome de l'interface visé par le critère sur les jetons.
- Graine de la distribution simulée distincte de celle de l'image (`${slug}-courbe`).
- Écart de la médiane dans `Courbe.jsx` toujours en pourcentage relatif, y compris pour « pois » : la SPEC ne prévoit pas d'exception et `Courbe` reste générique.
- Critère 6 accepté sur relecture de code plutôt que lecture réelle du presse-papiers (limitation du navigateur de vérification automatisée, pas du code).

## Délégations (voir DELEGATIONS.md pour le détail)
- Étape 5 (vérification navigateur) : sous-agent `verificateur` en Haiku 4.5. Verdict OK sur tous les critères assignés ; a signalé l'échec de la lecture du presse-papiers pour le texte de partage (contournée par relecture de code, voir ci-dessus).
- Toutes les autres étapes (1 à 4, 6, 7) : session principale en Sonnet 5.

## Recommandations (hors périmètre de cette mission)
- **Vérifier le critère 3 en session interactive** (`npm run dev` + `?date=`) pour confirmer visuellement la rotation des 5 types sur 5 jours consécutifs, comme déjà recommandé pour `jeux-geste` — même limitation d'environnement, pas un défaut de code.
- **Vraies réponses des joueurs** : la courbe reste simulée (bandeau de démo affiché) ; nécessiterait une base de données partagée (coût et décision à valider par Michael), comme déjà noté pour `jeux-geste`.
- **Image d'aperçu de partage propre à « À vue d'œil »** : l'image par défaut du site est actuellement réutilisée.
- **Rejeu ou archives des jours passés** : explicitement hors périmètre, rien ajouté.
