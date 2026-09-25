import UIKit from './projects/UIKit'
import DesignSystemMultimarques from './projects/DesignSystemMultimarques'
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
    slug: 'design-system-multimarques',
    icon: '◼',
    title: { fr: 'Design System multi-marques', en: 'Multi-brand Design System' },
    summary: {
      fr: 'Design system multi-marques, tokens en trois tiers et pipeline Figma vers GitHub.',
      en: 'Multi-brand design system, three-tier tokens and a Figma-to-GitHub pipeline.',
    },
    status: 'READY',
    type: 'case-study',
    featured: true,
    tags: {
      fr: ['Design system', 'DesignOps', 'Design tokens', 'Figma'],
      en: ['Design system', 'DesignOps', 'Design tokens', 'Figma'],
    },
    // Estimation prudente — à ajuster, toi seul sais ce qui a réellement été fait.
    phases: {
      business: 'partial',
      research: 'partial',
      design: 'done',
      validation: 'partial',
      feasibility: 'done',
      development: 'done',
      qa: 'partial',
      launch: 'done',
      iteration: 'done',
    },
    component: DesignSystemMultimarques,
  },
  {
    slug: 'ui-kit',
    icon: '◧',
    title: { fr: 'Kit UI', en: 'UI Kit' },
    summary: {
      fr: 'Les composants réels du Lab — surfaces, contrôles, navigation, retours — avec leurs états.',
      en: 'The Lab’s real components — surfaces, controls, navigation, feedback — with their states.',
    },
    status: 'READY',
    type: 'case-study',
    featured: true,
    tags: {
      fr: ['Design system', 'React', 'Composants', 'Accessibilité'],
      en: ['Design system', 'React', 'Components', 'Accessibility'],
    },
    phases: {
      business: 'skipped',
      research: 'skipped',
      design: 'done',
      validation: 'partial',
      feasibility: 'done',
      development: 'done',
      qa: 'partial',
      launch: 'done',
      iteration: 'partial',
    },
    component: UIKit,
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
