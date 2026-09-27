# Format d'une idée — rubrique Projets

Ce document se suffit à lui-même : il n'est pas nécessaire de lire le code pour ajouter, modifier ou clore une idée.

## Publier une idée

**Ajouter un seul fichier JSON dans `src/projets/idees/`, rien d'autre.** Le nom du fichier est le numéro de l'idée, au format `P-NNN.json` — par exemple `src/projets/idees/P-002.json`. Le numéro n'est **jamais réutilisé**, même pour une idée arrêtée. Aucune autre modification n'est nécessaire : le fichier est chargé, validé et affiché automatiquement (`src/projets/idees.js`, via `import.meta.glob`).

## Schéma public (`src/projets/idees/P-NNN.json`)

```json
{
  "id": "P-001",
  "date": "2026-09-27",
  "titre": { "fr": "…", "en": "…" },
  "resume": { "fr": "1 à 2 phrases", "en": "…" },
  "probleme": { "fr": "Le problème réel, pour qui", "en": "…" },
  "idee": { "fr": "Ce qu'on construirait", "en": "…" },
  "type": "produit",
  "taille": "moyenne",
  "statut": "proposee",
  "decision": { "date": "2026-09-28", "note": { "fr": "…", "en": "…" } },
  "mission": "nom-de-mission"
}
```

## Règles (une idée qui ne les respecte pas n'est pas affichée)

- **Nom de fichier = id.** `src/projets/idees/P-NNN.json`, et le champ `id` doit contenir exactement le même identifiant.
- **Aucune clé en dehors de celles listées ci-dessus.** C'est le garde-fou de confidentialité : un champ économique ajouté par erreur (`prix`, `revenus`, `modele`...) fait rejeter tout le fichier plutôt que d'être publié. Le détail économique vit uniquement dans la note privée (voir plus bas), jamais dans ce fichier.
- **Chaque texte** (`titre`, `resume`, `probleme`, `idee`, et `decision.note` si présent) existe **en `fr` et en `en`**, non vide.
- **`type`** : une valeur parmi `produit`, `service`, `outil`, `contenu`, `amelioration`.
- **`taille`** : une valeur parmi `petite`, `moyenne`, `grosse`.
- **`statut`** : une valeur parmi `proposee`, `gardee`, `en-cours`, `faite`, `arretee`.
- **`decision`** : obligatoire pour les statuts `gardee`, `arretee`, `en-cours`, `faite` (absent pour `proposee`). Pour `arretee`, la note doit donner la raison de l'arrêt, pour ne pas reproposer l'idée plus tard.
- **`mission`** : obligatoire (nom de dossier `missions/<nom>/`) pour les statuts `en-cours` et `faite` ; absent sinon.

Une idée qui viole une de ces règles n'apparaît pas sur le site (ni dans la liste `/projets`, ni à son URL `/projets/P-NNN`) et produit un message dans la console du navigateur précisant le fichier et la règle en cause — jamais de plantage de page.

## Note privée (`src/private/projets/P-NNN.md`)

**Hors Git** (`src/private/` est dans `.gitignore` — ne jamais commiter ce fichier). Un fichier Markdown libre par idée, avec ce gabarit :

```markdown
# P-NNN — Titre de l'idée

## Cible et marché
(sources si des chiffres sont avancés)

## Modèle économique

## Prix envisagés

## Hypothèses de revenus (présentées comme telles)

## Temps avant le premier euro

## Risques

## Première étape de validation peu coûteuse
```

En développement (`npm run dev`), le contenu de ce fichier s'affiche sous la page `/projets/P-NNN` dans un bloc « Notes privées (local) ». Il n'entre jamais dans le build de production (`npm run build`) : le chargement est conditionné à `import.meta.env.DEV`.

## Marche à suivre pour la routine hebdomadaire

- **Ajouter une idée** : créer `src/projets/idees/P-NNN.json` (numéro suivant, jamais réutilisé) avec `statut: "proposee"`, sans `decision` ni `mission`. Créer aussi `src/private/projets/P-NNN.md` avec le gabarit ci-dessus (sections laissées « à évaluer » plutôt que d'inventer des chiffres) — ce fichier n'est jamais commité.
- **Changer un statut** : modifier `statut` dans le fichier JSON existant. Passer à `gardee`, `arretee`, `en-cours` ou `faite` exige d'ajouter `decision` (date + note fr/en). Passer à `en-cours` ou `faite` exige aussi `mission`.
- **Noter une décision de Michael** : renseigner `decision.note` avec ses mots (raison du choix), jamais une justification inventée.
- **Ne jamais** ajouter une clé économique (prix, revenus, modèle) dans le fichier public — ces informations vont uniquement dans la note privée.
