// Textes fr/en de la page /projets/fonctionnement (« Comment ça marche »).
// Séparé du composant (pas de composants ici) pour ne déclencher aucun
// avertissement react-refresh/only-export-components.
// Source de faits : missions/projets-fonctionnement/CONTENU.md.
//
// Chaque section = { id, title, blocks }. Les blocs sont rendus dans l'ordre :
//   { type: 'p', text }                     paragraphe (`code` entre accents graves)
//   { type: 'levels', items: [{ title, text }] }   les trois niveaux, numérotés
//   { type: 'tree', text }                  arborescence (bloc pre, défilement interne)
//   { type: 'flow', steps: [{ label, sublabel }] } circuit en étapes (FlowDiagram)
//   { type: 'list', items: [text] }         liste numérotée
//   { type: 'cases', items: [{ title, text, list? }] } deux cas côte à côte

const TREE_LEVELS_FR = `~/                             ← dossier personnel
├── .claude/                   ← niveau 1 (dossier caché, commun à tous les projets)
└── Documents/
    └── Projets/
        └── alpha/             ← niveau 2 (un projet)`

const TREE_LEVEL1_FR = `~/.claude/                          ← la boîte à outils de Claude
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
    └── expert.md                   ← débloque les problèmes difficiles (modèle puissant, cher)`

const TREE_LEVEL2_FR = `Documents/Projets/
├── CLAUDE.md                       ← règles générales (français, pas de commit sans accord…)
│
└── misran-labs/
    ├── CLAUDE.md                   ← règles du projet + section « Missions autonomes » (installée par /mission)
    ├── .claude/
    │   ├── settings.json           ← permissions du projet (copiées depuis templates/)
    │   ├── launch.json             ← comment lancer le site pour le prévisualiser
    │   └── agents/                 ← agents propres à ce projet
    │       ├── veilleur.md         ← (veille pour la Gazette et les idées)
    │       ├── relecteur.md        ← (vérification des chiffres)
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
            └── RAPPORT.md          ← le bilan lu à la fin`

const TREE_LEVEL3_FR = `GitHub (en ligne)
├── main                  ← la version officielle, mise en ligne par Vercel. Michael seul décide.
└── auto/magazine         ← la branche de travail d'une mission. Claude y travaille librement.

Claude → Scheduled
└── misran-labs-missions  ← la tâche programmée : se réveille toutes les 2 h et avance la mission en cours`

const TREE_LEVELS_EN = `~/                             ← home folder
├── .claude/                   ← level 1 (hidden folder, shared across all projects)
└── Documents/
    └── Projets/
        └── alpha/             ← level 2 (one project)`

const TREE_LEVEL1_EN = `~/.claude/                          ← Claude's toolbox
├── skills/
│   └── mission/                    ← the /mission skill (it's the "kit" for P-003)
│       ├── SKILL.md                ← the instructions Claude reads when you type /mission
│       ├── reference/
│       │   ├── nouveau-projet.md   ← start a project from an idea
│       │   └── cloture.md          ← close a mission (check, push to GitHub, merge)
│       └── templates/              ← templates copied into each project
│           ├── CLAUDE-missions.md  ← mission rules (auto/* branches, never main…)
│           ├── settings.json       ← permissions (what Claude can do alone)
│           ├── task-prompt.md      ← prompt given to the scheduled task
│           └── SPEC / PLAN / PROGRESS / DECISIONS / DELEGATIONS.md
│
└── agents/                         ← sub-agents, available everywhere
    ├── explorateur.md              ← searches in code (lightweight, cheap)
    ├── verificateur.md             ← checks the site in the browser
    └── expert.md                   ← solves hard problems (powerful, expensive)`

const TREE_LEVEL2_EN = `Documents/Projets/
├── CLAUDE.md                       ← general rules (French, no commit without approval…)
│
└── misran-labs/
    ├── CLAUDE.md                   ← project rules + "Autonomous Missions" section (installed by /mission)
    ├── .claude/
    │   ├── settings.json           ← project permissions (copied from templates/)
    │   ├── launch.json             ← how to start the site for preview
    │   └── agents/                 ← agents specific to this project
    │       ├── veilleur.md         ← (research for the Gazette and ideas)
    │       ├── relecteur.md        ← (fact-checking)
    │       └── expert / explorateur / verificateur.md  ← local copies, priority over computer ones
    │
    └── missions/                   ← one mission = one folder
        ├── README.md               ← mission procedures
        └── magazine/               ← example mission
            ├── SPEC.md             ← what to do, and how to know it's done
            ├── PLAN.md             ← the steps, each with its model
            ├── PROGRESS.md         ← where the mission stands (updated during work)
            ├── DECISIONS.md        ← choices made without Michael, with reasons
            ├── DELEGATIONS.md      ← what was entrusted to sub-agents
            └── RAPPORT.md          ← the summary read at the end`

const TREE_LEVEL3_EN = `GitHub (online)
├── main                  ← the official version, deployed by Vercel. Michael alone decides.
└── auto/magazine         ← a mission's working branch. Claude works freely on it.

Claude → Scheduled
└── misran-labs-missions  ← the scheduled task: wakes every 2 hours and advances the current mission`

export const FONCT_TEXT = {
  fr: {
    fileNo: 'RUBRIQUE — PROJETS',
    mastheadCenter: 'ARCHIVE DU LAB //// FONCTIONNEMENT',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'MODE D’EMPLOI',
    backLabel: '← Projets',
    backToList: '← Toutes les idées',
    docId: 'ID PAGE — ML-PROJETS-FONCTIONNEMENT',
    heroNumber: '?',
    title: 'Comment ça marche',
    subtitle: 'LES MISSIONS AUTONOMES, DE L’IDÉE AU DÉPÔT',
    sections: [
      {
        id: 'pourquoi',
        title: 'Pourquoi cette page',
        blocks: [
          { type: 'p', text: 'En lisant l’idée P-003 (un kit de missions autonomes réutilisable), Michael a voulu comprendre comment les pièces du système s’emboîtent : ce qui est commun à tous ses projets, ce qui vit dans chaque projet, et ce qui se passe quand il dit « on développe P-NNN ».' },
        ],
      },
      {
        id: 'niveaux',
        title: 'Trois niveaux',
        blocks: [
          { type: 'p', text: 'Du plus général au plus précis :' },
          {
            type: 'levels',
            items: [
              { title: 'L’ordinateur', text: 'La boîte à outils de Claude, commune à tous les projets (`~/.claude/`).' },
              { title: 'Un projet', text: 'Un dossier dans `Documents/Projets/` avec ses règles et ses missions.' },
              { title: 'Hors des fichiers', text: 'GitHub (les branches) et la tâche programmée (dans l’application Claude, rubrique « Scheduled »).' },
            ],
          },
          { type: 'p', text: '`~` n’est pas la racine du disque : c’est le dossier personnel de l’utilisateur. `Documents/` est aussi dedans.' },
          { type: 'tree', text: TREE_LEVELS_FR },
        ],
      },
      {
        id: 'niveau-1',
        title: 'Niveau 1 : l’ordinateur',
        blocks: [
          { type: 'p', text: 'La boîte à outils de Claude, commune à tous les projets.' },
          { type: 'tree', text: TREE_LEVEL1_FR },
          { type: 'p', text: 'Le skill `/mission` sait installer le système dans un projet neuf ou existant : `CLAUDE.md`, permissions, tâche programmée `<projet>-missions`, puis cadrage de la première mission. Les sous-agents sont globaux : rien à copier.' },
        ],
      },
      {
        id: 'niveau-2',
        title: 'Niveau 2 : un projet',
        blocks: [
          { type: 'p', text: 'L’exemple ci-dessous est ce projet, misran-labs.' },
          { type: 'tree', text: TREE_LEVEL2_FR },
        ],
      },
      {
        id: 'niveau-3',
        title: 'Niveau 3 : hors des fichiers',
        blocks: [
          { type: 'p', text: 'Ces deux pièces ne sont pas dans un dossier de l’ordinateur : l’une est en ligne, l’autre dans l’application Claude.' },
          { type: 'tree', text: TREE_LEVEL3_FR },
        ],
      },
      {
        id: 'circuit',
        title: 'Comment tout s’emboîte',
        blocks: [
          { type: 'p', text: 'Cinq étapes, de la commande à la fusion :' },
          {
            type: 'flow',
            steps: [
              { label: '1 · /mission', sublabel: 'Michael tape /mission dans un projet. Claude lit ~/.claude/skills/mission/.' },
              { label: '2 · Installation', sublabel: 'Première fois dans ce projet : Claude copie les modèles de templates/ pour créer le CLAUDE.md, le settings.json et la tâche programmée.' },
              { label: '3 · Cadrage', sublabel: 'Claude crée missions/<nom>/ avec la SPEC et le PLAN, sur une branche auto/<nom>.' },
              { label: '4 · La nuit', sublabel: 'La tâche programmée suit le PLAN, fait appel aux agents et tient à jour PROGRESS et DECISIONS.' },
              { label: '5 · Le rapport', sublabel: 'À la fin : Michael lit le RAPPORT, puis fusionne vers main si ça lui convient.' },
            ],
          },
        ],
      },
      {
        id: 'nouveau-projet',
        title: 'Créer un nouveau projet',
        blocks: [
          { type: 'p', text: 'On ne donne pas de chemin : on ouvre la session dans le dossier.' },
          {
            type: 'list',
            items: [
              'Créer le dossier, par exemple `Documents/Projets/alpha`.',
              'Dans l’application Claude, ouvrir une nouvelle session dans ce dossier.',
              'Taper `/mission` et décrire l’idée. Claude crée tout le reste.',
            ],
          },
          { type: 'p', text: 'Si `/mission` est lancé depuis `Projets/`, Claude s’arrête et demande d’ouvrir la session dans le bon dossier : le `CLAUDE.md` et la mémoire d’un projet ne se chargent que depuis son propre dossier.' },
          { type: 'p', text: 'Ce que Michael fait lui-même : accepter la création du dépôt GitHub (public ou privé), accepter le premier commit, et dans « Scheduled » passer la tâche sur Sonnet et en mode Auto.' },
        ],
      },
      {
        id: 'on-developpe',
        title: 'Quand on développe P-NNN',
        blocks: [
          { type: 'p', text: 'Quand Michael dit « on développe P-NNN », il y a deux cas :' },
          {
            type: 'cases',
            items: [
              {
                title: 'L’idée ajoute quelque chose au site',
                text: 'Une page, par exemple : la mission se fait directement dans misran-labs, sans nouveau dossier.',
              },
              {
                title: 'L’idée produit un dépôt à part',
                text: 'Exemple : P-003, un kit publié séparément.',
                list: [
                  'Dans une session misran-labs, Michael dit « on développe P-003 ». Claude passe la fiche en `en-cours` avec le nom de la mission.',
                  'Claude crée lui-même le dossier dans `Documents/Projets/` (ex. `kit-missions`) — accord de Michael du 2026-09-28.',
                  'Claude demande l’accord de Michael pour commiter la fiche ; elle n’apparaît sur le site qu’une fois poussée sur `main`.',
                  'Michael ouvre une nouvelle session dans le nouveau dossier et tape `/mission` : une session ne peut pas en ouvrir une autre dans un autre dossier.',
                  'Cadrage ensemble (contenu, public ou privé), puis la tâche programmée développe la nuit.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'p-003',
        title: 'Et P-003 dans tout ça ?',
        blocks: [
          { type: 'p', text: 'Pour Michael, le kit existe déjà : c’est le skill `/mission` du niveau 1. P-003 n’a d’intérêt que pour d’autres développeurs : il s’agirait surtout de publier ce skill en retirant ce qui est personnel (prénom, règles Git propres à Michael, chemins).' },
        ],
      },
    ],
  },
  en: {
    fileNo: 'SECTION — PROJECTS',
    mastheadCenter: 'LAB ARCHIVE //// HOW IT WORKS',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'USER GUIDE',
    backLabel: '← Projects',
    backToList: '← All ideas',
    docId: 'PAGE ID — ML-PROJECTS-HOW-IT-WORKS',
    heroNumber: '?',
    title: 'How it works',
    subtitle: 'AUTONOMOUS MISSIONS, FROM IDEA TO REPOSITORY',
    sections: [
      {
        id: 'pourquoi',
        title: 'Why this page',
        blocks: [
          { type: 'p', text: 'While reading idea P-003 (a reusable autonomous-missions kit), Michael wanted to understand how the pieces of the system fit together: what is common to all of Michael\'s projects, what lives in each project, and what happens when Michael says "we\'re developing P-NNN".' },
        ],
      },
      {
        id: 'niveaux',
        title: 'Three levels',
        blocks: [
          { type: 'p', text: 'From most general to most specific:' },
          {
            type: 'levels',
            items: [
              { title: 'The computer', text: 'Claude\'s toolbox, shared across all projects (`~/.claude/`).' },
              { title: 'A project', text: 'A folder in `Documents/Projets/` with its own rules and missions.' },
              { title: 'Outside files', text: 'GitHub (the branches) and the scheduled task (in the Claude app, "Scheduled" section).' },
            ],
          },
          { type: 'p', text: '`~` is not the disk root: it\'s the user\'s home folder. `Documents/` is inside it too.' },
          { type: 'tree', text: TREE_LEVELS_EN },
        ],
      },
      {
        id: 'niveau-1',
        title: 'Level 1: the computer',
        blocks: [
          { type: 'p', text: 'Claude\'s toolbox, shared across all projects.' },
          { type: 'tree', text: TREE_LEVEL1_EN },
          { type: 'p', text: 'The `/mission` skill can install the system in a new or existing project: `CLAUDE.md`, permissions, scheduled task `<project>-missions`, then scope the first mission. Sub-agents are global: nothing to copy.' },
        ],
      },
      {
        id: 'niveau-2',
        title: 'Level 2: a project',
        blocks: [
          { type: 'p', text: 'The example below is this project, misran-labs.' },
          { type: 'tree', text: TREE_LEVEL2_EN },
        ],
      },
      {
        id: 'niveau-3',
        title: 'Level 3: outside files',
        blocks: [
          { type: 'p', text: 'These two pieces aren\'t in a folder on the computer: one is online, the other in the Claude app.' },
          { type: 'tree', text: TREE_LEVEL3_EN },
        ],
      },
      {
        id: 'circuit',
        title: 'How it all fits',
        blocks: [
          { type: 'p', text: 'Five steps, from command to merge:' },
          {
            type: 'flow',
            steps: [
              { label: '1 · /mission', sublabel: 'Michael types /mission in a project. Claude reads ~/.claude/skills/mission/.' },
              { label: '2 · Setup', sublabel: 'First time in this project: Claude copies templates/ to create CLAUDE.md, settings.json, and the scheduled task.' },
              { label: '3 · Scoping', sublabel: 'Claude creates missions/<name>/ with SPEC and PLAN, on an auto/<name> branch.' },
              { label: '4 · Overnight', sublabel: 'The scheduled task follows PLAN, calls agents, and keeps PROGRESS and DECISIONS up to date.' },
              { label: '5 · The report', sublabel: 'At the end: Michael reads the RAPPORT, then merges into main if it suits Michael.' },
            ],
          },
        ],
      },
      {
        id: 'nouveau-projet',
        title: 'Create a new project',
        blocks: [
          { type: 'p', text: 'You don\'t give a path: you open the session in the folder.' },
          {
            type: 'list',
            items: [
              'Create the folder, for example `Documents/Projets/alpha`.',
              'In the Claude app, open a new session in that folder.',
              'Type `/mission` and describe the idea. Claude creates everything else.',
            ],
          },
          { type: 'p', text: 'If `/mission` is run from `Projets/`, Claude stops and asks you to open the session in the right folder: a project\'s `CLAUDE.md` and memory only load from its own folder.' },
          { type: 'p', text: 'What Michael has to do personally: accept the GitHub repository creation (public or private), accept the first commit, and in "Scheduled" switch the task to Sonnet and enable Auto mode.' },
        ],
      },
      {
        id: 'on-developpe',
        title: 'When developing P-NNN',
        blocks: [
          { type: 'p', text: 'When Michael says "we\'re developing P-NNN", there are two cases:' },
          {
            type: 'cases',
            items: [
              {
                title: 'The idea adds to the site',
                text: 'A page, for example: the mission runs directly in misran-labs, no new folder.',
              },
              {
                title: 'The idea makes a separate repo',
                text: 'Example: P-003, a kit published separately.',
                list: [
                  'In a misran-labs session, Michael says "we\'re developing P-003". Claude sets the card to `en-cours` with the mission name.',
                  'Claude creates the folder on its own in `Documents/Projets/` (e.g., `kit-missions`) — Michael\'s approval from 2026-09-28.',
                  'Claude asks Michael\'s approval to commit the card; it only appears on the site once pushed to `main`.',
                  'Michael opens a new session in the new folder and types `/mission`: one session can\'t open another in a different folder.',
                  'Scoping together (content, public or private), then the scheduled task develops overnight.',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'p-003',
        title: 'What about P-003?',
        blocks: [
          { type: 'p', text: 'For Michael, the kit already exists: it\'s the `/mission` skill at level 1. P-003 only matters to other developers: it\'s mostly about publishing this skill by removing what\'s personal (first name, Michael\'s Git rules, paths).' },
        ],
      },
    ],
  },
}
