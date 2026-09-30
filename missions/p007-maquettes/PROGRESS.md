# Mission p007-maquettes — PROGRESS

**Statut :** en cours
**Prochaine action :** étape 8 (corrections éventuelles, vérification finale)
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

## Étape 5 (faite, 2026-10-01)
- `creation.html` : champs nom/date/heure, grille de 12 emoji, 4 couleurs de carte Pop, interrupteur « Répéter chaque année » (factice), aperçu du widget petit mis à jour en direct (`input`/`click`) sans recharger la page.
- `pro.html` : « Soon Pro », 1,99 € en achat unique (argument mis en avant), 4 avantages, bouton d'achat et lien de restauration factices (alertes).
- `npm run lint` : 0 erreur.

## Étape 6 (faite, 2026-10-01)
- `index.html` créé par un sous-agent Haiku (voir DELEGATIONS.md) : 5 cartes vers chaque écran, sélecteur de thème (`data-theme-select`), mention « Nom provisoire ». Relu, accepté sans modification.
- `npm run lint` : 0 erreur.

## Étape 7 (faite, 2026-10-01)
- `npm run build` : passe, `dist/screens/p007/` contient les 8 fichiers.
- Serveur `npx vite preview --port 4173` lancé par la session principale ; sous-agent verificateur (Haiku) a contrôlé les critères 1 à 8 dessus : tous OK (pas d'erreur console, aucune requête externe, 5 widgets visibles et changeant de fond selon le thème, thème persistant entre pages, comptes à rebours corrects (12 j / 3 j), secondes qui avancent sur `detail.html`, aperçu réactif sur `creation.html`, aucun défilement horizontal à 375px).
- Recontrôle par la session principale : `font-family` du chiffre de jours diffère bien entre Papier (serif), Nuit (sans-serif) et Pop (rounded) — le rapport du sous-agent ne l'avait vérifié que pour la couleur de fond.
- Contraste (critère 8, calculé manuellement, formule WCAG) : Papier ink `#1c1a17` / fond `#f4efe6` ≈ 15,2:1 ; Pop ink `#16161a` / fond `#f2f2f7` ≈ 16,2:1 ; Pop texte sombre `#16161a` sur jaune `#ffd23f` ≈ 12,5:1. Les trois paires dépassent largement 4,5:1. Le blanc sur orange saturé (`--pop-1`) n'atteint que ≈3,1:1 : n'est utilisé que pour de grands chiffres/emoji (seuil AA "texte large" 3:1), jamais pour du texte courant.
- Serveur arrêté après vérification.
