import { getProject, pt } from '../lab/projects'
import { t } from '../i18n/ui'
import { getIssue } from '../magazine/numeros'
import { getIdea } from '../projets/idees'

// Chemins que App.jsx sait effectivement router, en dehors de '/', '/lab/…',
// '/magazine…' et '/projets…' (déjà traités plus bas) : sert uniquement à
// distinguer une vraie 404 du /breves ci-dessous, qui n'a pas encore son
// propre libellé de rubrique (hors périmètre de cette mission, D9).
const KNOWN_ROUTES = [
  /^\/breves\/?$/,
  /^\/breves\/[^/]+$/,
]

function notFoundMeta(lang) {
  return { icon: '☠', label: t(lang, 'notFound404Tab') }
}

export function resolveRouteMeta(pathname, lang) {
  if (pathname === '/') return { icon: '⬡', label: t(lang, 'labHome') }

  if (pathname.startsWith('/lab/')) {
    const slug = pathname.split('/')[2]
    const project = getProject(slug)
    return project ? { icon: project.icon, label: pt(project, lang).title } : notFoundMeta(lang)
  }

  // Rubrique Magazine : titre de l'onglet et de la barre d'état, au lieu
  // du chemin brut.
  if (pathname === '/magazine') return { icon: '📖', label: t(lang, 'magazineNav') }
  if (pathname.startsWith('/magazine/')) {
    const issue = getIssue(pathname.split('/')[2])
    const title = issue ? (issue.titre[lang] ?? issue.titre.fr) : null
    return { icon: '📖', label: title ? `${t(lang, 'magazineNav')} — ${title}` : t(lang, 'magazineNav') }
  }

  // Rubrique Projets : titre de l'onglet et de la barre d'état, au lieu
  // du chemin brut.
  if (pathname === '/projets') return { icon: '◇', label: t(lang, 'projetsNav') }
  if (pathname.startsWith('/projets/')) {
    const idea = getIdea(pathname.split('/')[2])
    const label = idea ? `${t(lang, 'projetsNav')} — ${idea.id} · ${idea.titre[lang] ?? idea.titre.fr}` : t(lang, 'projetsNav')
    return { icon: '◇', label }
  }

  if (KNOWN_ROUTES.some((re) => re.test(pathname))) return { icon: '◌', label: pathname }

  return notFoundMeta(lang)
}
