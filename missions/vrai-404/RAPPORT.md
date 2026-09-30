# Mission vrai-404 — RAPPORT

## Résultat en une ligne
Le site répond maintenant un vrai code HTTP : `vercel.json` ne réécrit plus tout vers `index.html`, chaque page réelle a son fichier (y compris 3 nouvelles pages de démo), et une adresse inconnue reçoit `dist/404.html` avec le code 404 — vérifié localement sur 43 adresses, aucun écart.

## Fait
- **D1 — Pages de démo générées** : `collectLabDemoPages()` ajoutée à `scripts/share-previews.js`. 3 pages écrites au build, hors sitemap : `/lab/lost-cauldron-game/demo`, `/lab/lost-cauldron-game/demo/v2`, `/lab/exp-003/demo` (les seuls projets visibles avec `demoComponent`/`demoComponentV2`).
- **D2 — `dist/404.html`** : `build404Html()` ajoutée. Copie de la page d'accueil avec titre « Page introuvable · Misran Labs », `<meta name="robots" content="noindex">`, sans `<link rel="canonical">`. Mêmes fichiers `/assets/*.js`/`*.css` que `dist/index.html` (vérifié par `diff`).
- **D3 — `vercel.json`** : réécriture `/(.*)` → `/index.html` retirée. Contenu final : `{ "trailingSlash": false }`, exactement D3.
- **D4 — Script de vérification** : `missions/vrai-404/verifier-routes.mjs` (Node, sans réseau ni dépendance), résout chaque adresse comme le ferait Vercel (fichier exact, sinon `<chemin>/index.html`, sinon `404.html`). 43 adresses vérifiées, 0 échec, code de sortie 0.
- **D5 — Pages introuvables d'une rubrique** : automatique, aucun changement React nécessaire — `/magazine/1999-01-01` etc. sont maintenant de vraies 404 (fichier `404.html`), et le `NotFound` de la rubrique s'affiche normalement une fois le JS démarré (comportement inchangé côté composants).

## Pas fait / écarts
Aucun. Toutes les décisions de la SPEC ont été appliquées telles quelles, sans repli ni contournement.

## Critères d'acceptation
1. **OK** — `npm run build` passe ; `dist/404.html` existe, contient `noindex`, le titre de D2, aucun `canonical` ; référence exactement les mêmes `/assets/*.js`/`*.css` que `dist/index.html` (`diff` vide).
2. **OK** — `dist/lab/lost-cauldron-game/demo/index.html`, `dist/lab/lost-cauldron-game/demo/v2/index.html` et `dist/lab/exp-003/demo/index.html` existent ; aucune des 3 n'apparaît dans `sitemap.xml` (23 URL, uniquement les pages publiques).
3. **OK** — `vercel.json` = `{ "trailingSlash": false }`, exactement D3.
4. **OK** — `node missions/vrai-404/verifier-routes.mjs` sort avec le code 0 ; sortie complète dans PROGRESS.md étape 4 (43 adresses, 0 échec).
5. **OK** — Dans `npx vite preview` : `/`, `/magazine`, `/magazine/2026-09-28`, `/lab/lost-cauldron-game/demo/v2` (canvas affiché), `/suivre` se chargent normalement ; `/404.html` affiche la page 404 du site (mascotte Fiole comprise) ; aucune erreur console sur ces 6 pages (vérifié par le verificateur, étape 5).
6. **OK** — `npm run lint` : aucune erreur (vérifié à chaque étape).
7. **OK** — Liste de contrôle `curl` ci-dessous.
8. **OK** — Tout commité sur `auto/vrai-404` (6 commits), rien sur `main`, rien poussé.

## Liste de contrôle `curl` pour la clôture (D6)
À lancer sur le déploiement d'aperçu Vercel de la pull request, une fois ouverte (remplacer `<apercu-vercel>` par son URL, par ex. `misran-labs-git-auto-vrai-404-xxx.vercel.app`). **Une seule page réelle qui répondrait 404 bloque la fusion** ; à l'inverse, si l'une des adresses « attendues 404 » répond 200, le correctif n'a pas pris effet sur ce déploiement.

Adresses attendues en **200** :
```bash
curl -sI https://<apercu-vercel>/
curl -sI https://<apercu-vercel>/magazine
curl -sI https://<apercu-vercel>/breves
curl -sI https://<apercu-vercel>/projets
curl -sI https://<apercu-vercel>/projets/fonctionnement
curl -sI https://<apercu-vercel>/suivre
curl -sI https://<apercu-vercel>/magazine/2026-09-27
curl -sI https://<apercu-vercel>/magazine/2026-09-28
curl -sI https://<apercu-vercel>/breves/2026-09-30
curl -sI https://<apercu-vercel>/projets/P-001
curl -sI https://<apercu-vercel>/projets/P-002
curl -sI https://<apercu-vercel>/projets/P-003
curl -sI https://<apercu-vercel>/projets/P-004
curl -sI https://<apercu-vercel>/projets/P-005
curl -sI https://<apercu-vercel>/lab/design-system-multimarques
curl -sI https://<apercu-vercel>/lab/lost-cauldron-game
curl -sI https://<apercu-vercel>/lab/design-system
curl -sI https://<apercu-vercel>/lab/workflow
curl -sI https://<apercu-vercel>/lab/exp-003
curl -sI https://<apercu-vercel>/lab/cv
curl -sI https://<apercu-vercel>/lab/lab-tokens
curl -sI https://<apercu-vercel>/lab/utilisation-ia
curl -sI https://<apercu-vercel>/lab/audit-tokens
curl -sI https://<apercu-vercel>/lab/lost-cauldron-game/demo
curl -sI https://<apercu-vercel>/lab/lost-cauldron-game/demo/v2
curl -sI https://<apercu-vercel>/lab/exp-003/demo
curl -sI https://<apercu-vercel>/magazine/rss.xml
curl -sI https://<apercu-vercel>/breves/rss.xml
curl -sI https://<apercu-vercel>/projets/rss.xml
curl -sI https://<apercu-vercel>/rss.xml
curl -sI https://<apercu-vercel>/sitemap.xml
curl -sI https://<apercu-vercel>/robots.txt
curl -sI https://<apercu-vercel>/og-image.png
curl -sI https://<apercu-vercel>/games/lost-cauldron-game/index.html
# + un fichier de /assets/ : lister avec `ls dist/assets/*.js | head -1` sur ce déploiement,
# le nom change à chaque build (hash de contenu).
```
Toutes doivent répondre `HTTP/2 200`.

Adresses attendues en **404** :
```bash
curl -sI https://<apercu-vercel>/nimporte-quoi
curl -sI https://<apercu-vercel>/magazine/1999-01-01
curl -sI https://<apercu-vercel>/breves/1999-01-01
curl -sI https://<apercu-vercel>/projets/P-999
curl -sI https://<apercu-vercel>/lab/inexistant
curl -sI https://<apercu-vercel>/lab/audit-tokens/demo
curl -sI https://<apercu-vercel>/assets/inexistant.js
```
Toutes doivent répondre `HTTP/2 404`.

## Comment vérifier
- `npm run build && node missions/vrai-404/verifier-routes.mjs` (0 échec attendu, code de sortie 0).
- `npm run lint`.
- `npx vite preview`, puis ouvrir `/404.html` directement (vite preview ne connaît pas la configuration Vercel : seul le fichier lui-même peut être testé en local).
- Après ouverture de la pull request : la liste de contrôle `curl` ci-dessus sur le déploiement d'aperçu.

## Décisions
Aucune décision non prévue par la SPEC n'a été nécessaire ; les 6 décisions de SPEC.md (D1 à D6) ont été appliquées telles quelles.

## Délégations
Modèles réellement utilisés :
- **verificateur (Haiku)**, étape 5 : vérification navigateur dans `vite preview`. Réussi.
- Cadrage (étape 0) : Opus 5.5.
- Toutes les autres étapes (1 à 4, 6) faites par la session principale (Sonnet), conformément au PLAN.

## Recommandations
- Après fusion et déploiement, lancer la liste de contrôle `curl` ci-dessus sur le domaine de production (pas seulement l'aperçu de la PR), pour confirmer que le comportement 404 s'applique bien en production.
- Si un futur projet du Lab ajoute une démo (`demoComponent`/`demoComponentV2` dans `src/lab/projects.js`), la page correspondante est générée automatiquement par `collectLabDemoPages()` — rien à faire de plus pour qu'elle réponde 200 sans être indexée par le sitemap.
