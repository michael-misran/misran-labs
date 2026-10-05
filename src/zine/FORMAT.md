# Format d'un numéro du Zine

Ce document se suffit à lui-même : il n'est pas nécessaire de lire le code pour écrire et publier un numéro valide.

## Publier un numéro

**Ajouter un fichier JSON dans `src/zine/numeros/`**, nommé `NN.json` où `NN` est le numéro sur 2 chiffres (`01`, `02`…) — par exemple `src/zine/numeros/01.json`. Les images qu'il référence vont dans `public/zine/NN/` (par exemple `public/zine/01/photo-1.jpg`), citées dans le JSON par leur chemin absolu depuis la racine du site : `/zine/01/photo-1.jpg`.

Le fichier est chargé, validé et affiché automatiquement (`src/zine/numeros.js`, via `import.meta.glob`). Aucune autre modification n'est nécessaire.

Ne jamais modifier un numéro déjà publié une fois en ligne (archive), sauf correction d'une erreur factuelle.

## Schéma général

```json
{
  "numero": 1,
  "date": "2026-11",
  "titre": { "fr": "…", "en": "…" },
  "encre": "#ff4f8b",
  "edito": { "fr": "…", "en": "…" },
  "pages": [
    { "type": "photo", "src": "/zine/01/photo-1.jpg", "legende": { "fr": "…", "en": "…" }, "trame": true },
    { "type": "bulle", "texte": { "fr": "…", "en": "…" } }
  ]
}
```

## Champs de tête

| Champ | Règle |
|---|---|
| `numero` | Entier ≥ 1. Jamais réutilisé. Doit valoir « le précédent + 1 » dans l'ordre chronologique des fichiers, à partir de 1. |
| `date` | Mois de parution, format `AAAA-MM` (ex. `2026-11`) — le Zine est mensuel, pas de jour précis. |
| `titre` | `{ "fr": "…", "en": "…" }`, non vide. |
| `encre` | Une couleur hexadécimale `#rrggbb` — l'encre du numéro. `--titre-zine` (`#ff4f8b`) par défaut, mais chaque numéro peut choisir sa propre couleur. |
| `edito` | `{ "fr": "…", "en": "…" }`, non vide — le mot d'intro du numéro. |

**Nom de fichier = numéro.** `src/zine/numeros/NN.json`, `NN` = `numero` sur 2 chiffres (`String(numero).padStart(2, '0')`), et le champ `numero` doit valoir exactement ce nombre.

## `pages` : une liste de blocs typés

Chaque élément de `pages` a un `type` parmi les 7 suivants. Tout texte est bilingue (`{ "fr": "…", "en": "…" }`, non vide dans les deux langues).

### `photo`

```json
{ "type": "photo", "src": "/zine/01/photo-1.jpg", "legende": { "fr": "Légende.", "en": "Caption." }, "trame": true }
```
- `src` : chemin de l'image dans `public/zine/NN/`.
- `legende` : bilingue.
- `trame` : `true` ou `false` — affiche la photo en niveaux de gris avec un calque de points (trame fanzine) par-dessus.

### `dessin`

```json
{ "type": "dessin", "src": "/zine/01/dessin-1.jpg", "legende": { "fr": "Légende.", "en": "Caption." } }
```
- Mêmes champs que `photo`, sans `trame` (un dessin reste net, jamais tramé).

### `texte`

```json
{ "type": "texte", "titre": { "fr": "Titre facultatif", "en": "Optional title" }, "corps": { "fr": "Paragraphe.", "en": "Paragraph." } }
```
- `titre` : bilingue, facultatif.
- `corps` : bilingue, obligatoire.

### `carnet`

```json
{ "type": "carnet", "corps": { "fr": "Une page du carnet, à la main.", "en": "A notebook page, handwritten." } }
```
- `corps` : bilingue — affiché sur un fond à lignes, façon page de carnet.

### `jeu`

```json
{ "type": "jeu", "titre": { "fr": "Nom du jeu", "en": "Game name" }, "consigne": { "fr": "Comment jouer.", "en": "How to play." }, "src": "/zine/01/jeu-1.png" }
```
- `titre`, `consigne` : bilingues, obligatoires.
- `src` : facultatif — image à imprimer, dans `public/zine/NN/`.

### `bulle`

```json
{ "type": "bulle", "texte": { "fr": "Texte de la bulle.", "en": "Speech bubble text." } }
```
- `texte` : bilingue — une bulle de BD.

### `etoile`

```json
{ "type": "etoile", "texte": { "fr": "SPÉCIAL !", "en": "SPECIAL!" } }
```
- `texte` : bilingue — une étoile « spécial » façon couverture de fanzine.

## Règles (un numéro qui ne les respecte pas n'est pas affiché)

- **Nom de fichier = numéro** (voir plus haut).
- **`pages`** : un tableau d'au moins 1 bloc.
- **Chaque bloc** doit respecter le schéma de son `type` ci-dessus.
- **Pas d'image distante** : tout `src` pointe dans `public/zine/NN/`, jamais une URL externe.

Un numéro qui viole une de ces règles n'apparaît pas sur le site (ni dans la liste `/zine`, ni à son URL `/zine/NN`) et produit un message dans la console du navigateur précisant le fichier et la règle en cause — jamais de plantage de page.

## Exemple complet

```json
{
  "numero": 1,
  "date": "2026-11",
  "titre": { "fr": "Premiers pas", "en": "First steps" },
  "encre": "#ff4f8b",
  "edito": { "fr": "Le premier numéro du Zine, fait à la main.", "en": "The Zine's first issue, made by hand." },
  "pages": [
    { "type": "etoile", "texte": { "fr": "NUMÉRO 1 !", "en": "ISSUE 1!" } },
    { "type": "photo", "src": "/zine/01/atelier.jpg", "legende": { "fr": "L'atelier, un dimanche.", "en": "The workshop, on a Sunday." }, "trame": true },
    { "type": "bulle", "texte": { "fr": "Et voilà !", "en": "There it is!" } },
    { "type": "carnet", "corps": { "fr": "Note du jour : tout commence ici.", "en": "Today's note: it all starts here." } }
  ]
}
```
