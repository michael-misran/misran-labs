# Format d'une parution « Le saviez-vous ? »

Ce document se suffit à lui-même : pas besoin de lire le code pour publier une parution.

Une parution = **un sujet = une page**, sur le modèle des pages « Le saviez-vous ? » des DoggyBags : bandeau titre avec portrait rond, texte d'intro en lettrage BD, fiche technique et légende du démontage autour d'une grande planche illustrée, texte de fin, puis une bande de réclames de la maison (fixe, gérée par le code).

## Publier une parution

**Ajouter un fichier JSON dans `src/saviez-vous/parutions/`**, nommé d'après sa date de parution : `AAAA-MM-JJ.json` (par exemple `2026-10-12.json`). Rythme libre (une par semaine par défaut).

Les images vont dans `public/saviez-vous/AAAA-MM-JJ/` et sont citées par leur chemin depuis la racine du site : `/saviez-vous/2026-10-12/planche.png`.

- `/saviez-vous` affiche la parution la plus récente ; les précédentes sont listées dessous et restent lisibles à `/saviez-vous/AAAA-MM-JJ`.
- **Une parution datée dans le futur reste cachée jusqu'à son jour** : on peut préparer plusieurs semaines d'avance.

## Schéma

```json
{
  "date": "2026-10-12",
  "sujet": { "fr": "Le Colt 1911", "en": "The Colt 1911" },
  "portrait": "/saviez-vous/2026-10-12/portrait.png",
  "intro": { "fr": "…", "en": "…" },
  "illustration": "/saviez-vous/2026-10-12/planche.png",
  "fiche": {
    "titre": { "fr": "Fiche technique", "en": "Spec sheet" },
    "lignes": [{ "fr": "Poids : 1,1 kg", "en": "Weight: 1.1 kg" }]
  },
  "legende": {
    "titre": { "fr": "L'objet démonté", "en": "Taken apart" },
    "items": [{ "fr": "Culasse", "en": "Slide" }]
  },
  "conclusion": { "fr": "…", "en": "…" },
  "sources": ["https://…"]
}
```

| Champ | Règle |
|---|---|
| `date` | `AAAA-MM-JJ`, identique au nom du fichier. |
| `sujet` | Obligatoire, bilingue. Le grand titre du bandeau (affiché en capitales). |
| `intro` | Obligatoire, bilingue. Le texte d'ouverture sous le bandeau. |
| `portrait` | Facultatif. Image ronde en haut à droite du bandeau (tête dessinée, idéalement carrée). Sans portrait, c'est la Fiole qui s'y met. |
| `illustration` | Facultative. La grande planche (vue éclatée, dessin…). Sans elle, un cadre hachuré « Planche en préparation ». |
| `fiche` | Facultative. Encadré à bandeau noir : `titre` bilingue + `lignes` (liste bilingue). |
| `legende` | Facultative. Même encadré, mais les `items` sont lettrés A., B., C.… pour renvoyer aux lettres dessinées sur la planche. |
| `conclusion` | Facultative, bilingue. Le texte sous la planche. |
| `sources` | Facultatif mais recommandé : liste d'adresses `https://…`. |

Chemins d'images : toujours `/saviez-vous/…`, jamais d'URL externe.

Une parution qui viole une règle n'apparaît pas et produit un message `[saviez-vous]` dans la console du navigateur — jamais de plantage.

Ne pas modifier une parution déjà en ligne, sauf erreur factuelle.
