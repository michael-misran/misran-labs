// Mesure « avant / après » : rejoue localement l'audit du mode GitHub de l'outil
// /lab/audit-tokens (mêmes modules, mêmes règles de repérage), sans réseau.
// Copié de missions/site-avant-apres/mesurer-audit.mjs (même contenu, chemin de sortie adapté à ce dossier).
// Usage : node missions/finitions-lab/mesurer-audit.mjs avant|apres
// Écrit missions/finitions-lab/mesure-<etiquette>.json
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { reperer, filtrerCandidatsLus } from '../../src/lab/audit/github.js'
import { analyse } from '../../src/lab/audit/analyse.js'
import { extraireUsagesTokens, mesurerCouverture } from '../../src/lab/audit/couverture.js'
import { evaluerContrastes } from '../../src/lab/audit/contrastes.js'
import { evaluerGrille } from '../../src/lab/audit/grille.js'
import { prioriser } from '../../src/lab/audit/priorites.js'

const etiquette = process.argv[2]
if (!['avant', 'apres'].includes(etiquette)) {
  console.error('Usage : node mesurer-audit.mjs avant|apres')
  process.exit(1)
}

const ici = dirname(fileURLToPath(import.meta.url))
const racine = join(ici, '..', '..')

// Fichiers suivis par Git (appel direct, sans shell) ; un fichier supprimé du disque est ignoré.
const suivis = execFileSync('git', ['ls-files', '-z'], { cwd: racine, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  .split('\0')
  .filter(Boolean)
const arbre = []
for (const path of suivis) {
  try {
    arbre.push({ path, type: 'blob', size: statSync(join(racine, path)).size })
  } catch {
    // supprimé mais pas encore commité : ignoré
  }
}

const reperage = reperer(arbre)
const lire = (chemins) => chemins.map(({ chemin }) => ({ nom: chemin, contenu: readFileSync(join(racine, chemin), 'utf8') }))

const { gardes: fichiersTokens } = filtrerCandidatsLus(lire(reperage.candidats))
const fichiersCode = lire(reperage.echantillon)
const chemins = arbre.map((e) => e.path)

const usages = extraireUsagesTokens(fichiersCode)
const resultat = analyse(fichiersTokens, { usagesExternes: usages })
const couverture = mesurerCouverture(fichiersCode, resultat.tokens)
const contrastes = evaluerContrastes(resultat.tokens)
const grille = evaluerGrille({ resultat, couverture, chemins, contrastes, fichiersCode })
const priorites = prioriser({ resultat, couverture, grille, contrastes })

const mesure = {
  etiquette,
  commit: execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: racine, encoding: 'utf8' }).trim(),
  fichiersTokens: fichiersTokens.map((f) => f.nom),
  fichiersCodeAnalyses: fichiersCode.length,
  eligibles: reperage.eligibles,
  moyenne: grille.moyenne,
  axesEvalues: grille.axesEvalues,
  axes: grille.axes.map((a) => ({
    id: a.id,
    note: a.note,
    criteres: (a.criteres ?? []).map((c) => ({ id: c.id, rempli: c.rempli ?? c.ok ?? null, detail: c.detail?.fr ?? null })),
  })),
  couverture: {
    taux: couverture.taux,
    usagesTokens: couverture.usagesTokens,
    valeursEnDur: couverture.valeursEnDur,
    nombreDejaTokenisees: couverture.nombreDejaTokenisees,
    dejaTokenisees: couverture.dejaTokenisees,
    valeursRepetees: couverture.valeursRepetees,
    parFichier: couverture.parFichier,
  },
  contrastes: contrastes,
  priorites: priorites,
  resume: resultat.resume,
}

const sortie = join(ici, `mesure-${etiquette}.json`)
writeFileSync(sortie, JSON.stringify(mesure, null, 2) + '\n')
console.log(`Mesure « ${etiquette} » écrite : ${sortie}`)
console.log(`Moyenne ${mesure.moyenne} sur ${mesure.axesEvalues} axes ; couverture ${(mesure.couverture.taux * 100).toFixed(1)} %`)
for (const a of mesure.axes) console.log(`  ${a.id} : ${a.note}`)
