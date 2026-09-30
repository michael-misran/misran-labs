// Chargement natif Vite (import.meta.glob), aucune dépendance : chaque
// fichier de src/breves/jours/ devient un jour potentiel, validé selon le
// format documenté dans FORMAT.md avant d'être affiché.
const modules = import.meta.glob('./jours/*.json', { eager: true })

const RUBRIQUES = ['ia', 'tech']

function isBilingual(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.fr === 'string' && value.fr.trim() !== '' &&
    typeof value.en === 'string' && value.en.trim() !== ''
  )
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== ''
}

// Valide la forme d'un jour (D2/D4). Retourne un message d'erreur (règle
// violée) ou null si tout est correct — un jour invalide n'est jamais
// affiché et ne fait jamais planter la page.
function validationError(data, filename) {
  if (data == null || typeof data !== 'object') return 'le fichier ne contient pas un objet JSON'

  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return '"date" doit être au format AAAA-MM-JJ'
  }
  const expectedFile = `./jours/${data.date}.json`
  if (expectedFile !== `./jours/${filename}`) {
    return `le nom de fichier (${filename}) ne correspond pas à "date" (${data.date})`
  }

  if (!Array.isArray(data.breves) || data.breves.length < 1 || data.breves.length > 5) {
    return '"breves" doit être un tableau de 1 à 5 éléments'
  }

  for (let i = 0; i < data.breves.length; i++) {
    const b = data.breves[i]
    const where = `breves[${i}]`
    if (b == null || typeof b !== 'object') return `${where} n'est pas un objet`
    if (typeof b.rubrique !== 'string' || !RUBRIQUES.includes(b.rubrique)) {
      return `${where}.rubrique doit être l'une de : ${RUBRIQUES.join(', ')}`
    }
    if (!isBilingual(b.titre)) return `${where}.titre doit avoir un texte "fr" et "en" non vides`
    if (!isBilingual(b.resume)) return `${where}.resume doit avoir un texte "fr" et "en" non vides`
    if (!Array.isArray(b.sources) || b.sources.length < 1) {
      return `${where}.sources doit contenir au moins une source`
    }
    for (let j = 0; j < b.sources.length; j++) {
      const s = b.sources[j]
      if (s == null || typeof s.titre !== 'string' || s.titre.trim() === '') {
        return `${where}.sources[${j}].titre doit être un texte non vide`
      }
      if (typeof s.url !== 'string' || !s.url.startsWith('https://')) {
        return `${where}.sources[${j}].url doit être une URL en https://`
      }
    }
  }

  if (data.mot !== undefined) {
    if (data.mot == null || typeof data.mot !== 'object' || !isNonEmptyString(data.mot.terme) || !isBilingual(data.mot.definition)) {
      return '"mot", si présent, doit avoir un "terme" non vide et une "definition" "fr"/"en" non vides'
    }
  }

  if (data.chiffre !== undefined) {
    if (data.chiffre == null || typeof data.chiffre !== 'object' || !isNonEmptyString(data.chiffre.valeur) || !isBilingual(data.chiffre.texte)) {
      return '"chiffre", si présent, doit avoir une "valeur" non vide et un "texte" "fr"/"en" non vides'
    }
  }

  return null
}

function loadDays() {
  const valid = []

  for (const [path, mod] of Object.entries(modules)) {
    const filename = path.replace('./jours/', '')
    const data = mod.default ?? mod
    const error = validationError(data, filename)
    if (error) {
      console.error(`[breves] jour invalide (${filename}) : ${error}`)
      continue
    }
    valid.push(data)
  }

  valid.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  return valid
}

const DAYS = loadDays()

// Du plus récent au plus ancien, comme affiché sur /breves.
export function getDays() {
  return [...DAYS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getDay(date) {
  return DAYS.find((day) => day.date === date)
}

// Jour précédent / suivant (ordre chronologique), pour la navigation sur /breves/:date.
export function getAdjacentDays(date) {
  const chronological = [...DAYS].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
  const index = chronological.findIndex((day) => day.date === date)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? chronological[index - 1] : null,
    next: index < chronological.length - 1 ? chronological[index + 1] : null,
  }
}
