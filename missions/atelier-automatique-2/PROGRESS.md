# Mission atelier-automatique-2 — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (fiche n° 0 « Le rédacteur »)
**Blocages :** aucun

## État initial (2026-10-15, depuis main 6a4fb06)
- `npm run build` : OK
- `npm run lint` : OK, 0 erreur, 0 avertissement
- Livre : 26 pages, parties 0 à 3 ; parties 4 à 8 et glossaire « en préparation »

## Étape 2 — Pagination calculée (2026-10-15)
`pagesDuLivre` construit maintenant une liste d'entrées `[cle, rendu]` ; le
folio de chaque page est sa position (`i + 1`) et n'est plus écrit en dur.
Les parties du sommaire portent une `cle` (`p0`…`p8`, `glossaire`) au lieu
d'un folio fixe ; une table `folios` calculée une fois par rendu du livre
fait le lien. Vérifié avec `npx vite preview` : 26 pages, folios 2 à 25
identiques à avant, sommaire identique (4/6/8/18 + « en préparation »),
aucune erreur console, aucun débordement à 375 px. `npm run build` et
`npm run lint` : OK.
