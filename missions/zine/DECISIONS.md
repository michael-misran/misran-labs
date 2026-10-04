# Mission zine — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 2 | Tous les champs texte du format sont bilingues `{fr,en}`, y compris `dessin.legende` et `jeu.titre`/`jeu.consigne` que D2 ne précisait pas explicitement comme tels | Cohérence avec tous les autres formats du site (Brèves, Magazine, Projets), où chaque texte public est systématiquement bilingue |
| 2026-10-04 | 2 | La séquence `numero` démarre à 1, pas à 0 (contrairement au Magazine) | `/zine/1` doit être un numéro « normal » dès la première publication, pas un numéro « zéro » |
| 2026-10-04 | 5 | `registry.js` affiche toujours le libellé « Le Zine »/« The Zine » pour `/zine/:numero`, même si le numéro n'existe pas (pas une icône 404 comme pour les Jeux) | Le Zine est chronologique/séquentiel comme le Magazine et les Brèves, qui suivent ce même patron ; les Jeux ont un catalogue fixe de slugs, cas différent |
| 2026-10-04 | 5 | Aucune ligne ajoutée à `src/i18n/ui.js` | Fichier interdit par les règles communes ; les clés `navTitreZine`/`navRythmeZine`/`navBientot` existaient déjà et suffisaient au branchement |
