// Chargement natif Vite (import.meta.glob), même schéma que src/zine/numeros.js :
// chaque fichier de src/saviez-vous/parutions/ est une parution (un sujet,
// une page façon DoggyBags), validée selon FORMAT.md avant d'être affichée.
// Une parution invalide n'est jamais affichée et ne fait jamais planter la page.
const modules = import.meta.glob('./parutions/*.json', { eager: true })

function isBilingual(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.fr === 'string' && value.fr.trim() !== '' &&
    typeof value.en === 'string' && value.en.trim() !== ''
  )
}

const isImage = (v) => typeof v === 'string' && v.startsWith('/saviez-vous/')

// Encadré « titre + liste bilingue » (fiche technique, légende du démontage)
function validationErrorEncadre(e, nom) {
  if (e == null || typeof e !== 'object') return `"${nom}" n'est pas un objet`
  if (!isBilingual(e.titre)) return `"${nom}.titre" doit avoir un texte "fr" et "en" non vides`
  const liste = nom === 'fiche' ? e.lignes : e.items
  const cle = nom === 'fiche' ? 'lignes' : 'items'
  if (!Array.isArray(liste) || liste.length < 1) return `"${nom}.${cle}" doit être une liste non vide`
  if (!liste.every(isBilingual)) return `chaque élément de "${nom}.${cle}" doit avoir un texte "fr" et "en" non vides`
  return null
}

function validationError(data, filename) {
  if (data == null || typeof data !== 'object') return 'le fichier ne contient pas un objet JSON'
  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return '"date" doit être au format AAAA-MM-JJ'
  }
  if (`${data.date}.json` !== filename) {
    return `le nom de fichier (${filename}) ne correspond pas à "date" (${data.date})`
  }
  if (!isBilingual(data.sujet)) return '"sujet" doit avoir un texte "fr" et "en" non vides'
  if (!isBilingual(data.intro)) return '"intro" doit avoir un texte "fr" et "en" non vides'
  if (data.conclusion !== undefined && !isBilingual(data.conclusion)) {
    return '"conclusion", si présente, doit avoir un texte "fr" et "en" non vides'
  }
  if (data.illustration !== undefined && !isImage(data.illustration)) {
    return '"illustration", si présente, doit pointer dans /saviez-vous/…'
  }
  if (data.portrait !== undefined && !isImage(data.portrait)) {
    return '"portrait", si présent, doit pointer dans /saviez-vous/…'
  }
  for (const nom of ['fiche', 'legende']) {
    if (data[nom] !== undefined) {
      const error = validationErrorEncadre(data[nom], nom)
      if (error) return error
    }
  }
  if (data.sources !== undefined && (!Array.isArray(data.sources) || !data.sources.every((s) => typeof s === 'string' && s.startsWith('https://')))) {
    return '"sources", si présent, doit être une liste d\'adresses https://…'
  }
  return null
}

// Date locale du jour (AAAA-MM-JJ) : une parution datée dans le futur reste
// cachée jusqu'à son jour, on peut donc préparer les semaines d'avance.
function aujourdhui() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function loadParutions() {
  const valides = []
  for (const [path, mod] of Object.entries(modules)) {
    const filename = path.replace('./parutions/', '')
    const data = mod.default ?? mod
    const error = validationError(data, filename)
    if (error) {
      console.error(`[saviez-vous] parution invalide (${filename}) : ${error}`)
      continue
    }
    valides.push(data)
  }
  return valides.sort((a, b) => b.date.localeCompare(a.date))
}

const PARUTIONS = loadParutions()

// Parutions déjà parues, de la plus récente à la plus ancienne.
export function getParutions() {
  const jour = aujourdhui()
  return PARUTIONS.filter((p) => p.date <= jour)
}

export function getParution(date) {
  return getParutions().find((p) => p.date === date)
}
