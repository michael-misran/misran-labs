// Stockage local des résultats (D6) : une seule clé, un objet par jeu, un
// résultat par date jouée. Chaque lecture/écriture est protégée par
// try/catch : sans stockage (navigation privée bloquée), le jeu reste
// jouable, le résultat n'est simplement pas gardé.
import { formatDateStr } from './jour.js'

const CLE = 'misran-jeux'

function lireTout() {
  try {
    const brut = localStorage.getItem(CLE)
    return brut ? JSON.parse(brut) : {}
  } catch {
    return {}
  }
}

function ecrireTout(data) {
  try {
    localStorage.setItem(CLE, JSON.stringify(data))
  } catch {
    // navigation privée, quota dépassé, etc. : le résultat n'est pas gardé.
  }
}

function veille(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() - 1)
  return formatDateStr(dt)
}

export function lireResultat(slug, date) {
  const tout = lireTout()
  return tout[slug]?.[date] ?? null
}

export function enregistrerResultat(slug, date, score, detail) {
  const tout = lireTout()
  if (!tout[slug]) tout[slug] = {}
  tout[slug][date] = { score, detail }
  ecrireTout(tout)
}

export function meilleurScore(slug) {
  const tout = lireTout()
  const jours = tout[slug]
  if (!jours) return null
  let meilleur = null
  for (const date of Object.keys(jours)) {
    const score = jours[date].score
    if (meilleur === null || score > meilleur) meilleur = score
  }
  return meilleur
}

// Jours consécutifs joués jusqu'à `aujourdhui` inclus, ou jusqu'à hier si
// `aujourdhui` n'est pas encore joué (D6).
export function serie(slug, aujourdhui) {
  const tout = lireTout()
  const jours = tout[slug] ?? {}
  let curseur = jours[aujourdhui] ? aujourdhui : veille(aujourdhui)
  let compte = 0
  while (jours[curseur]) {
    compte++
    curseur = veille(curseur)
  }
  return compte
}
