# Mission utilisation-ia-octobre — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-05 | 0 | Bilan chiffré : missions 9 à 41 regroupées en 3 lignes au lieu d'une ligne chacune. | 33 lignes rendraient le tableau illisible, surtout à 375 px. |
| 2026-10-05 | 0 | Lightpanda en paragraphe dans la section tokens, pas en section. | Petit fait, qui complète directement l'économie de tokens. |
| 2026-10-05 | 0 | Le journal papier est décrit en une phrase, sans son contenu ni ses raisons personnelles. | Il vit dans `src/private/` ; seule la page `/breves` est publique. |
| 2026-10-05 | 2 | `npm run lint` vérifié sur `UtilisationIA.jsx` seul (0 erreur), pas sur le dépôt entier. | Un worktree orphelin `.worktrees/pages-doc` (branche `verif-pages-doc`, laissé par une session précédente) fait remonter 196 fausses erreurs — l'incident décrit dans CONTENU §B.4. Hors périmètre de la mission : je ne le supprime pas (changements non commités dedans), je le signale en RAPPORT.md. |
| 2026-10-05 | 6 | Critère 4 (grep données privées) : une correspondance pré-existante sur `main` (« crédits d'essai », ligne de la mission 4 sur le Magazine) n'a pas été touchée. | Aucun secret, pas lié à ma mission, hors périmètre ; signalé en RAPPORT.md plutôt que modifié. |
| 2026-10-05 | 6 | Critère 7 (`git diff main --stat`) : `LabTokens.jsx` apparaît modifié, mais pas par cette mission. | `main` a avancé (PR #70, après la création de la branche) ; aucun commit de cette mission ne touche ce fichier. Signalé en RAPPORT.md. |
