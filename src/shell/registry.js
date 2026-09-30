import { getProject, pt } from '../lab/projects'
import { t } from '../i18n/ui'
import { getIssue } from '../magazine/numeros'
import { getIdea } from '../projets/idees'
import { getDay } from '../breves/jours'
import { formatDateLongNoWeekday } from '../magazine/magazineText'
import { getJeu } from '../jeux/registre'

// Chemins que App.jsx sait effectivement router, en dehors de '/', '/lab/…',
// '/magazine…', '/projets…' et '/breves…' (déjà traités plus bas) : sert
// uniquement à distinguer une vraie 404 des autres routes connues.
const KNOWN_ROUTES = [
  /^\/suivre\/?$/,
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

  // Rubrique Brèves : titre de l'onglet et de la barre d'état, au lieu
  // du chemin brut (D7, mission rss-suivre).
  if (pathname === '/breves') return { icon: '🗞', label: t(lang, 'brevesNav') }
  if (pathname.startsWith('/breves/')) {
    const day = getDay(pathname.split('/')[2])
    const label = day ? `${t(lang, 'brevesNav')} — ${formatDateLongNoWeekday(day.date, lang)}` : t(lang, 'brevesNav')
    return { icon: '🗞', label }
  }

  if (pathname === '/suivre') return { icon: '◉', label: t(lang, 'suivreNav') }

  // Rubrique Jeux : titre de l'onglet et de la barre d'état ; un slug
  // inconnu renvoie la 404, comme /lab/ (D3).
  if (pathname === '/jeux') return { icon: '🎲', label: t(lang, 'jeuxNav') }
  if (pathname.startsWith('/jeux/')) {
    const jeu = getJeu(pathname.split('/')[2])
    return jeu ? { icon: '🎲', label: `${t(lang, 'jeuxNav')} — ${jeu.titre[lang]}` } : notFoundMeta(lang)
  }

  if (KNOWN_ROUTES.some((re) => re.test(pathname))) return { icon: '◌', label: pathname }

  return notFoundMeta(lang)
}
