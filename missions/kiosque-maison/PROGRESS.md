# Mission kiosque-maison — PROGRESS

**Statut :** étapes 1-3 faites, en cours
**Prochaine action :** étape 4 (Shell : défilement du document, retrait Topbar/Sidebar/Statusbar, route /lab, D4/D8)
**Blocages :** aucun

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
