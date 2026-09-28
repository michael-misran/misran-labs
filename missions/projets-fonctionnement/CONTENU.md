# Contenu de la page « Comment ça marche » — seule source de faits

Issu de la conversation du 2026-09-28 entre Michael et Claude (session tour de contrôle). Ne rien inventer au-delà.
Page publique : aucun chemin `/Users/…`, aucun email, aucun token. Écrire `~` pour le dossier personnel.

## §0 — Pourquoi cette page
En lisant l'idée P-003 (un kit de missions autonomes réutilisable), Michael a voulu comprendre comment les pièces du système s'emboîtent : ce qui est commun à tous ses projets, ce qui vit dans chaque projet, et ce qui se passe quand il dit « on développe P-NNN ».

## §1 — Trois niveaux
Du plus général au plus précis :
1. **L'ordinateur** : la boîte à outils de Claude, commune à tous les projets (`~/.claude/`).
2. **Un projet** : un dossier dans `Documents/Projets/` avec ses règles et ses missions.
3. **Hors des fichiers** : GitHub (les branches) et la tâche programmée (dans l'application Claude, rubrique « Scheduled »).

`~` n'est pas la racine du disque : c'est le dossier personnel de l'utilisateur. `Documents/` est aussi dedans :

```
~/                             ← dossier personnel
├── .claude/                   ← niveau 1 (dossier caché, commun à tous les projets)
└── Documents/
    └── Projets/
        └── alpha/             ← niveau 2 (un projet)
```

## §2 — Niveau 1 : l'ordinateur (commun à tous les projets)

```
~/.claude/                          ← la boîte à outils de Claude
├── skills/
│   └── mission/                    ← le skill /mission (c'est lui, le « kit » de P-003)
│       ├── SKILL.md                ← le mode d'emploi que Claude lit quand on tape /mission
│       ├── reference/
│       │   ├── nouveau-projet.md   ← démarrer un projet à partir d'une idée
│       │   └── cloture.md          ← terminer une mission (vérifier, envoyer sur GitHub, fusionner)
│       └── templates/              ← les modèles copiés dans chaque projet
│           ├── CLAUDE-missions.md  ← règles des missions (branches auto/*, jamais main…)
│           ├── settings.json       ← permissions (ce que Claude a le droit de faire seul)
│           ├── task-prompt.md      ← consigne donnée à la tâche programmée
│           └── SPEC / PLAN / PROGRESS / DECISIONS / DELEGATIONS.md
│
└── agents/                         ← les sous-agents, disponibles partout
    ├── explorateur.md              ← cherche dans le code (modèle léger, peu cher)
    ├── verificateur.md             ← vérifie le site dans le navigateur
    └── expert.md                   ← débloque les problèmes difficiles (modèle puissant, cher)
```

Le skill `/mission` sait installer le système dans un projet neuf ou existant : `CLAUDE.md`, permissions, tâche programmée `<projet>-missions`, puis cadrage de la première mission. Les sous-agents sont globaux : rien à copier.

## §3 — Niveau 2 : un projet (exemple : misran-labs)

```
Documents/Projets/
├── CLAUDE.md                       ← règles générales (français, pas de commit sans accord…)
│
└── misran-labs/
    ├── CLAUDE.md                   ← règles du projet + section « Missions autonomes » (installée par /mission)
    ├── .claude/
    │   ├── settings.json           ← permissions du projet (copiées depuis templates/)
    │   ├── launch.json             ← comment lancer le site pour le prévisualiser
    │   └── agents/                 ← agents propres à ce projet
    │       ├── veilleur.md         ← (pour le Magazine uniquement)
    │       ├── relecteur.md        ← (pour le Magazine uniquement)
    │       └── expert / explorateur / verificateur.md  ← copies locales, prioritaires sur celles de l'ordinateur
    │
    └── missions/                   ← une mission = un dossier
        ├── README.md               ← procédures des missions
        └── magazine/               ← exemple de mission
            ├── SPEC.md             ← ce qu'il faut faire, et comment savoir que c'est réussi
            ├── PLAN.md             ← les étapes, chacune avec le modèle qui la fait
            ├── PROGRESS.md         ← où en est la mission (mis à jour pendant le travail)
            ├── DECISIONS.md        ← les choix faits sans Michael, avec la raison
            ├── DELEGATIONS.md      ← ce qui a été confié aux sous-agents
            └── RAPPORT.md          ← le bilan lu à la fin
```

## §4 — Niveau 3 : hors des fichiers

```
GitHub (en ligne)
├── main                  ← la version officielle, mise en ligne par Vercel. Michael seul décide.
└── auto/magazine         ← la branche de travail d'une mission. Claude y travaille librement.

Claude → Scheduled
└── misran-labs-missions  ← la tâche programmée : se réveille toutes les 2 h et avance la mission en cours
```

## §5 — Comment tout s'emboîte (5 étapes)
1. Michael tape `/mission` dans un projet. Claude lit `~/.claude/skills/mission/`.
2. Première fois dans ce projet : Claude copie les modèles de `templates/` pour créer le `CLAUDE.md`, le `settings.json` et la tâche programmée.
3. Cadrage : Claude crée `missions/<nom>/` avec la SPEC et le PLAN, sur une branche `auto/<nom>`.
4. La nuit : la tâche programmée suit le PLAN, fait appel aux agents et tient à jour PROGRESS et DECISIONS.
5. À la fin : Michael lit le RAPPORT, puis fusionne vers `main` si ça lui convient.

## §6 — Créer un nouveau projet
On ne donne pas de chemin : on ouvre la session dans le dossier.
1. Créer le dossier, par exemple `Documents/Projets/alpha`.
2. Dans l'application Claude, ouvrir une nouvelle session dans ce dossier.
3. Taper `/mission` et décrire l'idée. Claude crée tout le reste.

Si `/mission` est lancé depuis `Projets/`, Claude s'arrête et demande d'ouvrir la session dans le bon dossier : le `CLAUDE.md` et la mémoire d'un projet ne se chargent que depuis son propre dossier.
Ce que Michael fait lui-même : accepter la création du dépôt GitHub (public ou privé), accepter le premier commit, et dans « Scheduled » passer la tâche sur Sonnet et en mode Auto.

## §7 — Quand Michael dit « on développe P-NNN »
Deux cas :
- **L'idée ajoute quelque chose au site** (une page, par exemple) : la mission se fait directement dans misran-labs, sans nouveau dossier.
- **L'idée produit un dépôt à part** (ex. P-003, un kit publié séparément) :
  1. Dans une session misran-labs, Michael dit « on développe P-003 ». Claude passe la fiche en `en-cours` avec le nom de la mission.
  2. Claude crée lui-même le dossier dans `Documents/Projets/` (ex. `kit-missions`) — accord de Michael du 2026-09-28.
  3. Claude demande l'accord de Michael pour commiter la fiche ; elle n'apparaît sur le site qu'une fois poussée sur `main`.
  4. Michael ouvre une nouvelle session dans le nouveau dossier et tape `/mission` : une session ne peut pas en ouvrir une autre dans un autre dossier.
  5. Cadrage ensemble (contenu, public ou privé), puis la tâche programmée développe la nuit.

## §8 — Et P-003 dans tout ça ?
Pour Michael, le kit existe déjà : c'est le skill `/mission` du niveau 1. P-003 n'a d'intérêt que pour d'autres développeurs : il s'agirait surtout de publier ce skill en retirant ce qui est personnel (prénom, règles Git propres à Michael, chemins).
