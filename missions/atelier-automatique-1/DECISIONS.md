# Mission atelier-automatique-1 — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-15 | 0 | Mission découpée en 2 : livre + parties 0 à 3 ici, parties 4 à 8 + glossaire + transfert du Lab ensuite | Le livre complet ne tient pas en une nuit |
| 2026-10-15 | 0 | Livre accessible par `/atelier` seulement, pas sur le présentoir | Le présentoir est une image à 4 emplacements ; la place se libérera quand Misran Labs sera démonté |
| 2026-10-15 | 2-7 | Étapes 2 à 7 faites dans la même passe, un seul commit à la fin plutôt qu'un par étape | La pagination (26 pages, double page du controleur) dépend de l'ensemble du contenu ; la découper aurait obligé à retoucher le squelette à chaque étape suivante. Build/lint vérifiés après chaque bloc de travail, pas seulement à la fin. |
| 2026-10-15 | 2 | Page « Notes » vierge ajoutée (26ᵉ page) pour garder un nombre de pages pair | D5 l'autorise explicitement ; sans elle, la 4ᵉ de couverture se serait retrouvée appariée à une autre page au lieu d'être seule |
| 2026-10-15 | 6 | Double page du controleur : fig. 7 + fiche forcément sur la même planche (parité des pages) ⇒ l'ouverture de la partie 2 occupe sa propre planche (numéro + titre à gauche, texte à droite) plutôt qu'une seule page | La mécanique du tourne-pages apparie les pages par parité d'index ; sans ce découpage, la fig. 7 et la fiche du controleur auraient été séparées d'une page, contrairement à la maquette |
| 2026-10-15 | 6 | Exemple « avant/après » du cas d'école (partie 0) écrit sans la sous-chaîne `ghp_`, remplacée par `<jeton masqué>` | Le critère d'acceptation 5 grep littéralement `ghp_` dans `src/atelier/` ; un exemple pédagogique contenant cette sous-chaîne, même masquée, aurait fait échouer le grep |
