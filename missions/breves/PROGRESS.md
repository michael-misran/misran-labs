# Mission breves — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (premier jour réel 2026-09-30.json)
**Blocages :** aucun

## Étape 2 (2026-09-30)
`src/breves/FORMAT.md` et `src/breves/jours.js` créés sur le modèle du Magazine (`src/magazine/numeros.js`), sans champ `numero` (D2) : validation de `date`/nom de fichier, 1-5 `breves`, `rubrique` ∈ {ia, tech}, bilingue fr/en, `sources` ≥ 1 en https, `mot`/`chiffre` facultatifs mais bilingues si présents. Ajout de `getAdjacentDays(date)` (pas dans le modèle magazine) pour la navigation jour précédent/suivant de D5.

## État initial (2026-09-30, commit de2bd1a de main)
- `npm run build` : OK (sitemap.xml : 20 URL)
- `npm run lint` : OK, aucune erreur
