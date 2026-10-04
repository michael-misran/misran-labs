# Mission jeux-arcade — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 3 | Retrait de la constante `A_VENIR` et de `CarteBientot` dans `JeuxHome.jsx` (toujours à 0, ne rendait rien) | Code mort supprimé en réécrivant le fichier ; aucun changement de comportement visible |
| 2026-10-04 | 2 | Menu clavier (`MenuSelectGame`) : écoute `keydown` sur `window` pendant que `/jeux` est monté, flèches haut/bas + Entrée | `/jeux` n'a aucun champ de saisie texte, donc aucun risque d'intercepter une frappe destinée à un formulaire |
