# Mission p007-maquettes — PROGRESS

**Statut :** prête à démarrer
**Prochaine action :** étape 2
**Blocages :** aucun

## État initial (2026-09-30, relevé au cadrage)
- `npm run build` : passe (sitemap à 30 URL, 4 flux RSS écrits).
- `npm run lint` : 0 erreur, 0 avertissement.
- `eslint.config.js` n'ignore que `dist` et `public/games` : le JavaScript de `public/screens/p007/` sera donc analysé (globales du navigateur). Il doit passer sans erreur.
