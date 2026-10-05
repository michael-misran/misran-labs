// Chargement natif Vite (import.meta.glob), aucune dépendance : chaque
// fichier de src/zine/numeros/ devient un numéro potentiel, validé selon
// le format documenté dans FORMAT.md avant d'être affiché. Même schéma
// de validation que src/breves/jours.js.
const modules = import.meta.glob('./numeros/*.json', { eager: true })

const TYPES_BLOCS = ['photo', 'dessin', 'texte', 'carnet', 'jeu', 'bulle', 'etoile']

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

// Valide un bloc de `pages` (D2). Retourne un message d'erreur ou null.
function validationErrorBloc(bloc, index) {
  const where = `pages[${index}]`
  if (bloc == null || typeof bloc !== 'object') return `${where} n'est pas un objet`
  if (typeof bloc.type !== 'string' || !TYPES_BLOCS.includes(bloc.type)) {
    return `${where}.type doit être l'un de : ${TYPES_BLOCS.join(', ')}`
  }

  switch (bloc.type) {
    case 'photo':
      if (!isNonEmptyString(bloc.src)) return `${where}.src doit être un texte non vide`
      if (!isBilingual(bloc.legende)) return `${where}.legende doit avoir un texte "fr" et "en" non vides`
      if (typeof bloc.trame !== 'boolean') return `${where}.trame doit être vrai ou faux`
      return null
    case 'dessin':
      if (!isNonEmptyString(bloc.src)) return `${where}.src doit être un texte non vide`
      if (!isBilingual(bloc.legende)) return `${where}.legende doit avoir un texte "fr" et "en" non vides`
      return null
    case 'texte':
      if (bloc.titre !== undefined && !isBilingual(bloc.titre)) {
        return `${where}.titre, si présent, doit avoir un texte "fr" et "en" non vides`
      }
      if (!isBilingual(bloc.corps)) return `${where}.corps doit avoir un texte "fr" et "en" non vides`
      return null
    case 'carnet':
      if (!isBilingual(bloc.corps)) return `${where}.corps doit avoir un texte "fr" et "en" non vides`
      return null
    case 'jeu':
      if (!isBilingual(bloc.titre)) return `${where}.titre doit avoir un texte "fr" et "en" non vides`
      if (!isBilingual(bloc.consigne)) return `${where}.consigne doit avoir un texte "fr" et "en" non vides`
      if (bloc.src !== undefined && !isNonEmptyString(bloc.src)) {
        return `${where}.src, si présent, doit être un texte non vide`
      }
      return null
    case 'bulle':
    case 'etoile':
      if (!isBilingual(bloc.texte)) return `${where}.texte doit avoir un texte "fr" et "en" non vides`
      return null
    default:
      return null
  }
}

// Valide la forme d'un numéro (D2). Retourne un message d'erreur (règle
// violée) ou null si tout est correct — un numéro invalide n'est jamais
// affiché et ne fait jamais planter la page.
function validationError(data, filename) {
  if (data == null || typeof data !== 'object') return 'le fichier ne contient pas un objet JSON'

  if (!Number.isInteger(data.numero) || data.numero < 1) return '"numero" doit être un entier ≥ 1'
  const expectedFile = `./numeros/${String(data.numero).padStart(2, '0')}.json`
  if (expectedFile !== `./numeros/${filename}`) {
    return `le nom de fichier (${filename}) ne correspond pas à "numero" (${data.numero})`
  }

  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}$/.test(data.date)) {
    return '"date" doit être au format AAAA-MM'
  }

  if (!isBilingual(data.titre)) return '"titre" doit avoir un texte "fr" et "en" non vides'

  if (typeof data.encre !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(data.encre)) {
    return '"encre" doit être une couleur hexadécimale (#rrggbb)'
  }

  if (!isBilingual(data.edito)) return '"edito" doit avoir un texte "fr" et "en" non vides'

  if (!Array.isArray(data.pages) || data.pages.length < 1) return '"pages" doit être un tableau non vide'
  for (let i = 0; i < data.pages.length; i++) {
    const error = validationErrorBloc(data.pages[i], i)
    if (error) return error
  }

  return null
}

function loadNumeros() {
  const structurallyValid = []

  for (const [path, mod] of Object.entries(modules)) {
    const filename = path.replace('./numeros/', '')
    const data = mod.default ?? mod
    const error = validationError(data, filename)
    if (error) {
      console.error(`[zine] numéro invalide (${filename}) : ${error}`)
      continue
    }
    structurallyValid.push(data)
  }

  structurallyValid.sort((a, b) => a.numero - b.numero)

  // "numero" = position + 1, vérifié une fois les numéros triés (une
  // séquence qui démarre à 1).
  const sequenced = []
  for (let i = 0; i < structurallyValid.length; i++) {
    const numero = structurallyValid[i]
    if (numero.numero !== i + 1) {
      console.error(`[zine] numéro invalide (${String(numero.numero).padStart(2, '0')}.json) : "numero" (${numero.numero}) devrait être ${i + 1} (le précédent + 1, dans l'ordre chronologique)`)
      continue
    }
    sequenced.push(numero)
  }

  return sequenced
}

const NUMEROS = loadNumeros()

// Du plus récent au plus ancien, comme affiché sur /zine.
export function getNumeros() {
  return [...NUMEROS].sort((a, b) => b.numero - a.numero)
}

export function getNumero(numero) {
  return NUMEROS.find((n) => n.numero === numero)
}
