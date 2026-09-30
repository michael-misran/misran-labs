# Mission p007-maquettes — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : « garde P-007, cadre la mission de prototype », puis choix : « Maquettes web d'abord ».

## Contexte
L'idée P-007 (widgets de compte à rebours, `src/projets/idees/P-007.json`) a été gardée par Michael le 2026-09-30. La recherche (note privée P-007, hors Git) montre un marché prouvé mais disputé (« Days » : 1,8 million d'installations), où la différence se joue sur le design. Avant de coder une vraie application iOS (Swift, WidgetKit, dans un projet séparé), on valide le design avec des maquettes HTML interactives.

## Objectif
Un jeu de maquettes HTML autonomes, dans des cadres de téléphone, montrant l'application et surtout ses widgets dans 3 thèmes, avec un compte à rebours réellement calculé. Il doit être assez abouti pour être comparé aux captures des concurrents et montré à des testeurs.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Emplacement.** Tout dans `public/screens/p007/`. C'est la règle globale « un fichier = un écran dans screens/ », placée dans `public/` pour être servie par `npm run dev` comme par `npx vite preview` (vérification en routine), sur le modèle de `public/games/`. Aucune page React, aucune route, aucun lien depuis le site : les fichiers restent accessibles seulement par leur URL (`/screens/p007/index.html`).

**D2 — Fichiers.** Un fichier HTML par écran :
- `index.html` : sommaire, avec une vignette et un lien vers chaque écran, et le sélecteur de thème ;
- `widgets.html` : galerie des widgets sur un faux écran d'accueil iOS ;
- `liste.html` : liste des événements (écran principal) ;
- `detail.html` : un événement en grand ;
- `creation.html` : création ou modification d'un événement ;
- `pro.html` : écran d'achat « Pro ».

Deux fichiers partagés : `p007.css` (thèmes, cadre de téléphone, composants) et `p007.js` (calcul du compte à rebours, thème, données d'exemple). Pas de module ES, pas de build : de simples `<link>` et `<script defer>`.

**D3 — Nom provisoire : « Soon ».** Court, international, dit le produit. Il est marqué « nom provisoire » dans `index.html`. La vérification de marque est hors périmètre.

**D4 — Cadre.** Téléphone de 390 × 844 px (iPhone 15/16), coins arrondis de 55 px, Dynamic Island dessinée en CSS, barre d'état (heure 9:41, réseau, batterie) en CSS ou SVG inline. Sur un écran large, le cadre est centré. Sous 430 px de large, le cadre disparaît et l'écran occupe toute la largeur, sans défilement horizontal.

**D5 — Typographie système, aucune ressource externe.** `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif` pour le texte ; `ui-serif, "New York", Georgia, serif` pour les chiffres du thème Papier ; `ui-rounded, "SF Pro Rounded", -apple-system, sans-serif` pour le thème Pop. Aucune police, image ou script chargé depuis Internet. Les icônes sont en SVG inline ou en emoji.

**D6 — Trois thèmes**, définis par des variables CSS sur `[data-theme="…"]` :
- **Papier** : fond crème `#F4EFE6`, encre `#1C1A17`, accent terracotta `#C4552D` ; gros chiffres en serif, fins filets, esprit éditorial ;
- **Nuit** : fond bleu nuit `#0B1020` avec un dégradé vers `#1B2340`, chiffres blancs avec un léger halo (text-shadow) couleur `#8FA8FF`, petites étoiles en CSS ;
- **Pop** : aplats saturés (un fond par événement, par exemple `#FF5A36`, `#FFD23F`, `#3A86FF`, `#8338EC`), chiffres ronds très gras, contrastes vérifiés (texte sombre sur jaune).

Le thème choisi est mémorisé dans `localStorage` (clé `p007-theme`), avec try/catch, et appliqué sur toutes les pages. Papier est le thème par défaut.

**D7 — Widgets.** Dans `widgets.html`, pour le thème actif :
- **petit** (170 × 170) : emoji, nombre de jours en très grand, nom de l'événement ;
- **moyen** (364 × 170) : événement principal à gauche (jours en grand), et à droite les 2 suivants en liste ;
- **grand** (364 × 382) : événement principal avec les jours, heures et minutes, une barre de progression (du jour de création au jour J), puis la liste des 3 suivants ;
- **écran verrouillé** : un widget rectangulaire monochrome (« 🌴 12 j · Lisbonne ») et un widget circulaire (jauge et nombre de jours).

Tous les widgets sont posés sur un faux écran d'accueil (grille d'icônes d'applications en carrés arrondis gris, fond d'écran assorti au thème). Des onglets en haut de page permettent de passer d'un thème à l'autre sans quitter la page.

**D8 — Compte à rebours réel.** `p007.js` calcule le temps restant à partir de la date du jour (`new Date()`), et le met à jour chaque minute (chaque seconde sur `detail.html`). Règles : « Aujourd'hui ! » le jour J ; « Demain » à J-1 ; « dans N jours » sinon ; « il y a N jours » pour un événement passé. Les jours se comptent en dates calendaires locales (minuit à minuit), pas par tranches de 24 h. Les données d'exemple sont définies **relativement à aujourd'hui**, pour que la maquette ne vieillisse jamais : Vacances à Lisbonne 🌴 (+12 j), Anniversaire de Léa 🎂 (+3 j), Concert 🎸 (+47 j), Déménagement 📦 (+90 j), Noël 🎄 (prochain 25 décembre).

**D9 — Contenu des écrans.**
- `liste.html` : titre « Soon », événements triés par date, chacun sur une carte (emoji, nom, date en toutes lettres, jours restants en gros), bouton « + » flottant. L'événement le plus proche est mis en avant.
- `detail.html` : emoji et nom, jours, heures, minutes et secondes en grand (secondes en direct), date complète, barre de progression, boutons « Modifier » et « Partager » (factices).
- `creation.html` : champs nom, date et heure, choix d'emoji (grille de 12), choix du thème de la carte, option « Répéter chaque année », aperçu du widget petit qui se met à jour en direct pendant la saisie (le nom et la date saisis changent l'aperçu).
- `pro.html` : « Soon Pro », 1,99 €, **achat unique, pas d'abonnement** (argument mis en avant), liste des avantages (événements illimités, les 3 thèmes, tous les widgets, photo en fond de widget), bouton d'achat factice, lien « Restaurer mes achats ».

**D10 — Langue.** Interface en français. L'anglais est hors périmètre.

**D11 — Mise à jour de la fiche P-007.** Déjà faite au cadrage : `statut: "en-cours"`, `decision` et `mission: "p007-maquettes"`. Ne pas y retoucher.

## Critères d'acceptation
Chaque critère doit être vérifiable par une session seule (commande, page, valeur).
1. Les 6 pages de D2 et les 2 fichiers partagés existent dans `public/screens/p007/`. Chaque page s'ouvre sur `/screens/p007/<page>.html` sans erreur dans la console.
2. Aucune requête réseau vers un autre domaine que celui de la page (vérifiable avec `read_network_requests` ou par un grep de `http` dans le dossier : seuls `http://www.w3.org/2000/svg` et assimilés sont tolérés).
3. Sur `widgets.html`, les 5 widgets de D7 sont présents. Changer de thème change leur fond, leur couleur de texte et leur police (valeurs calculées différentes entre Papier, Nuit et Pop).
4. Le thème choisi sur une page est retrouvé sur une autre page après navigation (`localStorage` `p007-theme`).
5. Le compte à rebours est juste. « Vacances à Lisbonne » affiche 12 jours, « Anniversaire de Léa » 3 jours, et le widget Noël affiche le nombre de jours jusqu'au prochain 25 décembre, vérifié par calcul dans `javascript_tool`. Les secondes avancent sur `detail.html`.
6. Sur `creation.html`, taper un nom et choisir une date change l'aperçu du widget sans recharger la page.
7. À 375 px de large (preset mobile), aucune page n'a de défilement horizontal (`document.documentElement.scrollWidth <= innerWidth`).
8. Le texte des thèmes Papier et Pop respecte un contraste d'au moins 4,5:1 pour le texte courant (vérifié sur 3 paires de couleurs et noté dans RAPPORT).
9. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial (0 erreur). Le build copie bien les fichiers dans `dist/screens/p007/`.
10. Tout est commité sur `auto/p007-maquettes`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- La vraie application iOS (Swift, SwiftUI, WidgetKit) : projet séparé, prochaines missions.
- Les captures pour l'App Store, l'icône de l'application, la vérification de marque du nom « Soon ».
- La version anglaise.
- Tout lien vers ces maquettes depuis le site (Lab, Projets).
