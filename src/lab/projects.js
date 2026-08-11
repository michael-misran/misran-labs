import MisranLabsRedesign from './projects/MisranLabsRedesign'
import ToolProcessTemplate from './ToolProcessTemplate'
import UXAuditEngine from '../experiences/UXAuditEngine'
import ProductBriefMachine from '../experiences/ProductBriefMachine'
import SessionReplay from '../experiences/SessionReplay'
import MicroSaaSGenerator from '../experiences/MicroSaaSGenerator'
import ApiMonitorModule from '../modules/ApiMonitorModule'
import CVModule from '../modules/CVModule'

// Statut honnête par étape : 'done' | 'partial' | 'skipped'.
// Les projets Lab sont des explorations rapides — la plupart des étapes
// business/recherche/validation/QA/lancement n'ont pas été formalisées,
// et ce n'est pas caché.
const QUICK_LAB_PHASES = {
  business: 'skipped',
  research: 'skipped',
  design: 'partial',
  validation: 'skipped',
  feasibility: 'skipped',
  development: 'done',
  qa: 'skipped',
  launch: 'skipped',
  iteration: 'skipped',
}

export const PROJECTS = [
  {
    slug: 'misran-labs-redesign',
    icon: '◆',
    title: 'Transformer un lab technique en portfolio design',
    summary: 'Comment et pourquoi ce site a été restructuré — documenté en direct.',
    status: 'READY',
    type: 'case-study',
    featured: true,
    tags: ['IA', 'Decision-making', 'React'],
    phases: {
      business: 'partial',
      research: 'skipped',
      design: 'done',
      validation: 'skipped',
      feasibility: 'partial',
      development: 'done',
      qa: 'partial',
      launch: 'partial',
      iteration: 'done',
    },
    component: MisranLabsRedesign,
  },
  {
    slug: 'a-completer-1',
    icon: '◇',
    title: '[À COMPLÉTER]',
    summary: 'Prochain projet — contenu à fournir.',
    status: 'PLACEHOLDER',
    type: 'case-study',
    featured: false,
    tags: [],
    phases: {},
    component: null,
  },
  {
    slug: 'exp-001',
    icon: '◈',
    title: 'UX Audit Engine',
    summary: 'Upload screenshot → audit structuré en streaming',
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: ['React', 'FileReader', 'Streaming'],
    phases: QUICK_LAB_PHASES,
    component: ToolProcessTemplate,
    demoComponent: UXAuditEngine,
  },
  {
    slug: 'exp-002',
    icon: '◎',
    title: 'Brief Machine',
    summary: 'Une phrase → brief produit complet en 30 secondes',
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: ['React', 'Simulation'],
    phases: QUICK_LAB_PHASES,
    component: ToolProcessTemplate,
    demoComponent: ProductBriefMachine,
  },
  {
    slug: 'exp-003',
    icon: '▣',
    title: 'Session Replay',
    summary: 'Sessions de build documentées avec logs complets',
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: ['React', 'Accordéon', 'iframe'],
    phases: QUICK_LAB_PHASES,
    component: ToolProcessTemplate,
    demoComponent: SessionReplay,
  },
  {
    slug: 'exp-005',
    icon: '◉',
    title: 'SaaS Generator',
    summary: 'Une phrase → landing page SaaS rendue en iframe',
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: ['iframe', 'Streaming', 'HTML'],
    phases: QUICK_LAB_PHASES,
    component: ToolProcessTemplate,
    demoComponent: MicroSaaSGenerator,
  },
  {
    slug: 'api-monitor',
    icon: '◬',
    title: 'API Cost Monitor',
    summary: 'Monitoring tokens · coûts · alertes budget',
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: ['Simulation', 'Anthropic API', 'Budget'],
    phases: QUICK_LAB_PHASES,
    component: ToolProcessTemplate,
    demoComponent: ApiMonitorModule,
  },
  {
    slug: 'cv',
    icon: '◫',
    title: 'CV',
    summary: 'Parcours et compétences',
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: ['Profil'],
    phases: { ...QUICK_LAB_PHASES, launch: 'done' },
    component: CVModule,
  },
]

export function getProject(slug) {
  return PROJECTS.find(p => p.slug === slug)
}

export function visibleProjects() {
  return PROJECTS.filter(p => p.status !== 'PLACEHOLDER')
    .sort((a, b) => (b.featured === true) - (a.featured === true))
}
