import { getCaseStudy } from '../portfolio/caseStudies'

export const LAB_MODULES = [
  { id: 'exp-001', icon: '◈', label: 'UX Audit' },
  { id: 'exp-002', icon: '◎', label: 'Brief Machine' },
  { id: 'exp-003', icon: '▣', label: 'Session Replay' },
  { id: 'exp-005', icon: '◉', label: 'SaaS Generator' },
  { id: 'api-monitor', icon: '◬', label: 'API Monitor' },
  { id: 'cv', icon: '◫', label: 'CV' },
]

export function getLabModule(id) {
  return LAB_MODULES.find(m => m.id === id)
}

export function resolveRouteMeta(pathname) {
  if (pathname === '/') return { icon: '⬡', label: 'Lab Home' }
  if (pathname === '/portfolio') return { icon: '◆', label: 'Portfolio' }

  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.split('/')[2]
    const cs = getCaseStudy(slug)
    return cs ? { icon: cs.icon, label: cs.title } : { icon: '◌', label: slug }
  }

  if (pathname.startsWith('/lab/')) {
    const id = pathname.split('/')[2]
    const m = getLabModule(id)
    return m ?? { icon: '◌', label: id }
  }

  return { icon: '◌', label: pathname }
}
