# Mission referencement — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (public/robots.txt)
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
