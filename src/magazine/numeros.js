import { CATEGORIES } from './magazineText'

// Chargement natif Vite (import.meta.glob), aucune dépendance : chaque
// fichier de src/magazine/numeros/ devient un numéro potentiel, validé
// selon le format documenté dans FORMAT.md avant d'être affiché.
const modules = import.meta.glob('./numeros/*.json', { eager: true })

function isBilingual(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.fr === 'string' && value.fr.trim() !== '' &&
    typeof value.en === 'string' && value.en.trim() !== ''
  )
}

// Valide la forme d'un numéro (D2/D4). Retourne un message d'erreur (règle
// violée) ou null si tout est correct — un numéro invalide n'est jamais
// affiché et ne fait jamais planter la page.
function validationError(data, filename) {
  if (data == null || typeof data !== 'object') return 'le fichier ne contient pas un objet JSON'

  if (!Number.isInteger(data.numero) || data.numero < 0) return '"numero" doit être un entier ≥ 0'

  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return '"date" doit être au format AAAA-MM-JJ'
  }
  const expectedFile = `./numeros/${data.date}.json`
  if (expectedFile !== `./numeros/${filename}`) {
    return `le nom de fichier (${filename}) ne correspond pas à "date" (${data.date})`
  }

  if (!isBilingual(data.titre)) return '"titre" doit avoir un texte "fr" et "en" non vides'
  if (!isBilingual(data.edito)) return '"edito" doit avoir un texte "fr" et "en" non vides'

  if (!Array.isArray(data.articles) || data.articles.length < 1 || data.articles.length > 5) {
    return '"articles" doit être un tableau de 1 à 5 éléments'
  }

  for (let i = 0; i < data.articles.length; i++) {
    const a = data.articles[i]
    const where = `articles[${i}]`
    if (a == null || typeof a !== 'object') return `${where} n'est pas un objet`
    if (!isBilingual(a.titre)) return `${where}.titre doit avoir un texte "fr" et "en" non vides`
    if (!isBilingual(a.resume)) return `${where}.resume doit avoir un texte "fr" et "en" non vides`
    if (!isBilingual(a.pourquoi)) return `${where}.pourquoi doit avoir un texte "fr" et "en" non vides`
    if (typeof a.categorie !== 'string' || !CATEGORIES[a.categorie]) {
      return `${where}.categorie doit être l'une de : ${Object.keys(CATEGORIES).join(', ')}`
    }
    if (!Array.isArray(a.sources) || a.sources.length < 1) {
      return `${where}.sources doit contenir au moins une source`
    }
    for (let j = 0; j < a.sources.length; j++) {
      const s = a.sources[j]
      if (s == null || typeof s.titre !== 'string' || s.titre.trim() === '') {
        return `${where}.sources[${j}].titre doit être un texte non vide`
      }
      if (typeof s.url !== 'string' || !s.url.startsWith('https://')) {
        return `${where}.sources[${j}].url doit être une URL en https://`
      }
    }
  }

  return null
}

function loadIssues() {
  const structurallyValid = []

  for (const [path, mod] of Object.entries(modules)) {
    const filename = path.replace('./numeros/', '')
    const data = mod.default ?? mod
    const error = validationError(data, filename)
    if (error) {
      console.error(`[magazine] numéro invalide (${filename}) : ${error}`)
      continue
    }
    structurallyValid.push(data)
  }

  structurallyValid.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))

  // D2 : "numero" = précédent + 1 — vérifié une fois les numéros triés du
  // plus ancien au plus récent, position par position.
  const sequenced = []
  for (let i = 0; i < structurallyValid.length; i++) {
    const issue = structurallyValid[i]
    if (issue.numero !== i) {
      console.error(`[magazine] numéro invalide (${issue.date}.json) : "numero" (${issue.numero}) devrait être ${i} (le précédent + 1, dans l'ordre chronologique)`)
      continue
    }
    sequenced.push(issue)
  }

  return sequenced
}

const ISSUES = loadIssues()

// Du plus récent au plus ancien, comme affiché sur /magazine.
export function getIssues() {
  return [...ISSUES].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getIssue(date) {
  return ISSUES.find((issue) => issue.date === date)
}
