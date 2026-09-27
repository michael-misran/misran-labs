import { STATUTS, TYPES, TAILLES } from './projetsText'

// Chargement natif Vite (import.meta.glob), aucune dépendance : chaque
// fichier de src/projets/idees/ devient une idée potentielle, validée
// selon le format documenté dans FORMAT.md avant d'être affichée.
const modules = import.meta.glob('./idees/*.json', { eager: true })

// Clés autorisées par le schéma public (D1). Une clé absente de cette
// liste est le garde-fou de confidentialité (D2) : un champ économique
// ajouté par erreur (prix, revenus, modele...) fait rejeter le fichier
// entier plutôt que d'être affiché.
const ALLOWED_KEYS = new Set([
  'id', 'date', 'titre', 'resume', 'probleme', 'idee', 'type', 'taille', 'statut', 'decision', 'mission',
])

const STATUTS_AVEC_DECISION = new Set(['gardee', 'arretee', 'en-cours', 'faite'])
const STATUTS_AVEC_MISSION = new Set(['en-cours', 'faite'])

function isBilingual(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.fr === 'string' && value.fr.trim() !== '' &&
    typeof value.en === 'string' && value.en.trim() !== ''
  )
}

// Valide la forme d'une idée. Retourne un message d'erreur (règle
// violée) ou null si tout est correct — une idée invalide n'est jamais
// affichée et ne fait jamais planter la page.
function validationError(data, filename) {
  if (data == null || typeof data !== 'object') return 'le fichier ne contient pas un objet JSON'

  const unknownKeys = Object.keys(data).filter((k) => !ALLOWED_KEYS.has(k))
  if (unknownKeys.length > 0) {
    return `clé(s) non prévue(s) par le format public : ${unknownKeys.join(', ')}`
  }

  if (typeof data.id !== 'string' || !/^P-\d{3}$/.test(data.id)) {
    return '"id" doit être au format P-NNN (ex. P-001)'
  }
  const expectedFile = `./idees/${data.id}.json`
  if (expectedFile !== `./idees/${filename}`) {
    return `le nom de fichier (${filename}) ne correspond pas à "id" (${data.id})`
  }

  if (typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return '"date" doit être au format AAAA-MM-JJ'
  }

  if (!isBilingual(data.titre)) return '"titre" doit avoir un texte "fr" et "en" non vides'
  if (!isBilingual(data.resume)) return '"resume" doit avoir un texte "fr" et "en" non vides'
  if (!isBilingual(data.probleme)) return '"probleme" doit avoir un texte "fr" et "en" non vides'
  if (!isBilingual(data.idee)) return '"idee" doit avoir un texte "fr" et "en" non vides'

  if (typeof data.type !== 'string' || !TYPES[data.type]) {
    return `"type" doit être l'une de : ${Object.keys(TYPES).join(', ')}`
  }
  if (typeof data.taille !== 'string' || !TAILLES[data.taille]) {
    return `"taille" doit être l'une de : ${Object.keys(TAILLES).join(', ')}`
  }
  if (typeof data.statut !== 'string' || !STATUTS[data.statut]) {
    return `"statut" doit être l'une de : ${Object.keys(STATUTS).join(', ')}`
  }

  if (STATUTS_AVEC_DECISION.has(data.statut)) {
    if (data.decision == null || typeof data.decision !== 'object') {
      return `"decision" est obligatoire pour le statut "${data.statut}"`
    }
    if (typeof data.decision.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.decision.date)) {
      return '"decision.date" doit être au format AAAA-MM-JJ'
    }
    if (!isBilingual(data.decision.note)) return '"decision.note" doit avoir un texte "fr" et "en" non vides'
  } else if (data.decision !== undefined) {
    return `"decision" ne doit pas être présent pour le statut "${data.statut}"`
  }

  if (STATUTS_AVEC_MISSION.has(data.statut)) {
    if (typeof data.mission !== 'string' || data.mission.trim() === '') {
      return `"mission" est obligatoire (non vide) pour le statut "${data.statut}"`
    }
  } else if (data.mission !== undefined) {
    return `"mission" ne doit pas être présent pour le statut "${data.statut}"`
  }

  return null
}

function loadIdeas() {
  const valid = []

  for (const [path, mod] of Object.entries(modules)) {
    const filename = path.replace('./idees/', '')
    const data = mod.default ?? mod
    const error = validationError(data, filename)
    if (error) {
      console.error(`[projets] idée invalide (${filename}) : ${error}`)
      continue
    }
    valid.push(data)
  }

  return valid
}

const IDEAS = loadIdeas()

// Du plus récent au plus ancien (numéro décroissant), comme affiché sur
// /projets.
export function getIdeas() {
  return [...IDEAS].sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0))
}

export function getIdea(id) {
  return IDEAS.find((idea) => idea.id === id)
}
