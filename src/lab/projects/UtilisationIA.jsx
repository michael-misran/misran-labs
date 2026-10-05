import { Section } from '../CaseStudyLayout'
import { CaseMasthead, CaseHero, CaseFooter } from '../CaseFile'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import Timeline from '../../components/diagrams/Timeline'
import SectionTitle from '../../design-system/SectionTitle'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'

// Copie locale de la fonction de découpe de FlowDiagram (non exportée) —
// modifier ce composant existant est hors périmètre de la mission.
function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''

  words.forEach(word => {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  })
  if (current) lines.push(current)

  return lines
}

function DiagramBox({ x, y, w, h, label, sublabel, accent, dashed }) {
  const lines = sublabel ? wrapText(sublabel, Math.floor((w - 24) / 5.6)) : []

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={20}
        fill="var(--bg2)"
        stroke={accent ? 'var(--primary)' : 'var(--border)'}
        strokeWidth={1}
        strokeDasharray={dashed ? '4 3' : undefined}
      />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fontWeight={600} fill="var(--text)">
        {label}
      </text>
      {lines.map((line, i) => (
        <text key={i} x={x + w / 2} y={y + 50 + i * 14} textAnchor="middle" fontFamily="var(--font-body)" fontSize={10.5} fill="var(--text2)">
          {line}
        </text>
      ))}
    </g>
  )
}

function ModelOrgChart({ c }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <svg viewBox="0 0 480 480" style={{ width: '100%', minWidth: 440, maxWidth: 480, height: 'auto', display: 'block' }}>
        <line x1={240} y1={92} x2={240} y2={120} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={240} y1={212} x2={240} y2={232} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={82} y1={232} x2={398} y2={232} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={82} y1={232} x2={82} y2={252} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={240} y1={232} x2={240} y2={252} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={398} y1={232} x2={398} y2={252} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={240} y1={344} x2={240} y2={362} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={160} y1={362} x2={320} y2={362} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={160} y1={362} x2={160} y2={378} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={320} y1={362} x2={320} y2={378} stroke="var(--muted)" strokeWidth={1.5} />
        <DiagramBox x={120} y={0} w={240} h={92} accent label={c.top.label} sublabel={c.top.sublabel} />
        <DiagramBox x={120} y={120} w={240} h={92} label={c.mid.label} sublabel={c.mid.sublabel} />
        <DiagramBox x={8} y={252} w={148} h={92} label={c.haiku1.label} sublabel={c.haiku1.sublabel} />
        <DiagramBox x={166} y={252} w={148} h={92} label={c.haiku2.label} sublabel={c.haiku2.sublabel} />
        <DiagramBox x={324} y={252} w={148} h={92} dashed label={c.expert.label} sublabel={c.expert.sublabel} />
        <DiagramBox x={90} y={378} w={140} h={92} label={c.veilleur.label} sublabel={c.veilleur.sublabel} />
        <DiagramBox x={250} y={378} w={140} h={92} label={c.relecteur.label} sublabel={c.relecteur.sublabel} />
      </svg>
    </div>
  )
}

function LocalVsCloud({ c }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <svg viewBox="0 0 480 280" style={{ width: '100%', minWidth: 440, maxWidth: 480, height: 'auto', display: 'block' }}>
        <line x1={240} y1={92} x2={240} y2={116} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={120} y1={116} x2={360} y2={116} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={120} y1={116} x2={120} y2={140} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={360} y1={116} x2={360} y2={140} stroke="var(--muted)" strokeWidth={1.5} />
        <DiagramBox x={120} y={0} w={240} h={92} label={c.brain.label} sublabel={c.brain.sublabel} />
        <DiagramBox x={8} y={140} w={224} h={136} accent label={c.local.label} sublabel={c.local.sublabel} />
        <DiagramBox x={248} y={140} w={224} h={136} label={c.cloud.label} sublabel={c.cloud.sublabel} />
      </svg>
    </div>
  )
}

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 'var(--space-xs)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420 }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                  padding: '0 var(--space-sm) var(--space-xs-plus) 0',
                  borderBottom: 'var(--border-thin) solid var(--border)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: j === 0 ? 'var(--text)' : 'var(--text2)',
                    fontWeight: j === 0 ? 600 : 400,
                    padding: 'var(--space-sm) var(--space-sm) var(--space-sm) 0',
                    borderBottom: 'var(--border-thin) solid var(--border)',
                    lineHeight: 1.5,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Pre({ isMobile, children }) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: isMobile ? 11 : 12,
        lineHeight: 1.6,
        color: 'var(--text2)',
        background: 'var(--bg2)',
        border: 'var(--border-thin) solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-md)',
        margin: 0,
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}
    >
      {children}
    </pre>
  )
}

const TREE_PROJECT_FR = `misran-labs/
├── CLAUDE.md                      règles du projet, court (résumé + interdits)
├── .claude/
│   ├── settings.json              autorisations + interdits (push, merge, rebase, npm install, vercel)
│   └── agents/
│       ├── explorateur.md         Haiku — recherche en lecture seule
│       ├── verificateur.md        Haiku — navigateur
│       └── expert.md              Opus — dernier recours
└── missions/
    ├── README.md                  procédures : lancer, reprendre, clôturer, modèles
    └── tokens-fix/
        ├── SPEC.md                objectif, 9 décisions d'architecture (D1–D9), 6 critères
        ├── PLAN.md                8 étapes à cocher
        ├── PROGRESS.md            où on en est (mémoire entre deux reprises)
        ├── DECISIONS.md           décisions prises seul
        ├── DELEGATIONS.md         journal des sous-agents
        └── RAPPORT.md             écrit à la fin`

const TREE_PROJECT_EN = `misran-labs/
├── CLAUDE.md                      project rules, short (summary + prohibitions)
├── .claude/
│   ├── settings.json              allow list + deny list (push, merge, rebase, npm install, vercel)
│   └── agents/
│       ├── explorateur.md         Haiku — read-only search
│       ├── verificateur.md        Haiku — browser
│       └── expert.md              Opus — last resort
└── missions/
    ├── README.md                  procedures: launch, resume, wrap up, models
    └── tokens-fix/
        ├── SPEC.md                goal, 9 architecture decisions (D1–D9), 6 criteria
        ├── PLAN.md                8 steps to check off
        ├── PROGRESS.md            where things stand (memory between two runs)
        ├── DECISIONS.md           decisions made on my own
        ├── DELEGATIONS.md         sub-agent log
        └── RAPPORT.md             written at the end`

const TREE_GLOBAL_FR = `~/.claude/
├── skills/mission/
│   ├── SKILL.md                   choisit le mode : nouveau projet / installation / lancement / clôture
│   ├── templates/                 CLAUDE-missions.md, settings.json, task-prompt.md,
│   │                              SPEC, PLAN, PROGRESS, DECISIONS, DELEGATIONS
│   └── reference/
│       ├── nouveau-projet.md      idée → 3 à 6 questions → projet + dépôt + mission 1
│       └── cloture.md             vérif → push → prévisualisation → PR → fusion
└── agents/                        explorateur, verificateur, expert (globaux)`

const TREE_GLOBAL_EN = `~/.claude/
├── skills/mission/
│   ├── SKILL.md                   picks the mode: new project / install / launch / wrap-up
│   ├── templates/                 CLAUDE-missions.md, settings.json, task-prompt.md,
│   │                              SPEC, PLAN, PROGRESS, DECISIONS, DELEGATIONS
│   └── reference/
│       ├── nouveau-projet.md      idea → 3 to 6 questions → project + repo + mission 1
│       └── cloture.md             check → push → preview → PR → merge
└── agents/                        explorateur, verificateur, expert (global)`

const CONTENT = {
  fr: {
    title: "Utilisation de l'IA",
    fileNo: 'DOSSIER Nº 008',
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'ID DOSSIER — ML-ARCHIVE-008',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',

    intro:
      "J'utilisais une IA locale pour économiser mon quota Claude. Je l'ai abandonnée, j'ai compris les vrais leviers du quota, et j'ai mis en place un système où Claude cadre une mission puis la mène seul, du brief jusqu'à la pull request. Cette page raconte cette séquence — et elle a été écrite par ce système lui-même. Depuis, le système fait aussi tourner des routines quotidiennes et hebdomadaires, et a mené la refonte complète du site.",

    sequenceTitle: 'La séquence',
    milestones: [
      { date: '01', label: "Abandon de l'IA locale (Lily, Qwen3-8B)" },
      { date: '02', label: 'Les vrais leviers sur le quota' },
      { date: '03', label: 'Les sous-agents, expliqués' },
      { date: '04', label: "Objectif : l'autonomie « fondateur »" },
      { date: '05', label: 'Incident de sécurité : un token en clair, révoqué' },
      { date: '06', label: 'Mise en place de la mission test (Opus)' },
      { date: '07 · 23 H 09 → 23 H 22', label: 'Exécution autonome : 13 min, 7 commits' },
      { date: '08', label: 'Clôture : push, prévisualisation, PR #1, fusion' },
      { date: '09', label: 'Skill global /mission pour tous les projets' },
      { date: '10', label: 'Mission 3 : schémas en grille, fin des interruptions' },
      { date: '11', label: 'Le Magazine, son test et le relecteur' },
      { date: '12', label: "La file d'attente de missions" },
      { date: '13', label: 'Piloter depuis le téléphone' },
      { date: '14', label: 'Le compromis sur le push de main' },
      { date: '15', label: 'Mise à jour de la page (mission 7)' },
      { date: '16', label: 'Un deuxième avis : Gemini' },
      { date: '17', label: 'Économiser les tokens' },
      { date: '18', label: 'Mise à jour de la page (mission 8)' },
      { date: '19', label: "Les idées du dimanche" },
      { date: '20', label: 'La Gazette du Lab et le carnet' },
      { date: '21', label: 'Une semaine de missions' },
      { date: '22', label: 'La refonte kiosque' },
      { date: '23', label: 'Lightpanda, un navigateur en secours' },
      { date: '24', label: 'Cette mise à jour (mission 42)' },
    ],

    startTitle: "Point de départ : l'IA locale",
    startP1:
      "J'utilisais une IA locale, que j'appelais Lily : un modèle Qwen3-8B, quantifié en 4 bits, servi par LM Studio sur mon Mac, piloté par un petit script Python. L'idée : lui sous-traiter des tâches pour économiser mon quota Claude — un abonnement Pro, avec une limite glissante sur 5 heures.",
    startP2:
      "Avec Claude, on a vérifié si ça marchait vraiment : la délégation n'économise du quota que si l'IA locale lit beaucoup et renvoie peu. Or le script recevait le prompt en argument et renvoyait sa réponse dans le terminal — Claude devait tout recopier puis tout relire. Le modèle affichait aussi son raisonnement, et le « coût équivalent » calculé mesurait les tokens de Lily au lieu de ceux qu'elle était censée m'épargner.",
    startP3:
      "J'ai décidé d'abandonner l'IA locale : la qualité d'un modèle 8B est insuffisante pour le code et le design, le gain de quota était marginal, et ça ajoutait de la complexité.",

    leversTitle: 'Les vrais leviers sur le quota',
    levers: [
      'Choisir le modèle selon la tâche : Sonnet par défaut, Opus seulement pour le difficile (architecture, bug coriace), effort de raisonnement réduit pour le simple.',
      "Contexte court : à chaque message, Claude relit toute la conversation. Une tâche = une session, /clear entre deux sujets, /compact sur les longues sessions.",
      "Éviter les opérations coûteuses : captures d'écran (préférer la lecture du texte de la page), exploration de gros fichiers sans cible.",
      'Sous-agents pour les explorations larges.',
      "L'IA locale — abandonnée.",
    ],

    subagentsTitle: 'Les sous-agents, expliqués',
    subagentsDef:
      "Un sous-agent, c'est une autre instance de Claude, lancée pour une tâche précise, avec son propre contexte vierge et ses propres outils. Il ne renvoie qu'un résumé.",
    subagentsAnalogy:
      "L'analogie qui m'a aidé : un chef de projet délègue à un stagiaire « va voir comment la navigation est gérée » ; le stagiaire ouvre 30 fichiers, le chef ne lit que le compte rendu.",
    subagentsProsLabel: 'Apports :',
    subagentsPros: [
      'Contexte principal plus léger — le gain principal.',
      'Choix d\'un modèle moins cher (Haiku, Sonnet).',
      'Parallélisme.',
    ],
    subagentsConsLabel: 'Limites :',
    subagentsCons: [
      'Ses tokens comptent aussi dans le quota.',
      'Il démarre à froid — il faut lui donner la consigne complète.',
      'Il faut vérifier ce qu\'il rapporte.',
    ],
    subagentsTableCols: ['', 'IA locale (8B)', 'Sous-agent Haiku/Sonnet'],
    subagentsTableRows: [
      ['Coût quota', 'Nul (hors relecture)', 'Réduit mais réel'],
      ['Qualité', 'Faible', 'Bonne à très bonne'],
      ['Accès fichiers/outils', 'Non', 'Oui'],
      ['Isolation du contexte', 'Seulement si sortie en fichier', 'Native'],
    ],

    goalTitle: "L'objectif : l'autonomie « fondateur »",
    goalQuote: "« Considère-moi comme le fondateur d'une boîte. Je délègue tout et je ne vois que le résultat. » Peu importe le temps que ça prend ; intervenir le moins possible ; sans surcoût sur l'abonnement Pro.",
    blockersLabel: 'Ce qui bloquait :',
    blockers: [
      "La règle Git « jamais de commit sans validation » → blocage à chaque commit.",
      'Les demandes de permission — personne pour répondre la nuit.',
      'Le Mac qui se met en veille.',
      'Les décisions métier : sans spec, Claude bloque ou invente.',
    ],
    responsesLabel: 'Réponses apportées :',
    responses: [
      'Une spec tranchée au départ — le vrai goulot.',
      'Exception Git : commits libres uniquement sur des branches auto/* ; push, fusion et déploiement restent de mon côté.',
      "Permissions écrites une fois dans le projet (liste d'autorisations + liste d'interdits).",
      "Reprise après la limite de quota : l'état du travail est écrit sur le disque (plan coché, fichier de progression, un commit par étape) et une tâche programmée relance le travail toutes les 2 heures.",
    ],
    resumeLoop: [
      { label: '1 · Travail', sublabel: 'Plan coché, PROGRESS.md et un commit après chaque étape : tout est sur le disque' },
      { label: '2 · Quota épuisé', sublabel: "Limite glissante de 5 heures de l'abonnement Pro" },
      { label: '3 · Arrêt', sublabel: "La session s'arrête et ne peut pas se relancer seule" },
      { label: '4 · Relance 2 h plus tard', sublabel: "La tâche programmée repart de zéro ; si rien à faire, elle se met en pause jusqu'à la prochaine mission" },
      { label: '5 · Lecture de PROGRESS.md', sublabel: 'Avec SPEC.md et PLAN.md seulement : la mémoire entre deux reprises' },
      { label: '6 · Reprise ↺', sublabel: "Là où le plan coché s'est arrêté, puis retour à l'étape 1" },
    ],
    noCostP: "Sans surcoût sur l'abonnement Pro, tant que l'usage supplémentaire payant n'est pas activé : le travail est juste plus lent (plusieurs fenêtres de quota), et partage le quota du travail quotidien → idéal la nuit.",

    cloudTitle: 'Le cloud, expliqué',
    cloudLead: "Même en local, le « cerveau » — le modèle — tourne toujours sur les serveurs d'Anthropic ; seules les « mains » (fichiers, commandes, navigateur) sont sur mon Mac.",
    cloudChart: {
      brain: { label: 'CERVEAU · LE MODÈLE', sublabel: "Tourne toujours sur les serveurs d'Anthropic, même en local" },
      local: { label: 'MAINS · MODE LOCAL', sublabel: "Sur le Mac : fichiers, commandes, navigateur. Choix du test : l'app Claude doit rester ouverte." },
      cloud: { label: 'MAINS · MODE CLOUD', sublabel: 'Ordinateur virtuel temporaire : récupère le projet sur GitHub, travaille, renvoie une branche, puis est détruit. Le Mac peut être éteint.' },
    },
    cloudImplicationsLabel: 'Implications du mode cloud :',
    cloudImplications: [
      'GitHub obligatoire.',
      'Fichiers locaux non versionnés et secrets absents.',
      'Internet généralement restreint.',
    ],
    cloudChoiceP: "Pour le test, j'ai choisi le Mac — plus simple, et je pouvais vérifier dans le navigateur. Contrainte : l'app Claude doit rester ouverte pour que les tâches programmées tournent.",

    modelsTitle: "L'organigramme des modèles",
    modelChart: {
      top: { label: 'OPUS · ARCHITECTE', sublabel: 'Cadrage, spec, plan : une fois, avec moi' },
      mid: { label: 'SONNET · CHEF DE PROJET', sublabel: 'Toutes les exécutions programmées ; choisit les sous-agents' },
      haiku1: { label: 'HAIKU', sublabel: 'explorateur : recherche' },
      haiku2: { label: 'HAIKU', sublabel: 'verificateur : contrôles dans le navigateur' },
      expert: { label: 'OPUS', sublabel: 'expert : étape délicate ou 2 échecs' },
      veilleur: { label: 'HAIKU', sublabel: 'veilleur : veille web pour le Magazine' },
      relecteur: { label: 'SONNET', sublabel: 'relecteur : vérification factuelle du Magazine' },
    },
    modelsTableCols: ['Rôle', 'Modèle', 'Quand'],
    modelsTableRows: [
      ['Architecte : cadrage, spec, plan', 'Opus', 'Une fois, au lancement, en session avec moi'],
      ['Chef de projet / développeur', 'Sonnet', 'Toutes les exécutions programmées'],
      ['Exécutants : explorateur, verificateur', 'Haiku', 'Recherche dans le code ; contrôles dans le navigateur'],
      ['sous-agent Haiku', 'Haiku', 'Étapes mécaniques bien décrites, marquées dans le plan'],
      ['expert', 'Opus', 'Étape délicate marquée dans le plan, ou après 2 échecs'],
      ['veilleur', 'Haiku', 'Veille hebdomadaire pour le Magazine'],
      ['relecteur', 'Sonnet', 'Vérification factuelle avant chaque numéro du Magazine'],
    ],
    whoChoosesP: "Qui choisit : le modèle de la session d'exécution est fixé une fois (réglage de la tâche programmée) ; le chef de projet Sonnet choisit ensuite les sous-agents. Amélioration ajoutée après le premier test : au cadrage, chaque étape du plan porte son modèle, Sonnet suit l'indication et peut appeler l'expert en plus, jamais en moins.",

    incidentTitle: 'Un incident de sécurité',
    incidentItems: [
      { label: 'Découverte', text: 'En inspectant le dépôt, Claude a trouvé un token GitHub écrit en clair dans l\'adresse du dépôt distant, dans la configuration Git locale de mon Mac.' },
      { label: 'Vérification', text: "Il n'était ni sur GitHub ni dans l'historique (89 commits et tous les fichiers du projet contrôlés). Risque résiduel identifié : les journaux de sessions Claude publiés sur le site auraient pu l'exposer." },
      { label: 'Actions', text: "J'ai révoqué le token ; Claude a nettoyé l'adresse du dépôt ; connexion refaite avec GitHub CLI, identifiants stockés dans le trousseau macOS, plus aucun secret en clair." },
      { label: 'Leçon', text: 'Une session autonome ne doit jamais manipuler de secret en clair.' },
    ],

    setupTitle: 'La mise en place',
    setupP: 'Mission test : « corriger les tokens qui sont en erreur » — les 34 tokens sémantiques qui portaient une valeur brute au lieu de pointer vers une primitive.',
    setupTreeLabel: 'Créé dans le projet :',
    setupIncidentsLabel: 'Incidents de mise en place (instructifs) :',
    setupIncidents: [
      'npm run lint restait bloqué indéfiniment sur deux jeux minifiés de 315 Ko dans public/games → dossier exclu du lint. Sans ça, toute session autonome se serait figée. Lint : 6 erreurs préexistantes, hors mission.',
      "Garde-fous de Claude Code : la création du fichier de permissions et de la tâche programmée, lancées de sa propre initiative, ont été bloquées (« auto-modification ») → j'ai créé le fichier moi-même ; la tâche a été créée après ma demande explicite.",
      "Tâche programmée « missions autonomes » : toutes les 2 h à la 15e minute ; chaque exécution repart de zéro et lit les fichiers de la mission.",
      "Premier passage : les demandes d'autorisation n'offraient que « Autoriser une fois » / « Refuser »."
    ],

    runTitle: "L'exécution autonome",
    runMetrics: [
      { label: 'Durée', text: 'Lancée le 26/09/2026 à 23 h 09, terminée à 23 h 22 : 13 minutes, 50 tours, 7 commits (un par étape 2 à 8).' },
      { label: 'Résultat', text: '34 primitives ajoutées (tailles, polices, texte, couleurs avec transparence, ombre) ; les 34 sémantiques deviennent des alias ; le bloc inversé [data-invert] suit la même règle.' },
      { label: 'Non-régression visuelle', text: "Valeurs calculées des 86 tokens d'origine relevées avant/après, sur :root et [data-invert] → 0 différence." },
      { label: 'Page Tokens du Lab', text: '120 tokens, 0 erreur, FR et EN.' },
      { label: 'Décisions', text: '10 décisions prises seule, toutes justifiées dans DECISIONS.md.' },
      { label: 'Sous-agents', text: '0 sous-agent lancé — chaque étape était plus courte à faire directement.' },
      { label: 'Modèle réellement utilisé', text: "Tout a tourné sur Opus, pas sur Sonnet : le modèle de la tâche programmée n'avait pas été réglé. Point le plus coûteux du test." },
      { label: 'Limite rencontrée', text: 'Le serveur de développement ne pouvait pas démarrer (autorisation demandée, personne pour répondre). Contournement jugé acceptable : relevé des valeurs via Chrome headless, vérification par rendu serveur React.' },
    ],

    wrapupTitle: 'La clôture',
    wrapupItems: [
      "J'ai fait la vérification manquante dans un vrai navigateur : 0 erreur FR/EN, console vide sur la page et sur l'accueil.",
      'Contrôle avant publication : aucun secret ni donnée personnelle dans les changements (dépôt public).',
      "J'ai poussé la branche moi-même (le push est interdit à Claude par les permissions — le garde-fou fonctionne, même quand je le demande).",
      "Prévisualisation Vercel automatique de la branche, que j'ai vérifiée.",
      'Pull request ouverte par Claude, fusionnée par moi (clic « Merge »), puis git pull.',
      'Explication clé pour moi : le code sur GitHub ≠ le site en ligne. Le site est construit à partir de main ; une branche est un brouillon à côté de la version publiée.',
    ],
    gitFlow: [
      { label: 'main', sublabel: 'La version publiée : le site en ligne est construit à partir d\'elle' },
      { label: 'auto/<nom>', sublabel: 'Un brouillon, à côté de la version publiée' },
      { label: 'Commits (Claude)', sublabel: 'Un par étape, libres sur auto/* uniquement' },
      { label: 'Push (Claude)', sublabel: "La branche de mission part sur GitHub à la clôture ; pousser main reste réservé à moi, sur ma demande" },
      { label: 'Prévisualisation Vercel', sublabel: 'Construite automatiquement pour la branche, que je vérifie' },
      { label: 'Pull request (Claude)', sublabel: 'Propose de faire entrer le brouillon dans main' },
      { label: 'Fusion (moi)', sublabel: 'Clic « Merge », puis git pull' },
      { label: 'Site en ligne', sublabel: 'Construit à partir de main : le brouillon devient la version publiée' },
    ],

    improvementsTitle: 'Améliorations après le test',
    improvements: [
      'Navigateur intégré autorisé dans les permissions (pour les vérifications de nuit).',
      'Modèle par étape dans le plan.',
      'Procédures « Lancer une mission » et « Clôturer une mission » écrites dans le CLAUDE.md du projet ; mémoire de Claude mise à jour → une nouvelle session sait refaire tout le circuit.',
      'Skill global /mission, valable pour tous les projets.',
    ],
    globalTreeLabel: 'Structure du skill global :',

    thirdMissionTitle: 'La 3ᵉ mission, et la fin des interruptions',
    thirdMissionP1:
      "Troisième mission, circuits-colonnes : afficher les longs schémas verticaux de cette page sur plusieurs colonnes, sur ordinateur. Au cadrage, Opus a recompté et trouvé trois schémas concernés, pas deux — les trois sont passés en grille. Nouveau mode « serpentin » (1 → 2 → 3, puis 6 ← 5 ← 4…) sur 3 colonnes, inchangé sur mobile : les hauteurs sont divisées par 2,75 à 3,5 (916 → 258 px pour le plus long). Exécutée en 15 minutes, sur Haiku et Sonnet — pas d'Opus, l'architecture était déjà tranchée.",
    autonomyBlockersLabel: "Ce qui interrompait encore l'exécution :",
    autonomyBlockers: [
      'Le mode de permission par défaut de la routine.',
      "La création de fichiers de code, pas autorisée.",
      "Les commandes composées (&&, boucles), pas reconnues par les autorisations.",
    ],
    autonomyFixesLabel: 'Corrections :',
    autonomyFixes: [
      'Routine passée en mode Auto.',
      'Autorisations complétées.',
      'Une commande simple par appel.',
      'Arrêter les serveurs lancés avant de terminer.',
      "Seule la session principale commite, avec la signature de chaque modèle ayant travaillé.",
    ],
    autonomyResultP: "Résultat : la 3ᵉ mission n'a signalé aucune demande d'autorisation.",

    magazineTitle: 'Le Magazine',
    magazineIntro:
      "Idée : un magazine de veille IA sur le site, alimenté par une routine. Mes décisions : un numéro par semaine, le lundi matin ; publication par pull request, que je relis et fusionne ; angle designers et développeurs ; bilingue FR/EN.",
    magazineMissionP:
      "Quatrième mission : la rubrique /magazine (liste des numéros) et /magazine/<date> (édito, articles, « Pourquoi ça compte », sources). Un numéro = un fichier JSON, validé au chargement — un fichier invalide n'est pas affiché, sans casser la page. Un numéro 0 « Présentation », sans actualité inventée. Modèles : Opus pour la direction visuelle, Sonnet, Haiku.",
    magazineRoutineLabel: 'La routine du lundi, 7 h 30 :',
    magazineRoutineSteps: [
      'veilleur (Haiku) collecte les annonces de la semaine sur des sources officielles.',
      'Sonnet sélectionne 3 à 5 sujets, vérifie chaque source, rédige en FR puis EN.',
      'relecteur (Sonnet) vérifie chaque affirmation contre ses sources.',
      "La routine pousse sa branche et ouvre la pull request — seule exception au « jamais de push » des routines.",
    ],
    magazineTestP:
      "Le test (7 minutes) a produit le numéro 1. En rouvrant les sources une par une, j'ai trouvé trois inexactitudes typiques d'un résumé IA — des chiffres vrais mais mal reliés (une baisse de coût total présentée comme une baisse de prix unitaire, des crédits d'essai attribués au mauvais produit, des benchmarks publics présentés comme des évaluations internes). Corrigées avant publication, et création du relecteur : désormais obligatoire à chaque numéro.",

    queueTitle: "La file d'attente",
    queueP1:
      "Question : peut-on cadrer plusieurs missions d'avance ? Problème : les fichiers d'une mission n'existent que sur sa branche ; la routine ne regardait que la branche ouverte, une deuxième mission aurait été invisible.",
    queueP2:
      "Solution : la routine cherche les missions dans les branches auto/*, prend la plus ancienne sans rapport, puis enchaîne sur la suivante s'il reste du quota. Chaque mission part de main et donne sa propre pull request.",
    queueP3:
      "Premier usage : les missions 5 (workflow-grille) et 6 (home-magazine) exécutées à la suite, en une seule fois, en environ 30 minutes.",

    phoneTitle: 'Piloter depuis le téléphone',
    phoneP1:
      "Je connaissais déjà Remote Control. J'ai regardé le cloud (le « cerveau » et les « mains » dans un ordinateur d'Anthropic, Mac éteint possible), puis écarté pour l'instant : il aurait fallu recopier le skill dans le dépôt, remplacer les tâches programmées par des routines cloud, et le navigateur de vérification y est limité.",
    phoneP2:
      "La session interactive devient une tour de contrôle : Remote Control activé, je lui écris depuis l'app sur mon téléphone (« lance la routine des missions »), elle démarre la routine, est prévenue à la fin, vérifie et fait la clôture.",
    phoneFlow: [
      { label: '1 · Téléphone', sublabel: 'Moi, depuis l\'app Claude : « lance la routine des missions »' },
      { label: '2 · Tour de contrôle', sublabel: 'La session interactive, avec Remote Control activé' },
      { label: '3 · Routine', sublabel: "Traite la file d'attente de missions, prévient à la fin" },
      { label: '4 · Vérification (Claude)', sublabel: 'Dans le navigateur, aucune donnée sensible' },
      { label: '5 · Pull requests (Claude)', sublabel: 'Push des branches, ouverture des pull requests' },
      { label: '6 · Fusion', sublabel: 'Moi, depuis l\'app GitHub sur mon téléphone' },
    ],
    phoneClosureP:
      "Depuis le 27/09, « clôture les missions » suffit, au Mac comme au téléphone : Claude trouve les missions terminées, lit leurs rapports, vérifie dans le navigateur, contrôle qu'aucune donnée sensible ne part sur le dépôt public, pousse chaque branche, ouvre les pull requests et résume. Si un point bloque, il ne pousse pas et explique. Je fusionne ; Claude remet le Mac à jour.",

    mainPushTitle: 'Le push de main : un compromis',
    mainPushP1:
      "J'ai proposé de retirer l'interdiction de pousser main (« au pire on rollback sur Vercel »). Claude a rappelé que pousser main met le site en production immédiatement, et que les réglages de permissions valent pour toutes les sessions — y compris les routines de nuit, sans personne pour regarder.",
    mainPushP2:
      "Compromis retenu : Claude peut pousser main uniquement dans une session où je suis présent, sur ma demande explicite ; les routines et missions autonomes, jamais. Forcer un push et fusionner restent interdits à tous, dans tous les cas.",
    mainPushP3:
      "Détail notable : avant ce compromis, alors que je venais de dire « vas-y », Claude a refusé de contourner le verrou en écrivant la commande autrement — un garde-fou n'a de valeur que s'il n'est pas contourné.",

    geminiTitle: 'Un deuxième avis : Gemini',
    geminiIntroP:
      "Je réfléchissais à l'idée P-003 : un kit de missions autonomes, réutilisable pour d'autres projets. J'ai demandé à Claude s'il pouvait interroger Gemini, puisqu'il sait naviguer.",
    geminiHowP:
      "Oui, avec « Claude in Chrome » : l'extension qui pilote mon vrai Chrome, où je suis déjà connecté à Gemini. Il ne se connecte jamais à ma place — il ne tape aucun mot de passe. Avant le test, il m'a annoncé quatre limites :",
    geminiLimits: [
      "Uniquement quand je suis là : les tâches programmées n'ont pas de navigateur.",
      "Fragile : il passe par la page, pas par une API ; si la page change, ça casse.",
      "Confidentialité : tout ce qui est envoyé part chez Google. Il n'envoie pas mes notes privées sans mon accord.",
      "Les conditions d'utilisation de Google n'aiment pas l'automatisation : ponctuel, oui ; à grande échelle, non.",
    ],
    geminiTryP:
      "Premier essai : échec, l'extension n'était pas connectée. Claude m'a donné les étapes (installer l'extension, s'y connecter avec le même compte), sans chercher de contournement. Deuxième essai, une fois connecté : réussi.",
    geminiQuestionP:
      "La question était générale, sans aucune donnée privée : comment les développeurs solo organisent-ils aujourd'hui leurs agents de code autonomes — suivi, garde-fous, délégation entre modèles ? Gemini a répondu par cinq pratiques. Je les résume avec mes mots et je les compare à mon système.",
    geminiTableCols: ['Pratique citée par Gemini', 'Dans mon système'],
    geminiTableRows: [
      ["Des copies de travail Git séparées, pour faire tourner plusieurs agents sans qu'ils se gênent", 'Oui : des branches auto/* séparées de main'],
      ['Répartir les modèles : un gros modèle conçoit, des modèles rapides ou locaux exécutent le répétitif', 'Oui : Opus cadre, Sonnet exécute, Haiku fait les tâches simples'],
      ["Un fichier de règles qui sert de contrat à l'agent", 'Oui : CLAUDE.md et les permissions du projet'],
      ['Des agents dans le terminal qui commitent chaque étape et savent annuler un changement raté', 'Oui : un commit par étape'],
      ['Une validation humaine avant chaque écriture', "À la fin, par pull request : c'est le principe de l'autonomie « fondateur »"],
    ],
    geminiConclusionLabel: "Ce que j'en retiens :",
    geminiConclusion: [
      "Mon système coche déjà quatre pratiques sur cinq. La validation humaine, chez moi, se fait à la fin plutôt qu'à chaque écriture.",
      "Gemini a aussi avancé un chiffre sur la part des dépôts qui utilisent un fichier de règles. Il n'était pas sourcé : je ne l'ai pas vérifié, donc je ne le reprends pas.",
      "Sa réponse semblait adaptée à mon historique Gemini : un avis utile, pas une source neutre.",
      "Pour P-003, c'est un signal encourageant : le système existe déjà, il s'agirait de l'extraire.",
      "Piloter Gemini dans le navigateur coûte des tokens Claude (attendre, lire la page), pour une réponse d'environ une minute, Gemini ayant fait sa propre recherche web. C'est un deuxième avis, pas une économie.",
    ],

    tokensTitle: 'Économiser les tokens',
    tokensIntroP:
      "Ma demande : diminuer au maximum le coût en tokens du système, en restant aussi efficace. Claude a relevé quatre postes, par ordre d'impact.",
    tokensTableCols: ['Poste', 'Avant', 'Après'],
    tokensTableRows: [
      [
        'Tâche programmée',
        'Elle tournait toutes les 2 heures, soit 12 fois par jour, même sans mission à faire : chaque lancement chargeait tout le contexte pour répondre « Aucune mission active ».',
        'Elle se met en pause toute seule quand la file de missions est vide ; la session de cadrage la réactive quand une mission est prête.',
      ],
      [
        'CLAUDE.md',
        "Environ 10 Ko, chargé à chaque session (missions, Magazine, idées, conversations), dont la moitié ne sert que pendant une mission. Les routines le relisaient une deuxième fois, alors qu'il est déjà chargé automatiquement.",
        "3 Ko : les procédures vont dans missions/README.md, lu seulement quand on travaille sur une mission. Les interdits de sécurité restent dans CLAUDE.md. Les routines ne le relisent plus.",
      ],
      [
        "Reprise d'une mission",
        'Relecture de tous les fichiers de la mission, y compris les journaux DECISIONS et DELEGATIONS, qui grossissent à chaque étape.',
        'SPEC, PLAN et PROGRESS seulement ; on ajoute des lignes aux journaux sans les relire.',
      ],
      [
        'Build et lint',
        'Confiés à un sous-agent : il démarre à froid et relit le contexte, pour une seule commande.',
        "Lancés directement par la session principale. Le verificateur (Haiku) ne sert plus qu'au navigateur. Nouveau choix au cadrage : « sous-agent (Haiku) » pour les étapes mécaniques bien décrites.",
      ],
    ],
    tokensBugP:
      "Au passage, un bug corrigé : la tâche des missions aurait pris les branches de la routine des idées (auto/projets-*) pour des missions. Elle les ignore maintenant. Les mêmes règles ont été reportées dans le skill global /mission, pour les futurs projets.",
    tokensRejectedLabel: "Ce qui n'a pas été retenu :",
    tokensRejected: [
      "Gemini dans le navigateur : plus cher qu'il ne fait gagner (voir la section précédente).",
      "L'IA locale (Lily) : déjà écartée, gain marginal.",
    ],
    tokensRemainingP:
      "Il me reste une recommandation à appliquer : couper, pour ce projet, les connecteurs inutiles (messagerie, agenda, stockage, tableaux blancs, design), dont la liste occupe du contexte à chaque session.",
    tokensLightpandaP:
      "Un outil de plus (05/10) : Lightpanda, un navigateur sans affichage pour les agents, testé sur les 4 sources du dernier numéro du Magazine. Résultat : il ne fait pas économiser de tokens ici — l'outil de lecture habituel (WebFetch) renvoie un résumé, alors que Lightpanda renvoie la page entière — mais il lit ce que WebFetch ne peut pas lire : un site refusait WebFetch (erreur 403), Lightpanda a récupéré l'article complet. Décision : WebFetch d'abord, Lightpanda en secours pour le veilleur et le relecteur du Magazine, avec une taille de page plafonnée. Gratuit et open source, il tourne sur le Mac, télémétrie coupée.",
    tokensPublishP:
      "Pour la première fois, une amélioration du système lui-même passe par une pull request, hors mission, que je fusionne. Cette page est mise à jour par la mission 8, utilisation-ia-economie : la première cadrée selon ces nouvelles règles (étapes mécaniques prévues pour Haiku, build et lint sans sous-agent).",

    statsTitle: 'Bilan chiffré',
    statsTableCols: ['Mission', 'Durée', 'Modèles'],
    statsTableRows: [
      ['1. tokens-fix', '13 min', 'Opus seul (modèle de la routine pas encore réglé)'],
      ['2. utilisation-ia', '66 min', 'Haiku, Opus, Sonnet selon le plan'],
      ['3. circuits-colonnes', '15 min', 'Haiku, Sonnet'],
      ['4. magazine', '—', 'Opus, Sonnet, Haiku'],
      ['5. workflow-grille', '~30 min (5 et 6 ensemble)', 'Haiku, Sonnet'],
      ['6. home-magazine', '(même exécution)', 'Opus, Sonnet, Haiku'],
      ['7. utilisation-ia-maj', '—', 'voir DELEGATIONS.md de la mission'],
      ['8. utilisation-ia-economie', '—', 'voir DELEGATIONS.md de la mission'],
      ['9 à 15. idées et audits du design system', '—', 'Sonnet en routine, Haiku délégué, Opus au cadrage'],
      ['16 à 31. petites missions (30/09–01/10)', '—', 'Sonnet en routine, Haiku délégué, Opus au cadrage'],
      ['32 à 41. refonte kiosque (03–04/10)', '—', 'Sonnet en routine, Haiku délégué, Opus au cadrage'],
      ['42. cette mise à jour', '—', 'voir DELEGATIONS.md de la mission'],
    ],
    statsNoteP:
      "Plus quatre routines : le Magazine (lundi 7 h 30), les idées du dimanche (19 h), la Gazette du Lab (chaque jour 5 h 30), et les missions elles-mêmes (toutes les 2 h, en pause si la file est vide). Tendance : de moins en moins d'interventions de moi, et Opus réservé aux étapes qui en ont besoin — cadrage, direction visuelle.",

    finalLoopTitle: 'Le circuit final',
    finalFlow: [
      { label: '1 · Brief', sublabel: 'Moi : « mission : … »' },
      { label: '2 · Cadrage (Opus)', sublabel: 'Spec tranchée + plan, avec un modèle par étape ; réactive la tâche programmée' },
      { label: '3 · Branche auto/<nom>', sublabel: 'Commits libres uniquement sur les branches auto/*' },
      { label: '4 · Tâche programmée (Sonnet)', sublabel: "Gère la file d'attente ; reprend après chaque coupure de quota ; se met en pause quand la file est vide" },
      { label: '5 · Étapes + commits', sublabel: 'Un commit par étape ; délègue à Haiku ou Opus selon le plan' },
      { label: '6 · Rapport', sublabel: 'RAPPORT.md, écrit par la session' },
      { label: '7 · « Clôture les missions »', sublabel: 'Moi, en un mot' },
      { label: '8 · Vérification, push, pull requests', sublabel: 'Claude : navigateur, aucune donnée sensible' },
      { label: '9 · Fusion (moi)', sublabel: 'Clic « Merge », puis git pull' },
    ],
    remainingTitle: 'Ce qui me reste',
    remaining: [
      'Le brief.',
      'Les autorisations du premier passage.',
      'Le modèle de chaque tâche programmée.',
      'Le tri des idées et du carnet, le dimanche.',
      'La fusion (et le push de `main`, sur ma demande explicite).',
      'Les comptes et services externes.',
      'La validation juridique.',
    ],

    metaTitle: 'Mise en abyme',
    metaP: "Cette page a été écrite par la deuxième mission du système, à partir du contenu que j'ai fourni. Elle est désormais entretenue par le système lui-même : cette mise à jour en est la 42ᵉ mission, cadrée puis exécutée sans moi, du brief jusqu'à la pull request. Le dossier missions/ du dépôt en garde la trace, mission par mission (spec, plan, décisions, délégations, rapport).",

    treeProject: TREE_PROJECT_FR,
    treeGlobal: TREE_GLOBAL_FR,
  },
  en: {
    title: 'How I use AI',
    fileNo: 'FILE Nº 008',
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'DOCUMENT ID — ML-ARCHIVE-008',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',

    intro:
      "I used to run a local AI to save my Claude quota. I dropped it, learned what actually moves the needle on quota, and set up a system where Claude frames a mission and then runs it alone, from brief to pull request. This page tells that story — and it was written by that very system. Since then, the system has also been running daily and weekly routines, and carried out the site's full redesign.",

    sequenceTitle: 'The sequence',
    milestones: [
      { date: '01', label: 'Dropping local AI (Lily, Qwen3-8B)' },
      { date: '02', label: 'The real quota levers' },
      { date: '03', label: 'Sub-agents, explained' },
      { date: '04', label: 'Goal: "founder" autonomy' },
      { date: '05', label: 'Security incident: a plaintext token, revoked' },
      { date: '06', label: 'Setting up the test mission (Opus)' },
      { date: '07 · 11:09 → 11:22 PM', label: 'Autonomous run: 13 min, 7 commits' },
      { date: '08', label: 'Wrap-up: push, preview, PR #1, merge' },
      { date: '09', label: 'Global /mission skill for every project' },
      { date: '10', label: 'Mission 3: grid diagrams, end of interruptions' },
      { date: '11', label: 'The Magazine, its test and the fact-checker' },
      { date: '12', label: 'The mission queue' },
      { date: '13', label: 'Piloting from the phone' },
      { date: '14', label: 'The main-push compromise' },
      { date: '15', label: 'Page update (mission 7)' },
      { date: '16', label: 'A second opinion: Gemini' },
      { date: '17', label: 'Cutting token usage' },
      { date: '18', label: 'Page update (mission 8)' },
      { date: '19', label: "Sunday's project ideas" },
      { date: '20', label: 'The Lab Gazette and the notebook' },
      { date: '21', label: 'A week of missions' },
      { date: '22', label: 'The kiosk redesign' },
      { date: '23', label: 'Lightpanda, a fallback browser' },
      { date: '24', label: 'This update (mission 42)' },
    ],

    startTitle: 'Starting point: local AI',
    startP1:
      "I used to run a local AI I called Lily: a Qwen3-8B model, 4-bit quantized, served by LM Studio on my Mac, driven by a small Python script. The idea: offload tasks to it to save my Claude quota — a Pro subscription, with a rolling 5-hour limit.",
    startP2:
      "Claude and I checked whether it actually worked: delegating only saves quota if the local AI reads a lot and returns little. But the script took the prompt as an argument and printed its answer to the terminal — Claude had to copy it all back in, then read it all again. The model also showed its reasoning, and the 'equivalent cost' I was computing measured Lily's tokens instead of the tokens it was supposed to save me.",
    startP3:
      "I decided to drop local AI: an 8B model isn't good enough for code and design, the quota gain was marginal, and it added complexity.",

    leversTitle: 'The real quota levers',
    levers: [
      'Pick the model for the task: Sonnet by default, Opus only for the hard stuff (architecture, a stubborn bug), lower reasoning effort for simple things.',
      "Keep context short: on every message, Claude re-reads the whole conversation. One task = one session, /clear between topics, /compact on long sessions.",
      'Avoid expensive operations: screenshots (read the page text instead), exploring large files with no target.',
      'Sub-agents for broad exploration.',
      'Local AI — dropped.',
    ],

    subagentsTitle: 'Sub-agents, explained',
    subagentsDef:
      "A sub-agent is another instance of Claude, launched for one specific task, with its own blank context and its own tools. It only reports back a summary.",
    subagentsAnalogy:
      'The analogy that helped me: a project lead asks an intern to "go see how navigation is handled"; the intern opens 30 files, the lead only reads the summary.',
    subagentsProsLabel: 'What it brings:',
    subagentsPros: [
      'A lighter main context — the main win.',
      'The choice of a cheaper model (Haiku, Sonnet).',
      'Parallelism.',
    ],
    subagentsConsLabel: 'Limits:',
    subagentsCons: [
      'Its tokens also count against the quota.',
      "It starts cold — it needs the full brief.",
      'What it reports back needs checking.',
    ],
    subagentsTableCols: ['', 'Local AI (8B)', 'Haiku/Sonnet sub-agent'],
    subagentsTableRows: [
      ['Quota cost', 'None (aside from reading it back)', 'Reduced but real'],
      ['Quality', 'Low', 'Good to very good'],
      ['File/tool access', 'No', 'Yes'],
      ['Context isolation', 'Only if output goes to a file', 'Native'],
    ],

    goalTitle: 'The goal: "founder" autonomy',
    goalQuote: '"Think of me as the founder of a company. I delegate everything and only see the result." However long it takes; step in as little as possible; no extra cost on the Pro subscription.',
    blockersLabel: 'What was blocking it:',
    blockers: [
      'The Git rule "never commit without sign-off" → blocked at every commit.',
      'Permission prompts — no one to answer at night.',
      'The Mac going to sleep.',
      "Business decisions: without a spec, Claude gets stuck or makes things up.",
    ],
    responsesLabel: 'How I answered them:',
    responses: [
      'A settled spec up front — the real bottleneck.',
      'A Git exception: free commits only on auto/* branches; push, merge and deployment stay with me.',
      'Permissions written once into the project (an allow list and a deny list).',
      'Resuming after the quota limit: the state of the work is written to disk (checked-off plan, a progress file, a commit per step), and a scheduled task relaunches the work every 2 hours.',
    ],
    resumeLoop: [
      { label: '1 · Work', sublabel: 'Checked-off plan, PROGRESS.md and a commit after every step: it all lives on disk' },
      { label: '2 · Quota used up', sublabel: "The Pro plan's rolling 5-hour limit" },
      { label: '3 · Stop', sublabel: "The session stops and can't restart on its own" },
      { label: '4 · Relaunch 2 h later', sublabel: 'The scheduled task starts fresh; with nothing to do, it pauses itself until the next mission' },
      { label: '5 · Reading PROGRESS.md', sublabel: 'Along with SPEC.md and PLAN.md only: the memory between two runs' },
      { label: '6 · Resume ↺', sublabel: 'Where the checked-off plan left off, then back to step 1' },
    ],
    noCostP: "No extra cost on the Pro subscription, as long as paid extra usage isn't switched on: the work just runs slower (spread over several quota windows), sharing quota with everyday work → ideal overnight.",

    cloudTitle: 'The cloud, explained',
    cloudLead: "Even locally, the \"brain\" — the model — always runs on Anthropic's servers; only the \"hands\" (files, commands, browser) are on my Mac.",
    cloudChart: {
      brain: { label: 'BRAIN · THE MODEL', sublabel: "Always runs on Anthropic's servers, even locally" },
      local: { label: 'HANDS · LOCAL MODE', sublabel: 'On the Mac: files, commands, browser. Picked for the test: the Claude app must stay open.' },
      cloud: { label: 'HANDS · CLOUD MODE', sublabel: 'Temporary virtual machine: pulls the project from GitHub, works, sends back a branch, then is destroyed. The Mac can be off.' },
    },
    cloudImplicationsLabel: 'Implications of cloud mode:',
    cloudImplications: [
      'GitHub is required.',
      'No local unversioned files, no secrets.',
      'Internet access is generally restricted.',
    ],
    cloudChoiceP: 'For the test, I picked the Mac — simpler, and I could check things in the browser. Constraint: the Claude app has to stay open for the scheduled tasks to run.',

    modelsTitle: 'The model org chart',
    modelChart: {
      top: { label: 'OPUS · ARCHITECT', sublabel: 'Framing, spec, plan: once, with me' },
      mid: { label: 'SONNET · PROJECT LEAD', sublabel: 'Every scheduled run; picks the sub-agents' },
      haiku1: { label: 'HAIKU', sublabel: 'explorateur: code search' },
      haiku2: { label: 'HAIKU', sublabel: 'verificateur: browser checks' },
      expert: { label: 'OPUS', sublabel: 'expert: tricky step or 2 failures' },
      veilleur: { label: 'HAIKU', sublabel: 'veilleur: web research for the Magazine' },
      relecteur: { label: 'SONNET', sublabel: 'relecteur: fact-checks the Magazine' },
    },
    modelsTableCols: ['Role', 'Model', 'When'],
    modelsTableRows: [
      ['Architect: framing, spec, plan', 'Opus', 'Once, at launch, in a session with me'],
      ['Project lead / developer', 'Sonnet', 'Every scheduled run'],
      ['Workers: explorateur, verificateur', 'Haiku', 'Code search; browser checks'],
      ['Haiku sub-agent', 'Haiku', 'Mechanical, well-described steps, flagged in the plan'],
      ['expert', 'Opus', 'A tricky step flagged in the plan, or after 2 failures'],
      ['veilleur', 'Haiku', 'Weekly research for the Magazine'],
      ['relecteur', 'Sonnet', 'Fact-check before every Magazine issue'],
    ],
    whoChoosesP: "Who decides: the execution session's model is set once (the scheduled task's setting); the Sonnet project lead then picks the sub-agents. Improvement added after the first test: at framing time, every plan step now carries its own model, Sonnet follows it and can call in the expert on top, never instead.",

    incidentTitle: 'A security incident',
    incidentItems: [
      { label: 'Discovery', text: "While inspecting the repo, Claude found a GitHub token written in plaintext in the remote repo's address, in my Mac's local Git config." },
      { label: 'Verification', text: "It was neither on GitHub nor in the history (89 commits and every project file checked). Residual risk identified: Claude session logs published on the site could have exposed it." },
      { label: 'Actions', text: 'I revoked the token; Claude cleaned up the repo address; I logged back in with the GitHub CLI, credentials stored in the macOS keychain, no more plaintext secrets.' },
      { label: 'Lesson', text: 'An autonomous session should never handle a plaintext secret.' },
    ],

    setupTitle: 'The setup',
    setupP: 'Test mission: "fix the tokens that are in error" — the 34 semantic tokens that carried a raw value instead of pointing to a primitive.',
    setupTreeLabel: 'Created in the project:',
    setupIncidentsLabel: 'Setup incidents (instructive ones):',
    setupIncidents: [
      'npm run lint kept hanging forever on two 315 KB minified games under public/games → the folder was excluded from lint. Without that, any autonomous session would have frozen. Lint: 6 pre-existing errors, out of scope.',
      'Claude Code guardrails: creating the permissions file and the scheduled task, launched on its own initiative, were blocked ("self-modification") → I created the file myself; the task was created after I explicitly asked for it.',
      'The "autonomous missions" scheduled task: every 2 hours at the 15th minute; each run starts fresh and reads the mission files.',
      'First pass: permission prompts only offered "Allow once" / "Deny".',
    ],

    runTitle: 'The autonomous run',
    runMetrics: [
      { label: 'Duration', text: 'Launched on 09/26/2026 at 11:09 PM, finished at 11:22 PM: 13 minutes, 50 turns, 7 commits (one per step 2 through 8).' },
      { label: 'Result', text: '34 primitives added (sizes, fonts, text, colors with transparency, shadow); all 34 semantic tokens become aliases; the inverted [data-invert] block follows the same rule.' },
      { label: 'Visual regression', text: "Computed values of the 86 original tokens recorded before/after, on :root and [data-invert] → 0 differences." },
      { label: 'Lab Tokens page', text: '120 tokens, 0 errors, FR and EN.' },
      { label: 'Decisions', text: '10 decisions made on its own, all justified in DECISIONS.md.' },
      { label: 'Sub-agents', text: '0 sub-agents launched — every step was faster to do directly.' },
      { label: 'Model actually used', text: 'Everything ran on Opus, not Sonnet: the scheduled task\'s model had not been set. The most expensive point of the test.' },
      { label: 'Limit hit', text: "The dev server couldn't start (permission requested, no one to answer). Workaround judged acceptable: values captured via headless Chrome, page checked via React server rendering." },
    ],

    wrapupTitle: 'Wrap-up',
    wrapupItems: [
      'I did the missing check myself, in a real browser: 0 errors in FR/EN, empty console on the page and on the home page.',
      'Check before publishing: no secret and no personal data in the changes (the repo is public).',
      'I pushed the branch myself (push is blocked for Claude by the permissions — the guardrail works, even when I ask for it).',
      'An automatic Vercel preview of the branch, which I checked.',
      'A pull request opened by Claude, merged by me (clicking "Merge"), then git pull.',
      'The key lesson for me: code on GitHub ≠ the live site. The site is built from main; a branch is a draft sitting next to the published version.',
    ],
    gitFlow: [
      { label: 'main', sublabel: 'The published version: the live site is built from it' },
      { label: 'auto/<name>', sublabel: 'A draft, sitting next to the published version' },
      { label: 'Commits (Claude)', sublabel: 'One per step, allowed on auto/* only' },
      { label: 'Push (Claude)', sublabel: 'The mission branch goes up to GitHub at wrap-up; pushing main stays reserved for me, on request' },
      { label: 'Vercel preview', sublabel: 'Built automatically for the branch, which I check' },
      { label: 'Pull request (Claude)', sublabel: 'Proposes bringing the draft into main' },
      { label: 'Merge (me)', sublabel: 'Click "Merge", then git pull' },
      { label: 'Live site', sublabel: 'Built from main: the draft becomes the published version' },
    ],

    improvementsTitle: 'Post-test improvements',
    improvements: [
      'The built-in browser allowed in the permissions (for overnight checks).',
      'One model per plan step.',
      '"Launch a mission" and "Wrap up a mission" procedures written into the project\'s CLAUDE.md; Claude\'s memory updated → a new session knows how to run the whole loop again.',
      'A global /mission skill, usable in every project.',
    ],
    globalTreeLabel: 'Structure of the global skill:',

    thirdMissionTitle: 'Mission 3, and the end of interruptions',
    thirdMissionP1:
      "Third mission, circuits-colonnes: show the page's long vertical diagrams across several columns on desktop. At framing time, Opus recounted and found three diagrams affected, not two — all three moved to a grid. New \"snake\" mode (1 → 2 → 3, then 6 ← 5 ← 4…) across 3 columns, unchanged on mobile: heights divided by 2.75 to 3.5 (916 → 258 px for the longest one). Done in 15 minutes, on Haiku and Sonnet — no Opus, the architecture was already settled.",
    autonomyBlockersLabel: 'What was still interrupting the run:',
    autonomyBlockers: [
      "The routine's default permission mode.",
      'Creating code files, not allowed.',
      'Compound commands (&&, loops), not recognized by the permission rules.',
    ],
    autonomyFixesLabel: 'Fixes:',
    autonomyFixes: [
      'Routine switched to Auto mode.',
      'Permissions filled out.',
      'One simple command per call.',
      'Stop any servers started before finishing.',
      'Only the main session commits, signed with every model that worked on it.',
    ],
    autonomyResultP: 'Result: mission 3 reported zero permission prompts.',

    magazineTitle: 'The Magazine',
    magazineIntro:
      "The idea: an AI-watch magazine on the site, fed by a routine. My calls: one issue a week, Monday morning; published by pull request, which I review and merge; angled at designers and developers; bilingual FR/EN.",
    magazineMissionP:
      'Fourth mission: the /magazine route (list of issues) and /magazine/<date> (editorial, articles, "Why it matters", sources). One issue = one JSON file, validated on load — an invalid file just doesn\'t render, without breaking the page. Issue 0, "Introduction", with no invented news. Models: Opus for visual direction, Sonnet, Haiku.',
    magazineRoutineLabel: 'The Monday routine, 7:30 AM:',
    magazineRoutineSteps: [
      "veilleur (Haiku) collects the week's announcements from official sources.",
      'Sonnet picks 3 to 5 topics, checks each source, writes it up in FR then EN.',
      "relecteur (Sonnet) checks every claim against its sources.",
      'The routine pushes its branch and opens the pull request — the sole exception to routines never pushing.',
    ],
    magazineTestP:
      "The test (7 minutes) produced issue 1. Reopening the sources one by one, I found three inaccuracies typical of an AI summary — true numbers wired to the wrong claim (a total-cost drop presented as a unit-price cut, trial credits attributed to the wrong product, public benchmarks presented as internal evaluations). Fixed before publishing, and it's why relecteur exists: mandatory for every issue since.",

    queueTitle: 'The mission queue',
    queueP1:
      "Question: can several missions be framed ahead of time? Problem: a mission's files only exist on its own branch; the routine only looked at the branch it was on, so a second mission would have been invisible.",
    queueP2:
      'Fix: the routine searches the auto/* branches, picks the oldest one without a report, then chains to the next if quota remains. Every mission branches off main and gets its own pull request.',
    queueP3:
      'First use: missions 5 (workflow-grille) and 6 (home-magazine) ran back-to-back, in a single run, in about 30 minutes.',

    phoneTitle: 'Piloting from the phone',
    phoneP1:
      'I already knew about Remote Control. I looked at the cloud (the "brain" and the "hands" both inside an Anthropic machine, Mac allowed to be off), then set it aside for now: it would have meant copying the skill into the repo, replacing scheduled tasks with cloud routines, and the verification browser is limited there.',
    phoneP2:
      'The interactive session becomes a control tower: Remote Control turned on, I message it from the Claude app on my phone ("run the missions routine"), it starts the routine, gets notified when it\'s done, checks it, and wraps up.',
    phoneFlow: [
      { label: '1 · Phone', sublabel: 'Me, from the Claude app: "run the missions routine"' },
      { label: '2 · Control tower', sublabel: 'The interactive session, with Remote Control on' },
      { label: '3 · Routine', sublabel: 'Works through the mission queue, notifies when done' },
      { label: '4 · Check (Claude)', sublabel: 'In the browser, no sensitive data' },
      { label: '5 · Pull requests (Claude)', sublabel: 'Branches pushed, pull requests opened' },
      { label: '6 · Merge', sublabel: 'Me, from the GitHub app on my phone' },
    ],
    phoneClosureP:
      'Since 09/27, "close the missions" is enough, from the Mac or the phone: Claude finds the finished missions, reads their reports, checks in the browser, makes sure no sensitive data is leaving the public repo, pushes each branch, opens the pull requests, and summarizes. If something blocks, it doesn\'t push and explains why. I merge; Claude brings the Mac back up to date.',

    mainPushTitle: 'Pushing main: a compromise',
    mainPushP1:
      'I suggested dropping the ban on pushing main ("worst case, we roll back on Vercel"). Claude pointed out that pushing main puts the site into production immediately, and that permission settings apply to every session — including overnight routines with no one watching.',
    mainPushP2:
      "Compromise reached: Claude may push main only in a session where I'm present, on my explicit request; routines and autonomous missions, never. Force-pushing and merging stay off-limits to Claude in every case.",
    mainPushP3:
      'A notable detail: before this compromise, right after I said "go ahead," Claude refused to work around the lock by phrasing the command differently — a guardrail is only worth anything if it can\'t be talked around.',

    geminiTitle: 'A second opinion: Gemini',
    geminiIntroP:
      "I was thinking about idea P-003: a kit of autonomous missions, reusable for other projects. I asked Claude whether it could question Gemini, since it can browse.",
    geminiHowP:
      'Yes, with "Claude in Chrome": the extension that drives my real Chrome, where I\'m already signed in to Gemini. It never signs in for me — it types no password. Before the test, it told me about four limits:',
    geminiLimits: [
      "Only when I'm around: scheduled tasks have no browser.",
      "Fragile: it goes through the page, not an API; if the page changes, it breaks.",
      "Privacy: everything it sends goes to Google. It won't send my private notes without my say-so.",
      "Google's terms of use don't like automation: occasional use, fine; at scale, no.",
    ],
    geminiTryP:
      "First try: failed, the extension wasn't connected. Claude gave me the steps (install the extension, sign in with the same account), without looking for a workaround. Second try, once connected: it worked.",
    geminiQuestionP:
      "The question was general, with no private data: how do solo developers organize their autonomous coding agents today — tracking, guardrails, handing work between models? Gemini answered with five practices. I summarize them in my own words and compare them with my system.",
    geminiTableCols: ['Practice cited by Gemini', 'In my system'],
    geminiTableRows: [
      ['Separate Git working copies, so several agents can run without getting in each other\'s way', 'Yes: auto/* branches kept apart from main'],
      ['Split the models: a big model designs, fast or local models run the repetitive work', 'Yes: Opus frames, Sonnet executes, Haiku does the simple tasks'],
      ['A rules file that acts as a contract for the agent', "Yes: CLAUDE.md and the project's permissions"],
      ['Agents in the terminal that commit every step and can undo a failed change', 'Yes: one commit per step'],
      ['Human sign-off before every write', 'At the end, through a pull request: that is the point of "founder" autonomy'],
    ],
    geminiConclusionLabel: 'What I take from it:',
    geminiConclusion: [
      'My system already ticks four practices out of five. Human sign-off, in my setup, happens at the end rather than at every write.',
      "Gemini also put forward a figure for the share of repos that use a rules file. It had no source: I haven't verified it, so I'm not repeating it.",
      'Its answer seemed tailored to my Gemini history: a useful opinion, not a neutral source.',
      'For P-003, it is an encouraging signal: the system already exists, the job would be to extract it.',
      "Driving Gemini in the browser costs Claude tokens (waiting, reading the page), for an answer that took about a minute, since Gemini ran its own web search. It's a second opinion, not a saving.",
    ],

    tokensTitle: 'Cutting token usage',
    tokensIntroP:
      'My request: cut the system\'s token cost as far as possible, while staying just as effective. Claude picked out four items, in order of impact.',
    tokensTableCols: ['Item', 'Before', 'After'],
    tokensTableRows: [
      [
        'Scheduled task',
        'It ran every 2 hours, 12 times a day, even with no mission to do: every launch loaded the whole context just to answer "No active mission".',
        'It pauses itself when the mission queue is empty; the framing session turns it back on when a mission is ready.',
      ],
      [
        'CLAUDE.md',
        'About 10 KB, loaded in every session (missions, Magazine, ideas, conversations), half of it only useful during a mission. Routines re-read it a second time, although it is already loaded automatically.',
        '3 KB: the procedures moved to missions/README.md, read only when working on a mission. The safety prohibitions stay in CLAUDE.md. Routines no longer re-read it.',
      ],
      [
        'Resuming a mission',
        'Re-reading every mission file, including the DECISIONS and DELEGATIONS logs, which grow with each step.',
        'SPEC, PLAN and PROGRESS only; lines are appended to the logs without re-reading them.',
      ],
      [
        'Build and lint',
        'Handed to a sub-agent: it starts cold and re-reads the context, for a single command.',
        'Run directly by the main session. The verificateur (Haiku) is now only used for the browser. New choice at framing time: "Haiku sub-agent" for mechanical, well-described steps.',
      ],
    ],
    tokensBugP:
      'While at it, one bug fixed: the missions task would have mistaken the ideas routine\'s branches (auto/projets-*) for missions. It now ignores them. The same rules were carried over to the global /mission skill, for future projects.',
    tokensRejectedLabel: 'What I did not keep:',
    tokensRejected: [
      'Gemini in the browser: it costs more than it saves (see the previous section).',
      'Local AI (Lily): already ruled out, marginal gain.',
    ],
    tokensRemainingP:
      'One recommendation is still mine to apply: switch off, for this project, the connectors it does not need (mail, calendar, storage, whiteboards, design), whose list takes up context in every session.',
    tokensLightpandaP:
      "One more tool (10/05): Lightpanda, a headless browser for agents, tested on the last Magazine issue's 4 sources. Result: it doesn't save tokens here — the usual reading tool (WebFetch) returns a summary, while Lightpanda returns the whole page — but it reads what WebFetch can't: one site refused WebFetch (a 403 error), and Lightpanda pulled the full article. Decision: WebFetch first, Lightpanda as a fallback for the Magazine's veilleur and relecteur, with a capped page size. Free and open source, it runs on the Mac, with telemetry switched off.",
    tokensPublishP:
      'For the first time, an improvement to the system itself goes through a pull request, outside any mission, which I merge. This page is updated by mission 8, utilisation-ia-economie: the first one framed under these new rules (mechanical steps earmarked for Haiku, build and lint without a sub-agent).',

    statsTitle: 'The numbers so far',
    statsTableCols: ['Mission', 'Duration', 'Models'],
    statsTableRows: [
      ['1. tokens-fix', '13 min', "Opus alone (the routine's model wasn't set yet)"],
      ['2. utilisation-ia', '66 min', 'Haiku, Opus, Sonnet as planned'],
      ['3. circuits-colonnes', '15 min', 'Haiku, Sonnet'],
      ['4. magazine', '—', 'Opus, Sonnet, Haiku'],
      ['5. workflow-grille', '~30 min (5 and 6 together)', 'Haiku, Sonnet'],
      ['6. home-magazine', '(same run)', 'Opus, Sonnet, Haiku'],
      ['7. utilisation-ia-maj', '—', "see the mission's DELEGATIONS.md"],
      ['8. utilisation-ia-economie', '—', "see the mission's DELEGATIONS.md"],
      ['9 to 15. ideas and design-system audits', '—', 'Sonnet on routine, Haiku delegated, Opus at framing'],
      ['16 to 31. small missions (09/30–10/01)', '—', 'Sonnet on routine, Haiku delegated, Opus at framing'],
      ['32 to 41. kiosk redesign (10/03–10/04)', '—', 'Sonnet on routine, Haiku delegated, Opus at framing'],
      ['42. this update', '—', "see the mission's DELEGATIONS.md"],
    ],
    statsNoteP:
      'Plus four routines: the Magazine (Monday 7:30 AM), Sunday\'s project ideas (7 PM), the Lab Gazette (daily at 5:30 AM), and the missions themselves (every 2 hours, pausing when the queue is empty). Trend: fewer and fewer interventions from me, with Opus reserved for the steps that actually need it — framing, visual direction.',

    finalLoopTitle: 'The final loop',
    finalFlow: [
      { label: '1 · Brief', sublabel: 'Me: "mission: …"' },
      { label: '2 · Framing (Opus)', sublabel: 'A settled spec + a plan, with one model per step; turns the scheduled task back on' },
      { label: '3 · auto/<name> branch', sublabel: 'Commits allowed only on auto/* branches' },
      { label: '4 · Scheduled task (Sonnet)', sublabel: 'Works through the queue; picks up again after each quota cut-off; pauses itself when the queue is empty' },
      { label: '5 · Steps + commits', sublabel: 'One commit per step; hands off to Haiku or Opus as planned' },
      { label: '6 · Report', sublabel: 'RAPPORT.md, written by the session' },
      { label: '7 · "Close the missions"', sublabel: 'Me, in one line' },
      { label: '8 · Check, push, pull requests', sublabel: 'Claude: browser check, no sensitive data' },
      { label: '9 · Merge (me)', sublabel: 'Click "Merge", then git pull' },
    ],
    remainingTitle: "What still falls to me",
    remaining: [
      'The brief.',
      'The first-pass permissions.',
      "Each scheduled task's model.",
      'Sorting the ideas and the notebook, on Sundays.',
      'The merge (and pushing main, on my explicit request).',
      'External accounts and services.',
      'Legal sign-off.',
    ],

    metaTitle: 'Turtles all the way down',
    metaP: "This page was written by the system's second mission, from the content I supplied. It's now maintained by the system itself: this update is its 42nd mission, framed then run without me, from brief to pull request. The missions/ folder in the repo keeps the trail, mission by mission (spec, plan, decisions, delegations, report).",

    treeProject: TREE_PROJECT_EN,
    treeGlobal: TREE_GLOBAL_EN,
  },
}

function MetricsList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {items.map((m, i) => (
        <div key={i}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: 'var(--space-2xs)' }}>
            {m.label.toUpperCase()}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function UtilisationIA({ project }) {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const isMobile = useIsMobile()

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c} />

      <div style={{ maxWidth: 720, marginBottom: 40 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--prose)', lineHeight: 1.7, margin: 0 }}>
          {c.intro}
        </p>
      </div>

      <Section title={c.sequenceTitle}>
        <Timeline milestones={c.milestones} />
      </Section>

      <Section title={c.startTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.startP1}</p>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.startP2}</p>
        <p style={{ margin: 0 }}>{c.startP3}</p>
      </Section>

      <Section title={c.leversTitle}>
        <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          {c.levers.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </Section>

      <Section title={c.subagentsTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.subagentsDef}</p>
        <p style={{ marginBottom: 'var(--space-md)' }}>{c.subagentsAnalogy}</p>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.subagentsProsLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.subagentsPros.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.subagentsConsLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.subagentsCons.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <Table columns={c.subagentsTableCols} rows={c.subagentsTableRows} />
      </Section>

      <Section title={c.goalTitle}>
        <div style={{ borderLeft: 'var(--border-thick) solid var(--primary)', paddingLeft: 'var(--space-md)', marginBottom: 'var(--space-md-plus)', fontStyle: 'italic', color: 'var(--prose)' }}>
          {c.goalQuote}
        </div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.blockersLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.blockers.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.responsesLabel}</div>
        <ul style={{ margin: '0 0 var(--space-lg)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.responses.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <FlowDiagram steps={c.resumeLoop} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
        <p style={{ marginTop: 'var(--space-md-plus)', marginBottom: 0 }}>{c.noCostP}</p>
      </Section>

      <Section title={c.cloudTitle}>
        <p style={{ marginBottom: 'var(--space-md-plus)' }}>{c.cloudLead}</p>
        <LocalVsCloud c={c.cloudChart} />
        <div style={{ fontWeight: 600, margin: 'var(--space-md-plus) 0 6px' }}>{c.cloudImplicationsLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.cloudImplications.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p style={{ margin: 0 }}>{c.cloudChoiceP}</p>
      </Section>

      <Section title={c.modelsTitle}>
        <ModelOrgChart c={c.modelChart} />
        <div style={{ marginTop: 'var(--space-md-plus)' }}>
          <Table columns={c.modelsTableCols} rows={c.modelsTableRows} />
        </div>
        <p style={{ margin: 0 }}>{c.whoChoosesP}</p>
      </Section>

      <Section title={c.incidentTitle}>
        <MetricsList items={c.incidentItems} />
      </Section>

      <Section title={c.setupTitle}>
        <p style={{ marginBottom: 'var(--space-md)' }}>{c.setupP}</p>
        <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{c.setupTreeLabel}</div>
        <div style={{ marginBottom: 'var(--space-md-plus)' }}>
          <Pre isMobile={isMobile}>{c.treeProject}</Pre>
        </div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.setupIncidentsLabel}</div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          {c.setupIncidents.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </Section>

      <Section title={c.runTitle}>
        <MetricsList items={c.runMetrics} />
      </Section>

      <Section title={c.wrapupTitle}>
        <ol style={{ margin: '0 0 var(--space-md-plus)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          {c.wrapupItems.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
        <FlowDiagram steps={c.gitFlow} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
      </Section>

      <Section title={c.improvementsTitle}>
        <ul style={{ margin: '0 0 var(--space-md-plus)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          {c.improvements.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{c.globalTreeLabel}</div>
        <Pre isMobile={isMobile}>{c.treeGlobal}</Pre>
      </Section>

      <Section title={c.thirdMissionTitle}>
        <p style={{ marginBottom: 'var(--space-md)' }}>{c.thirdMissionP1}</p>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.autonomyBlockersLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.autonomyBlockers.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.autonomyFixesLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.autonomyFixes.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p style={{ margin: 0 }}>{c.autonomyResultP}</p>
      </Section>

      <Section title={c.magazineTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.magazineIntro}</p>
        <p style={{ marginBottom: 'var(--space-md)' }}>{c.magazineMissionP}</p>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.magazineRoutineLabel}</div>
        <ol style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.magazineRoutineSteps.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
        <p style={{ margin: 0 }}>{c.magazineTestP}</p>
      </Section>

      <Section title={c.queueTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.queueP1}</p>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.queueP2}</p>
        <p style={{ margin: 0 }}>{c.queueP3}</p>
      </Section>

      <Section title={c.phoneTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.phoneP1}</p>
        <p style={{ marginBottom: 'var(--space-md-plus)' }}>{c.phoneP2}</p>
        <FlowDiagram steps={c.phoneFlow} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
        <p style={{ marginTop: 'var(--space-md-plus)', marginBottom: 0 }}>{c.phoneClosureP}</p>
      </Section>

      <Section title={c.mainPushTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.mainPushP1}</p>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.mainPushP2}</p>
        <p style={{ margin: 0 }}>{c.mainPushP3}</p>
      </Section>

      <Section title={c.geminiTitle}>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.geminiIntroP}</p>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.geminiHowP}</p>
        <ol style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.geminiLimits.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.geminiTryP}</p>
        <p style={{ marginBottom: 'var(--space-md-plus)' }}>{c.geminiQuestionP}</p>
        <Table columns={c.geminiTableCols} rows={c.geminiTableRows} />
        <div style={{ fontWeight: 600, margin: 'var(--space-md) 0 6px' }}>{c.geminiConclusionLabel}</div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.geminiConclusion.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </Section>

      <Section title={c.tokensTitle}>
        <p style={{ marginBottom: 'var(--space-md-plus)' }}>{c.tokensIntroP}</p>
        <Table columns={c.tokensTableCols} rows={c.tokensTableRows} />
        <p style={{ margin: 'var(--space-md) 0 var(--space-md)' }}>{c.tokensBugP}</p>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.tokensRejectedLabel}</div>
        <ul style={{ margin: '0 0 var(--space-md)', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.tokensRejected.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.tokensRemainingP}</p>
        <p style={{ marginBottom: 'var(--space-sm)' }}>{c.tokensLightpandaP}</p>
        <p style={{ margin: 0 }}>{c.tokensPublishP}</p>
      </Section>

      <Section title={c.statsTitle}>
        <Table columns={c.statsTableCols} rows={c.statsTableRows} />
        <p style={{ margin: 0 }}>{c.statsNoteP}</p>
      </Section>

      <Section title={c.finalLoopTitle}>
        <FlowDiagram steps={c.finalFlow} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <SectionTitle>{c.remainingTitle}</SectionTitle>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {c.remaining.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </Section>

      <Section title={c.metaTitle}>
        <p style={{ margin: 0 }}>{c.metaP}</p>
      </Section>

      <CaseFooter c={c} />
    </div>
  )
}
