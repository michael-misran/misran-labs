// Vérifie sans navigateur les fonctions pures du socle des jeux (numéro de
// jour, déterminisme de la graine, calcul de série).
// Usage : node missions/jeux-geste/verifier-socle.mjs
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ici = dirname(fileURLToPath(import.meta.url))
const racine = join(ici, '..', '..')

// Polyfill minimal de localStorage pour serie.js (lu/écrit seulement à l'appel).
const store = new Map()
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => { store.set(k, String(v)) },
  removeItem: (k) => { store.delete(k) },
}

const { numeroDuJour, generateurDuJour } = await import(pathToFileURL(join(racine, 'src/jeux/socle/jour.js')))
const { enregistrerResultat, serie, lireResultat } = await import(pathToFileURL(join(racine, 'src/jeux/socle/serie.js')))

let echecs = 0
function verifier(label, condition) {
  console.log(`${condition ? '✓' : '✗'} ${label}`)
  if (!condition) echecs++
}

// Numéro de jour : n° 1 le 2026-10-01, +1 par jour (D4).
verifier('numeroDuJour(2026-10-01) === 1', numeroDuJour('2026-10-01') === 1)
verifier('numeroDuJour(2026-10-02) === 2', numeroDuJour('2026-10-02') === 2)
verifier('numeroDuJour(2026-09-30) === 0', numeroDuJour('2026-09-30') === 0)
verifier('numeroDuJour(2026-11-01) === 32', numeroDuJour('2026-11-01') === 32)

// Déterminisme de la graine : même entrée -> même suite ; entrée différente -> suite différente.
verifier(
  'generateurDuJour est déterministe (même slug, même date)',
  generateurDuJour('geste-parfait', '2026-10-05')() === generateurDuJour('geste-parfait', '2026-10-05')(),
)
verifier(
  'generateurDuJour varie avec la date',
  generateurDuJour('geste-parfait', '2026-10-05')() !== generateurDuJour('geste-parfait', '2026-10-06')(),
)
verifier(
  'generateurDuJour varie avec le slug',
  generateurDuJour('geste-parfait', '2026-10-05')() !== generateurDuJour('autre-jeu', '2026-10-05')(),
)

// Série : calcul à partir de résultats injectés dans le localStorage simulé (D6).
store.clear()
enregistrerResultat('geste-parfait', '2026-10-04', 80, {})
enregistrerResultat('geste-parfait', '2026-10-05', 90, {})
verifier('serie() vaut 2 si hier et aujourd’hui sont joués', serie('geste-parfait', '2026-10-05') === 2)

store.clear()
enregistrerResultat('geste-parfait', '2026-10-03', 80, {})
verifier('serie() vaut 0 si seul avant-hier est joué (pas hier)', serie('geste-parfait', '2026-10-05') === 0)

store.clear()
enregistrerResultat('geste-parfait', '2026-10-04', 80, {})
verifier('serie() vaut 1 si seul hier est joué (pas encore aujourd’hui)', serie('geste-parfait', '2026-10-05') === 1)

verifier('lireResultat() relit bien un résultat enregistré', lireResultat('geste-parfait', '2026-10-04').score === 80)
verifier('lireResultat() renvoie null pour une date non jouée', lireResultat('geste-parfait', '2026-10-05') === null)

console.log(`\n${echecs === 0 ? 'Tout est OK.' : `${echecs} échec(s).`}`)
if (echecs > 0) process.exit(1)
