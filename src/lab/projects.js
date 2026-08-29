import MAIA from './projects/MAIA'
import Conforma from './projects/Conforma'
import DesignSystem from './projects/DesignSystem'
import TheLostCauldronGame from './projects/TheLostCauldronGame'
import WorkflowSolo from './projects/WorkflowSolo'
import GameDemo from './GameDemo'
import GameDemoV2 from './GameDemoV2'
import ToolProcessTemplate from './ToolProcessTemplate'
import SessionReplay from '../experiences/SessionReplay'
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
    slug: 'maia',
    icon: '◇',
    title: { fr: 'MAIA', en: 'MAIA' },
    summary: {
      fr: "Mon Assistant Intelligent Autonome — centraliser abonnements, factures et rappels.",
      en: 'My own autonomous assistant — centralizing subscriptions, bills, and reminders.',
    },
    status: 'READY',
    type: 'case-study',
    featured: false,
    tags: { fr: ['IA', 'React', 'Vie perso'], en: ['AI', 'React', 'Personal'] },
    phases: {},
    component: MAIA,
  },
  {
    slug: 'conforma',
    icon: '▦',
    title: { fr: 'Conforma', en: 'Conforma' },
    summary: {
      fr: 'Vérifier un mode opératoire contre une trame de conformité, avec traçabilité de la source.',
      en: 'Checking a procedure document against a compliance checklist, with source traceability.',
    },
    status: 'READY',
    type: 'case-study',
    featured: false,
    tags: { fr: ['IA', 'Product design', 'Conformité'], en: ['AI', 'Product design', 'Compliance'] },
    phases: {},
    component: Conforma,
  },
  {
    slug: 'lost-cauldron-game',
    icon: '▲',
    title: { fr: 'The Lost Cauldron — Le Jeu', en: 'The Lost Cauldron — The Game' },
    summary: {
      fr: "Survivor-like solo (Godot) tiré de mon roman fantasy — vagues thématisées par secteur infiltré par un démon.",
      en: 'Solo survivor-like (Godot) spun off my own fantasy novel — waves themed around a demon-infiltrated sector.',
    },
    status: 'READY',
    type: 'case-study',
    featured: false,
    tags: { fr: ['Godot', 'GDScript', 'Game dev'], en: ['Godot', 'GDScript', 'Game dev'] },
    phases: {},
    component: TheLostCauldronGame,
    demoComponent: GameDemo,
    demoComponentV2: GameDemoV2,
  },
  {
    slug: 'design-system',
    icon: '◐',
    title: { fr: 'Design System', en: 'Design System' },
    summary: {
      fr: 'Les tokens visuels partagés du Lab — un seul endroit où les modifier.',
      en: "The Lab's shared visual tokens — one place to change them.",
    },
    status: 'READY',
    type: 'case-study',
    featured: false,
    tags: { fr: ['React', 'Design tokens'], en: ['React', 'Design tokens'] },
    phases: {},
    component: DesignSystem,
  },
  {
    slug: 'workflow',
    icon: '◈',
    title: { fr: 'Workflow', en: 'Workflow' },
    summary: {
      fr: 'Le run produit-spécifique et l\'unification transverse (design system, marque blanche), en parallèle.',
      en: 'Product-specific run and cross-product unification (design system, white label), in parallel.',
    },
    status: 'READY',
    type: 'method',
    featured: false,
    tags: { fr: ['Process', 'Design system', 'Product design'], en: ['Process', 'Design system', 'Product design'] },
    phases: {},
    component: WorkflowSolo,
  },
  {
    slug: 'exp-003',
    icon: '▣',
    title: { fr: 'Session Replay', en: 'Session Replay' },
    summary: {
      fr: 'Sessions de build documentées avec logs complets',
      en: 'Build sessions documented with full logs',
    },
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: { fr: ['React', 'Accordéon', 'iframe'], en: ['React', 'Accordion', 'iframe'] },
    phases: QUICK_LAB_PHASES,
    component: ToolProcessTemplate,
    demoComponent: SessionReplay,
  },
  {
    slug: 'cv',
    icon: '◫',
    title: { fr: 'CV', en: 'Resume' },
    summary: {
      fr: 'Parcours et compétences',
      en: 'Background and skills',
    },
    status: 'READY',
    type: 'tool',
    featured: false,
    tags: { fr: ['Profil'], en: ['Profile'] },
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

export function pt(project, lang) {
  return {
    title: project.title[lang] ?? project.title.fr,
    summary: project.summary[lang] ?? project.summary.fr,
    tags: project.tags[lang] ?? project.tags.fr,
  }
}
