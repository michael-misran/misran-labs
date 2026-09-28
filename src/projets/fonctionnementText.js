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
            └── RAPPORT.md          ← le bilan lu à la fin`

const TREE_LEVEL3_FR = `GitHub (en ligne)
├── main                  ← la version officielle, mise en ligne par Vercel. Michael seul décide.
└── auto/magazine         ← la branche de travail d'une mission. Claude y travaille librement.

Claude → Scheduled
└── misran-labs-missions  ← la tâche programmée : se réveille toutes les 2 h et avance la mission en cours`

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
    sections: [],
  },
}
