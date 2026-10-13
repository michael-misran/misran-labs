# Mission p006-maquettes — RAPPORT

Rédigé par la session d'exécution (routine `misran-labs-missions`, Sonnet 5.5), 2026-10-13.

## Résumé

La maquette HTML « La Marque » (P-006, compteur de points pour le Tarot) est faite : une interface interactive sur téléphone, utilisable à une vraie table, avec un vrai moteur de calcul du Tarot (contrats, bouts, petit au bout, poignée, chelem, répartition à 3/4/5 joueurs), vérifié par 33 cas de test indépendamment recalculés, et un parcours complet (nouvelle partie → donnes → scores → fin) qui persiste dans le téléphone. Tout est sur la branche `auto/p006-maquettes`, rien sur `main`, rien poussé.

## Fait

- `REGLES.md` : les règles de calcul détaillées (D8), avec la formule exacte (unité de score puis répartition par rôle) et trois exemples travaillés à la main.
- `cas-tarot.json` : 33 cas de test (24 demandés), couvrant 3/4/5 joueurs, les 4 contrats, 0 à 3 bouts, réussite/chute, petit au bout des deux côtés, les 3 tailles de poignée, les 3 variantes de chelem, et des points au demi-point.
- Ces 33 cas ont été **recalculés indépendamment** à la main par un autre agent, depuis `REGLES.md` seul, sans voir le code ni `cas-tarot.json` : aucun écart.
- `public/screens/p006/p006-calcul.js` : le moteur de calcul, fonctions pures (aucun accès au DOM), chargeable en page (`window.TarotCalcul`) comme en Node (`module.exports`).
- `missions/p006-maquettes/verifier-calcul.mjs` : rejoue les 33 cas → `33/33 cas OK`.
- Les 7 écrans dans `public/screens/p006/` : `index.html` (sommaire), `accueil.html` (choix du jeu, reprise de partie), `joueurs.html` (3 à 5 joueurs), `donne.html` (saisie avec résultat en direct, **et mode correction/suppression d'une donne existante**), `scores.html` (totaux, qui mène, historique), `fin.html` (classement, meilleure donne, partage factice), `pro.html` (achat factice 2,99 €, achat unique).
- `p006.css` (cadre de téléphone, thème « carnet de marque », composants à 48 px) et `p006.js` (stockage `localStorage`, partie d'exemple à 4 joueurs/6 donnes, libellés, rendu commun).
- Relecture orthographique/typographique des 7 écrans : une correction appliquée (point final manquant).
- Vérification complète dans le navigateur à 390 px et 375 px, à 3, 4 et 5 joueurs (voir « Comment vérifier »).
- **Trois bugs réels trouvés et corrigés** pendant cette vérification (détaillés plus bas).
- Contrôle final de la branche (lint, build, secrets, fichiers, cohérence SPEC) : verdict **OK**.

## Pas fait (hors périmètre, voir SPEC)

- Application native (iOS/Android), compte développeur, publication sur un store.
- Belote, Mölkky, Skyjo, Yams (seulement « bientôt » sur l'accueil, comme demandé).
- Vrai paiement, comptes, synchronisation, serveur.
- Statistiques par joueur et historique de plusieurs parties (seulement présentés sur `pro.html`).
- Traduction anglaise.
- Vérification de la marque « La Marque ».
- Uniformisation de l'apostrophe (droite `'` utilisée dans p006, typographique `’` ailleurs sur le site) — voir recommandations.

## Critères d'acceptation, un par un

1. **Les 7 pages et les 3 fichiers partagés existent, chaque page s'ouvre sans erreur console.** ✅ Vérifié par le sous-agent verificateur sur les 7 URL (`read_console_messages` vide partout).
2. **Aucune requête réseau vers un autre domaine.** ✅ `grep -rn "http" public/screens/p006/` ne renvoie rien ; confirmé aussi par `read_network_requests` dans le navigateur (seulement `localhost`).
3. **`node missions/p006-maquettes/verifier-calcul.mjs` affiche `N/N cas OK` avec N ≥ 24.** ✅ `33/33 cas OK`.
4. **Parcours complet à 390 px, 4 joueurs : 3 donnes (dont chute et petit au bout), totaux = somme des donnes, somme des totaux = 0, persistance au rechargement, correction qui change les totaux, « Nouvelle partie » qui efface.** ✅ Rejoué entièrement par la session principale après correction des bugs (détail en annexe) : Léa +104 / Hugo -240→+72 après correction / Inès +168 / Malik -136→-32, somme 0 à chaque étape ; rechargement conservé ; partie effacée après confirmation.
5. **Même vérification à 5 joueurs avec un appelé, et à 3 joueurs.** ✅ 5 joueurs : champ « appelé » présent, donne validée (preneur +50, appelé +25, 3 défenseurs -25 chacun, somme 0). 3 joueurs : aucun champ « appelé ».
6. **À 375 px : pas de défilement horizontal, zones tactiles de `donne.html` ≥ 48 px de haut.** ✅ Après correction du débordement de la rangée « Poignée » (passée en grille 2×2) : `document.documentElement.scrollWidth` = 375 = largeur de viewport ; tous les boutons mesurés à 48 px de haut.
7. **Résultat en direct dans `donne.html` avant validation.** ✅ Changer le nombre de bouts change immédiatement le texte affiché (« Contrat réussi de X » / « Chuté de X ») et les scores par joueur.
8. **`RAPPORT.md` contient « Qui a fait quoi », `DELEGATIONS.md` une ligne par étape.** ✅ Voir section ci-dessous et `DELEGATIONS.md` (une ligne par étape du plan, y compris les étapes faites par la session principale, plus les étapes intermédiaires 6b et 10b non prévues au cadrage).
9. **`build` passe ; `lint` sans nouvelle erreur.** ✅ `npm run build` : OK. `npx eslint public/screens/p006/` (fichiers de cette mission) : 0 erreur. `npm run lint` sur tout le dépôt remonte des erreurs, mais **toutes** dans `.worktrees/numero/` (travail d'une autre session en cours sur une autre branche, non ignoré par ESLint bien qu'ignoré par Git) — sans rapport avec cette mission.
10. **Tout commité sur `auto/p006-maquettes`, rien sur `main`, rien poussé.** ✅ `git diff --stat main...auto/p006-maquettes` ne touche que `public/screens/p006/`, `missions/p006-maquettes/` et `src/projets/idees/P-006.json` (modifié au cadrage). Aucun `git push` effectué.

## Comment vérifier

```bash
cd /Users/michaelmisran/Documents/Projets/misran-labs
git checkout auto/p006-maquettes
node missions/p006-maquettes/verifier-calcul.mjs   # doit afficher 33/33 cas OK
npm run build
npx vite preview --port 4173
# puis ouvrir http://localhost:4173/screens/p006/index.html
```
Dans le navigateur : réduire la largeur à 390 px (cadre de téléphone) ou 375 px (sans cadre, zéro défilement horizontal attendu). Les 7 écrans sont listés depuis `index.html`.

## Trois bugs trouvés et corrigés pendant la vérification (détail technique)

1. **Le contenu d'un `<details>` fermé restait rendu** sur le moteur utilisé par l'outil de vérification (mesuré en `display: block` malgré `open === false`). Corrigé par un masquage CSS explicite (`details.options-bloc:not([open]) .options-bloc-contenu { display: none; }`) plutôt que de compter sur le comportement natif.
2. **L'attribut `hidden` était systématiquement ignoré sur tout élément dont la classe fixait `display`** (`.btn`, `.btn-row`, `.provisional-tag`) : en CSS, une règle auteur sans `!important` l'emporte toujours sur la règle `[hidden]` de la feuille par défaut du navigateur, quelle que soit la spécificité comparée. Cela rendait visibles en permanence le badge « Exemple », le bouton « Supprimer cette donne » et le choix du camp de la poignée. Corrigé par une seule règle globale : `[hidden] { display: none !important; }`.
3. **La rangée de 4 boutons de poignée débordait à 375 px** (le bouton « Triple » dépassait et était coupé). Corrigée en passant cette rangée de `.btn-row` (flex, pas de retour à la ligne) à `.btn-grid` (grille 2×2), comme pour les boutons de contrat.

Le sous-agent verificateur (Haiku) avait détecté les symptômes (deux critères en échec) mais avait mal diagnostiqué la première cause (superposition supposée de deux blocs ouverts, plutôt que l'attribut `hidden` ignoré). La session principale a reproduit chaque bug directement dans le navigateur avant de corriger, ce qui a permis de trouver la vraie cause — et au passage un **troisième** symptôme du même bug (`hidden`) qui n'avait pas été signalé explicitement (le bouton « Supprimer cette donne » toujours visible). Un champ `id` des donnes, inutilisé dans tout le code et bogué (toujours égal à 1, le compteur étant réinitialisé à chaque chargement de page), a aussi été supprimé plutôt que réparé.

## Points à valider par Michael

1. **Arrondi de l'écart au demi-point (D8).** L'écart entre points réalisés et points à faire est arrondi à l'entier supérieur dans les deux sens (ex. 50,5 réalisé pour 51 à faire → écart compté 1, pas 0,5). C'est l'interprétation retenue en l'absence de source consultée pendant la mission (hors périmètre) ; les deux agents qui ont recalculé les 33 cas (indépendamment) ont suivi cette règle telle qu'écrite, mais elle n'a pas été confrontée à une vraie règle fédérale.
2. **Nom provisoire « La Marque » et direction visuelle « carnet de marque »** (D5/D6, décisions prises sans Michael au cadrage) : à confirmer ou à changer.
3. Cas où le chelem annoncé et raté dépasse la valeur du contrat réussi (ex. cas `3j-chelem-annonce-rate` : contrat réussi de 14 mais score final négatif pour l'attaque à cause de la pénalité de -200) : comportement conforme à la formule de D8 mais qui peut surprendre à l'écran ; à montrer à Michael pour confirmer que c'est bien l'effet recherché.

## Qui a fait quoi

| Étape | Prévu (PLAN.md) | Réellement fait par | Modèle | Fichiers principaux | Vérifié par |
|---|---|---|---|---|---|
| 0 | session principale | session principale (session interactive, cadrage) | Opus 5.5 | `missions/p006-maquettes/*`, `src/projets/idees/P-006.json` | Michael |
| 1 | session principale | idem | Opus 5.5 | `PROGRESS.md` | — |
| 2 | session principale | session principale (routine) | Sonnet 5.5 | `REGLES.md`, `cas-tarot.json` | script de génération (somme = 0 sur 33 cas) |
| 3 | sous-agent (Haiku) | sous-agent general-purpose | Haiku | — (vérification seule) | session principale : 0 écart sur 33 |
| 4 | session principale (Sonnet) | session principale | Sonnet 5.5 | `p006-calcul.js`, `verifier-calcul.mjs` | `node verifier-calcul.mjs` → 33/33 |
| 5 | session principale (Sonnet) | session principale | Sonnet 5.5 | `p006.css`, `p006.js`, `index.html` | lint ciblé + build |
| 6 | session principale (Sonnet) | session principale | Sonnet 5.5 | `donne.html` | lint ciblé |
| 6b *(ajout, non prévu au cadrage)* | — | session principale | Sonnet 5.5 | `donne.html` (mode correction/suppression) | lint ciblé |
| 7 | session principale (Sonnet) | session principale | Sonnet 5.5 | `scores.html`, `joueurs.html` | lint ciblé |
| 8 | sous-agent (Haiku), relu par session principale | sous-agent general-purpose, relu et vérifié par la session principale | Haiku puis Sonnet 5.5 (relecture) | `accueil.html`, `fin.html`, `pro.html` | lint ciblé + relecture manuelle du code |
| 9 | secretaire (Sonnet) | sous-agent secretaire | Sonnet 5.5 | — (liste de corrections) | session principale a appliqué la correction trouvée |
| 10 | verificateur (Haiku) ; build/lint session principale | sous-agent verificateur (a trouvé les symptômes, mal diagnostiqué la cause) **puis** session principale (diagnostic réel et correction) | Haiku puis Sonnet 5.5 | `p006.css`, `p006.js`, `donne.html` | revérification complète dans le navigateur par la session principale |
| 11 | controleur (Haiku) | sous-agent controleur | Haiku | — (contrôle seul) | verdict OK |
| 12 | session principale (Sonnet) | session principale | Sonnet 5.5 | `RAPPORT.md` | — |

**Total par agent/modèle :**
- **Opus 5.5** (Michael, session interactive) : 2 étapes — cadrage complet avant que la routine ne prenne le relais.
- **Sonnet 5.5** (session principale, routine) : la majorité du travail d'implémentation (règles, moteur de calcul, 5 des 7 écrans, intégration des contributions des sous-agents, diagnostic et correction des bugs réels, rapport final).
- **Haiku** (sous-agents `general-purpose`, `verificateur`, `controleur`) : 4 interventions — vérification indépendante des cas de test (aucun écart), rédaction de 3 écrans statiques (accueil/fin/pro, relus ensuite par la session principale), vérification navigateur (a bien trouvé 2 critères en échec, mais avec un diagnostic de cause partiellement erroné sur le premier), contrôle final (verdict OK).
- **Sonnet 5.5** (sous-agent `secretaire`) : 1 intervention — relecture de forme, une correction trouvée.

**Ce que chaque agent a bien ou mal fait :**
- Les deux vérifications indépendantes confiées à Haiku (cas de calcul, contrôle final) ont donné des résultats fiables et bien expliqués.
- Le sous-agent Haiku chargé d'écrire 3 écrans a respecté strictement la consigne de ne réutiliser que les classes CSS existantes — aucune reprise nécessaire.
- Le sous-agent verificateur (Haiku) a bien repéré que deux critères échouaient, avec des mesures précises (coordonnées, tailles), mais son hypothèse sur la cause du premier bug (deux blocs `<details>` superposés) était incorrecte ; la vraie cause (l'attribut `hidden` ignoré) n'a été trouvée qu'en reproduisant le bug soi-même dans le navigateur. Pour une prochaine mission, il serait utile de lui demander explicitement un `getComputedStyle` sur l'élément incriminé avant de conclure sur la cause.
- Le sous-agent secretaire a fait une relecture fine (une seule vraie faute sur 7 écrans) et a remonté une observation de cohérence utile (apostrophe) sans la sur-corriger de sa propre initiative.

## Recommandations

- Faire tester `donne.html` lors d'une vraie partie de Tarot (conseil de la note privée P-006) avant d'aller plus loin : c'est le test qui compte le plus pour une maquette de compteur de points.
- Si Michael valide la direction, uniformiser l'apostrophe (`'` → `’`) dans les 7 écrans et dans `p006.js`, pour rester cohérent avec le reste du site.
- Une fois la maquette validée par Michael, la prochaine étape serait de cadrer une mission d'implémentation réelle (React, dans `src/`) — hors périmètre de cette mission-maquette.
