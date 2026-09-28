# Contenu à intégrer — session du 28/09/2026

Seule source de faits pour cette mission. Rédigé au cadrage (Opus 5.5) à partir de la session avec Michael. Ne rien ajouter qui ne soit pas ici. Ton de la page : première personne de Michael, phrases courtes.

## §A — Un deuxième avis : Gemini (28/09)

- Contexte : je réfléchissais à l'idée P-003 (un kit de missions autonomes réutilisable pour d'autres projets, fiche publique sur /projets). J'ai demandé à Claude s'il pouvait interroger Gemini, puisqu'il sait naviguer.
- Réponse de Claude : oui, avec « Claude in Chrome » — l'extension qui pilote mon vrai Chrome, où je suis déjà connecté à Gemini. Il ne se connecte jamais à ma place (il ne tape pas de mot de passe). Limites annoncées avant le test :
  1. Uniquement quand je suis là : les tâches programmées n'ont pas de navigateur.
  2. Fragile : il passe par la page, pas par une API ; si la page change, ça casse.
  3. Confidentialité : tout ce qui est envoyé part chez Google ; il n'envoie pas mes notes privées sans mon accord.
  4. Les conditions d'utilisation de Google n'aiment pas l'automatisation : ponctuel oui, à grande échelle non.
- Premier essai : échec, l'extension n'était pas connectée. Claude a donné les étapes (installer l'extension, s'y connecter avec le même compte), sans chercher de contournement. Deuxième essai, après ma connexion : réussi.
- La question posée (générale, aucune donnée privée) : comment les développeurs solo organisent-ils aujourd'hui leurs agents de code IA autonomes — suivi, garde-fous, délégation entre modèles ?
- La réponse de Gemini, en 5 pratiques (à résumer avec nos mots, jamais recopier) :
  1. Des copies de travail Git séparées (git worktrees) pour faire tourner plusieurs agents en parallèle sans qu'ils se gênent ; l'humain ne fait que la fusion.
  2. Répartir les modèles : un gros modèle conçoit, des modèles rapides ou locaux exécutent le répétitif.
  3. Validation humaine avant chaque écriture (outils cités : Cline, Kilo Code).
  4. Un fichier de règles (CLAUDE.md, .cursorrules) qui sert de contrat à l'agent.
  5. Des agents qui tournent dans le terminal et commitent chaque étape (outil cité : Aider), capables d'annuler un changement raté.
- Conclusion :
  - Mon système coche déjà 4 des 5 : modèles répartis (Opus / Sonnet / Haiku), règles dans CLAUDE.md, un commit par étape, branches auto/* séparées de main. La validation humaine, chez moi, se fait à la fin (pull request) plutôt qu'à chaque écriture — c'est le principe de l'autonomie « fondateur ».
  - Gemini a avancé un pourcentage de dépôts utilisant un CLAUDE.md, **sans source** : non vérifié, donc non repris ici. (Ne pas citer le chiffre sur la page.)
  - La réponse semblait adaptée à mon historique Gemini : un avis utile, pas une source neutre.
  - Pour P-003, c'est un signal encourageant : le système existe déjà, il s'agirait de l'extraire.
  - Coût : piloter Gemini dans le navigateur (attendre, lire la page) coûte des tokens Claude. C'est un deuxième avis, pas une économie. Environ une minute de réponse, car Gemini a fait sa propre recherche web.

## §B — Économiser les tokens (28/09)

- Ma demande : diminuer au maximum le coût en tokens du système, en restant aussi efficace.
- Constat de Claude, par ordre d'impact :
  1. La tâche programmée des missions tournait toutes les 2 heures, soit 12 fois par jour, même sans aucune mission à faire. Chaque lancement chargeait tout le contexte pour répondre « Aucune mission active ».
  2. Le CLAUDE.md du projet faisait environ 10 Ko et était chargé à chaque session (missions, Magazine, idées, conversations), alors que la moitié ne sert que pendant une mission. Et les routines le relisaient une deuxième fois alors qu'il est déjà chargé automatiquement.
  3. À chaque reprise, la tâche relisait tous les fichiers de la mission, y compris les journaux DECISIONS et DELEGATIONS qui grossissent à chaque étape.
  4. Des sous-agents lancés pour une seule commande (build, lint) : chaque sous-agent démarre à froid et relit le contexte.
- Ce qui a été fait :
  1. La tâche se met en pause toute seule quand la file de missions est vide ; la session de cadrage la réactive quand une mission est prête. (Mise en pause immédiatement ce jour-là, la file étant vide.)
  2. CLAUDE.md passe de 10 Ko à 3 Ko : les procédures (lancer, reprendre, clôturer, file d'attente, modèles) vont dans missions/README.md, lu seulement quand on travaille sur une mission. Les interdits de sécurité restent dans CLAUDE.md. Les routines ne le relisent plus.
  3. Reprise : SPEC, PLAN et PROGRESS seulement ; on ajoute des lignes aux journaux sans les relire.
  4. Build et lint : lancés directement par la session principale. Le verificateur (Haiku) ne sert plus qu'au navigateur. Nouveau choix au cadrage : « sous-agent (Haiku) » pour les étapes mécaniques bien décrites.
  - Au passage, un bug corrigé : la tâche des missions aurait pris les branches de la routine des idées (auto/projets-*) pour des missions. Elle les ignore maintenant.
  - Les mêmes règles ont été reportées dans le skill global /mission, pour les futurs projets.
- Ce qui n'a pas été retenu :
  - Gemini dans le navigateur : plus cher qu'il ne fait gagner (voir §A).
  - L'IA locale (Lily) : déjà écartée, gain marginal.
- Recommandation restée à ma charge : couper, pour ce projet, les connecteurs inutiles (messagerie, agenda, stockage, tableaux blancs, design) dont la liste occupe du contexte à chaque session.
- Publication : pour la première fois, une amélioration du système lui-même passe par une pull request (hors mission), que je fusionne.
- Cette page est mise à jour par la mission 8, `utilisation-ia-economie`, la première cadrée selon les nouvelles règles (étapes mécaniques confiées à Haiku, build et lint sans sous-agent).

## §C — Passages à mettre à jour (état actuel, pas l'histoire)

1. `TREE_PROJECT_FR/EN` : CLAUDE.md → « règles du projet, court (résumé + interdits) » ; ajouter `missions/README.md` (« procédures : lancer, reprendre, clôturer, modèles ») ; verificateur.md → « Haiku — navigateur ».
2. `modelChart.haiku2.sublabel` et la ligne `explorateur, verificateur` de `modelsTableRows` : le verificateur fait les contrôles dans le navigateur (plus le build/lint). Ajouter une ligne au tableau : « sous-agent Haiku » — « Haiku » — « Étapes mécaniques bien décrites, marquées dans le plan ».
3. `resumeLoop` étape 4 : si rien à faire, la tâche se met en pause jusqu'à la prochaine mission. Étape 5 : lecture de SPEC, PLAN et PROGRESS seulement.
4. `finalFlow` étape 2 : ajouter « réactive la tâche programmée » ; étape 4 : « se met en pause quand la file est vide ».
5. `milestones` : le 15 devient « Mise à jour de la page (mission 7) » ; ajouter 16 « Un deuxième avis : Gemini », 17 « Économiser les tokens », 18 « Cette mise à jour (mission 8) ».
6. `statsTableRows` : ajouter « 8. utilisation-ia-economie » — « — » — « voir DELEGATIONS.md de la mission ».
7. `metaP` : cette mise à jour est la huitième mission.
