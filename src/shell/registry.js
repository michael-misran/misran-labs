import { getProject, pt } from '../lab/projects'
import { t } from '../i18n/ui'

export function resolveRouteMeta(pathname, lang) {
  if (pathname === '/') return { icon: '⬡', label: t(lang, 'labHome') }

  if (pathname.startsWith('/lab/')) {
    const slug = pathname.split('/')[2]
    const project = getProject(slug)
    return project ? { icon: project.icon, label: pt(project, lang).title } : { icon: '◌', label: slug }
  }

  return { icon: '◌', label: pathname }
}
