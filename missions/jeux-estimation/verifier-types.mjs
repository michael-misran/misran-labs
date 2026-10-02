// Vérifie sans navigateur, pour 50 graines, que chaque type de
// « a-vue-d-oeil » renvoie une valeur dans sa plage et égale au nombre
// d'éléments réellement générés (ou au pourcentage calculé) — critère 4.
// Usage : node missions/jeux-estimation/verifier-types.mjs
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ici = dirname(fileURLToPath(import.meta.url))
const racine = join(ici, '..', '..')
const typesDir = join(racine, 'src/jeux/a-vue-d-oeil/types')

const { mulberry32 } = await import(pathToFileURL(join(racine, 'src/jeux/socle/jour.js')))
const { PLAGE: PLAGE_BOCAL, genererBocal } = await import(pathToFileURL(join(typesDir, 'bocal.generer.js')))
const { PLAGE: PLAGE_CIEL, genererCiel } = await import(pathToFileURL(join(typesDir, 'ciel.generer.js')))
const { PLAGE: PLAGE_FOULE, genererFoule } = await import(pathToFileURL(join(typesDir, 'foule.generer.js')))
const { PLAGE: PLAGE_POIS, COLONNES, LIGNES, genererPois } = await import(pathToFileURL(join(typesDir, 'pois.generer.js')))
const { PLAGE: PLAGE_ALLUMETTES, genererAllumettes } = await import(pathToFileURL(join(typesDir, 'allumettes.generer.js')))

const NB_GRAINES = 50

let echecs = 0
function verifier(label, condition) {
  if (!condition) {
    echecs++
    console.log(`✗ ${label}`)
  }
}

function graine(i) {
  // Graine différente et déterministe à chaque appel (indépendante des
  // dates réelles) : même principe que generateurDuJour, sans dépendre du
  // socle au-delà de mulberry32.
  return mulberry32(1000 + i * 7919)
}

function verifierPlage(nom, plage, valeurs) {
  const horsPlage = valeurs.filter((v) => v < plage[0] || v > plage[1])
  verifier(`${nom} : les ${NB_GRAINES} valeurs sont dans [${plage[0]}, ${plage[1]}]`, horsPlage.length === 0)
}

// Bocal (D2.1) : valeur === nombre de bonbons effectivement placés.
const valeursBocal = []
for (let i = 0; i < NB_GRAINES; i++) {
  const rng = graine(i)
  const { valeur, bonbons } = genererBocal(rng)
  verifier(`bocal graine ${i} : valeur === bonbons.length`, valeur === bonbons.length)
  valeursBocal.push(valeur)
}
verifierPlage('bocal', PLAGE_BOCAL, valeursBocal)

// Ciel étoilé (D2.2) : valeur === nombre d'étoiles.
const valeursCiel = []
for (let i = 0; i < NB_GRAINES; i++) {
  const rng = graine(i)
  const { valeur, etoiles } = genererCiel(rng)
  verifier(`ciel graine ${i} : valeur === etoiles.length`, valeur === etoiles.length)
  valeursCiel.push(valeur)
}
verifierPlage('ciel', PLAGE_CIEL, valeursCiel)

// Foule vue de haut (D2.3) : valeur === nombre de têtes placées.
const valeursFoule = []
for (let i = 0; i < NB_GRAINES; i++) {
  const rng = graine(i)
  const { valeur, tetes } = genererFoule(rng)
  verifier(`foule graine ${i} : valeur === tetes.length`, valeur === tetes.length)
  valeursFoule.push(valeur)
}
verifierPlage('foule', PLAGE_FOULE, valeursFoule)

// Carte à pois (D2.4) : valeur === pourcentage recalculé depuis la grille.
const totalCellules = COLONNES * LIGNES
const valeursPois = []
for (let i = 0; i < NB_GRAINES; i++) {
  const rng = graine(i)
  const { valeur, cellules } = genererPois(rng)
  const pourcentageRecalcule = Math.round((cellules.size / totalCellules) * 1000) / 10
  verifier(`pois graine ${i} : valeur === % recalculé depuis la grille`, valeur === pourcentageRecalcule)
  valeursPois.push(valeur)
}
verifierPlage('pois', PLAGE_POIS, valeursPois)

// Allumettes en vrac (D2.5) : valeur === nombre d'allumettes.
const valeursAllumettes = []
for (let i = 0; i < NB_GRAINES; i++) {
  const rng = graine(i)
  const { valeur, allumettes } = genererAllumettes(rng)
  verifier(`allumettes graine ${i} : valeur === allumettes.length`, valeur === allumettes.length)
  valeursAllumettes.push(valeur)
}
verifierPlage('allumettes', PLAGE_ALLUMETTES, valeursAllumettes)

const total = 5 * NB_GRAINES * 2 // 2 contrôles par graine (valeur exacte + plage, cette dernière agrégée)
console.log(`${NB_GRAINES} graines × 5 types vérifiées (plage + valeur exacte).`)
console.log(echecs === 0 ? 'Tout est OK.' : `${echecs} échec(s) sur ${total} contrôles.`)
if (echecs > 0) process.exit(1)
