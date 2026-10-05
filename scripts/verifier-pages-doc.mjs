// Vérifie que les deux pages qui documentent le Lab sont à jour :
// - « Utilisation de l'IA » : missions terminées et changements de CLAUDE.md
//   depuis la dernière mission utilisation-ia* ;
// - « Tokens du Lab » : chaque token de tokens.css est listé sur la page, et inversement.
// Lancé chaque dimanche par la routine des idées (src/projets/PROPOSITIONS.md, §8).
// Ne modifie rien. Usage : node scripts/verifier-pages-doc.mjs
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

// --- Page « Utilisation de l'IA » -----------------------------------------
// Date de référence : le dernier RAPPORT.md d'une mission utilisation-ia*.
const dossiers = fs.readdirSync('missions', { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)

const rapportsPage = dossiers
  .filter(n => n.startsWith('utilisation-ia') && fs.existsSync(`missions/${n}/RAPPORT.md`))
  .map(n => git('log', '-1', '--format=%cI', '--', `missions/${n}/RAPPORT.md`))
  .filter(Boolean)
  .sort()
const reference = rapportsPage.at(-1)

const nouvelles = dossiers
  .filter(n => !n.startsWith('utilisation-ia') && fs.existsSync(`missions/${n}/RAPPORT.md`))
  .map(n => ({ nom: n, date: git('log', '--diff-filter=A', '--format=%cI', '--', `missions/${n}`).split('\n').at(-1) }))
  .filter(m => m.date > reference)
  .sort((a, b) => a.date.localeCompare(b.date))

const claudeMd = git('log', `--since=${reference}`, '--format=%h %s', '--', 'CLAUDE.md')
  .split('\n').filter(Boolean)

const pageIaAJour = nouvelles.length === 0 && claudeMd.length === 0

console.log(`# Page « Utilisation de l'IA » : ${pageIaAJour ? 'À JOUR' : 'EN RETARD'}`)
console.log(`Dernière mise à jour (RAPPORT de mission) : ${reference.slice(0, 10)}`)
if (nouvelles.length) {
  console.log(`Missions terminées depuis (${nouvelles.length}) :`)
  nouvelles.forEach(m => console.log(`- ${m.date.slice(0, 10)} ${m.nom}`))
}
if (claudeMd.length) {
  console.log(`Changements de CLAUDE.md depuis (routines, règles) (${claudeMd.length}) :`)
  claudeMd.forEach(l => console.log(`- ${l}`))
}

// --- Page « Tokens du Lab » -------------------------------------------------
const definis = new Set(
  [...fs.readFileSync('src/styles/tokens.css', 'utf8').matchAll(/^\s*(--[\w-]+)\s*:/gm)].map(m => m[1]),
)
const documentes = new Set(
  // Un token compte comme documenté s'il a sa ligne (name) ou s'il est la cible d'une autre (pointsTo).
  [...fs.readFileSync('src/lab/projects/LabTokens.jsx', 'utf8').matchAll(/(?:name|pointsTo): '(--[\w-]+)'/g)].map(m => m[1]),
)
const manquants = [...definis].filter(t => !documentes.has(t)).sort()
const fantomes = [...documentes].filter(t => !definis.has(t)).sort()
const tokensAJour = manquants.length === 0 && fantomes.length === 0

console.log('')
console.log(`# Page « Tokens du Lab » : ${tokensAJour ? 'À JOUR' : 'EN RETARD'}`)
if (manquants.length) console.log(`Définis dans tokens.css mais absents de la page (${manquants.length}) : ${manquants.join(' ')}`)
if (fantomes.length) console.log(`Listés sur la page mais supprimés de tokens.css (${fantomes.length}) : ${fantomes.join(' ')}`)
