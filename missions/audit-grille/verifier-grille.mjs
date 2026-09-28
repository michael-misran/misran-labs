// Vérification de la grille, des contrastes et de la matrice, sans framework de
// test et sans réseau : `fetch` est simulé, les réponses viennent des fixtures
// de la mission audit-github.
// Lancer : node missions/audit-grille/verifier-grille.mjs
// Code de sortie ≠ 0 en cas d'échec.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { explorerDepot } from '../../src/lab/audit/github.js'
import { analyse } from '../../src/lab/audit/analyse.js'
import { evaluerContrastes, rapportContraste } from '../../src/lab/audit/contrastes.js'

const ici = dirname(fileURLToPath(import.meta.url))
const fixture = (nom) => JSON.parse(readFileSync(resolve(ici, '..', 'audit-github', 'fixtures', nom), 'utf8'))

let echecs = 0
async function verifier(titre, fn) {
  try {
    await fn()
    console.log(`  ok   ${titre}`)
  } catch (e) {
    echecs++
    console.log(`  ECHEC ${titre}\n       ${e.message.split('\n').join('\n       ')}`)
  }
}

// Jeu de tokens au format du modèle commun (contexte, références, valeur).
const jeton = (nom, valeur, extra = {}) => ({
  nom,
  valeur,
  references: [],
  contexte: null,
  format: 'css',
  type: null,
  fichier: 'x.css',
  emplacement: 1,
  ...extra,
})
const ref = (nom, cible, extra = {}) => jeton(nom, `var(${cible})`, { references: [cible], ...extra })
const rgb = (hex) => ({ r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) })

/* --- D5 contrastes ---------------------------------------------------------- */
console.log('Contrastes (D5)')
await verifier('rapport WCAG exact : noir/blanc = 21, identiques = 1, #777/blanc ≈ 4,48', () => {
  assert.equal(Math.round(rapportContraste(rgb('#000000'), rgb('#ffffff')) * 100) / 100, 21)
  assert.equal(rapportContraste(rgb('#ffffff'), rgb('#000000')), rapportContraste(rgb('#000000'), rgb('#ffffff')))
  assert.equal(rapportContraste(rgb('#336699'), rgb('#336699')), 1)
  const r = rapportContraste(rgb('#777777'), rgb('#ffffff'))
  assert.ok(r > 4.47 && r < 4.49, String(r))
})
await verifier('paire texte/fond : ratio arrondi, échec sous 4,5, réussite au-dessus', () => {
  const r = evaluerContrastes([
    jeton('--color-text', '#777777'),
    jeton('--color-bg', '#ffffff'),
    jeton('--color-text-strong', '#000'),
  ])
  assert.equal(r.detectees, 2)
  const faible = r.paires.find((p) => p.texte === '--color-text')
  assert.equal(faible.ratio, 4.48)
  assert.equal(faible.ok, false)
  const fort = r.paires.find((p) => p.texte === '--color-text-strong')
  assert.equal(fort.ratio, 21)
  assert.equal(fort.ok, true)
  assert.equal(r.echecs, 1)
})
await verifier('résolution par références, jusqu’à la valeur finale', () => {
  const r = evaluerContrastes([
    jeton('--gray-900', '#111111'),
    jeton('--white', '#ffffff'),
    ref('--text-default', '--gray-900'),
    ref('--surface-default', '--white'),
  ])
  assert.equal(r.detectees, 1)
  assert.ok(r.paires[0].ok)
  assert.ok(r.paires[0].ratio > 17)
})
await verifier('références DTCG {a.b} et cycle ignoré sans exception', () => {
  const r = evaluerContrastes([
    jeton('color.base.black', '#000000', { format: 'json' }),
    jeton('color.base.white', '#ffffff', { format: 'json' }),
    jeton('color.text.primary', '{color.base.black}', { format: 'json', references: ['color.base.black'] }),
    jeton('color.background.page', '{color.base.white}', { format: 'json', references: ['color.base.white'] }),
    ref('--text-loop', '--bg-loop'),
    ref('--bg-loop', '--text-loop'),
  ])
  assert.equal(r.detectees, 1)
  assert.equal(r.paires[0].ratio, 21)
})
await verifier('appariement par contexte : un contexte ne se mélange pas avec un autre', () => {
  const r = evaluerContrastes([
    jeton('--text', '#000000', { contexte: ':root' }),
    jeton('--bg', '#ffffff', { contexte: ':root' }),
    jeton('--text', '#ffffff', { contexte: '.dark' }),
    jeton('--bg', '#000000', { contexte: '.dark' }),
  ])
  // :root×:root et .dark×.dark seulement : jamais un texte clair sur fond clair.
  assert.equal(r.detectees, 2)
  assert.ok(r.paires.every((p) => p.ok && p.ratio === 21))
  assert.deepEqual(r.paires.map((p) => p.contexte).sort(), ['.dark', ':root'])
})
await verifier('contexte null : apparié avec n’importe quel contexte', () => {
  const r = evaluerContrastes([
    jeton('--text', '#000000'),
    jeton('--bg', '#ffffff', { contexte: '.card' }),
  ])
  assert.equal(r.detectees, 1)
  assert.equal(r.paires[0].contexte, '.card')
})
await verifier('règle on-X : apparié en priorité avec X', () => {
  const r = evaluerContrastes([
    jeton('--primary', '#0000ff'),
    jeton('--on-primary', '#ffffff'),
    jeton('--bg-page', '#ffffff'),
  ])
  assert.equal(r.detectees, 1)
  assert.equal(r.paires[0].texte, '--on-primary')
  assert.equal(r.paires[0].fond, '--primary')
  assert.ok(r.paires[0].ok)
})
await verifier('règle on-X sans token X : repli sur les fonds génériques', () => {
  const r = evaluerContrastes([jeton('--on-accent', '#000000'), jeton('--surface', '#ffffff')])
  assert.equal(r.detectees, 1)
  assert.equal(r.paires[0].fond, '--surface')
})
await verifier('noms : segments, casse ; pas de faux positif sur « context » ou « textile »', () => {
  const r = evaluerContrastes([
    jeton('--Color-FG', '#000000'),
    jeton('--color-Canvas', '#ffffff'),
    jeton('--textile', '#000000'),
    jeton('--paper.tone', '#eeeeee'),
    jeton('--ink', '#222222'),
  ])
  const textes = new Set(r.paires.map((p) => p.texte))
  assert.ok(textes.has('--Color-FG'))
  assert.ok(textes.has('--ink'))
  assert.ok(!textes.has('--textile'))
  assert.equal(r.detectees, 4) // {--Color-FG, --ink} × {--color-Canvas, --paper.tone}
})
await verifier('couleurs non opaques, non couleur ou absentes : aucune paire, aucune exception', () => {
  const r = evaluerContrastes([
    jeton('--text', 'rgba(0,0,0,0.5)'),
    jeton('--bg', '#ffffff'),
    jeton('--text-size', '16px'),
    jeton('--bg-image', 'url(x.png)'),
    ref('--text-missing', '--nulle-part'),
  ])
  assert.deepEqual(r, { paires: [], detectees: 0, echecs: 0 })
  assert.deepEqual(evaluerContrastes([]), { paires: [], detectees: 0, echecs: 0 })
  assert.deepEqual(evaluerContrastes(null), { paires: [], detectees: 0, echecs: 0 })
})
await verifier('plafond de 200 paires, tri par nom', () => {
  const tokens = []
  for (let i = 0; i < 20; i++) tokens.push(jeton(`--text-${String(i).padStart(2, '0')}`, '#000000'))
  for (let i = 0; i < 20; i++) tokens.push(jeton(`--bg-${String(i).padStart(2, '0')}`, '#ffffff'))
  const r = evaluerContrastes(tokens) // 400 paires possibles
  assert.equal(r.paires.length, 200)
  assert.equal(r.detectees, 200)
  assert.equal(r.paires[0].texte, '--text-00')
  assert.equal(r.paires[0].fond, '--bg-00')
})
await verifier('tokens.css du site : analysé sans exception', () => {
  const css = readFileSync(resolve(ici, '..', '..', 'src', 'styles', 'tokens.css'), 'utf8')
  const resultat = analyse([{ nom: 'tokens.css', contenu: css }])
  const r = evaluerContrastes(resultat.tokens)
  assert.ok(r.detectees > 0, 'aucune paire détectée sur les tokens du site')
  assert.equal(r.paires.length, r.detectees)
})

/* --- D1 chemins ------------------------------------------------------------- */
console.log('Chemins de l’arborescence (D1, D6)')
function fetchSimule(routes) {
  const appels = []
  const f = async (url) => {
    appels.push(url)
    const route = routes[url]
    return { ok: !!route, status: route ? 200 : 404, headers: { get: () => null }, json: async () => route.json, text: async () => '' }
  }
  return { fetch: f, appels }
}
const API = 'https://api.github.com/repos/exemple/demo'
const routes = () => ({
  [API]: { json: fixture('repos.json') },
  [`${API}/git/trees/main?recursive=1`]: { json: fixture('arbre.json') },
})
const adresse = { proprietaire: 'exemple', depot: 'demo', branche: null, dossier: null }
await verifier('explorerDepot renvoie tous les chemins de fichiers, sans filtre, avec les deux mêmes requêtes', async () => {
  const sim = fetchSimule(routes())
  const r = await explorerDepot(adresse, sim.fetch)
  assert.equal(r.ok, true)
  const attendus = fixture('arbre.json').tree.filter((e) => e.type === 'blob').map((e) => e.path)
  assert.deepEqual(r.chemins, attendus)
  assert.ok(r.chemins.some((c) => c.includes('node_modules')) || r.chemins.length > r.echantillon.length)
  assert.equal(sim.appels.length, 2)
})
await verifier('chemins non filtrés par le sous-dossier demandé', async () => {
  const sim = fetchSimule(routes())
  const r = await explorerDepot({ ...adresse, dossier: 'src/styles' }, sim.fetch)
  assert.equal(r.ok, true)
  const total = fixture('arbre.json').tree.filter((e) => e.type === 'blob').length
  assert.equal(r.chemins.length, total)
})

console.log(echecs === 0 ? '\nToutes les vérifications passent' : `\n${echecs} vérification(s) en échec`)
process.exit(echecs === 0 ? 0 : 1)
