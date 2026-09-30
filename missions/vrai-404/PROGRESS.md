# Mission vrai-404 — PROGRESS

**Statut :** étape 4 terminée
**Prochaine action :** étape 5 (vérification navigateur, verificateur)
**Blocages :** aucun

## Étape 4 — script verifier-routes.mjs (D4)
- `missions/vrai-404/verifier-routes.mjs` écrit : résout chaque adresse comme le ferait Vercel avec `vercel.json` (`trailingSlash: false`, pas de réécriture) — fichier exact dans `dist/`, sinon `<chemin>/index.html`, sinon `404.html`.
- Lancé après `npm run build` : **43 adresses vérifiées, 0 échec, code de sortie 0**. Toutes les adresses attendues en 200 (accueil, 22 pages du sitemap, les 3 démos de D1, flux RSS, sitemap, robots.txt, une image, un fichier de jeu, un fichier `/assets/`) donnent bien 200 ; toutes les adresses attendues en 404 (`/nimporte-quoi`, dates/ids inexistants, `/lab/inexistant`, `/lab/audit-tokens/demo` — pas de démo sur cette page —, un asset inexistant) donnent bien 404 via `404.html`. Sortie complète du tableau conservée dans l'historique de commit (script rejouable : `node missions/vrai-404/verifier-routes.mjs`).
- `npm run lint` : aucune erreur.

## Étape 3 — vercel.json (D3)
- Réécriture `/(.*)` → `/index.html` retirée. Contenu final : `{ "trailingSlash": false }`, exactement D3.
- `npm run build` et `npm run lint` : passent.

## Étape 2 — pages de démo (D1) et 404.html (D2)
- `scripts/share-previews.js` : `collectLabDemoPages()` ajoutée, parcourt `visibleProjects()` et ajoute `/lab/<slug>/demo` (si `demoComponent`) et `/lab/<slug>/demo/v2` (si `demoComponentV2`), écrites hors du tableau `pages` donc **hors sitemap**. 3 pages générées : `/lab/lost-cauldron-game/demo`, `/lab/lost-cauldron-game/demo/v2`, `/lab/exp-003/demo`.
- `build404Html()` ajoutée : titre « Page introuvable · Misran Labs », `<meta name="robots" content="noindex">` ajouté, `<link rel="canonical">` retiré (absent de toute façon dans `baseHtml`, retrait par sécurité si jamais présent). Écrit dans `dist/404.html`.
- Vérifié : `diff` des `/assets/*.js`/`*.css` entre `dist/index.html` et `dist/404.html` → aucune différence (critère 1). `dist/sitemap.xml` ne contient aucune des 3 pages de démo (critère 2).
- `npm run build` et `npm run lint` : passent.

## État initial (relevé au cadrage, 2026-09-30, main 5f5a316)
- `npm run build` : passe
- `npm run lint` : aucune erreur

## Étape 1 (2026-09-30, reconfirmé sur auto/vrai-404)
- `npm run build` : passe
- `npm run lint` : aucune erreur
