# Mission jeux-arcade — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 3 | Retrait de la constante `A_VENIR` et de `CarteBientot` dans `JeuxHome.jsx` (toujours à 0, ne rendait rien) | Code mort supprimé en réécrivant le fichier ; aucun changement de comportement visible |
| 2026-10-04 | 2 | Menu clavier (`MenuSelectGame`) : écoute `keydown` sur `window` pendant que `/jeux` est monté, flèches haut/bas + Entrée | `/jeux` n'a aucun champ de saisie texte, donc aucun risque d'intercepter une frappe destinée à un formulaire |
| 2026-10-04 | 4 | `ResultatPartage` affiche « BRAVO ! »/« WELL PLAYED ! » si `score >= 50`, sinon « GAME OVER » | La SPEC demande les deux écrans sans donner de règle ; `score` est un pourcentage 0-100 sans autre notion de victoire/défaite, 50 est le seuil médian le plus neutre |
