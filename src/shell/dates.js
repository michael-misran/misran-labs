// Formats de date partagés par toutes les rubriques (ex-magazine/magazineText.js).

// "2026-09-28" → "28.09.2026". Concaténation manuelle : même rendu FR et EN.
export function formatDateShort(iso) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

// "2026-09-28" → "lundi 28 septembre 2026" / "Monday, September 28, 2026".
// Découpage manuel de la chaîne avant new Date() : "2026-09-28" seul est
// interprété en UTC par le moteur JS et peut retomber sur la veille selon
// le fuseau local.
export function formatDateLong(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// "2026-09-28" → "28 septembre 2026" / "September 28, 2026" : comme
// formatDateLong, sans le jour de la semaine (libellés d'onglet, flux RSS).
export function formatDateLongNoWeekday(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
