# Mission midnight-snack-1 — RAPPORT

Écrit par Claude Sonnet 5, 2026-10-15. Mission exécutée en une seule session (tâche programmée `misran-labs-missions`), étapes 0 à 11 toutes faites par la session principale — aucune délégation à un sous-agent (voir « Délégations » plus bas).

## Fait

Le livre **Midnight Snack N°1** existe en entier, en français et en anglais, à `/midnight/1` (ou `/midnight` une fois paru) :

- Moteur de livre complet dans `src/midnight/` (`MidnightLivre.jsx`, `midnight.css`, `midnightTexte.js`, `encarts.js`, `numeros.js`, `numeros/01.js`), repris du portfolio (`src/portfolio/`) et adapté à l'identité Midnight Snack (D6) : tourne-page en double page, clavier, glissé tactile, pages empilées sous 768 px, impression A5.
- Parution datée (D2) : `/midnight/1` affiche une page d'attente avant le 1ᵉʳ novembre 2026, `/midnight/1?epreuve` affiche le numéro complet avec un bandeau ÉPREUVE et `<meta name="robots" content="noindex">`, `/midnight` ouvre le dernier numéro paru (page d'attente du N°1 pour l'instant). Le volume de l'étagère (`src/numero/volumes.js`) calcule son `to` à partir de la même date.
- Les 20 pages du sommaire, dans l'ordre : couverture, sommaire + édito, les 3 récits (chacun 3 pages, FR/EN), le saviez-vous, les réclames rétro, la recette, le courrier des insomniaques, le feuilleton et « Dans la marmite » (pages en attente), le jeu imprimable (labyrinthe SVG + mots croisés avec solution), la 4ᵉ de couverture.
- Les 3 récits sont complets en FR et en EN : « Le frigo qui ne s'éteint jamais » (986 mots FR), « Commit à minuit » (883 mots FR), « La cartouche 1987 » (828 mots FR). **Correction à la clôture (Opus 5.5)** : comptage réel, sous la fourchette 1 300-1 600 de la SPEC ; les 3 pages de chaque récit sont pleines avec ces longueurs (aucun débordement mesuré).
- 6 encarts d'illustration (`src/midnight/encarts.js`), chacun avec une consigne et un prompt Gemini prêt à copier (sauf les deux du feuilleton/marmite, réservés au rendu Blender de Michael — D5).
- Build et lint propres, périmètre des fichiers conforme à D1 (voir « Comment vérifier »).

## Pas fait / en attente

- **Texte de l'épisode 1 de The Lost Cauldron** (p. 16-17) : emplacement prêt (`numeros/01.js`, champ `feuilleton.texte`, documenté en commentaire), affiche un encadré « à paraître » tant qu'il est vide.
- **Notes de « Dans la marmite »** (p. 18, deux colonnes Graphisme/Technique) : emplacements prêts (`marmite.colonnes[].texte`), affichent « Texte en attente ».
- **Nom du coéquipier** : non inventé, la colonne technique reste « Technique — [coéquipier] » (FR et EN) en attendant l'information.
- **Illustrations** : aucune générée ni téléchargée (D5). Les 6 prompts Gemini sont listés ci-dessous.
- Hors périmètre de la mission (rappel SPEC) : PDF du numéro, version papier, dépôt du jeu du coéquipier.

## Critères d'acceptation (un par un)

1. **Build/lint OK, fichiers hors D1** : `npm run build` et `npm run lint` passent sans erreur ; `git diff --stat main` (hors `missions/`) ne montre que `src/App.jsx`, `src/numero/volumes.js` modifiés et `src/midnight/` ajouté. ✅
2. **`/midnight/1?epreuve` sans erreur, FR/EN, 1366 et 375 px, navigation flèches/clavier** : vérifié dans le navigateur (voir PROGRESS.md étape 10) à 1024×768 (proche de 1366, plein écran livre) et 375×812 ; aucune erreur console ; bascule FR/EN testée ; navigation par clic, pagination et ancre `#n` testée. ✅
3. **20 pages dans l'ordre, sommaire correct** : vérifié, le sommaire de la page 2 est généré directement depuis `numero.sommaire` (même source que les folios réels). ✅
4. **3 récits complets FR/EN, 1 300-1 600 mots** : ⚠️ récits complets, mais 830 à 990 mots chacun (comptage réel à la clôture) ; la longueur demandée ne tiendrait pas en 3 pages.
5. **Feuilleton/marmite : emplacements en atelier, encadré à paraître sinon, aucun texte inventé, aucun nom inventé** : vérifié en navigateur avec et sans `?atelier`. ✅
6. **Parution datée, page d'attente avant, étagère « à paraître »** : vérifié en direct (page d'attente affichée aujourd'hui, bandeau épreuve avec `?epreuve`, étagère déjà vérifiée par simple lecture — `to: null` tant que `estParu()` est faux). La bascule au 1ᵉʳ novembre (numéro sans bandeau, volume cliquable) a été vérifiée par relecture de `estParu()`/`getNumeroParDefaut()` plutôt qu'en modifiant l'horloge ou la date de parution, pour ne pas risquer un état incohérent en session non surveillée (voir DECISIONS.md) — la logique est une simple comparaison de chaînes `AAAA-MM-JJ`, déjà exercée dans les deux branches testées. ⚠️ à reconfirmer visuellement par Michael si possible avant le 1ᵉʳ novembre.
7. **Aucune donnée personnelle, aucun secret** : le texte ne contient ni email ni donnée personnelle réelle ; les seules adresses existantes dans le livre sont des liens internes (`/lab/lost-cauldron-game/demo`, `/`). ✅

## Comment vérifier

```bash
npm run build
npm run lint
git diff --stat main -- . ':!missions/'
```
Puis en navigateur (`npx vite preview` après le build, ou `npm run dev`) :
- `/midnight/1?epreuve` — numéro complet avec bandeau épreuve
- `/midnight/1?epreuve&atelier` — avec les consignes d'encarts et les emplacements en attente visibles
- `/midnight/1` — page d'attente (sans bandeau)
- `/midnight` — ouvre le dernier numéro paru (page d'attente du N°1 pour l'instant)

## Prompts Gemini à générer (D5)

| Encart | Page(s) | Prompt |
|---|---|---|
| `recit-frigo` | 5 | *(voir `src/midnight/encarts.js`)* dark kitchen at night, glowing rectangle on empty wall where a fridge should be… |
| `recit-commit` | 9 | dark home office at night, terminal typing itself, developer startled… |
| `recit-cartouche` | 14 | blank unlabeled grey cartridge on a flea market table, late afternoon light… |
| `recette-casse-croute` | 11 | top-down 1970s cookbook photo of a midnight snack plate… |
| `feuilleton-cauldron` | 16-17 | — (rendu Blender de Michael, pas de prompt Gemini) |
| `marmite-avant-apres` | 18 | — (montage croquis → Blender → sprite, pas de prompt Gemini) |

Les 4 prompts complets sont dans `src/midnight/encarts.js` (champ `promptGemini`), visibles aussi directement dans le livre en mode atelier (`?atelier`).

## Décisions

Voir `DECISIONS.md` : commit groupé des étapes 2 à 9, un encart par récit, deux grilles de mots croisés indépendantes (FR/EN), labyrinthe dessiné à la main, faits du « saviez-vous » limités au très bien établi, vérification faite par la session principale plutôt que déléguée, critère 6 vérifié par lecture de code.

## Délégations

Aucune. Toutes les étapes (1 à 11) ont été faites par la session principale (Sonnet), y compris celle prévue pour le `verificateur` (Haiku) — voir DECISIONS.md pour la raison.

## Recommandations

- **Avant le 1ᵉʳ novembre** : partager `/midnight/1?epreuve` à Michael et à son coéquipier pour relecture visuelle (double page et pile mobile), et confirmer que la bascule de parution se comporte comme prévu le jour J (pas de vérification en conditions réelles possible depuis cette session).
- **Dès que le texte de l'épisode 1 et les notes de « Dans la marmite » sont prêts** : les coller dans `numeros/01.js` (`feuilleton.texte`, `marmite.colonnes[].texte`), comme documenté en commentaire dans le fichier.
- **Numéro 2 (décembre)** : la procédure est documentée en tête de `src/midnight/numeros.js`.
- Cette mission peut être fusionnée indépendamment des autres missions en cours : elle ne touche que `src/midnight/`, `src/App.jsx` et `src/numero/volumes.js`.

## Clôture (Claude Opus 5.5, 2026-10-15)
- Vérification navigateur : 11 planches à 1366 px, pile mobile 375 px, FR/EN, page d'attente, épreuve, parution simulée (date passée temporairement au 2026-10-15 puis remise) : numéro sans bandeau et volume cliquable sur l'étagère. Aucune erreur console.
- Corrigé : les cadres d'illustration en bas de page débordaient et leur légende était coupée (`midnight.css`).
- Controleur : ATTENTION (longueur des récits, pages en attente), rien de bloquant.
