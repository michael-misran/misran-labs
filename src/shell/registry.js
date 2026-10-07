import { getProject, pt } from '../lab/projects'
import { t } from '../i18n/ui'
import { getIdea } from '../projets/idees'
import { getDay } from '../breves/jours'
import { formatDateLongNoWeekday } from './dates'
import { getJeu } from '../jeux/registre'
import { getNumero } from '../zine/numeros'

// Chemins que App.jsx sait effectivement router, en dehors de '/', '/lab/…',
// '/projets…' et '/breves…' (déjà traités plus bas) : sert
// uniquement à distinguer une vraie 404 des autres routes connues.
const KNOWN_ROUTES = [
  /^\/suivre\/?$/,
  /^\/edito\/?$/,
]

function notFoundMeta(lang) {
  return { icon: '☠', label: t(lang, 'notFound404Tab') }
}

export function resolveRouteMeta(pathname, lang) {
  if (pathname === '/') return { icon: '⬡', label: t(lang, 'labHome') }
  if (pathname === '/lab') return { icon: '⬡', label: t(lang, 'labHome') }

  if (pathname.startsWith('/lab/')) {
    const slug = pathname.split('/')[2]
    const project = getProject(slug)
    return project ? { icon: project.icon, label: pt(project, lang).title } : notFoundMeta(lang)
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
  if (pathname === '/edito') return { icon: '✎', label: t(lang, 'editoNav') }

  // Rubrique Jeux : titre de l'onglet et de la barre d'état ; un slug
  // inconnu renvoie la 404, comme /lab/ (D3).
  if (pathname === '/jeux') return { icon: '🎲', label: t(lang, 'jeuxNav') }
  if (pathname.startsWith('/jeux/')) {
    const jeu = getJeu(pathname.split('/')[2])
    return jeu ? { icon: '🎲', label: `${t(lang, 'jeuxNav')} — ${jeu.titre[lang]}` } : notFoundMeta(lang)
  }

  // Rubrique Zine : titre de l'onglet, comme les autres rubriques.
  if (pathname === '/zine') return { icon: '✦', label: t(lang, 'navTitreZine') }
  if (pathname.startsWith('/zine/')) {
    const numero = getNumero(Number(pathname.split('/')[2]))
    const label = numero ? `${t(lang, 'navTitreZine')} — ${numero.titre[lang] ?? numero.titre.fr}` : t(lang, 'navTitreZine')
    return { icon: '✦', label }
  }

  if (KNOWN_ROUTES.some((re) => re.test(pathname))) return { icon: '◌', label: pathname }

  return notFoundMeta(lang)
}
