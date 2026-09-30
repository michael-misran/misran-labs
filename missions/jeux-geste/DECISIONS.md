# Mission jeux-geste — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-01 | 2 | `SITE_URL` redéfini en dur dans `socle/partage.js` plutôt qu'importé depuis `scripts/share-previews.js`. | `scripts/share-previews.js` tourne côté Node (utilise `fs`/`path`) et n'est pas importable dans le bundle navigateur. Même solution déjà adoptée dans `src/suivre/suivreText.js` (commentaire identique posé dans le code). |
| 2026-10-01 | 4 | `missions/vrai-404/verifier-routes.mjs` : seul `/jeux/inconnu` a été ajouté explicitement à `attendues404`. `/jeux` et `/jeux/geste-parfait` ne sont pas ajoutés en dur à `attendues200`. | Ces deux routes apparaissent déjà automatiquement via `lireSitemap()` une fois `share-previews.js` générique sur `src/jeux/*/meta.js` (le sitemap les contient dès que `geste-parfait/meta.js` existe, étape 5) — les ajouter en dur aurait juste dupliqué la vérification. |
