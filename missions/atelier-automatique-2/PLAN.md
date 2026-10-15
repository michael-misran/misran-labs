# Mission atelier-automatique-2 — PLAN

Cocher `[x]` chaque étape terminée, puis mettre à jour PROGRESS.md et commiter.
Chaque étape indique l'agent et le modèle à utiliser. Référence visuelle : `screens/atelier-automatique.html` (sur le disque, hors Git) et les pages existantes de `src/atelier/`.

- [x] 0. Cadrage : SPEC, PLAN, fichiers de suivi → session principale (Opus)
- [x] 1. État initial : build, lint notés dans PROGRESS.md → session principale (Opus, au cadrage)
- [x] 2. Pagination : remplacer les folios en dur de `AtelierLivre.jsx` par un calcul (ou une table unique), pour que l'insertion de pages ne casse rien ; build OK, rendu identique → session principale (Sonnet)
- [x] 3. Fiche n° 0 « Le rédacteur » : double page (machine à écrire éclatée + fiche), mise à jour de l'ouverture de la partie 2 et de la garde (D1) → session principale (Sonnet)
- [x] 4. Partie 4 — Les missions autonomes (FR/EN), figure du cycle → session principale (Sonnet)
- [x] 5. Partie 5 — Les accessoires (FR/EN) → session principale (Sonnet)
- [x] 6. Partie 6 — Réglages et consommation (FR/EN) → session principale (Sonnet)
- [x] 7. Partie 7 — Pannes et dépannage, tableau Symptôme / Cause / Remède (FR/EN) → session principale (Sonnet)
- [x] 8. Partie 8 — Carnet d'entretien (FR/EN), condensé de la chronologie de UtilisationIA.jsx → session principale (Sonnet)
- [x] 9. Annexe — Glossaire (FR/EN) ; sommaire avec les vrais folios, plus aucune mention « en préparation » ; parité des pages (D3) → session principale (Sonnet)
- [x] 10. Relecture de la forme FR/EN des textes ajoutés dans `src/atelier/atelierTexte.js` → secretaire (Sonnet) ; puis appliquer les corrections → session principale (Sonnet)
- [ ] 11. Vérification finale : build, lint, greps des critères 3 et 6 par la session principale ; navigateur (critères 1, 2, 4, 5 : toutes les pages, console, folios du sommaire, 375 px) → verificateur (Haiku)
- [ ] 12. RAPPORT.md → session principale (Sonnet)
