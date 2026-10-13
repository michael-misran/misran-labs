# Mission p006-maquettes — Règles de calcul du Tarot (D8)

Référence : règles de la Fédération française de tarot, telles que connues de la session (pas de source consultée en ligne pendant la mission — hors périmètre). Ce document définit précisément l'algorithme implémenté dans `public/screens/p006/p006-calcul.js` et vérifié par `missions/p006-maquettes/verifier-calcul.mjs` contre `cas-tarot.json`.

## 1. Données d'une donne

- `nbJoueurs` : 3, 4 ou 5.
- `preneur` : index (0 à nbJoueurs-1) du joueur qui a pris.
- `appele` : à 5 joueurs seulement, index du joueur appelé (partenaire du preneur). Si le preneur s'appelle lui-même (il a les 4 rois, ou appelle un roi qu'il détient), `appele === preneur`.
- `contrat` : `petite` | `garde` | `garde-sans` | `garde-contre`.
- `bouts` : nombre de bouts (Petit, 21, Excuse) dans le camp de l'attaque à la fin de la donne — 0 à 3.
- `pointsRealises` : points comptés par l'attaque (preneur + appelé), au demi-point près.
- `petitAuBout` : `attaque` | `defense` | `aucun` — camp qui a mené le Petit (le 1 d'atout) au dernier pli, indépendamment de la réussite du contrat. `aucun` si le Petit n'a pas été joué au dernier pli ou n'a pas été distribué dans cette configuration de test.
- `poignee` : `null`, ou `{ camp, type }` avec `type` = `simple` | `double` | `triple`. `camp` est seulement informatif (qui a montré la poignée) : il n'intervient pas dans le calcul (D8 : « acquise au camp gagnant de la donne, quel que soit le camp qui l'a montrée »).
- `chelem` : `aucun` | `annonce-reussi` | `non-annonce-reussi` | `annonce-rate`.

## 2. Points à faire et multiplicateur de contrat

| Bouts | Points à faire |
|---|---|
| 0 | 56 |
| 1 | 51 |
| 2 | 41 |
| 3 | 36 |

Total des points du jeu : 91.

| Contrat | Multiplicateur |
|---|---|
| Petite | ×1 |
| Garde | ×2 |
| Garde sans | ×4 |
| Garde contre | ×6 |

## 3. Écart et réussite

```
écartBrut = |pointsRealises − pointsAFaire|
écart     = arrondi à l'entier supérieur (Math.ceil) de écartBrut
```

Le contrat est **réussi** si `pointsRealises ≥ pointsAFaire`, **chuté** sinon.

**Point à valider par Michael** : l'arrondi de l'écart est fait à l'entier supérieur dans les deux sens (réussite et chute), ex. 50,5 de réalisé pour 51 à faire → écart brut 0,5 → écart compté 1. C'est l'interprétation retenue en l'absence de source consultée ; à confirmer ou corriger.

## 4. Score de base de la donne (« unité de score »)

Le calcul se fait en deux temps : une **unité de score** signée (positive si l'attaque gagne, négative si elle perd), puis une **répartition** entre les joueurs selon le nombre de joueurs et les rôles.

```
base        = (25 + écart) × multiplicateurContrat
baseSignée  = +base si contrat réussi, −base si contrat chuté

petit       = +10 × multiplicateurContrat si petitAuBout = "attaque"
            = −10 × multiplicateurContrat si petitAuBout = "defense"
            = 0 si petitAuBout = "aucun"

poignée     = valeur du type (simple 20, double 30, triple 40), non multipliée
            = +valeur si contrat réussi, −valeur si contrat chuté (acquise au camp gagnant)
            = 0 si pas de poignée

chelem      = +400 si "annonce-reussi"
            = +200 si "non-annonce-reussi"
            = −200 si "annonce-rate"
            = 0 si "aucun"

unitéScore  = baseSignée + petit + poignée + chelem
```

`unitéScore` est le montant qu'un défenseur seul paie (s'il est négatif) ou reçoit (s'il est positif).

## 5. Répartition entre les joueurs (D8, somme = 0)

| Cas | Preneur | Appelé | Défenseurs |
|---|---|---|---|
| 3 joueurs | ×2 | — | ×(−1) chacun (2 défenseurs) |
| 4 joueurs | ×3 | — | ×(−1) chacun (3 défenseurs) |
| 5 joueurs, appelé ≠ preneur | ×2 | ×1 | ×(−1) chacun (3 défenseurs) |
| 5 joueurs, preneur appelé lui-même | ×4 | — (confondu avec le preneur) | ×(−1) chacun (4 défenseurs) |

Chaque score de joueur = son multiplicateur de rôle × `unitéScore`. La somme des scores de la donne vaut toujours 0.

## 6. Exemples détaillés

### Exemple A — 4 joueurs, Garde, réussi de 6 avec petit au bout pour la défense
- Preneur index 0, contrat Garde (×2), 1 bout → à faire 51, réalisé 57.
- écart = 6, réussi → base = (25+6)×2 = 62, baseSignée = +62.
- petit au bout défense → −10×2 = −20.
- unitéScore = 62 − 20 = 42.
- Scores : preneur = 3×42 = 126 ; les 3 autres = −42 chacun. Somme = 126 − 126 = 0.

### Exemple B — 5 joueurs, preneur appelé lui-même, Garde sans chutée avec poignée défense
- Preneur index 2 = appelé (appelé lui-même), Garde sans (×4), 0 bout → à faire 56, réalisé 40.
- écart = 16, chuté → base = (25+16)×4 = 164, baseSignée = −164.
- petit au bout défense → −10×4 = −40.
- poignée simple (20), contrat chuté → −20 (acquise par la défense, qui gagne la donne).
- unitéScore = −164 − 40 − 20 = −224.
- Scores : preneur = 4×(−224) = −896 ; les 4 autres (tous défenseurs) = +224 chacun. Somme = −896 + 4×224 = 0.

### Exemple C — 3 joueurs, Garde sans annoncée et réussie avec chelem annoncé et réussi
- Preneur index 0, Garde sans (×4), 3 bouts → à faire 36, réalisé 91 (tous les points, chelem).
- écart = 55, réussi → base = (25+55)×4 = 320, baseSignée = +320.
- petit au bout attaque → +10×4 = +40.
- chelem annoncé et réussi → +400.
- unitéScore = 320 + 40 + 400 = 760.
- Scores : preneur = 2×760 = 1520 ; les 2 défenseurs = −760 chacun. Somme = 1520 − 1520 = 0.

(L'exemple A est illustratif, construit pour la démonstration, et ne reprend pas un cas précis de `cas-tarot.json`. Les exemples B et C reprennent exactement les paramètres et résultats des cas `5j-preneur-appele-lui-meme-chute` et `3j-chelem-annonce-reussi` du fichier.)

## 7. Les 33 cas de test

`cas-tarot.json` contient 33 cas (≥ 24 demandés par D11), couvrant :
- 3, 4 et 5 joueurs (dont 5 joueurs avec appelé distinct et preneur appelé lui-même) ;
- les 4 contrats (Petite, Garde, Garde sans, Garde contre) ;
- 0 à 3 bouts ;
- réussites et chutes ;
- petit au bout pour l'attaque et pour la défense ;
- poignée simple, double et triple ;
- chelem annoncé réussi, non annoncé réussi, annoncé raté ;
- des points réalisés au demi-point (réussite et chute).

Chaque cas donne, pour chaque joueur, le score attendu, et vérifie que leur somme vaut 0.
