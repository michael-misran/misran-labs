// Vérifie sans navigateur : la structure de questions.json (D2, critère 3)
// et la correspondance des réponses saisies (D4, critère 4).
// Usage : node missions/jeux-majorite/verifier-questions.mjs
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readFile } from 'node:fs/promises'

const ici = dirname(fileURLToPath(import.meta.url))
const racine = join(ici, '..', '..')
const jeuDir = join(racine, 'src/jeux/comme-tout-le-monde')

const { normaliser, trouverReponse } = await import(pathToFileURL(join(jeuDir, 'correspondance.js')))
const questions = JSON.parse(await readFile(join(jeuDir, 'questions.json'), 'utf8'))

let echecs = 0
function verifier(label, condition) {
  if (!condition) {
    echecs++
    console.log(`✗ ${label}`)
  }
}

function texteNonVide(v) {
  return typeof v === 'string' && v.trim() !== ''
}
function listeNonVide(v) {
  return Array.isArray(v) && v.length > 0 && v.every((s) => texteNonVide(s))
}

// Critère 3 : nombre total de questions (30 attendues une fois la banque
// complète — étape 3 du PLAN ; à l'étape 2, une seule question d'exemple).
verifier(`30 questions (actuellement ${questions.length})`, questions.length === 30)

const ids = questions.map((q) => q.id)
verifier('ids uniques', new Set(ids).size === ids.length)

for (const [index, q] of questions.entries()) {
  const label = `q${index} (${q.id})`
  verifier(`${label} : id non vide`, texteNonVide(q.id))
  verifier(`${label} : question.fr/en non vides`, texteNonVide(q.question?.fr) && texteNonVide(q.question?.en))
  verifier(`${label} : 6 à 8 réponses (actuellement ${q.reponses.length})`, q.reponses.length >= 6 && q.reponses.length <= 8)

  const pcts = q.reponses.map((r) => r.pct)
  const somme = pcts.reduce((a, b) => a + b, 0)
  verifier(`${label} : somme des % entre 85 et 100 (= ${somme})`, somme >= 85 && somme <= 100)
  verifier(`${label} : % décroissants`, pcts.every((p, i) => i === 0 || p <= pcts[i - 1]))

  for (const r of q.reponses) {
    verifier(`${label} : réponse pct=${r.pct} fr/en non vides`, listeNonVide(r.fr) && listeNonVide(r.en))
  }

  for (const lang of ['fr', 'en']) {
    const vus = new Map()
    for (const [i, r] of q.reponses.entries()) {
      for (const syn of r[lang] ?? []) {
        const n = normaliser(syn, lang)
        const dejaVu = vus.get(n)
        verifier(`${label} : synonyme "${syn}" (${lang}) non partagé entre réponses`, dejaVu === undefined || dejaVu === i)
        vus.set(n, i)
      }
    }
  }
}

// Critère 4 : correspondance (D4), sur la question d'exemple de la banque.
const exemple = questions.find((q) => q.id === 'vacances-oubli')
if (!exemple) {
  verifier('question d’exemple "vacances-oubli" présente', false)
} else {
  const idxChargeur = exemple.reponses.findIndex((r) => r.fr[0] === 'chargeur')
  const idxBrosse = exemple.reponses.findIndex((r) => r.fr[0] === 'brosse à dents')

  verifier('"Les chargeurs" → chargeur', trouverReponse('Les chargeurs', exemple.reponses, 'fr') === idxChargeur)
  verifier('"brosse a dent" → brosse à dents', trouverReponse('brosse a dent', exemple.reponses, 'fr') === idxBrosse)
  verifier('"Chargeur." → chargeur', trouverReponse('Chargeur.', exemple.reponses, 'fr') === idxChargeur)
  verifier('"avion" → aucune', trouverReponse('avion', exemple.reponses, 'fr') === -1)
}

console.log(echecs === 0 ? '\nTout est OK.' : `\n${echecs} échec(s).`)
if (echecs > 0) process.exit(1)
