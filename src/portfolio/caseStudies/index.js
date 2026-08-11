import MisranLabsRedesign from './MisranLabsRedesign'

export const CASE_STUDIES = [
  {
    slug: 'misran-labs-redesign',
    icon: '◆',
    title: 'Transformer un lab technique en portfolio design',
    summary: 'Comment et pourquoi ce site a été restructuré — documenté en direct.',
    status: 'READY',
    tags: ['IA', 'Decision-making', 'React'],
    component: MisranLabsRedesign,
  },
  {
    slug: 'a-completer-1',
    icon: '◇',
    title: '[À COMPLÉTER]',
    summary: 'Prochaine case study — contenu à fournir.',
    status: 'PLACEHOLDER',
    tags: [],
    component: null,
  },
]

export function getCaseStudy(slug) {
  return CASE_STUDIES.find(cs => cs.slug === slug)
}
