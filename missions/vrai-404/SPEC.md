# Mission vrai-404 — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : renvoyer un vrai code HTTP 404 pour les adresses qui n'existent pas (recommandation du RAPPORT de fiole-perchee-404).

## Contexte
- `vercel.json` ne contient qu'une réécriture `/(.*)` → `/index.html` : toute adresse répond **200** (vérifié le 2026-09-30 : `curl -sI https://misran-labs.vercel.app/nimporte-quoi` → `HTTP/2 200`). C'est React (`src/shell/Page404.jsx`, route `*` de `src/App.jsx`, et les `NotFound` des rubriques) qui affiche la page 404. Pour Google, ces pages « introuvables » sont des pages valides (soft 404).
- Le plugin `scripts/share-previews.js` (mission apercus-partage) écrit déjà au build une copie `dist/<chemin>/index.html` pour : `/magazine`, `/breves`, `/projets`, `/projets/fonctionnement`, `/suivre`, chaque numéro `/magazine/<date>`, chaque jour `/breves/<date>`, chaque idée `/projets/<id>`, chaque projet `/lab/<slug>` de `visibleProjects()`. Il écrit aussi `sitemap.xml` et les flux RSS. `dist/index.html` sert `/`.
- Routes de `src/App.jsx` **sans** fichier généré : `/lab/:slug/demo/:version?` (`ProjectDemoPage` : `version === 'v2'` → `demoComponentV2`, sinon `demoComponent` ; projets concernés : ceux de `src/lab/projects.js` qui ont `demoComponent` et/ou `demoComponentV2`).
- Les fichiers de `public/` (jeu, images, `robots.txt`, `session-logs/`…) sont servis tels quels par Vercel, avant toute réécriture.
- État initial (2026-09-30, `main` 5f5a316) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
Chaque page réelle du site garde son adresse et répond 200 ; toute autre adresse répond **404** en affichant la page 404 habituelle du site.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Pages de démo générées.** Dans `sharePreviewsPlugin()`, ajouter les pages `/lab/<slug>/demo` (projets avec `demoComponent`) et `/lab/<slug>/demo/v2` (projets avec `demoComponentV2`), même mécanique que les autres (`applyPreview` + `writePage`), aperçu repris du projet (`title` : « <title.fr> — démo · Misran Labs », description = celle de la page `/lab/<slug>`, image `og-lab.png`, type `website`). Ne **pas** les ajouter au `sitemap.xml` (pages secondaires). Lire la liste depuis les mêmes données que `collectLabProjects` (projets visibles seulement).

**D2 — Fichier `dist/404.html`.** Écrit par le plugin : copie de `dist/index.html` (après D1, même JS/CSS) avec `<title>Page introuvable · Misran Labs</title>`, `<meta name="robots" content="noindex">` ajouté dans `<head>`, et **sans** `<link rel="canonical">` (le retirer s'il est présent). Aucune autre balise changée. Vercel sert automatiquement `404.html` avec le code 404 pour toute adresse sans fichier ; le JS de l'application démarre et React Router affiche `Page404` (ou le `NotFound` de la rubrique), comme aujourd'hui.

**D3 — `vercel.json`.** Retirer la réécriture `/(.*)` → `/index.html`. Contenu final : `{ "trailingSlash": false }` (une adresse avec `/` final est redirigée vers la même sans `/`, puis servie depuis `<chemin>/index.html`). Aucun autre réglage.

**D4 — Vérification locale sans Vercel.** Script `missions/vrai-404/verifier-routes.mjs` (Node, sans réseau, sans dépendance) : après `npm run build`, il résout une liste d'adresses comme le ferait Vercel (fichier exact dans `dist/`, sinon `dist/<chemin>/index.html`, sinon → 404) et affiche un tableau adresse → fichier servi / 404. Liste :
- **attendues 200** : `/`, toutes les URL de `dist/sitemap.xml`, `/lab/<slug>/demo` et `/demo/v2` de D1, `/magazine/rss.xml`, `/breves/rss.xml`, `/projets/rss.xml`, `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/og-image.png`, `/games/lost-cauldron-game/index.html`, un fichier de `/assets/` ;
- **attendues 404** : `/nimporte-quoi`, `/magazine/1999-01-01`, `/breves/1999-01-01`, `/projets/P-999`, `/lab/inexistant`, `/lab/audit-tokens/demo` (pas de démo), `/assets/inexistant.js`.
Le script sort en erreur (code ≠ 0) si une adresse ne donne pas le résultat attendu.

**D5 — Pages introuvables d'une rubrique.** `/magazine/1999-01-01` etc. répondent maintenant 404 et affichent, via `404.html`, le `NotFound` de leur rubrique (React lit l'adresse). Aucun changement dans les composants React.

**D6 — Pas de mise en production sans contrôle.** La mission ne peut pas tester Vercel elle-même (pas de push). Le RAPPORT doit contenir, pour la clôture, la liste des commandes `curl -sI <aperçu-vercel>/<adresse>` à lancer sur le déploiement d'aperçu de la pull request (mêmes adresses que D4, avec le code attendu), en rappelant qu'une page réelle qui répondrait 404 bloque la fusion.

## Critères d'acceptation
1. `npm run build` passe ; `dist/404.html` existe, contient `noindex`, le titre de D2, aucun `canonical`, et référence exactement les mêmes `/assets/*.js` et `*.css` que `dist/index.html`.
2. `dist/lab/lost-cauldron-game/demo/index.html` et `dist/lab/lost-cauldron-game/demo/v2/index.html` existent (plus toute autre démo de D1) ; aucune n'apparaît dans `sitemap.xml`.
3. `vercel.json` = D3 exactement.
4. `node missions/vrai-404/verifier-routes.mjs` sort avec le code 0 ; sortie copiée dans PROGRESS.
5. Dans `npx vite preview` (build de la branche) : `/`, `/magazine`, une page `/magazine/<date>`, `/lab/lost-cauldron-game/demo/v2`, `/suivre` se chargent normalement ; ouvrir `/404.html` affiche la page 404 du site (fiole comprise) ; aucune erreur console.
6. `npm run lint` : aucune erreur.
7. RAPPORT contient la liste de contrôle `curl` de D6.
8. Tout est commité sur `auto/vrai-404`, rien sur `main`, rien de poussé.

## Hors périmètre
- En-têtes de cache, redirections d'anciennes adresses, réglages Vercel autres que D3.
- Pages de démo à versions autres que `v2`.
- Toute modification des composants React (404, `NotFound`).
