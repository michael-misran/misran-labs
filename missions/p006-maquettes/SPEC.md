# Mission p006-maquettes — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-10-13. Brief de Michael : « garde P-006 et lance l'essai. Par contre je voudrais un rapport de quel agent a travaillé sur quelle partie aussi. C'est important pour que je comprenne et vérifie le fonctionnement des agents. »

## Contexte
L'idée P-006 (compteur de points pour jeux de société, `src/projets/idees/P-006.json`) a été gardée par Michael le 2026-10-13. C'est le **premier essai du mode « investisseur »** : Claude mène le projet seul jusqu'à la pull request, Michael ne valide que deux fois (l'idée, puis le résultat). Un point de contrôle est ajouté au milieu : **une maquette à valider avant de coder l'application**. Cette mission est ce point de contrôle.

La note privée P-006 (hors Git) conclut : besoin réel mais marché étroit ; la différence avec les concurrents (Taromètre, TarotScore) doit venir de la simplicité et du design ; une erreur de calcul au Tarot se voit tout de suite. Première validation conseillée : faire tester une maquette lors d'une vraie partie. Le précédent à suivre est la mission `p007-maquettes` (maquettes HTML dans `public/screens/p007/`).

## Objectif
Une maquette HTML **interactive et utilisable à une vraie table de Tarot** sur un téléphone : on crée une partie, on saisit chaque donne, les scores sont **réellement calculés** selon les règles du Tarot, et le tableau des scores se tient à jour. Plus un rapport qui montre précisément quel agent a fait quelle partie.

## Décisions (tranchées, ne pas rediscuter)
**D1 — Maquette web, pas encore d'application native.** Une application iOS ou Android demande des dépendances (Expo, Swift…), un compte développeur et une publication : c'est hors périmètre et ce sera une décision de Michael après validation de la maquette. Ici : HTML, CSS et JavaScript simples, aucune dépendance, aucun build.

**D2 — Emplacement.** Tout dans `public/screens/p006/`, sur le modèle de `public/screens/p007/` : servi par `npm run dev` comme par `npx vite preview`, aucune route React, aucun lien depuis le site (accessible seulement par son URL).

**D3 — Tarot seulement.** Le Tarot est le jeu le plus difficile à compter et celui où les concurrents existent : c'est lui qui prouve l'intérêt. Belote, Mölkky, Skyjo et Yams apparaissent sur l'écran d'accueil comme « bientôt », sans écran. Tarot à 3, 4 et 5 joueurs.

**D4 — Fichiers.** Un fichier HTML par écran :
- `index.html` : sommaire des écrans (vignette et lien vers chacun) et rappel « nom provisoire » ;
- `accueil.html` : choix du jeu (Tarot actif, les autres « bientôt »), reprise de la partie en cours s'il y en a une ;
- `joueurs.html` : nouvelle partie : 3 à 5 joueurs, prénoms, ordre autour de la table ;
- `donne.html` : saisie d'une donne, avec le résultat calculé en direct avant validation ;
- `scores.html` : tableau des scores cumulés, qui mène, historique des donnes (touche une donne pour la corriger ou la supprimer) ;
- `fin.html` : fin de partie : classement final, résumé (meilleure donne, nombre de donnes), bouton « Partager » factice ;
- `pro.html` : écran d'achat « Pro » factice : 2,99 €, **achat unique, pas d'abonnement, pas de publicité**, avantages (tous les jeux, historique des parties, statistiques par joueur).

Fichiers partagés : `p006.css` (cadre, thème, composants), `p006.js` (stockage de la partie, navigation, rendu commun), `p006-calcul.js` (le calcul du Tarot, **sans aucun accès à la page** : fonctions pures, utilisables par la page et par le script de test). Pas de module ES côté page : `<link>` et `<script defer>` ; `p006-calcul.js` expose ses fonctions sur `window.TarotCalcul` et, s'il est chargé par Node, via `module.exports`.

**D5 — Nom provisoire : « La Marque ».** Au Tarot, « tenir la marque », c'est compter les points. Marqué « nom provisoire » dans `index.html`. La vérification de marque déposée est hors périmètre.

**D6 — Direction visuelle : « carnet de marque ».** Une feuille de score posée sur la table : fond papier crème `#F5F0E4`, quadrillage léger, encre bleu nuit `#1F2A44`, scores positifs en vert foncé `#1E6B45`, négatifs en rouge `#B3301D`, accents sur un vert tapis de jeu `#24543F`. Gros chiffres très lisibles (chiffres tabulaires), **zones tactiles d'au moins 48 px**, contrastes AA. Typographie système uniquement (`-apple-system, "Helvetica Neue", Arial, sans-serif` ; `ui-serif, Georgia, serif` pour les titres), aucune ressource externe (polices, images, scripts). Icônes en SVG inline ou emoji (♠ ♥ ♦ ♣ autorisés).

**D7 — Cadre de téléphone.** 390 × 844 px, coins arrondis, barre d'état en CSS (9:41), comme `public/screens/p007/`. Sur écran large, cadre centré ; sous 430 px de large, le cadre disparaît et l'écran prend toute la largeur, sans défilement horizontal.

**D8 — Règles de calcul du Tarot (référence : règles de la Fédération française de tarot, telles que connues ; écrites en détail à l'étape 2 dans `REGLES.md`).**
- Contrats et multiplicateurs : Petite ×1, Garde ×2, Garde sans ×4, Garde contre ×6.
- Points à faire selon le nombre de bouts de l'attaque : 0 → 56, 1 → 51, 2 → 41, 3 → 36. Total des points du jeu : 91.
- Score de la donne : (25 + écart) × multiplicateur, écart = |points réalisés − points à faire|. Contrat réussi si points réalisés ≥ points à faire.
- Petit au bout : 10 × multiplicateur, au camp qui l'a mené au dernier pli (indépendant de la réussite du contrat).
- Poignée (simple 20, double 30, triple 40), non multipliée, **acquise au camp gagnant de la donne**, quel que soit le camp qui l'a montrée.
- Chelem : annoncé et réussi +400 ; non annoncé et réussi +200 ; annoncé et raté −200 (pour l'attaque).
- Répartition (somme des scores de la donne = 0) : à 3 joueurs, preneur ×2 ; à 4, preneur ×3 ; à 5, preneur ×2 et appelé ×1, défenseurs −1 chacun ; à 5 si le preneur s'appelle lui-même, preneur ×4.
- Demi-points : les points réalisés se saisissent au demi-point près ; l'écart est arrondi à l'entier supérieur. **Cette règle d'arrondi est à faire valider par Michael** (à signaler dans le RAPPORT).
- Toute autre règle (donnes à 5 avec chien, « misère », pénalités) est hors périmètre.

**D9 — Saisie d'une donne en moins de 15 secondes.** Dans `donne.html` : preneur (boutons avec les prénoms), contrat (4 gros boutons), appelé (seulement à 5 joueurs), nombre de bouts (0 à 3), points de l'attaque (champ numérique avec + et − par demi-point, et rappel des points à faire), puis options repliées : petit au bout (attaque / défense / personne), poignée (camp + type), chelem. Le résultat (« Contrat réussi de 7 » ou « Chuté de 4 ») et les scores de chaque joueur s'affichent **en direct** pendant la saisie. Bouton « Valider la donne ».

**D10 — Partie réelle, stockée sur le téléphone.** La partie en cours est enregistrée dans `localStorage` (clé `p006-partie`), avec try/catch : on peut fermer la page et la reprendre. Si rien n'est enregistré, une **partie d'exemple** à 4 joueurs (Léa, Hugo, Inès, Malik) avec 6 donnes variées (au moins une chute, un petit au bout, une poignée) est affichée, pour que chaque écran soit présentable seul. Un bouton « Nouvelle partie » efface la partie.

**D11 — Tests du calcul.** `REGLES.md` contient au moins **24 cas** (3, 4 et 5 joueurs, chaque contrat, réussites et chutes, 0 à 3 bouts, petit au bout dans chaque camp, poignées, chelems, demi-points, preneur appelé seul) avec le résultat attendu pour chaque joueur, aussi écrits dans `cas-tarot.json`. Le script `verifier-calcul.mjs` (Node, aucune dépendance) charge `p006-calcul.js`, rejoue tous les cas et affiche `N/N cas OK` ; il sort en erreur au premier écart. Les cas sont **vérifiés indépendamment** (étape 3) par un autre agent qui recalcule à la main depuis `REGLES.md` sans voir le code.

**D12 — Langue.** Interface en français uniquement.

**D13 — Fiche P-006.** Déjà mise à jour au cadrage : `statut: "en-cours"`, `decision`, `mission: "p006-maquettes"`. Ne pas y retoucher.

**D14 — Rapport « qui a fait quoi » (demande explicite de Michael).** Michael veut comprendre et vérifier le fonctionnement des agents. Donc :
- `DELEGATIONS.md` reçoit **une ligne par étape**, y compris celles faites par la session principale (agent `session principale`), et une ligne par sous-agent lancé, avec : date/heure, étape, agent, modèle réellement utilisé, tâche, fichiers produits ou modifiés, résultat, et le nombre de tokens et la durée quand l'outil les fournit (sinon « non fourni »).
- Une étape prévue pour un agent mais faite par un autre (agent qui ne se lance pas, choix en cours de route) est signalée comme telle, avec la raison.
- `RAPPORT.md` contient une section **« Qui a fait quoi »** : un tableau étape par étape (prévu → réellement fait par, modèle, fichiers, vérifié par qui), le total par agent (nombre d'étapes, tokens si connus), et quelques lignes en français simple sur ce que chaque agent a bien ou mal fait (ex. écarts trouvés par la vérification indépendante).
- Chaque commit porte une ligne `Co-Authored-By` par modèle ayant réellement travaillé sur l'étape.

## Critères d'acceptation
Chaque critère doit être vérifiable par une session seule (commande, page, valeur).
1. Les 7 pages de D4 et les 3 fichiers partagés existent dans `public/screens/p006/` ; chaque page s'ouvre sur `/screens/p006/<page>.html` sans erreur dans la console.
2. Aucune requête réseau vers un autre domaine (grep de `http` dans le dossier : seuls les espaces de noms SVG sont tolérés).
3. `node missions/p006-maquettes/verifier-calcul.mjs` affiche `N/N cas OK` avec N ≥ 24.
4. Parcours complet dans le navigateur, à 390 px de large : nouvelle partie à 4 joueurs → 3 donnes saisies (dont une chute et un petit au bout) → les totaux de `scores.html` égalent la somme des donnes et la somme des totaux vaut 0 → rechargement de la page : la partie est toujours là → correction d'une donne : les totaux changent → « Nouvelle partie » : la partie est effacée.
5. Même vérification rapide à 5 joueurs avec un appelé, et à 3 joueurs.
6. À 375 px de large : pas de défilement horizontal ; toutes les zones tactiles de `donne.html` font au moins 48 px de haut.
7. Le résultat de la donne s'affiche en direct dans `donne.html` avant validation (changer le nombre de bouts change le résultat affiché).
8. `RAPPORT.md` contient la section « Qui a fait quoi » décrite en D14, et `DELEGATIONS.md` une ligne par étape.
9. `build` passe ; `lint` : pas de nouvelle erreur par rapport à l'état initial.
10. Tout est commité sur `auto/p006-maquettes`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- application native (iOS ou Android), compte développeur, publication sur les stores ;
- Belote, Mölkky, Skyjo, Yams (seulement « bientôt » sur l'accueil) ;
- vrai paiement, comptes, synchronisation, serveur ;
- statistiques par joueur et historique de plusieurs parties (seulement présentés sur `pro.html`) ;
- traduction anglaise ;
- vérification de la marque « La Marque ».
