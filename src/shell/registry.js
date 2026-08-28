import { getProject, pt } from '../lab/projects'
import { t } from '../i18n/ui'

export function resolveRouteMeta(pathname, lang) {
  if (pathname === '/') return { icon: '⬡', label: t(lang, 'labHome') }
  if (pathname === '/prive') return { icon: '🔒', label: 'Backlog' }
  if (pathname === '/communication') return { icon: '📣', label: 'Communication' }
  if (pathname === '/maia') return { icon: '🤖', label: 'MAIA · app' }
  if (pathname === '/maia/contrats') return { icon: '📄', label: 'MAIA · Contrats' }
  if (pathname === '/maia/factures') return { icon: '🧾', label: 'MAIA · Factures' }
  if (pathname === '/maia/candidatures') return { icon: '💼', label: 'MAIA · Candidatures' }
  if (pathname === '/conforma') return { icon: '☑', label: 'Conforma · app' }

  if (pathname.startsWith('/lab/')) {
    const slug = pathname.split('/')[2]
    const project = getProject(slug)
    return project ? { icon: project.icon, label: pt(project, lang).title } : { icon: '◌', label: slug }
  }

  return { icon: '◌', label: pathname }
}
