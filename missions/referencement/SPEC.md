# Mission referencement — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « Référencement » — sitemap.xml + robots.txt générés automatiquement, titres d'onglet harmonisés avec les aperçus de partage.

## Contexte
- La mission `apercus-partage` (PR 19, fusionnée) a ajouté le plugin Vite `scripts/share-previews.js` : au build, il écrit `dist/<chemin>/index.html` pour 19 pages publiques (`/magazine`, chaque numéro, `/projets`, `/projets/fonctionnement`, chaque idée, chaque projet visible du Lab), avec leurs balises d'aperçu. La liste des pages est construite dans `closeBundle` (tableau `pages`).
- Il n'existe ni `sitemap.xml` ni `robots.txt` (`public/` : icônes, images de partage, `games/`, `session-logs/`). Google doit deviner les pages en exécutant le JavaScript.
- Titre de l'onglet : `src/shell/Shell.jsx` (ligne ~22) fait `document.title = meta.label ? \`${meta.label} — Michael Misran\` : 'Michael Misran'`, où `meta = resolveRouteMeta(pathname, lang)` (`src/shell/registry.js`). Il suit déjà la page et la langue. Mais le suffixe (« — Michael Misran ») diffère des aperçus (« · Misran Labs »), et l'accueil affiche « Lab Home — Michael Misran » dans l'onglet alors que le HTML servi dit « Misran Labs — le laboratoire de Michael Misran ». `meta.label` est aussi utilisé ailleurs (barre d'état, fil) : **on ne touche pas aux labels**, seulement à la construction de `document.title`.
- URL de production : `https://misran-labs.vercel.app`.

## Objectif
Les moteurs de recherche trouvent toutes les pages publiques via un `sitemap.xml` tenu à jour tout seul à chaque build, un `robots.txt` les y renvoie, et le titre de l'onglet porte la même signature que les aperçus de partage.

## Décisions (tranchées, ne pas rediscuter)
**D1 — `sitemap.xml` généré par le plugin existant.** Dans `scripts/share-previews.js`, à la fin de `closeBundle`, écrire `dist/sitemap.xml` (format sitemaps.org 0.9, encodage UTF-8) à partir de **la même liste `pages`** que les aperçus, plus l'accueil `https://misran-labs.vercel.app/`. Pas de seconde liste de pages à maintenir. URL absolues sans barre finale (sauf l'accueil), valeurs échappées pour XML (`&`, `<`, `>`, `"`, `'`). Balise `<lastmod>` (AAAA-MM-JJ) seulement quand une date fiable existe : `date` du numéro pour `/magazine/<date>`, `date` de l'idée pour `/projets/<id>` ; aucune autre (`changefreq` et `priority` : ne pas les mettre, Google les ignore). Pour transporter la date, ajouter un champ optionnel `lastmod` aux objets de page construits par `collectMagazineNumeros` et `collectProjetsIdees` ; `applyPreview` l'ignore. Afficher dans la console du build : `[share-previews] sitemap.xml : N URL`.

**D2 — `robots.txt` statique.** Nouveau fichier `public/robots.txt` :
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://misran-labs.vercel.app/sitemap.xml
```
Rien d'autre (les pages privées ne sont pas des routes publiques du site ; ne pas les nommer dans un fichier public).

**D3 — Titre d'onglet harmonisé.** Dans `src/shell/Shell.jsx` uniquement :
- accueil (`location.pathname === '/'`) : FR « Misran Labs — le laboratoire de Michael Misran » (identique au `<title>` d'`index.html`), EN « Misran Labs — Michael Misran's lab » ;
- autres pages avec label : `${meta.label} · Misran Labs` ;
- sans label : « Misran Labs ».
Les deux textes de l'accueil vont dans `src/i18n/ui.js` (clé `homeDocumentTitle`, fr/en) si ce fichier suit ce principe, sinon en constante dans `Shell.jsx` — le noter dans DECISIONS. L'effet dépend de `meta.label`, de la langue et du chemin.

**D4 — Rien d'autre.** Pas de données structurées JSON-LD, pas de balises `hreflang`, pas de changement de `vercel.json`, pas de nouvelle dépendance.

## Critères d'acceptation
1. `npm run build` passe et affiche la ligne `sitemap.xml : N URL` avec N = nombre de pages d'aperçu + 1 (20 au cadrage : 19 + accueil).
2. `dist/sitemap.xml` est un XML valide (`xmllint --noout dist/sitemap.xml`, outil présent sur macOS), contient l'accueil et chaque URL générée, `<lastmod>2026-09-28</lastmod>` pour `/magazine/2026-09-28`, le `lastmod` égal au champ `date` de `P-001.json` pour `/projets/P-001`, aucun `<lastmod>` sur `/lab/*`, `/magazine`, `/projets`, `/projets/fonctionnement`. Extraits copiés dans PROGRESS.md.
3. `dist/robots.txt` existe avec le contenu exact de D2.
4. Avec `npx vite preview` : `curl -s http://localhost:4173/sitemap.xml` et `curl -s http://localhost:4173/robots.txt` renvoient les fichiers (pas le HTML de l'application).
5. Dans le navigateur (dev ou preview) : l'onglet affiche « Misran Labs — le laboratoire de Michael Misran » sur `/` en FR et « Misran Labs — Michael Misran's lab » en EN ; « Magazine — Prix en baisse, agents en expansion · Misran Labs » sur `/magazine/2026-09-28` en FR ; « Tokens du Lab · Misran Labs » sur `/lab/lab-tokens` en FR et « Lab Tokens · Misran Labs » en EN ; le titre change quand on bascule FR/EN et quand on navigue par la barre latérale. Barre d'état et reste de la page identiques à avant, aucune erreur console.
6. `npm run lint` : 0 erreur (état initial : 0).
7. Tout est commité sur `auto/referencement`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Déclarer le site dans Google Search Console (action de Michael sur son compte Google — donner la marche à suivre en 4 étapes dans le RAPPORT).
- Données structurées JSON-LD, `hreflang`, URL anglaises dédiées.
- Toute modification des images de partage (mission `images-numeros`).
