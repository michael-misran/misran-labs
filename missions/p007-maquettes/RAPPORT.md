# Mission p007-maquettes — RAPPORT

## Fait
- Les 6 écrans HTML de D2 dans `public/screens/p007/` : `index.html` (sommaire), `widgets.html` (galerie de widgets), `liste.html`, `detail.html`, `creation.html`, `pro.html`, plus les 2 fichiers partagés `p007.css` et `p007.js`.
- 3 thèmes (Papier, Nuit, Pop) sur `[data-theme]`, mémorisés dans `localStorage` (clé `p007-theme`, try/catch), Papier par défaut.
- Cadre de téléphone 390×844, coins 55px, Dynamic Island et barre de statut en CSS/SVG inline ; disparaît sous 430px (écran plein largeur, sans défilement horizontal).
- Polices système uniquement (serif pour Papier, rounded pour Pop, sans-serif de base pour Nuit), aucune ressource externe.
- Les 5 widgets de D7 (petit, moyen, grand, écran verrouillé rectangulaire et circulaire), posés sur un faux écran d'accueil ou un faux écran verrouillé, avec onglets de thème sur `widgets.html`.
- Compte à rebours réel : jours en calendaire (minuit à minuit), mis à jour chaque minute, secondes en direct sur `detail.html`. Libellés « Aujourd'hui ! », « Demain », « dans N jours », « il y a N jours ». Données d'exemple relatives à `new Date()` (Lisbonne +12j, Léa +3j, Concert +47j, Déménagement +90j, Noël au 25 décembre prochain).
- Contenu des 4 écrans de D9 : liste triée avec événement le plus proche mis en avant et bouton « + » ; détail avec jours/heures/minutes/secondes, barre de progression, boutons factices ; création avec champs, 12 emoji, 4 couleurs de carte, aperçu du widget petit en direct ; pro avec prix 1,99 € en achat unique, 4 avantages, bouton et lien factices.
- Interface entièrement en français, nom « Soon » marqué « nom provisoire » sur le sommaire.
- Fiche P-007 déjà passée en `en-cours` au cadrage (D11), non retouchée.

## Pas fait (hors périmètre, voir ci-dessous)
Rien du périmètre de la SPEC n'a été laissé de côté.

## Critères d'acceptation
1. **OK** — les 6 pages + 2 fichiers partagés existent ; vérifié par un sous-agent verificateur sur `npx vite preview` (build) : aucune erreur console sur les 6 pages.
2. **OK** — aucune requête réseau externe (confirmé par le verificateur avec `read_network_requests`, et par un grep de `http://`/`https://` dans le dossier : seul `www.w3.org/2000/svg` apparaît, dans les icônes SVG inline).
3. **OK** — les 5 widgets sont présents sur `widgets.html`. Changer de thème change leur fond (valeurs `background-color` différentes vérifiées par le verificateur) et leur police des chiffres (`font-family` recontrôlée par la session principale : serif en Papier, sans-serif en Nuit, rounded en Pop).
4. **OK** — le thème choisi sur `widgets.html` est retrouvé sur `liste.html` après navigation (`localStorage` `p007-theme`, vérifié par le verificateur).
5. **OK** — « Vacances à Lisbonne » affiche 12 jours, « Anniversaire de Léa » 3 jours (vérifiés par calcul calendaire dans `javascript_tool`) ; les secondes avancent sur `detail.html` (constaté par le verificateur, 59 → 52 après 3 s). Le widget Noël calcule le prochain 25 décembre via `nextAnnualDate()`.
6. **OK** — sur `creation.html`, taper un nom et changer la date met à jour l'aperçu du widget sans recharger la page (vérifié par le verificateur).
7. **OK** — à 375px (preset mobile), aucune des 6 pages n'a de défilement horizontal (`scrollWidth <= innerWidth` vérifié par le verificateur sur chaque page).
8. **OK** — contraste vérifié par calcul WCAG sur 3 paires (formule de luminance relative) : Papier ink `#1c1a17` / fond `#f4efe6` ≈ **15,2:1** ; Pop ink `#16161a` / fond `#f2f2f7` ≈ **16,2:1** ; Pop texte sombre `#16161a` sur jaune `#ffd23f` ≈ **12,5:1**. Les trois dépassent largement le seuil 4,5:1 pour le texte courant. Le blanc sur l'orange saturé Pop (`--pop-1`, ≈3,1:1) n'est utilisé que pour de grands chiffres/emoji sur fond de widget, sous le seuil AA « texte large » (3:1), jamais pour du texte courant — voir DECISIONS.md.
9. **OK** — `npm run build` passe, `dist/screens/p007/` contient les 8 fichiers ; `npm run lint` : 0 erreur (état initial aussi à 0 erreur).
10. **OK** — tout commité sur `auto/p007-maquettes` (`git status` propre, `git diff main...auto/p007-maquettes` ne montre que les fichiers de la mission et la fiche P-007), rien sur `main`, rien poussé.

## Comment vérifier
1. `npm run build` puis `npx vite preview --port 4173`.
2. Ouvrir `http://localhost:4173/screens/p007/index.html`, parcourir les 5 cartes.
3. Sur `widgets.html`, basculer entre les onglets Papier / Nuit / Pop et observer le changement de fond, de police et de couleur.
4. Changer de thème puis naviguer vers `liste.html` : le thème doit être conservé.
5. Ouvrir `detail.html` : observer les secondes qui avancent.
6. Sur `creation.html`, taper un nom et changer la date : l'aperçu du widget doit suivre en direct.
7. Réduire la fenêtre à 375px de large : aucune page ne doit défiler horizontalement.

## Décisions (voir DECISIONS.md pour le détail)
- Heures/minutes/secondes du compte à rebours décomptent jusqu'au minuit local suivant, pas jusqu'à l'instant exact de l'événement (garde la cohérence avec le chiffre calendaire des jours).
- Dates de création des événements d'exemple fixées arbitrairement pour alimenter la barre de progression (non spécifiées par la SPEC).
- Couleurs Pop par événement neutralisées en `var(--surface)` sur Papier et Nuit.

## Délégations (voir DELEGATIONS.md pour le détail)
- Étape 6 (`index.html`) : sous-agent `general-purpose` en Haiku 4.5 — fait, relu et accepté sans modification.
- Étape 7 (vérification navigateur) : sous-agent `verificateur` en Haiku 4.5 — tous les critères 1-8 rapportés OK ; la session principale a recontrôlé elle-même la différence de police entre thèmes, que le rapport du sous-agent n'avait vérifiée que pour la couleur de fond.
- Toutes les autres étapes (2 à 5, 8, 9) : session principale en Sonnet 5.

## Recommandations (hors périmètre de cette mission)
- **Application iOS native** (Swift, SwiftUI, WidgetKit) : prochaine mission, dans un projet séparé. Les décisions visuelles de D6/D7 (thèmes, tailles de widgets, polices) peuvent servir de base directe au design system SwiftUI.
- **Captures App Store et icône de l'application** : à faire une fois l'app native buildée, pas avant.
- **Vérification de marque du nom « Soon »** : à faire avant toute publication réelle — le nom reste marqué « provisoire » sur le sommaire tant que ce n'est pas fait.
- **Version anglaise** : hors périmètre, à envisager seulement si l'app vise un marché autre que francophone.
- Montrer ces maquettes à quelques testeurs (comme prévu par l'objectif de la mission) avant de lancer le développement natif, pour confirmer que le design (et pas seulement la fonctionnalité) démarque assez des concurrents comme « Days ».
