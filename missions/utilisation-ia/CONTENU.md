# Contenu source — « Utilisation de l'IA »

Rédigé par la session de cadrage (Opus), qui a vécu toute la séquence avec Michael le 2026-09-26. **C'est la seule source de faits de la page** : ne rien inventer, ne rien extrapoler. Les heures sont en heure de Paris.

⚠️ Site et dépôt **publics** : aucun token (même partiel), aucun chemin personnel (`/Users/…`), aucun email.

---

## 0. Point de départ

- Michael utilisait une **IA locale**, « Lily » (Qwen3-8B, quantifiée 4 bits, servie par LM Studio sur son Mac), via un petit script Python, pour sous-traiter des tâches et économiser son quota Claude (abonnement **Pro**, limite glissante sur **5 heures**).
- Analyse faite avec Claude : la délégation n'économise du quota que si l'IA locale **lit beaucoup et renvoie peu**. Or le script recevait le prompt en argument et renvoyait sa réponse dans le terminal : Claude devait tout recopier puis tout relire. Le modèle affichait aussi son raisonnement (`<think>`), et le « coût équivalent » calculé mesurait les tokens de Lily au lieu des tokens épargnés à Claude.
- **Décision : abandonner l'IA locale.** Qualité d'un modèle 8B insuffisante pour le code et le design, gain de quota marginal, complexité en plus.

## 1. Les vrais leviers sur le quota

Par ordre d'impact :
1. **Choisir le modèle selon la tâche** : Sonnet par défaut, Opus seulement pour le difficile (architecture, bug coriace), effort de raisonnement réduit pour le simple.
2. **Contexte court** : à chaque message, Claude relit toute la conversation. Une tâche = une session, `/clear` entre deux sujets, `/compact` sur les longues sessions.
3. **Éviter les opérations coûteuses** : captures d'écran (préférer la lecture du texte de la page), exploration de gros fichiers sans cible.
4. **Sous-agents** pour les explorations larges.
5. (L'IA locale : abandonnée.)

## 2. Les sous-agents, expliqués

- Un sous-agent = **une autre instance de Claude**, lancée pour une tâche précise, avec **son propre contexte vierge** et ses outils. Il ne renvoie qu'un **résumé**.
- Analogie : un chef de projet délègue à un stagiaire « va voir comment la navigation est gérée » ; le stagiaire ouvre 30 fichiers, le chef ne lit que le compte rendu.
- Apports : contexte principal léger (gain principal), choix d'un modèle moins cher (Haiku, Sonnet), parallélisme.
- Limites : ses tokens comptent aussi dans le quota ; il démarre à froid (consigne complète nécessaire) ; il faut vérifier ce qu'il rapporte.

Comparaison retenue :

| | IA locale (8B) | Sous-agent Haiku/Sonnet |
|---|---|---|
| Coût quota | Nul (hors relecture) | Réduit mais réel |
| Qualité | Faible | Bonne à très bonne |
| Accès fichiers/outils | Non | Oui |
| Isolation du contexte | Seulement si sortie en fichier | Native |

## 3. L'objectif : l'autonomie « fondateur »

Demande de Michael : « Considère-moi comme le fondateur d'une boîte. Je délègue tout et je ne vois que le résultat. » Peu importe le temps que ça prend ; intervenir le moins possible ; **sans surcoût** sur l'abonnement Pro.

Ce qui empêchait l'autonomie au départ :
- La règle Git « jamais de commit sans validation » → blocage à chaque commit.
- Les demandes de permission (personne pour répondre la nuit).
- Le Mac qui se met en veille.
- **Les décisions métier** : sans spec, Claude bloque ou invente.

Réponses apportées :
- **Une spec tranchée au départ** (le vrai goulot).
- **Exception Git** : commits libres uniquement sur des branches `auto/*` ; push, fusion et déploiement restent à Michael.
- **Permissions** écrites une fois dans le projet (liste d'autorisations + liste d'interdits).
- **Reprise après la limite de quota** : quand le quota est épuisé, la session s'arrête et ne peut pas se relancer seule. Donc : l'état du travail est écrit **sur le disque** (plan coché, fichier de progression, un commit par étape) et une **tâche programmée** relance le travail **toutes les 2 heures**. Si rien à faire, elle s'arrête en quelques secondes.
- **Sans surcoût** sur Pro, tant que l'usage supplémentaire payant n'est pas activé : le travail est juste plus lent (plusieurs fenêtres de quota), et partage le quota du travail quotidien → idéal la nuit.

## 4. Le cloud, expliqué

- Même en local, le « cerveau » (le modèle) tourne toujours sur les serveurs d'Anthropic ; seules les « mains » (fichiers, commandes, navigateur) sont sur le Mac.
- En mode cloud, les mains sont sur **un ordinateur virtuel temporaire** chez Anthropic : il récupère le projet depuis GitHub, travaille, renvoie le résultat sur une branche GitHub, puis est détruit. Le Mac peut être éteint.
- Implications : GitHub obligatoire ; fichiers locaux non versionnés et secrets absents ; Internet généralement restreint.
- **Choix pour le test : le Mac** (plus simple, et vérification possible dans le navigateur). Contrainte : l'app Claude doit rester ouverte pour que les tâches programmées tournent.

## 5. L'organigramme des modèles

| Rôle | Modèle | Quand |
|---|---|---|
| Architecte : cadrage, spec, plan | **Opus** | Une fois, au lancement, en session avec Michael |
| Chef de projet / développeur | **Sonnet** | Toutes les exécutions programmées |
| Exécutants : `explorateur` (recherche), `verificateur` (build, lint, navigateur) | **Haiku** | Tâches simples ou volumineuses |
| `expert` | **Opus** | Étape délicate marquée dans le plan, ou après 2 échecs |

Qui choisit : le modèle de la session d'exécution est fixé une fois (réglage de la tâche programmée) ; le chef de projet Sonnet choisit ensuite les sous-agents. Amélioration ajoutée après le premier test : **au cadrage, chaque étape du plan porte son modèle** (`→ verificateur (Haiku)`), Sonnet suit l'indication et peut appeler l'expert en plus, jamais en moins.

## 6. Incident de sécurité découvert en préparant le test

- En inspectant le dépôt, Claude a trouvé **un token GitHub écrit en clair dans l'adresse du dépôt distant**, dans la configuration Git **locale** du Mac.
- Vérification : il n'était **ni sur GitHub ni dans l'historique** (89 commits et tous les fichiers du projet contrôlés). Risque résiduel identifié : les journaux de sessions Claude publiés sur le site auraient pu l'exposer.
- Actions : Michael a **révoqué le token** ; Claude a nettoyé l'adresse du dépôt ; connexion refaite avec **GitHub CLI** (`gh auth login`, identifiants stockés dans le trousseau macOS, plus aucun secret en clair).
- Leçon : une session autonome ne doit jamais manipuler de secret en clair.

## 7. Mise en place (session de cadrage, Opus)

Mission test : « corriger les tokens qui sont en erreur » → les **34 tokens sémantiques** qui portaient une valeur brute au lieu de pointer vers une primitive (signalés par la page Tokens du Lab).

Créé dans le projet :
```
misran-labs/
├── CLAUDE.md                      règles du projet (missions, Git, modèles, lancement, clôture)
├── .claude/
│   ├── settings.json              autorisations + interdits (push, merge, rebase, npm install, vercel)
│   └── agents/
│       ├── explorateur.md         Haiku — recherche en lecture seule
│       ├── verificateur.md        Haiku — build, lint, navigateur
│       └── expert.md              Opus — dernier recours
└── missions/
    └── tokens-fix/
        ├── SPEC.md                objectif, 9 décisions d'architecture (D1–D9), 6 critères
        ├── PLAN.md                8 étapes à cocher
        ├── PROGRESS.md            où on en est (mémoire entre deux reprises)
        ├── DECISIONS.md           décisions prises sans Michael
        ├── DELEGATIONS.md         journal des sous-agents
        └── RAPPORT.md             écrit à la fin
```

Incidents de mise en place (instructifs) :
- `npm run lint` **restait bloqué indéfiniment** sur deux jeux minifiés de 315 Ko dans `public/games` → dossier exclu du lint. Sans ça, toute session autonome se serait figée. Lint : 6 erreurs préexistantes, hors mission.
- **Garde-fous de Claude Code** : la création du fichier de permissions et de la tâche programmée, lancées de la propre initiative de Claude, ont été **bloquées** (« auto-modification ») → Michael a créé le fichier lui-même ; la tâche a été créée après sa **demande explicite**.
- Tâche programmée « missions autonomes » : toutes les 2 h à la 15e minute ; chaque exécution repart de zéro et lit les fichiers de la mission.
- Premier passage : les demandes d'autorisation n'offraient que « Autoriser une fois » / « Refuser ».

## 8. L'exécution autonome (tâche programmée)

- Lancée le 26/09/2026 à **23 h 09**, terminée à **23 h 22** : **13 minutes**, 50 tours, **7 commits** (un par étape 2 à 8).
- Résultat : **34 primitives ajoutées** (tailles, polices, texte, couleurs avec transparence, ombre) ; les 34 sémantiques deviennent des alias ; le bloc inversé `[data-invert]` suit la même règle.
- **Non-régression visuelle** : valeurs calculées des **86 tokens** d'origine relevées avant/après, sur `:root` et `[data-invert]` → **0 différence**.
- Page Tokens du Lab : **120 tokens, 0 erreur**, FR et EN.
- **10 décisions** prises seule, toutes justifiées dans DECISIONS.md.
- **0 sous-agent lancé** : chaque étape était plus courte à faire directement.
- **Tout a tourné sur Opus**, pas sur Sonnet : le modèle de la tâche programmée n'avait pas été réglé. Point le plus coûteux du test.
- Limite rencontrée : le serveur de développement **ne pouvait pas démarrer** (autorisation demandée, personne pour répondre). Contournement jugé acceptable par la session : relevé des valeurs via Chrome headless, vérification de la page par rendu serveur React.

## 9. Clôture

1. La session interactive a fait la vérification manquante **dans un vrai navigateur** : 0 erreur FR/EN, console vide sur la page et sur l'accueil.
2. Contrôle avant publication : aucun secret ni donnée personnelle dans les changements (dépôt public).
3. **Push de la branche par Michael** (le push est interdit à Claude par les permissions — le garde-fou fonctionne, même quand Michael le demande).
4. **Prévisualisation Vercel** automatique de la branche → vérifiée par Michael.
5. **Pull request #1** ouverte par Claude → **fusion par Michael** (clic « Merge »), puis `git pull`.
6. Explication clé pour Michael : **le code sur GitHub ≠ le site en ligne**. Le site est construit à partir de `main` ; une branche est un brouillon à côté de la version publiée.

## 10. Améliorations après le test

- Navigateur intégré autorisé dans les permissions (pour les vérifications de nuit).
- **Modèle par étape** dans le plan (voir §5).
- Procédures « Lancer une mission » et « Clôturer une mission » écrites dans le CLAUDE.md du projet ; mémoire de Claude mise à jour → une nouvelle session sait refaire tout le circuit.
- **Skill global `/mission`**, valable pour tous les projets :
```
~/.claude/
├── skills/mission/
│   ├── SKILL.md                   choisit le mode : nouveau projet / installation / lancement / clôture
│   ├── templates/                 CLAUDE-missions.md, settings.json, task-prompt.md,
│   │                              SPEC, PLAN, PROGRESS, DECISIONS, DELEGATIONS
│   └── reference/
│       ├── nouveau-projet.md      idée → 3 à 6 questions → projet + dépôt + mission 1
│       └── cloture.md             vérif → push → prévisualisation → PR → fusion
└── agents/                        explorateur, verificateur, expert (globaux)
```

## 11. Le circuit final

1. Michael : « mission : … » (session de cadrage, Opus).
2. Claude : spec tranchée + plan avec un modèle par étape + branche `auto/<nom>`.
3. Tâche programmée (Sonnet) : exécute étape par étape, reprend après chaque coupure de quota, délègue à Haiku/Opus selon le plan.
4. Rapport écrit par la session.
5. Clôture avec Michael : vérification → push (Michael) → prévisualisation → PR (Claude) → fusion (Michael).

**Ce qui reste à Michael** : le brief, les autorisations du premier passage, le modèle de chaque tâche programmée, le push et la fusion, les comptes et services externes, la validation juridique.

## 12. Mise en abyme

Cette page est **la deuxième mission** du système : cadrée par Opus à partir de ce contenu, puis rédigée, mise en page et vérifiée par la tâche programmée, sans Michael. Le dossier `missions/utilisation-ia/` du dépôt en garde la trace (SPEC, PLAN, DECISIONS, DELEGATIONS, RAPPORT).
