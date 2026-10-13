// Numéros complets de L’Oracle du Matin (le même contenu que le PDF imprimé),
// un fichier par jour et par langue dans src/breves/numeros/ :
// <date>.json (français) et <date>.en.json (anglais). Chargés à la demande
// (import.meta.glob sans eager) pour ne pas alourdir le reste du site.
// Format : celui du journal papier (src/private/journal/REDACTION.md §5).
const modules = import.meta.glob('./numeros/*.json')

const chemin = (date, lang) => `./numeros/${date}${lang === 'en' ? '.en' : ''}.json`

// Un numéro est-il publié pour ce jour et cette langue ?
export function aNumero(date, lang) {
  return Boolean(modules[chemin(date, lang)])
}

// Contrôle minimal : un numéro mal formé n'est jamais affiché (repli sur les brèves)
function valide(n) {
  return (
    n && typeof n === 'object' &&
    n.une && typeof n.une.titre === 'string' && Array.isArray(n.une.paragraphes) &&
    Array.isArray(n.page2?.articles) && Array.isArray(n.page3?.articles) &&
    n.page4 && n.page4.mot && n.page4.chiffre && n.page4.enigme
  )
}

// Charge le numéro (Promise du JSON, ou null s'il n'existe pas ou est invalide)
export async function chargerNumero(date, lang) {
  const charger = modules[chemin(date, lang)]
  if (!charger) return null
  const mod = await charger()
  const n = mod.default ?? mod
  if (!valide(n)) {
    console.error(`[oracle] numéro invalide : ${date} (${lang})`)
    return null
  }
  return n
}

// Adresse du PDF à télécharger (public/oracle/pdf/)
export function lienPdf(date, lang) {
  return `/oracle/pdf/${date}${lang === 'en' ? '-en' : ''}.pdf`
}
