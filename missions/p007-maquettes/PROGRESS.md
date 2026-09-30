# Mission p007-maquettes — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 3 (`widgets.html`)
**Blocages :** aucun

## État initial (2026-09-30, relevé au cadrage)
- `npm run build` : passe (sitemap à 30 URL, 4 flux RSS écrits).
- `npm run lint` : 0 erreur, 0 avertissement.
- `eslint.config.js` n'ignore que `dist` et `public/games` : le JavaScript de `public/screens/p007/` sera donc analysé (globales du navigateur). Il doit passer sans erreur.

## Étape 2 (faite, 2026-10-01)
- `p007.css` : variables de thème (Papier/Nuit/Pop) sur `[data-theme]`, cadre de téléphone 390×844 avec coins 55px et Dynamic Island, barre de statut, styles des 5 widgets, faux écran d'accueil, composants de page (cartes, formulaires, pro).
- `p007.js` : thème mémorisé (`localStorage` `p007-theme`, try/catch), calcul du compte à rebours en jours calendaires (D8), données d'exemple relatives à `new Date()`, fonctions de rendu des widgets réutilisées par `widgets.html` et l'aperçu de `creation.html`.
- Décision : heures/minutes/secondes du compte à rebours décomptent jusqu'au minuit local suivant (le chiffre des jours ne change qu'à minuit) — voir DECISIONS.md.
- `npm run lint` : 0 erreur après correction de deux `catch` sans variable utilisée.
