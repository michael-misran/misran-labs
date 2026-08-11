import { getProject } from '../lab/projects'

export function resolveRouteMeta(pathname) {
  if (pathname === '/') return { icon: '⬡', label: 'Lab Home' }

  if (pathname.startsWith('/lab/')) {
    const slug = pathname.split('/')[2]
    const project = getProject(slug)
    return project ? { icon: project.icon, label: project.title } : { icon: '◌', label: slug }
  }

  return { icon: '◌', label: pathname }
}
