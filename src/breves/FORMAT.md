# Format d'un jour de Brèves

Ce document se suffit à lui-même : il n'est pas nécessaire de lire le code pour écrire et publier un jour valide. Procédure d'extraction (depuis La Gazette du Lab, le journal papier du matin) : `src/breves/EXTRACTION.md`.

## Publier un jour

**Ajouter un seul fichier JSON dans `src/breves/jours/`, rien d'autre.** Le nom du fichier est la date du jour, au format `AAAA-MM-JJ.json` — par exemple `src/breves/jours/2026-10-05.json`. Aucune autre modification n'est nécessaire : le fichier est chargé, validé et affiché automatiquement (`src/breves/jours.js`, via `import.meta.glob`).

Ne jamais modifier un fichier déjà publié une fois en ligne (archive), sauf correction d'une erreur factuelle.

## Schéma

```json
{
  "date": "2026-10-05",
  "breves": [
    {
      "rubrique": "ia",
      "titre": { "fr": "Titre de la brève", "en": "Brief title" },
      "resume": { "fr": "2 à 3 phrases, rédigées, jamais copiées depuis la source.", "en": "2 to 3 sentences, written, never copied from the source." },
      "sources": [
        { "titre": "Nom du site", "url": "https://exemple.com/article" }
      ]
    }
  ],
  "mot": { "terme": "…", "definition": { "fr": "…", "en": "…" } },
  "chiffre": { "valeur": "…", "texte": { "fr": "…", "en": "…" } }
}
```

## Règles (un jour qui ne les respecte pas n'est pas affiché)

- **Nom de fichier = date.** `src/breves/jours/AAAA-MM-JJ.json`, et le champ `date` doit contenir exactement la même date.
- **`breves`** : de **1 à 5** éléments.
- **`rubrique`** de chaque brève : `ia` ou `tech`.
- **Chaque texte** (`titre`, `resume` de chaque brève, et `mot.definition` / `chiffre.texte` s'ils sont présents) existe **en `fr` et en `en`**, non vide.
- **`resume`** : 2 à 3 phrases, 60 mots maximum. HTML autorisé seulement pour `<i>` et `<b>`.
- **`sources`** de chaque brève : **au moins une**, chacune avec un `titre` non vide (le nom du site) et une `url` commençant par `https://`.
- **`mot`** et **`chiffre`** sont facultatifs. `mot.terme` et `chiffre.valeur` sont de simples textes non vides.
- **Pas de champ `numero`** : les jours ne forment pas de séquence numérotée, seulement une liste chronologique.
- **Jamais d'actualité inventée.** Un `resume` est rédigé, jamais copié-collé depuis la source ; chaque fait avancé doit être vérifiable via au moins une des `sources`, et doit déjà figurer dans La Gazette du Lab dont il est tiré.
- **Ce qui ne devient jamais public** : irritants, idées de business, études de cas, modèles économiques, chiffre qui dérange, énigme, bonus, carnet — ces rubriques du Journal restent privées.

Un jour qui viole une de ces règles n'apparaît pas sur le site (ni dans la liste `/breves`, ni à son URL `/breves/AAAA-MM-JJ`) et produit un message dans la console du navigateur précisant le fichier et la règle en cause — jamais de plantage de page.

## Exemple complet

```json
{
  "date": "2026-10-05",
  "breves": [
    {
      "rubrique": "ia",
      "titre": { "fr": "Un exemple de titre de brève", "en": "An example brief title" },
      "resume": {
        "fr": "Résumé rédigé en 2 à 3 phrases, qui explique ce qui s'est passé sans copier le texte source.",
        "en": "A written summary in 2 to 3 sentences, explaining what happened without copying the source text."
      },
      "sources": [
        { "titre": "Nom du site", "url": "https://exemple.com/annonce" }
      ]
    }
  ],
  "mot": { "terme": "API", "definition": { "fr": "Interface qui permet à deux logiciels de communiquer.", "en": "Interface that lets two pieces of software communicate." } },
  "chiffre": { "valeur": "42", "texte": { "fr": "exemples cités dans l'annonce.", "en": "examples cited in the announcement." } }
}
```

L'aperçu de partage (titre) est généré automatiquement au build, à partir du titre de la première brève du jour — aucune action supplémentaire n'est nécessaire.
