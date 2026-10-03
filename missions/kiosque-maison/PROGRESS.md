# Mission kiosque-maison — PROGRESS

**Statut :** étapes 1-4 faites, en cours
**Prochaine action :** étape 5 (Masthead.jsx, D5)
**Blocages :** aucun

## Étape 4 (Shell)
`Shell.jsx` réécrit : document qui défile (plus de grille 100vh/overflow hidden),
Topbar/Sidebar/Statusbar retirés du rendu (fichiers pas encore supprimés, prévu
étape 8 avec D7), SecondarySidebar/Outlet/document.title conservés. Règles
d'impression simplifiées (plus besoin de rétablir height/overflow puisque le
flux est déjà normal). Route `/lab` ajoutée dans `App.jsx` (affiche ArchiveHome)
+ entrée dans `registry.js` pour que `resolveRouteMeta('/lab')` ne tombe pas sur
la 404. État intermédiaire attendu : pas de header/nav visible tant que Masthead/
NavTitres (étapes 5-6) ne sont pas branchés. Vérifié dans `npx vite preview` sur
`/` et `/lab` : rendu correct, 0 erreur console. Build et lint OK.

## Étape 3 (tokens)
Primitives papier/encre/gris/filet/titre-* + polices D2 ajoutées, sémantiques réaffectées
(`--bg`, `--text`, `--border`, `--primary` et leurs dérivés, `--font-heading/body/mono`),
tokens `--titre-*` et `--font-bois/-2/-3/-etiquette/-chapo/-gothique/-bd/-pixel/-ecran/-machine`
ajoutés. Anciennes primitives crème/ink/corail conservées (Fiole, Tokens du Lab) — voir
DECISIONS.md. Build et lint OK.

## État initial (relevé au cadrage, 2026-10-03, branche `refonte-kiosque` = `main` aee617c)
- `npm run build` : OK (share-previews, sitemap, 4 flux RSS écrits).
- `npm run lint` : OK, 0 erreur.

## Reconfirmation (2026-10-04, routine)
- `npm run build` : OK, identique (36 pages d'aperçu, sitemap 37 URL, 4 flux RSS).
- `npm run lint` : OK, 0 erreur.
