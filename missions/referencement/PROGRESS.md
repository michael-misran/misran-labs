# Mission referencement — PROGRESS

**Statut :** étape 5 terminée
**Prochaine action :** étape 6 (RAPPORT.md)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-30, sur main 6f36410)
- `npm run build` : passe, 19 pages d'aperçu générées par `share-previews`.
- `npm run lint` : 0 erreur.
- Production vérifiée : chaque page publique sert son propre `<title>` d'aperçu, y compris sans barre finale.
- Onglet actuel : « Lab Home — Michael Misran » sur `/`, « Magazine — Prix en baisse, agents en expansion — Michael Misran » sur `/magazine/2026-09-28`.

## Étape 1 — confirmée (2026-09-30, session routine)
- `npm run build` : passe, log `[share-previews] 19 page(s) d'aperçu générées` (liste identique au cadrage).
- `npm run lint` : 0 erreur.

## Étape 2 — sitemap.xml (2026-09-30, session routine)
- Ajout de `escapeXml`, `buildSitemapXml` et champ `lastmod` (depuis `data.date`) à `collectMagazineNumeros` / `collectProjetsIdees` dans `scripts/share-previews.js`. Écrit `dist/sitemap.xml` à la fin de `closeBundle`, à partir de la même liste `pages` que les aperçus + l'accueil.
- `npm run build` : `[share-previews] sitemap.xml : 20 URL` (19 pages + accueil).
- `xmllint --noout dist/sitemap.xml` : XML valide.
- Contenu vérifié (`cat dist/sitemap.xml`) :
  - Accueil `https://misran-labs.vercel.app/` présent, sans `<lastmod>`.
  - `<lastmod>2026-09-27</lastmod>` sur `/magazine/2026-09-27`, `<lastmod>2026-09-28</lastmod>` sur `/magazine/2026-09-28`.
  - `<lastmod>2026-09-27</lastmod>` sur `/projets/P-001` (égal au champ `date` de `P-001.json`), idem P-002 à P-005.
  - Aucun `<lastmod>` sur `/magazine`, `/projets`, `/projets/fonctionnement`, ni sur les 9 pages `/lab/*`.
- `npm run lint` : 0 erreur.

## Étape 3 — robots.txt (2026-09-30, sous-agent Haiku)
- `public/robots.txt` créé avec le contenu exact de D2. `npm run build` : `dist/robots.txt` présent, contenu identique (copie automatique de `public/` par Vite).

## Étape 4 — titre d'onglet, D3 (2026-09-30, session routine)
- `src/i18n/ui.js` suit déjà le principe fr/en par clé : ajout de la clé `homeDocumentTitle` (fr : « Misran Labs — le laboratoire de Michael Misran » identique au `<title>` d'`index.html` ; en : « Misran Labs — Michael Misran's lab »).
- `src/shell/Shell.jsx` : l'effet `document.title` distingue maintenant l'accueil (`location.pathname === '/'`, utilise `t(lang, 'homeDocumentTitle')`) des autres pages (`${meta.label} · Misran Labs}` avec label, sinon `Misran Labs`). Dépendances de l'effet : `location.pathname`, `meta.label`, `lang`.
- Avant/après : `/` FR passait de « Lab Home — Michael Misran » à « Misran Labs — le laboratoire de Michael Misran » ; `/magazine/2026-09-28` FR de « Magazine — Prix en baisse, agents en expansion — Michael Misran » à « Magazine — Prix en baisse, agents en expansion · Misran Labs ».
- `npm run build` : passe, sitemap.xml toujours 20 URL. `npm run lint` : 0 erreur.

## Étape 5 — vérification finale (2026-09-30)
- Build + lint finaux : 0 erreur.
- `npx vite preview --port 4173` (routine, pas de preview « dev ») : `curl http://localhost:4173/sitemap.xml` → XML correct (pas le HTML de l'app) ; `curl http://localhost:4173/robots.txt` → contenu exact de D2. Critère 4 OK.
- Titres d'onglet (sous-agent verificateur, Haiku) : `/` FR « Misran Labs — le laboratoire de Michael Misran », EN « Misran Labs — Michael Misran's lab » ; `/magazine/2026-09-28` FR « Magazine — Prix en baisse, agents en expansion · Misran Labs » ; `/lab/lab-tokens` FR « Tokens du Lab · Misran Labs », EN « Lab Tokens · Misran Labs ». Titre changé correctement lors de la navigation barre latérale sans rechargement. Aucune erreur console. Critère 5 OK.
- Serveur `vite preview` arrêté après vérification.
