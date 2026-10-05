# Contenu à intégrer — du 27/09 au 05/10/2026

Seule source de faits pour cette mission. Rédigé au cadrage (Opus 5.5, 2026-10-05) à partir de l'historique Git, des dossiers `missions/` et de la session avec Michael. Ne rien ajouter qui ne soit pas ici. Ton de la page : première personne de Michael, phrases courtes.

**Données privées — ne jamais écrire sur la page** : le contenu de `src/private/` (journal, notes d'idées, carnet), les objectifs financiers, le nom du dépôt privé, l'outil d'analytique, les raisons personnelles du journal papier.

## §A — Trois routines de plus

Avant : deux tâches programmées (les missions, toutes les 2 h ; le Magazine, le lundi 7 h 30). Depuis :

1. **Les idées du dimanche** (depuis le 27/09) — rubrique `/projets`.
   - Chaque dimanche à 19 h, une routine propose de nouvelles idées de projets numérotées P-NNN : une fiche publique sur le site, et une note économique privée, rangée hors du dépôt public.
   - Elle pousse sa branche `auto/projets-<date>` et ouvre la pull request. Je trie en une phrase (« garde 2, arrête 4 parce que… ») dans la session tour de contrôle, qui met les fiches à jour avec mes mots.
   - « On développe P-NNN » → la fiche passe « en cours » et une mission est cadrée.
   - Depuis le 01/10, chaque idée a un modèle de revenu, un canal de distribution et un critère d'arrêt.
2. **La Gazette du Lab** (depuis le 29/09 ; page `/breves` depuis le 30/09).
   - Chaque matin à 5 h 30, une routine rédige un journal à imprimer pour moi (je préfère le papier), dans le style d'un vieux journal.
   - Elle en extrait la partie publique (la une IA, les articles tech, le mot et le chiffre du jour) pour la page `/breves`, sur une branche `auto/breves-<date>`, et ouvre la pull request.
   - Elle travaille dans une copie de travail séparée du dépôt (un worktree Git), pour ne jamais toucher au dossier où je travaille. C'est la pratique n° 1 citée par Gemini (section Gemini), désormais en place.
   - Depuis le 01/10, elle m'envoie une notification avec le lien de la pull request : la première était passée inaperçue.
3. **Le carnet** (depuis le 29/09).
   - Quand j'écris « note : … » dans n'importe quelle session, Claude range la note telle quelle dans un carnet privé, répond « Noté. » et reprend le fil.
   - La routine du dimanche trie le carnet : idée de projet, sujet pour le journal, mission, ou à garder.

Tableau de la section : colonnes « Routine » / « Quand » / « Ce qu'elle produit » / « Ce que je fais ». Lignes : Missions (toutes les 2 h, en pause si la file est vide) ; Magazine (lundi 7 h 30) ; Idées (dimanche 19 h) ; Gazette du Lab (chaque jour 5 h 30). Dernière colonne : « je fusionne » pour toutes, plus « je trie » pour les idées et « j'imprime » pour la Gazette.

## §B — Une semaine de missions, puis la refonte kiosque

1. **La cadence** : du 27/09 au 01/10, une trentaine de missions, souvent petites (une mascotte en pixel art, une vraie page 404, des flux RSS et la page `/suivre`, trois jeux quotidiens dans `/jeux`, des audits du design system). La file d'attente les enchaîne ; je clôture par lots depuis la tour de contrôle.
2. **La direction artistique** (03/10) : Claude produit des maquettes HTML et des planches de polices ; je réagis (« j'adore », « trop propre ») et je choisis. Résultat : un concept de maison d'édition, cinq titres (la Gazette, le Magazine, le Zine, les Jeux, le Lab), chacun sa couleur et sa police, uniquement des polices gratuites.
3. **La refonte kiosque** (03 et 04/10) : dix missions (kiosque-maison, kiosque-une, gazette-web, magazine-web, jeux-arcade, lab-dossiers, idees-cv, zine, kiosque-annexes, kiosque-finitions).
   - Choix : tout mettre en ligne d'un seul coup. Une branche d'intégration `refonte-kiosque` ; chaque mission en part et sa pull request la vise ; une pull request finale l'envoie sur `main`. En ligne le 04/10.
   - Cette page elle-même a changé d'habit : le Lab est devenu un dossier confidentiel tapé à la machine.
4. **Ce que la refonte m'a appris** (clôture de missions en parallèle) :
   - Vérifier une mission telle qu'elle sera une fois fusionnée, sans rien fusionner : Git sait calculer le résultat à part, et Claude l'ouvre dans une copie de travail temporaire.
   - Cette copie temporaire doit être supprimée à la fin : oubliée, elle a fait remonter des centaines de fausses erreurs de lint et bloqué la routine (dossier de travail plus « propre »).
   - À chaque clôture, il a fallu des retouches visuelles (lignes qui tombent à côté du texte, un signe absent d'une police, éléments qui se chevauchent). Le rapport du vérificateur ne suffit pas : Claude regarde lui-même avant de proposer la fusion.
   - Certaines commandes restent interdites à Claude (fusionner, supprimer une branche distante) : il me les donne, une par bloc, et je les lance.

## §C — Économiser les tokens : un outil de plus (05/10)

À ajouter à la section « Économiser les tokens », après ce qui a été fait :
- La Gazette parlait de Lightpanda 1.0, un navigateur sans affichage pour les agents. Je l'ai fait tester sur les 4 sources du dernier Magazine.
- Résultat : il ne fait pas économiser de tokens ici, l'outil de lecture habituel (WebFetch) n'envoie qu'un résumé, alors que Lightpanda renvoie la page entière. Mais il lit les pages que WebFetch ne peut pas lire : un site refusait WebFetch (erreur 403), Lightpanda a récupéré l'article complet.
- Décision : WebFetch d'abord ; Lightpanda en secours pour le veilleur et le relecteur du Magazine, avec une taille de page plafonnée. Il est gratuit et open source, et tourne sur le Mac, avec la télémétrie coupée.
- Ne pas citer de chiffre de Lightpanda (mémoire, compatibilité) : non vérifiés par nous.

## §D — Passages à mettre à jour (état actuel, pas l'histoire)

1. `milestones` : le 18 devient « Mise à jour de la page (mission 8) ». Ajouter, dans l'ordre : 19 « Les idées du dimanche » ; 20 « La Gazette du Lab et le carnet » ; 21 « Une semaine de missions » ; 22 « La refonte kiosque » ; 23 « Lightpanda, un navigateur en secours » ; 24 « Cette mise à jour (mission N) » (N : voir point 4).
2. `statsTableRows` : garder les 8 lignes, puis ajouter des lignes groupées (colonne Durée « — ») :
   - « 9 à 15. idées et audits du design system » — projets, projets-fonctionnement, audit-github, audit-grille, audit-tokens, site-avant-apres, site-finitions.
   - « 16 à 31. petites missions (30/09–01/10) » — apercus-partage, breves, finitions-lab, fiole-perchee-404, images-numeros, jeux-geste, jeux-estimation, jeux-majorite, lien-suivre, mascotte-fiole, menu-barre-haut, menu-mobile, p007-maquettes, referencement, rss-suivre, vrai-404.
   - « 32 à 41. refonte kiosque (03–04/10) » — les dix de §B.3.
   - « 42. cette mise à jour » — « voir DELEGATIONS.md de la mission ».
   Recompter avec `ls missions/` avant d'écrire (un dossier = une mission, hors README.md) ; si le total diffère, ajuster les bornes et le noter dans DECISIONS.md. Colonne Modèles des lignes groupées : « Sonnet en routine, Haiku délégué, Opus au cadrage ».
3. `statsNoteP` : « Plus quatre routines » (Magazine, idées, Gazette ; les missions elles-mêmes) au lieu d'une seule.
4. `metaP` : cette mise à jour est la Nᵉ mission (N = nombre de dossiers dans `missions/`, celle-ci comprise ; attendu 42).
5. `finalFlow` et `remaining` : inchangés, sauf ajouter à `remaining` : « Le tri des idées et du carnet, le dimanche. »
6. `intro` : ajouter une phrase finale : le système fait maintenant aussi tourner des routines quotidiennes et hebdomadaires, et a mené la refonte complète du site.
