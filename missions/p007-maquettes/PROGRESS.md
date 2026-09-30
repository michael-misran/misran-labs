# Mission p007-maquettes — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 5 (`creation.html`, `pro.html`)
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

## Étapes 3-4 (faites, 2026-10-01)
- `widgets.html` : deux cadres de téléphone côte à côte (écran d'accueil avec grille d'icônes + widgets petit/moyen/grand ; écran verrouillé avec les 2 widgets de verrouillage), onglets de thème partagés, mise à jour toutes les 60 s.
- `liste.html` : titre « Soon », cartes triées par date, l'événement le plus proche mis en avant, bouton « + » flottant vers `creation.html`.
- `detail.html` : lit `?id=` dans l'URL (par défaut le plus proche), jours/heures/minutes/secondes en direct (secondes chaque seconde), barre de progression, boutons « Modifier »/« Partager » factices.
- Ajout à `p007.js` : `statusBarHTML()` / `renderStatusBars()` (barre de statut en SVG inline, partagée par tous les écrans).
- `npm run lint` : 0 erreur.
