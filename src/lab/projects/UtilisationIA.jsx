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
      <svg viewBox="0 0 480 348" style={{ width: '100%', minWidth: 440, maxWidth: 480, height: 'auto', display: 'block' }}>
        <line x1={240} y1={92} x2={240} y2={120} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={240} y1={212} x2={240} y2={232} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={82} y1={232} x2={398} y2={232} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={82} y1={232} x2={82} y2={252} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={240} y1={232} x2={240} y2={252} stroke="var(--muted)" strokeWidth={1.5} />
        <line x1={398} y1={232} x2={398} y2={252} stroke="var(--muted)" strokeWidth={1.5} />
        <DiagramBox x={120} y={0} w={240} h={92} accent label={c.top.label} sublabel={c.top.sublabel} />
        <DiagramBox x={120} y={120} w={240} h={92} label={c.mid.label} sublabel={c.mid.sublabel} />
        <DiagramBox x={8} y={252} w={148} h={92} label={c.haiku1.label} sublabel={c.haiku1.sublabel} />
        <DiagramBox x={166} y={252} w={148} h={92} label={c.haiku2.label} sublabel={c.haiku2.sublabel} />
        <DiagramBox x={324} y={252} w={148} h={92} dashed label={c.expert.label} sublabel={c.expert.sublabel} />
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
    <div style={{ overflowX: 'auto', marginBottom: 8 }}>
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
                  padding: '0 12px 10px 0',
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
                    padding: '12px 12px 12px 0',
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
        ├── DECISIONS.md           décisions prises seul
        ├── DELEGATIONS.md         journal des sous-agents
        └── RAPPORT.md             écrit à la fin`

const TREE_PROJECT_EN = `misran-labs/
├── CLAUDE.md                      project rules (missions, Git, models, launch, wrap-up)
├── .claude/
│   ├── settings.json              allow list + deny list (push, merge, rebase, npm install, vercel)
│   └── agents/
│       ├── explorateur.md         Haiku — read-only search
│       ├── verificateur.md        Haiku — build, lint, browser
│       └── expert.md              Opus — last resort
└── missions/
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
      "J'utilisais une IA locale pour économiser mon quota Claude. Je l'ai abandonnée, j'ai compris les vrais leviers du quota, et j'ai mis en place un système où Claude cadre une mission puis la mène seul, du brief jusqu'à la pull request. Cette page raconte cette séquence — et elle a été écrite par ce système lui-même.",

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
      { label: '4 · Relance 2 h plus tard', sublabel: "La tâche programmée repart de zéro ; si rien à faire, elle s'arrête en quelques secondes" },
      { label: '5 · Lecture de PROGRESS.md', sublabel: 'Et des autres fichiers de la mission : la mémoire entre deux reprises' },
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
      haiku2: { label: 'HAIKU', sublabel: 'verificateur : build, lint, navigateur' },
      expert: { label: 'OPUS', sublabel: 'expert : étape délicate ou 2 échecs' },
    },
    modelsTableCols: ['Rôle', 'Modèle', 'Quand'],
    modelsTableRows: [
      ['Architecte : cadrage, spec, plan', 'Opus', 'Une fois, au lancement, en session avec moi'],
      ['Chef de projet / développeur', 'Sonnet', 'Toutes les exécutions programmées'],
      ['Exécutants : explorateur, verificateur', 'Haiku', 'Tâches simples ou volumineuses'],
      ['expert', 'Opus', 'Étape délicate marquée dans le plan, ou après 2 échecs'],
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
      { label: 'Push (moi)', sublabel: "La branche part sur GitHub. Le code sur GitHub n'est pas le site en ligne" },
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

    finalLoopTitle: 'Le circuit final',
    finalFlow: [
      { label: '1 · Brief', sublabel: 'Moi : « mission : … »' },
      { label: '2 · Cadrage (Opus)', sublabel: 'Spec tranchée + plan, avec un modèle par étape' },
      { label: '3 · Branche auto/<nom>', sublabel: 'Commits libres uniquement sur les branches auto/*' },
      { label: '4 · Tâche programmée (Sonnet)', sublabel: 'Toutes les 2 heures ; reprend après chaque coupure de quota' },
      { label: '5 · Étapes + commits', sublabel: 'Un commit par étape ; délègue à Haiku ou Opus selon le plan' },
      { label: '6 · Rapport', sublabel: 'RAPPORT.md, écrit par la session' },
      { label: '7 · Vérification', sublabel: 'Avec moi, dans un vrai navigateur ; aucun secret dans les changements' },
      { label: '8 · Push (moi)', sublabel: 'Interdit à Claude par les permissions' },
      { label: '9 · Pull request (Claude)', sublabel: 'Après vérification de la prévisualisation Vercel' },
      { label: '10 · Fusion (moi)', sublabel: 'Clic « Merge », puis git pull' },
    ],
    remainingTitle: 'Ce qui me reste',
    remaining: [
      'Le brief.',
      'Les autorisations du premier passage.',
      'Le modèle de chaque tâche programmée.',
      'Le push et la fusion.',
      'Les comptes et services externes.',
      'La validation juridique.',
    ],

    metaTitle: 'Mise en abyme',
    metaP: "Cette page est la deuxième mission du système : cadrée par Opus à partir du contenu que j'ai fourni, puis rédigée, mise en page et vérifiée par la tâche programmée, sans moi. Le dossier missions/utilisation-ia/ du dépôt en garde la trace (spec, plan, décisions, délégations, rapport).",

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
      'I used to run a local AI to save my Claude quota. I dropped it, learned what actually moves the needle on quota, and set up a system where Claude frames a mission and then runs it alone, from brief to pull request. This page tells that story — and it was written by that very system.',

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
      { label: '4 · Relaunch 2 h later', sublabel: 'The scheduled task starts fresh; with nothing to do, it exits within seconds' },
      { label: '5 · Reading PROGRESS.md', sublabel: 'And the other mission files: the memory between two runs' },
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
      haiku2: { label: 'HAIKU', sublabel: 'verificateur: build, lint, browser' },
      expert: { label: 'OPUS', sublabel: 'expert: tricky step or 2 failures' },
    },
    modelsTableCols: ['Role', 'Model', 'When'],
    modelsTableRows: [
      ['Architect: framing, spec, plan', 'Opus', 'Once, at launch, in a session with me'],
      ['Project lead / developer', 'Sonnet', 'Every scheduled run'],
      ['Workers: explorateur, verificateur', 'Haiku', 'Simple or bulky tasks'],
      ['expert', 'Opus', 'A tricky step flagged in the plan, or after 2 failures'],
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
      { label: 'Push (me)', sublabel: 'The branch goes up to GitHub. Code on GitHub is not the live site' },
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

    finalLoopTitle: 'The final loop',
    finalFlow: [
      { label: '1 · Brief', sublabel: 'Me: "mission: …"' },
      { label: '2 · Framing (Opus)', sublabel: 'A settled spec + a plan, with one model per step' },
      { label: '3 · auto/<name> branch', sublabel: 'Commits allowed only on auto/* branches' },
      { label: '4 · Scheduled task (Sonnet)', sublabel: 'Every 2 hours; picks up again after each quota cut-off' },
      { label: '5 · Steps + commits', sublabel: 'One commit per step; hands off to Haiku or Opus as planned' },
      { label: '6 · Report', sublabel: 'RAPPORT.md, written by the session' },
      { label: '7 · Check', sublabel: 'With me, in a real browser; no secrets in the changes' },
      { label: '8 · Push (me)', sublabel: 'Blocked for Claude by the permissions' },
      { label: '9 · Pull request (Claude)', sublabel: 'Once the Vercel preview has been checked' },
      { label: '10 · Merge (me)', sublabel: 'Click "Merge", then git pull' },
    ],
    remainingTitle: "What still falls to me",
    remaining: [
      'The brief.',
      'The first-pass permissions.',
      "Each scheduled task's model.",
      'The push and the merge.',
      'External accounts and services.',
      'Legal sign-off.',
    ],

    metaTitle: 'Turtles all the way down',
    metaP: 'This page is the system\'s second mission: framed by Opus from the content I supplied, then written, laid out and checked by the scheduled task, without me. The missions/utilisation-ia/ folder in the repo keeps the trail (spec, plan, decisions, delegations, report).',

    treeProject: TREE_PROJECT_EN,
    treeGlobal: TREE_GLOBAL_EN,
  },
}

function MetricsList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((m, i) => (
        <div key={i}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: 4 }}>
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
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
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
        <p style={{ marginBottom: 12 }}>{c.startP1}</p>
        <p style={{ marginBottom: 12 }}>{c.startP2}</p>
        <p style={{ margin: 0 }}>{c.startP3}</p>
      </Section>

      <Section title={c.leversTitle}>
        <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {c.levers.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      </Section>

      <Section title={c.subagentsTitle}>
        <p style={{ marginBottom: 12 }}>{c.subagentsDef}</p>
        <p style={{ marginBottom: 16 }}>{c.subagentsAnalogy}</p>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.subagentsProsLabel}</div>
        <ul style={{ margin: '0 0 16px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.subagentsPros.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.subagentsConsLabel}</div>
        <ul style={{ margin: '0 0 16px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.subagentsCons.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <Table columns={c.subagentsTableCols} rows={c.subagentsTableRows} />
      </Section>

      <Section title={c.goalTitle}>
        <div style={{ borderLeft: 'var(--border-thick) solid var(--primary)', paddingLeft: 16, marginBottom: 20, fontStyle: 'italic', color: 'var(--prose)' }}>
          {c.goalQuote}
        </div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.blockersLabel}</div>
        <ul style={{ margin: '0 0 16px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.blockers.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.responsesLabel}</div>
        <ul style={{ margin: '0 0 24px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.responses.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <FlowDiagram steps={c.resumeLoop} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
        <p style={{ marginTop: 20, marginBottom: 0 }}>{c.noCostP}</p>
      </Section>

      <Section title={c.cloudTitle}>
        <p style={{ marginBottom: 20 }}>{c.cloudLead}</p>
        <LocalVsCloud c={c.cloudChart} />
        <div style={{ fontWeight: 600, margin: '20px 0 6px' }}>{c.cloudImplicationsLabel}</div>
        <ul style={{ margin: '0 0 16px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.cloudImplications.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p style={{ margin: 0 }}>{c.cloudChoiceP}</p>
      </Section>

      <Section title={c.modelsTitle}>
        <ModelOrgChart c={c.modelChart} />
        <div style={{ marginTop: 20 }}>
          <Table columns={c.modelsTableCols} rows={c.modelsTableRows} />
        </div>
        <p style={{ margin: 0 }}>{c.whoChoosesP}</p>
      </Section>

      <Section title={c.incidentTitle}>
        <MetricsList items={c.incidentItems} />
      </Section>

      <Section title={c.setupTitle}>
        <p style={{ marginBottom: 16 }}>{c.setupP}</p>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{c.setupTreeLabel}</div>
        <div style={{ marginBottom: 20 }}>
          <Pre isMobile={isMobile}>{c.treeProject}</Pre>
        </div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.setupIncidentsLabel}</div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {c.setupIncidents.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </Section>

      <Section title={c.runTitle}>
        <MetricsList items={c.runMetrics} />
      </Section>

      <Section title={c.wrapupTitle}>
        <ol style={{ margin: '0 0 20px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {c.wrapupItems.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
        <FlowDiagram steps={c.gitFlow} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
      </Section>

      <Section title={c.improvementsTitle}>
        <ul style={{ margin: '0 0 20px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {c.improvements.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{c.globalTreeLabel}</div>
        <Pre isMobile={isMobile}>{c.treeGlobal}</Pre>
      </Section>

      <Section title={c.finalLoopTitle}>
        <FlowDiagram steps={c.finalFlow} direction={isMobile ? 'vertical' : 'grid'} columns={3} />
        <div style={{ marginTop: 24 }}>
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
