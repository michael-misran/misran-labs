# Mission midnight-snack-1 — SPEC

Rédigée par Claude Opus 5.5 (cadrage), 2026-10-15. Brief de Michael : chantier 7 « Midnight Snack N°1 », sommaire discuté et accepté en session (« on commence avec tout ce qu'on s'est dit »).

## Contexte
Midnight Snack est le nouveau magazine de 1977 Éditions (il succède à Misran Labs N°1, qui reste tel quel). Esprit DoggyBags / Lowreader : histoires à lire tard, inquiétantes et drôles, pulp sans gore. Mascotte : un raton laveur gourmand qui pille le frigo la nuit. Le N°1 (novembre 2026) est déjà rangé sur l'étagère de la bibliothèque, marqué « À paraître » (`src/numero/volumes.js`, volume `midnight-1`, `to: null` ; couverture modèle `midnight` dans `src/numero/Etagere.jsx`, image `public/decors/couverture-midnight-snack.jpg`, titre en Bangers via `--font-affiche`, rouge `#e8352b` et crème `#f6ecd8` sur fond jaune `#f7c86a`).

Le magazine Misran Labs est câblé dans le Shell (`src/numero/`, `chemin.js`) pour un seul numéro : **ne pas y toucher**. Le modèle à suivre est le **portfolio relié** (`src/portfolio/PortfolioLivre.jsx`) : un livre hors du Shell, sur sa propre table de lecture, double page, flèches / clavier / glissé, pages empilées sur téléphone, impression A5, et des **encarts** d'images vides dont la consigne s'affiche en mode atelier (`import.meta.env.DEV` ou `?atelier`).

## Objectif
Construire le livre **Midnight Snack N°1** complet et lisible, en FR et EN, avec tous les textes rédigés par Claude, **sauf deux pages qui attendent Michael** (le feuilleton et « Dans la marmite ») et les illustrations (encarts vides avec consigne).

## Sommaire (accepté par Michael — 20 pages)
| Page | Contenu |
|---|---|
| 1 | Couverture (reprend la couverture de l'étagère : image + titre MIDNIGHT / SNACK! en Bangers, logo 1977) |
| 2 | Sommaire + édito du raton |
| 3-5 | Récit 1 « Le frigo qui ne s'éteint jamais » — à 3 h du matin, la lumière du frigo s'allume chez quelqu'un qui n'a pas de frigo (horreur domestique) |
| 6 | Le saviez-vous ? — 3 à 4 faits réels et troublants sur la nuit, la nourriture ou les ratons laveurs |
| 7-9 | Récit 2 « Commit à minuit » — un développeur pousse son code à minuit pile et le code se met à répondre (techno-fantastique) |
| 10 | Réclames rétro — fausses pubs façon dos de comics pour Chambre noire, L'Oracle du Matin et Ma salle de jeu |
| 11 | Le casse-croûte du raton — une recette de snack de minuit, fiche cuisine années 70 |
| 12-14 | Récit 3 « La cartouche 1987 » — une cartouche de jeu introuvable achetée dans un vide-grenier |
| 15 | Courrier des insomniaques — 4 ou 5 fausses lettres, réponses de mauvaise foi signées le raton |
| 16-17 | **The Lost Cauldron, épisode 1** — feuilleton, texte écrit par Michael (en attente) |
| 18 | **Dans la marmite** — journal de fabrication du jeu The Lost Cauldron, à deux voix (en attente) |
| 19 | Jeu imprimable — labyrinthe du raton jusqu'au frigo (SVG) + mots croisés de minuit |
| 20 | 4ᵉ de couverture — « N°2 en décembre » (spécial Noël qui tourne mal) |

## Décisions (tranchées, ne pas rediscuter)
**D1 — Fichiers autorisés.** Nouveau dossier `src/midnight/` (`MidnightLivre.jsx`, `midnight.css`, `midnightTexte.js` pour l'interface, `encarts.js`, `numeros.js` et `numeros/01.js` pour les textes du N°1). Par exception, **une route** dans `src/App.jsx` : `/midnight/:numero?`, hors du Shell, comme `/portfolio`, et **le volume `midnight-1` dans `src/numero/volumes.js`** (D2). Rien d'autre hors de `src/midnight/` et `missions/midnight-snack-1/`. Ne pas modifier `src/portfolio/` : copier et adapter ce qui sert.

**D2 — Parution le 1er de chaque mois, épreuve avant (demande de Michael, 2026-10-15).** Chaque numéro a une date de parution (`parution: 'AAAA-MM-JJ'`, le 1er du mois ; N°1 = `2026-11-01`). La comparaison se fait avec la date locale du lecteur via `dateLocaleAujourdhui()` de `src/jeux/socle/jour.js` (même principe que `getParutions()` de `src/saviez-vous/parutions.js`). Ainsi le numéro peut être fusionné et déployé **plusieurs jours avant** et paraît **tout seul** le jour J, sans nouveau déploiement.
- **Avant la parution** : `/midnight/1` affiche une page d'attente dans l'univers du magazine (« N°1 — en kiosque le 1er novembre ») ; l'étagère garde le volume « À paraître ».
- **Épreuve** : `/midnight/1?epreuve` affiche le numéro complet avant sa date, avec un bandeau fixe « ÉPREUVE — non publié, parution le 1er novembre » (FR/EN), pour que Michael et son coéquipier le feuillettent et valident le rendu. C'est un lien à partager, pas une protection : le dépôt est public. Ajouter `<meta name="robots" content="noindex">` tant que le numéro n'est pas paru.
- **À partir de la parution** : le numéro est lisible par tous, sans bandeau. `/midnight` ouvre le dernier numéro paru (ou la page d'attente du prochain s'il n'y en a aucun).
- **Étagère** : dans `volumes.js`, le volume `midnight-1` calcule son `to` à partir de la date : `'/midnight/1'` à partir du 2026-11-01, `null` avant. Modifier seulement ces lignes et l'import nécessaire.
- **Numéros suivants** : un fichier par numéro dans `src/midnight/numeros/` (`02.js` = décembre, parution 2026-12-01…), chargé par `numeros.js` (`import.meta.glob`) qui expose `getNumeros()`, `getNumero(n)`, `estParu(numero)`. Documenter le format et la procédure « préparer le numéro du mois » en tête de `numeros.js`.

**D3 — Textes.** Tout en FR et EN (`{ fr, en }`), anglais naturel, pas mot à mot. Ton : pulp, humour noir, frissons sans gore ni violence crue, lisible par un adulte comme par un ado. Chaque récit fait **environ 1 300 à 1 600 mots** en français, avec un titre, un chapô d'une phrase, une chute. Le saviez-vous ? : **uniquement des faits vrais et vérifiables** ; en cas de doute sur un fait, l'écarter (pas de WebSearch dans la mission, donc s'en tenir à des faits très connus). Le raton n'a pas de nom (s'en tenir à « le raton »).

**D4 — Pages en attente de Michael.**
- Feuilleton (p. 16-17) : titre « The Lost Cauldron — Épisode 1 », un encart d'illustration (consigne : rendu Blender de Michael) et, à la place du texte, un emplacement clairement marqué en mode atelier (« Texte de Michael : environ 1 000 à 1 200 mots ») ; hors atelier, un court encadré « Épisode 1 à paraître ». En bas : réclame « Jouez à The Lost Cauldron » avec lien vers `/lab/lost-cauldron-game/demo`. Le texte se colle plus tard dans `numeros/01.js` (champ `feuilleton.texte`, paragraphes en tableau) : le documenter en commentaire.
- Dans la marmite (p. 18) : deux colonnes signées « Graphisme — M. Misran » et « Technique — [coéquipier] » (nom à venir, ne rien inventer), un encart « avant / après » (croquis → rendu Blender → sprite), un encadré « L'IA au fourneau », et en pied « Version du mois jouable » avec lien vers la démo. Textes des colonnes = emplacements en attente, comme le feuilleton.

**D5 — Illustrations.** Aucune image générée ni téléchargée. Chaque page illustrée a un **encart** avec une consigne précise (ce qu'il faut dessiner) et, dans `encarts.js`, un **prompt Gemini** prêt à copier pour Michael. Seule image existante utilisée : `public/decors/couverture-midnight-snack.jpg` pour la couverture.

**D6 — Identité visuelle.** Couleurs du volume (jaune `#f7c86a`, rouge `#e8352b`, crème `#f6ecd8`, encre `#16110c`), titres en `--font-affiche` (Bangers), récits en police lisible déjà chargée (`--font-chapo` ou `--font-machine`), bulles en `--font-bd`. Chaque récit peut avoir sa couleur d'accent. Variables CSS locales au livre, préfixe `ms-`. Pas de nouvelle police, pas de dépendance.

**D7 — Lecture.** Mêmes gestes que le portfolio (flèches, clavier, clic, glissé), pages empilées sous 768 px, impression une page A5 par page, `prefers-reduced-motion` respecté. Bouton retour vers la bibliothèque (`/`).

## Critères d'acceptation
1. `npm run build` et `npm run lint` OK (pas plus d'erreurs qu'à l'état initial). Aucun fichier modifié hors D1 (`git diff --stat main` le montre).
2. `/midnight/1?epreuve` s'affiche sans erreur console, en FR et EN, à 1366 px (double page) et 375 px (pages empilées) ; on va de la couverture à la 4ᵉ par les flèches et le clavier.
3. Les 20 pages du sommaire existent dans l'ordre ; le sommaire (p. 2) renvoie aux bonnes pages.
4. Les 3 récits sont complets (FR et EN), chacun de 1 300 à 1 600 mots en français.
5. Feuilleton et Dans la marmite : emplacements visibles avec `?atelier`, encadré « à paraître » sans ; aucun faux texte à la place de celui de Michael ; aucun nom de coéquipier inventé.
6. Parution datée (D2) : aujourd'hui, `/midnight/1` sans `?epreuve` montre la page d'attente, avec `?epreuve` le numéro et le bandeau ; l'étagère affiche « À paraître ». En simulant le 2026-11-01 (horloge du navigateur ou date de parution temporairement passée, remise ensuite), le numéro s'ouvre sans bandeau et le volume de l'étagère devient cliquable.
7. Aucune donnée personnelle, aucun secret (dépôt public).

## Hors périmètre
- Modifier le magazine Misran Labs, le Shell, le portfolio ou l'étagère.
- PDF du numéro, illustrations, version papier.
- Le dépôt Git partagé du jeu avec le coéquipier de Michael.
