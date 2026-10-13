# Mission p006-maquettes — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 11 (controleur avant rapport)
**Blocages :** aucun

## Bugs trouvés et corrigés à l'étape 10
- Contenu d'un `<details>` fermé resté affiché (moteur de l'outil de vérification) → masquage explicite par CSS.
- Attribut `hidden` ignoré par toute classe fixant `display` (`.btn`, `.btn-row`, `.provisional-tag`) → règle globale `[hidden] { display:none !important; }`.
- Rangée de 4 boutons de poignée débordant à 375 px → passée en grille 2×2 (`.btn-grid`).
- Champ `id` des donnes inutilisé et bogué (toujours 1) → supprimé.

## État initial (2026-10-13, base origin/main 09e84fc + PR #95 et #96)
- `npm run build` : OK
- `npm run lint` : OK, aucune erreur
- `public/screens/p006/` n'existe pas encore ; modèle à suivre : `public/screens/p007/`
