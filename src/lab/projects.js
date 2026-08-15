import MisranLabsRedesign from './projects/MisranLabsRedesign'
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
    slug: 'misran-labs-redesign',
    icon: '◆',
    title: { fr: 'Création du lab', en: 'Building the lab' },
    summary: {
      fr: 'Comment et pourquoi ce site a été restructuré — documenté en direct.',
      en: 'How and why this site was restructured — documented live.',
    },
    status: 'READY',
    type: 'case-study',
    featured: true,
    tags: { fr: ['IA', 'Decision-making', 'React'], en: ['AI', 'Decision-making', 'React'] },
    phases: {
      business: 'skipped',
      research: 'skipped',
      design: 'done',
      validation: 'partial',
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
    title: { fr: '[À COMPLÉTER]', en: '[TO COMPLETE]' },
    summary: {
      fr: 'Prochain projet — contenu à fournir.',
      en: 'Next project — content to be added.',
    },
    status: 'PLACEHOLDER',
    type: 'case-study',
    featured: false,
    tags: { fr: [], en: [] },
    phases: {},
    component: null,
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
