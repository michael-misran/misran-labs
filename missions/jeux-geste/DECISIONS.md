# Mission jeux-geste — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-01 | 2 | `SITE_URL` redéfini en dur dans `socle/partage.js` plutôt qu'importé depuis `scripts/share-previews.js`. | `scripts/share-previews.js` tourne côté Node (utilise `fs`/`path`) et n'est pas importable dans le bundle navigateur. Même solution déjà adoptée dans `src/suivre/suivreText.js` (commentaire identique posé dans le code). |
