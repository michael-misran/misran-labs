// Fonctions pures (pas d'accès au DOM ni au stockage) : testables telles
// quelles depuis Node, voir missions/jeux-geste/verifier-socle.mjs.

// n° 1 le 2026-10-01 (D4 de la SPEC), +1 par jour.
const EPOCH = '2026-10-01'

function parseDateStr(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Date locale du joueur (minuit local), au format AAAA-MM-JJ.
export function dateLocaleAujourdhui(date = new Date()) {
  return formatDateStr(date)
}

export function numeroDuJour(dateStr) {
  const a = parseDateStr(EPOCH)
  const b = parseDateStr(dateStr)
  return Math.round((b - a) / 86400000) + 1
}

// Hash de chaîne déterministe (FNV-1a, 32 bits non signés) : même entrée,
// toujours la même sortie, indépendant de la plateforme.
function hashChaine(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// mulberry32, écrit à la main (D4) : générateur pseudo-aléatoire déterministe
// à partir d'une graine 32 bits. Retourne une fonction qui produit un nombre
// dans [0, 1) à chaque appel.
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Générateur du jour pour un jeu donné : deux joueurs sur le même jeu, à la
// même date, obtiennent toujours la même suite de nombres.
export function generateurDuJour(slug, dateStr) {
  return mulberry32(hashChaine(`${slug}${dateStr}`))
}
