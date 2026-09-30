# Mission site-finitions — PROGRESS

**Statut :** étape 3 terminée
**Prochaine action :** étape 4 (image de partage og-image.png 1200×630)
**Blocages :** aucun

## État initial (relevé au cadrage, 2026-09-29, sur main 6e87188)
- `npm run build` : passe — `index-BH8rHvRy.js` 760,13 kB (gzip 233,87 kB), `index-Ik2NOjco.css` 6,55 kB, avertissement « chunks larger than 500 kB ».
- `npm run lint` : 0 erreur (mission site-avant-apres).

## Étape 1 (2026-09-30)
- Build reconfirmé sur `auto/site-finitions` : mêmes tailles qu'au cadrage (`index-BH8rHvRy.js` 760,13 kB / gzip 233,87 kB, CSS 6,55 kB, avertissement chunk > 500 kB).
- Lint : 0 erreur.
- Captures « avant » des 8 pages du critère 4, FR et EN : voir [CAPTURES-AVANT.md](CAPTURES-AVANT.md). Aucune erreur console sur les 16 captures.

## Étape 2 (2026-09-30)
- `index.html` : `lang="fr"`, `meta description`, balises Open Graph (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale` + alternate), `twitter:card` summary_large_image, `theme-color` crème `#f3ebdc`, titre « Misran Labs — le laboratoire de Michael Misran ».
- Liens `<link rel="icon">` → `/favicon.svg` et `<link rel="apple-touch-icon">` → `/apple-touch-icon.png` ajoutés (fichiers créés à l'étape 3).
- `grep -rn "vite.svg" index.html src public` : aucun résultat.

## Étape 3 (2026-09-30)
- `public/favicon.svg` créé : cercle corail `#dd5a3e` (anneau extérieur épais + anneau intérieur fin), lettre « M » centrée. Vérifié lisible à 32×32.
- `public/apple-touch-icon.png` 180×180 créé (fond crème `#f3ebdc`, même motif), source dans `missions/site-finitions/apple-touch-icon-source.svg`, rendu via Chrome headless. Dimensions vérifiées avec `sips`. Capture visuelle vérifiée (lisible).
- `public/vite.svg` supprimé (non référencé, confirmé à l'étape 2).
- Décision sur la police du « M » (Georgia au lieu d'un tracé) : voir DECISIONS.md.
