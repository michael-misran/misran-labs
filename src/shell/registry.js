import { getProject, pt } from '../lab/projects'
import { t } from '../i18n/ui'
import { getIssue } from '../magazine/numeros'

export function resolveRouteMeta(pathname, lang) {
  if (pathname === '/') return { icon: '⬡', label: t(lang, 'labHome') }

  if (pathname.startsWith('/lab/')) {
    const slug = pathname.split('/')[2]
    const project = getProject(slug)
    return project ? { icon: project.icon, label: pt(project, lang).title } : { icon: '◌', label: slug }
  }

  // Rubrique Magazine : titre de l'onglet et de la barre d'état, au lieu
  // du chemin brut.
  if (pathname === '/magazine') return { icon: '✎', label: t(lang, 'magazineNav') }
  if (pathname.startsWith('/magazine/')) {
    const issue = getIssue(pathname.split('/')[2])
    const title = issue ? (issue.titre[lang] ?? issue.titre.fr) : null
    return { icon: '✎', label: title ? `${t(lang, 'magazineNav')} — ${title}` : t(lang, 'magazineNav') }
  }

  return { icon: '◌', label: pathname }
}
