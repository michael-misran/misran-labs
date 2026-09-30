# Format d'un numéro du magazine

Ce document se suffit à lui-même : il n'est pas nécessaire de lire le code pour écrire et publier un numéro valide.

## Publier un numéro

**Ajouter un seul fichier JSON dans `src/magazine/numeros/`, rien d'autre.** Le nom du fichier est la date de parution (le lundi), au format `AAAA-MM-JJ.json` — par exemple `src/magazine/numeros/2026-10-05.json`. Aucune autre modification n'est nécessaire : le fichier est chargé, validé et affiché automatiquement (`src/magazine/numeros.js`, via `import.meta.glob`).

Ne jamais modifier un fichier de numéro déjà publié une fois qu'il est en ligne (archive), sauf correction d'une erreur factuelle.

## Schéma

```json
{
  "numero": 1,
  "date": "2026-10-05",
  "titre": { "fr": "Titre du numéro", "en": "Issue title" },
  "edito": { "fr": "2 à 3 phrases d'édito.", "en": "2 to 3 sentences of editorial." },
  "articles": [
    {
      "titre": { "fr": "Titre de l'article", "en": "Article title" },
      "resume": { "fr": "3 à 5 phrases, rédigées, jamais copiées depuis la source.", "en": "3 to 5 sentences, written, never copied from the source." },
      "pourquoi": { "fr": "Pourquoi ça compte pour un designer ou un développeur.", "en": "Why it matters for a designer or a developer." },
      "categorie": "outils",
      "sources": [
        { "titre": "Nom de la source", "url": "https://exemple.com/article" }
      ]
    }
  ]
}
```

## Règles (un numéro qui ne les respecte pas n'est pas affiché)

- **Nom de fichier = date.** `src/magazine/numeros/AAAA-MM-JJ.json`, et le champ `date` doit contenir exactement la même date.
- **`numero`** : entier, égal au `numero` du numéro précédent (par ordre chronologique) + 1. Le tout premier numéro (numéro 0, « Présentation ») porte `numero: 0`.
- **Chaque texte** (`titre`, `edito`, et pour chaque article `titre`, `resume`, `pourquoi`) existe **en `fr` et en `en`**, non vide.
- **`articles`** : de **1 à 5** articles.
- **`categorie`** de chaque article : une valeur parmi `outils`, `modeles`, `design`, `dev`, `workflow` (voir `CATEGORIES` dans `src/magazine/magazineText.js` pour les libellés affichés).
- **`sources`** de chaque article : **au moins une**, chacune avec un `titre` non vide et une `url` commençant par `https://`.
- **Jamais d'actualité inventée.** Un `resume` est rédigé, jamais copié-collé depuis la source ; chaque fait avancé doit être vérifiable via au moins une des `sources`.

Un numéro qui viole une de ces règles n'apparaît pas sur le site (ni dans la liste `/magazine`, ni à son URL `/magazine/AAAA-MM-JJ`) et produit un message dans la console du navigateur précisant le fichier et la règle en cause — jamais de plantage de page.

## Exemple complet

```json
{
  "numero": 1,
  "date": "2026-10-05",
  "titre": { "fr": "Les agents prennent le clavier", "en": "Agents take the keyboard" },
  "edito": {
    "fr": "Cette semaine, plusieurs outils ont avancé sur l'automatisation de tâches de design et de développement. Deux angles se dégagent : l'agent qui exécute, et l'agent qui vérifie.",
    "en": "This week, several tools moved forward on automating design and development tasks. Two angles stand out: the agent that executes, and the agent that verifies."
  },
  "articles": [
    {
      "titre": { "fr": "Un exemple de titre d'article", "en": "An example article title" },
      "resume": {
        "fr": "Résumé rédigé en 3 à 5 phrases, qui explique ce qui s'est passé sans copier le texte source.",
        "en": "A written summary in 3 to 5 sentences, explaining what happened without copying the source text."
      },
      "pourquoi": {
        "fr": "Ce que ça change concrètement pour un designer ou un développeur.",
        "en": "What this concretely changes for a designer or a developer."
      },
      "categorie": "outils",
      "sources": [
        { "titre": "Nom de la source", "url": "https://exemple.com/annonce" }
      ]
    }
  ]
}
```

L'aperçu de partage (titre, description) est généré automatiquement au build à partir de `titre.fr` et `edito.fr` — aucune action supplémentaire n'est nécessaire.
