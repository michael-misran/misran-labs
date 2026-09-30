# Mission jeux-geste — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « une rubrique de petits jeux façon neal.fun, plusieurs jeux, une mission par jeu : le geste parfait, l'estimation du jour, une famille en or ». Étude de départ : `ressources/etude-petits-jeux-rentables.md`.

Première des trois missions de la rubrique `/jeux`. Elle pose le **socle commun** et la **page d'accueil**, puis livre le premier jeu. Les missions `jeux-estimation` et `jeux-majorite` sont déjà rédigées dans `missions/`. Elles ne démarrent qu'après la fusion de celle-ci (voir D12).

## Contexte
- Site Vite + React 19 + react-router, bilingue fr/en (`src/i18n/ui.js`, `useLanguage`). Routes dans `src/App.jsx`, titres d'onglet dans `src/shell/registry.js` (`resolveRouteMeta`), menu dans `src/shell/Sidebar.jsx`. Aperçus de partage et sitemap dans `scripts/share-previews.js`. Jetons de design dans `src/styles/tokens.css`.
- Modèle de rubrique à imiter pour le chargement par dossier : `src/breves/jours.js` (`import.meta.glob`).
- Aucune rubrique de jeux n'existe aujourd'hui. Il existe un jeu dans le Lab (`src/lab/GameDemo*.jsx`, Lost Cauldron), mais il est sans rapport : ne pas y toucher.

## Objectif
`/jeux` affiche une page d'accueil façon neal.fun (une carte par jeu). `/jeux/geste-parfait` propose chaque jour un défi d'adresse, noté en %, avec un résultat partageable en emojis et une série de jours joués. Ajouter un jeu ensuite = ajouter **un dossier**, sans toucher aux fichiers partagés.

## Décisions (tranchées, ne pas rediscuter)

**D1 — Arborescence.**
```
src/jeux/
  JeuxHome.jsx        page /jeux (grille de cartes)
  JeuPage.jsx         page /jeux/:slug (en-tête commun + composant du jeu, 404 si slug inconnu)
  registre.js         liste des jeux via import.meta.glob('./*/meta.js', { eager: true })
                      + composants via import.meta.glob('./*/Jeu.jsx') (lazy)
  jeuxText.js         textes communs fr/en de la rubrique
  socle/
    jour.js           date du jour, numéro du jour, graine déterministe
    serie.js          série et historique (localStorage)
    partage.js        construction du texte à partager + partage/copie
    ResultatPartage.jsx  bloc de résultat commun (score, série, bouton partager)
  geste-parfait/
    meta.js  Jeu.jsx  defis/…
```
Un jeu = un dossier `src/jeux/<slug>/` avec au minimum `meta.js` et `Jeu.jsx`. Les missions suivantes ne créeront que leur propre dossier : c'est ce qui évite les conflits entre branches.

**D2 — `meta.js` = données pures.** Aucun JSX ni import de composant, pour que `scripts/share-previews.js` (Node) puisse le lire par `import()`. Forme :
```js
export default {
  slug: 'geste-parfait',
  ordre: 1,                     // position sur la page d'accueil
  icone: '◎',                   // caractère ou emoji
  couleur: '…',                 // nom d'un jeton de tokens.css pour l'accent de la carte
  titre: { fr: 'Le geste parfait', en: 'The perfect touch' },
  accroche: { fr: '…', en: '…' }, // une phrase, affichée sur la carte et dans l'aperçu de partage
  demo: false,                  // true si le jeu affiche des données de foule simulées (D9)
}
```
`registre.js` valide chaque meta (slug = nom du dossier, titres fr/en non vides). Un meta invalide est ignoré, avec un `console.warn` en dev, sans jamais faire planter la page. On suit le modèle de `src/breves/jours.js`.

**D3 — Intégration au site (faite une seule fois, ici).**
- Routes `jeux` et `jeux/:slug` dans `App.jsx`, en lazy comme les autres.
- `resolveRouteMeta` : `/jeux` a pour icône 🎲 et pour libellé `jeuxNav`. `/jeux/<slug>` a pour libellé « Jeux — <titre> » d'après le registre, et renvoie la 404 si le slug est inconnu (comme `/lab/`).
- Menu : nouvelle section « Jeux » / « Games » (clé `navSectionJeux`), entrée 🎲 → `/jeux` (clé `jeuxNav`), placée après la section Projets.
- `share-previews.js` : aperçus de partage et sitemap pour `/jeux` et pour chaque `/jeux/<slug>` trouvé dans `src/jeux/*/meta.js`. La lecture est générique, sans liste codée en dur. Image : réutiliser l'image par défaut du site (pas de nouvelle image à générer).
- `missions/vrai-404/verifier-routes.mjs` : si le script a une liste de routes, y ajouter `/jeux`, `/jeux/geste-parfait` et `/jeux/inconnu` (404 attendue).

**D4 — Jour du jeu.** Le jour suit la date **locale** du joueur (minuit local), comme Wordle. Le numéro de jour vaut « n° 1 » le 2026-10-01, plus un par jour (`numeroDuJour(date)`). Graine : `hash(slug + 'AAAA-MM-JJ')` → générateur pseudo-aléatoire déterministe (mulberry32, écrit à la main dans `jour.js`). Tout joueur voit donc le même défi le même jour.

**D5 — Un essai officiel par jour, puis entraînement.** Le premier essai du jour est noté, enregistré et partageable. Ensuite, le jeu propose « Rejouer pour s'entraîner » : ces essais sont notés à l'écran mais non enregistrés et non partageables. Les jeux où le coup de l'œil compte (missions suivantes) pourront désactiver l'entraînement via `meta.entrainement: false`. Valeur par défaut : `true`.

**D6 — Stockage local (`serie.js`).** Une seule clé `misran-jeux` dans localStorage : `{ [slug]: { [date]: { score, detail } } }`. Fonctions : `lireResultat(slug, date)`, `enregistrerResultat(slug, date, score, detail)`, `serie(slug, date)` (jours consécutifs joués jusqu'à aujourd'hui inclus, ou jusqu'à hier si pas encore joué aujourd'hui), `meilleurScore(slug)`. Chaque lecture et écriture est protégée par try/catch : sans stockage (navigation privée bloquée), le jeu reste jouable, le résultat n'est simplement pas gardé.

**D7 — Partage.** Texte construit par le jeu, avec une forme commune :
```
Le geste parfait n° 12 ◎
Cercle : 94,3 %
🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜
🔥 5 jours
misran-labs.vercel.app/jeux/geste-parfait
```
(URL : reprendre l'URL publique déjà utilisée par `share-previews.js`, sans la coder deux fois si une constante existe.) Le bouton appelle `navigator.share` s'il existe (mobile), sinon il copie dans le presse-papiers et affiche « Copié ✓ » pendant 2 s. Aucune donnée personnelle dans le texte.

**D8 — Le geste parfait : 4 défis en rotation.** Le défi du jour = `defis[numeroDuJour % 4]`. Chaque défi est un module de `geste-parfait/defis/` qui exporte `{ id, titre{fr,en}, consigne{fr,en}, Composant }`. Le composant reçoit `onTermine(score, detail)`. Tout est en canvas ou SVG avec les pointer events, sans dépendance.
1. **Cercle parfait.** Tracer un cercle d'un seul geste (souris ou doigt). Score = 100 × (1 − écart-type des distances au centre / rayon moyen), borné à 0-100. Le tracé est refusé (message, on recommence, ça ne compte pas comme l'essai du jour) s'il fait moins de ~300° autour du centre ou si le rayon moyen est trop petit. Affichage : le tracé coloré du rouge au vert selon l'écart local, et le score en grand.
2. **Chrono à l'aveugle.** Arrêter un chrono à exactement 10,00 s. Le compteur s'efface après 3 s. On démarre et on arrête par clic, toucher ou barre d'espace. Score = max(0, 100 − |écart en s| × 20), soit 1 s d'écart = 80 %.
3. **Remplir le verre.** Maintenir appuyé pour verser, relâcher pour arrêter. Une graine fixe la hauteur du trait cible (entre 40 % et 85 % du verre). Le liquide continue de monter légèrement après le relâchement (inertie de ~150 ms), ce qui fait tout le sel du défi. Score = max(0, 100 − |écart en % de hauteur| × 5).
4. **Tour empilée.** Un bloc va et vient horizontalement. Un clic ou un toucher le pose, la partie qui dépasse tombe (principe de *Stack*). 12 blocs. Score = largeur finale / largeur initiale × 100. La vitesse est fixe, sans aléatoire.
Emojis du partage : 10 cases, `round(score/10)` 🟩 puis ⬜. Le score s'affiche avec une décimale en fr (virgule) comme en en (point).

**D9 — Données de foule : aucune dans cette mission.** Le geste parfait n'affiche **pas** de « tu fais mieux que X % des joueurs » : on n'invente pas de chiffres sur un site public. Le champ `meta.demo` existe pour les missions suivantes. Quand il vaut `true`, `JeuPage` affiche un bandeau discret « Démo : les réponses des autres joueurs sont simulées pour l'instant ».

**D10 — Page d'accueil `/jeux`.** Titre, une phrase d'intro, puis une grille de cartes (3 colonnes sur desktop, 1 à 375 px). Carte = icône grande, titre, accroche, et une pastille « Joué aujourd'hui ✓ » ou « Nouveau défi » selon `serie.js`. Style : jetons de `tokens.css` uniquement (pas de couleur en dur), dans l'esprit neal.fun (grandes cartes aérées, survol vivant) mais cohérent avec le reste du site. La grille est triée par `ordre`. S'il n'y a qu'un seul jeu, deux cartes fantômes « Bientôt » complètent la ligne, pilotées par une constante `A_VENIR = 2` dans `JeuxHome.jsx`. Chaque mission suivante la décrémente d'une unité (seule ligne partagée touchée).

**D11 — Bilingue et accessible.** Tous les textes fr/en (`jeuxText.js` pour le commun, textes du jeu dans son dossier). Les défis 2 à 4 se jouent au clavier (espace). Le cercle exige un pointeur (souris, doigt ou stylet) : l'indiquer dans la consigne. Il faut `touch-action: none` sur les zones de jeu pour que le doigt ne fasse pas défiler la page sur mobile.

**D12 — Missions suivantes.** `missions/jeux-estimation/` et `missions/jeux-majorite/` sont commitées ici comme brouillons prêts à l'emploi, **sans branche**. La tâche programmée ne les voit pas (elle ne liste que les branches). Après fusion de cette mission, la session de clôture crée `auto/jeux-estimation` puis `auto/jeux-majorite` depuis `main` et réactive la tâche. Cette mission ne touche pas à ces deux dossiers.

## Critères d'acceptation
1. `/jeux` affiche 1 carte « Le geste parfait » et 2 cartes « Bientôt », en fr et en en. À 375 px, une colonne sans défilement horizontal.
2. `/jeux/geste-parfait` affiche le défi du jour. En forçant la date (paramètre `?date=AAAA-MM-JJ`, **uniquement en dev** via `import.meta.env.DEV`), on voit les 4 défis sur 4 jours consécutifs, et le même défi pour une même date.
3. Chacun des 4 défis se termine par un score entre 0 et 100, puis affiche le bloc de résultat. Pour le cercle, un tracé trop court est refusé sans consommer l'essai.
4. Après l'essai officiel, recharger la page affiche directement le résultat du jour (pas de second essai noté). « Rejouer pour s'entraîner » fonctionne sans modifier le résultat enregistré.
5. Le bouton de partage copie un texte conforme à D7 (vérifié en lisant le presse-papiers ou le texte généré dans le même appel).
6. La série vaut 2 si on a joué hier et aujourd'hui (vérifiable en injectant un résultat d'hier dans localStorage).
7. Avec localStorage qui lève une exception (surcharge de `Storage.prototype.setItem` dans la console), le jeu reste jouable sans erreur bloquante.
8. `/jeux/inconnu` → page 404 du site. L'onglet et la barre d'état affichent « Jeux » et « Jeux — Le geste parfait ».
9. Le menu a une section « Jeux » avec l'entrée 🎲. `dist/sitemap.xml` contient `/jeux` et `/jeux/geste-parfait`. `dist/jeux/geste-parfait/index.html` (ou l'équivalent produit par `share-previews.js`) contient le titre et l'accroche dans ses balises og.
10. Sur mobile (375 px, toucher émulé), le cercle se trace au doigt sans faire défiler la page.
11. Pas de nouvelle dépendance (`package.json` inchangé). Pas de couleur en dur dans `src/jeux/` (`grep -rnE "#[0-9a-fA-F]{3,6}\b" src/jeux` ne renvoie rien, hors canvas si un jeton est lu via `getComputedStyle`).
12. `npm run build` passe, `npm run lint` sans nouvelle erreur.
13. Tout est commité sur `auto/jeux-geste`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Classement mondial ou vraies statistiques de joueurs (il faudrait une base, par exemple Vercel KV : à décider par Michael, coût éventuel).
- Image d'aperçu de partage propre à chaque jeu.
- Sons, vibrations, animations de confettis.
- Les jeux 2 et 3 (missions `jeux-estimation` et `jeux-majorite`) et le jeu « Convaincre l'IA » (mis de côté, budget API).
- Toute modification de Lost Cauldron ou des jeux du Lab.
