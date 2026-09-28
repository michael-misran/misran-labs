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
import { evaluerGrille, appliquerAjustements, outlinesSansFocus, reperComposants } from '../../src/lab/audit/grille.js'
import { prioriser, quadrantDe, QUADRANTS } from '../../src/lab/audit/priorites.js'

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

/* --- D2, D3, D4 grille -------------------------------------------------------- */
console.log('Grille (D2, D3, D4)')
const dix = (fabrique) => Array.from({ length: 10 }, (_, i) => fabrique(i))
const constat = (regle, gravite, tokens = []) => ({ regle, gravite, tokens, fichier: 'x.css', emplacement: 1, detail: { fr: 'x', en: 'x' } })
const parId = (grille, id) => grille.axes.find((a) => a.id === id)
const critereDe = (axe, id) => axe.criteres.find((c) => c.id === id)

await verifier('sans dépôt : axes 2, 4, 5, 6, 7 non évalués avec leur raison ; axes 1 et 3 notés', () => {
  const tokens = [jeton('--a', '#000'), ref('--b', '--a'), ref('--c', '--a'), jeton('--d', '#123')]
  const g = evaluerGrille({ resultat: { tokens, constats: [] }, contrastes: { paires: [], detectees: 0, echecs: 0 } })
  assert.equal(g.axes.length, 7)
  assert.deepEqual(g.axes.map((a) => a.id), ['architecture', 'couverture', 'accessibilite', 'composants', 'documentation', 'gouvernance', 'parite'])
  for (const id of ['couverture', 'composants', 'documentation', 'gouvernance']) {
    assert.equal(parId(g, id).note, null, id)
    assert.match(parId(g, id).resume.fr, /dépôt GitHub/)
    assert.match(parId(g, id).resume.en, /GitHub repository/)
  }
  assert.equal(parId(g, 'parite').note, null)
  assert.match(parId(g, 'parite').resume.fr, /auditeur/)
  assert.equal(parId(g, 'architecture').note, 3)
  // Accessibilité sans paire ni code : aucun critère évaluable → non noté, avec sa raison.
  assert.equal(parId(g, 'accessibilite').note, null)
  assert.match(parId(g, 'accessibilite').resume.fr, /paire/)
})
await verifier('accessibilité sans dépôt : notée quand des paires existent', () => {
  const tokens = [jeton('--text', '#000'), jeton('--bg', '#fff')]
  const contrastes = evaluerContrastes(tokens)
  const g = evaluerGrille({ resultat: { tokens, constats: [] }, contrastes })
  const axe = parId(g, 'accessibilite')
  assert.equal(axe.note, 3)
  assert.equal(critereDe(axe, 'focus-visible').ok, null)
  assert.equal(g.axesEvalues, 2)
})
await verifier('axe 1 : chaque critère, avec détail bilingue', () => {
  const tokens = dix((i) => (i < 2 ? ref(`--alias-${i}`, '--base') : jeton(`--base-${i}`, `#00000${i}`)))
  const constats = [constat('R1', 'erreur', ['--alias-0']), constat('R4', 'avertissement', ['--base-2', '--base-3']), constat('R4', 'avertissement', ['--base-4', '--base-2'])]
  const g = evaluerGrille({ resultat: { tokens, constats } })
  const axe = parId(g, 'architecture')
  assert.equal(critereDe(axe, 'aucune-erreur').ok, false)
  assert.equal(critereDe(axe, 'peu-avertissements').ok, false) // 3 tokens sur 10 = 30 %
  assert.equal(critereDe(axe, 'niveaux-alias').ok, true) // 2 sur 10 = 20 %, seuil inclus
  assert.equal(critereDe(axe, 'types-json').ok, null) // aucun JSON
  assert.equal(axe.note, 1) // 1 critère sur 3 évaluables
  for (const c of axe.criteres) assert.ok(c.detail.fr && c.detail.en)
})
await verifier('axe 1 : les avertissements à 5 % exactement passent ; types JSON à 90 %', () => {
  const json = dix((i) => jeton(`a.b${i}`, '#000', { format: 'json', type: i === 0 ? null : 'color' }))
  const vingt = [...json, ...dix((i) => jeton(`c.d${i}`, '#111', { format: 'json', type: 'color' }))]
  const constats = [constat('R4', 'avertissement', ['a.b1'])] // 1 token sur 20 = 5 %
  const axe = parId(evaluerGrille({ resultat: { tokens: vingt, constats } }), 'architecture')
  assert.equal(critereDe(axe, 'peu-avertissements').ok, true)
  assert.equal(critereDe(axe, 'types-json').ok, true) // 19 sur 20 = 95 %
  assert.equal(critereDe(axe, 'niveaux-alias').ok, false)
})
await verifier('axe 1 : aucun token → non évalué', () => {
  assert.equal(parId(evaluerGrille({ resultat: { tokens: [], constats: [] } }), 'architecture').note, null)
  assert.equal(parId(evaluerGrille({ resultat: null }), 'architecture').note, null)
  assert.equal(evaluerGrille().moyenne, null)
})
await verifier('arrondi de la note : round(3 × remplis / évaluables)', () => {
  // 4 critères évaluables (tokens JSON) : 0 → 0 ; 1 → 0,75 → 1 ; 2 → 1,5 → 2 ; 3 → 2,25 → 2 ; 4 → 3.
  const base = (nbOk) => {
    const tokens = dix((i) => jeton(`n${i}`, '#000', { format: 'json', type: nbOk >= 4 ? 'color' : null, references: nbOk >= 3 && i < 2 ? ['n9'] : [] }))
    const constats = nbOk >= 1 ? [] : [constat('R1', 'erreur', ['n0'])]
    if (nbOk === 2) constats.push(...dix((i) => constat('R4', 'avertissement', [`n${i}`])).slice(0, 0))
    return { tokens, constats }
  }
  const note = (r) => parId(evaluerGrille({ resultat: r }), 'architecture').note
  assert.equal(note(base(4)), 3)
  assert.equal(note(base(3)), 2) // types manquants seulement : 3/4 → 2,25 → 2
  // 1/4 → 0,75 → 1 : erreur, avertissements en trop, pas d'alias, pas de type... sauf « aucune erreur ».
  const un = { tokens: dix((i) => jeton(`n${i}`, '#000', { format: 'json' })), constats: dix((i) => constat('R4', 'avertissement', [`n${i}`])) }
  assert.equal(note(un), 1)
  // 2/4 → 1,5 → 2 : aucune erreur + alias, mais avertissements et types absents.
  const deux = { tokens: dix((i) => jeton(`n${i}`, '#000', { format: 'json', references: i < 3 ? ['n9'] : [] })), constats: dix((i) => constat('R4', 'avertissement', [`n${i}`])) }
  assert.equal(note(deux), 2)
  // 0/4 → 0
  const zero = { tokens: dix((i) => jeton(`n${i}`, '#000', { format: 'json' })), constats: [constat('R1', 'erreur', ['n0']), ...dix((i) => constat('R4', 'avertissement', [`n${i}`]))] }
  assert.equal(note(zero), 0)
})
await verifier('axe 2 : couverture', () => {
  const cas = (couverture) => parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, couverture }), 'couverture')
  const complete = cas({ taux: 0.9, dejaTokenisees: [{ occurrences: 4 }], valeursEnDur: 2, nombreDejaTokenisees: 1 })
  assert.equal(complete.note, 3)
  const moyen = cas({ taux: 0.6, dejaTokenisees: [], valeursEnDur: 5, nombreDejaTokenisees: 0 })
  assert.equal(critereDe(moyen, 'taux-50').ok, true)
  assert.equal(critereDe(moyen, 'taux-80').ok, false)
  assert.equal(moyen.note, 2)
  const pauvre = cas({ taux: 0.1, dejaTokenisees: [{ occurrences: 6 }, { occurrences: 4 }], valeursEnDur: 50, nombreDejaTokenisees: 2 })
  assert.equal(critereDe(pauvre, 'deja-tokenisees').ok, false) // 10 occurrences cumulées, seuil « moins de 10 »
  assert.equal(pauvre.note, 0)
  const sansTaux = cas({ taux: null, dejaTokenisees: [], valeursEnDur: 0, nombreDejaTokenisees: 0 })
  assert.equal(critereDe(sansTaux, 'taux-50').ok, null)
  assert.equal(sansTaux.note, 3) // un seul critère évaluable, rempli
  assert.equal(cas(null).note, null)
})
await verifier('axe 3 : contrastes (tous, 90 %) et outline sans :focus-visible', () => {
  const g = (contrastes, fichiersCode) => parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, contrastes, fichiersCode }), 'accessibilite')
  const paires = (n, echecs) => ({ paires: [], detectees: n, echecs })
  assert.equal(critereDe(g(paires(10, 0)), 'contrastes-tous').ok, true)
  assert.equal(critereDe(g(paires(10, 1)), 'contrastes-tous').ok, false)
  assert.equal(critereDe(g(paires(10, 1)), 'contrastes-90').ok, true) // 90 % pile
  assert.equal(critereDe(g(paires(10, 2)), 'contrastes-90').ok, false)
  const fautif = { nom: 'a.css', contenu: 'button { outline: none; }' }
  const sain = { nom: 'b.css', contenu: 'button { outline: 0 } button:focus-visible { outline: 2px solid red }' }
  const jsx = { nom: 'c.jsx', contenu: "const s = { outline: 'none' }" }
  const zeroPx = { nom: 'd.css', contenu: 'a { outline: 0px }' }
  const normal = { nom: 'e.css', contenu: 'a { outline: 1px solid; outline-offset: 0 }' }
  assert.equal(critereDe(g(paires(2, 0), [sain, normal]), 'focus-visible').ok, true)
  const axe = g(paires(2, 0), [fautif, sain, jsx, zeroPx, normal])
  assert.equal(critereDe(axe, 'focus-visible').ok, false)
  assert.match(critereDe(axe, 'focus-visible').detail.fr, /3 fichiers/)
  assert.deepEqual(outlinesSansFocus([fautif, sain, jsx, zeroPx, normal]), ['a.css', 'c.jsx', 'd.css'])
  assert.equal(critereDe(g(paires(2, 0), []), 'focus-visible').ok, null)
  assert.equal(critereDe(g(paires(2, 0), null), 'focus-visible').ok, null)
  assert.deepEqual(outlinesSansFocus(null), [])
})
const chemins6 = [
  'README.md',
  'package.json',
  'src/components/Button.tsx',
  'src/components/Button.stories.tsx',
  'src/components/Button.test.tsx',
  'src/components/Card.tsx',
  'src/components/Card.stories.tsx',
  'src/components/Input.tsx',
  'src/components/input.tsx',
  'src/components/index.ts',
  'src/ui/Modal.vue',
  'src/ui/Tabs.svelte',
  'src/components/__tests__/Helper.jsx',
  'node_modules/lib/components/Ghost.jsx',
  'src/pages/Home.jsx',
]
await verifier('axe 4 : composants repérés (majuscule, components/ ou ui/, hors tests/stories), stories, tests', () => {
  assert.deepEqual(reperComposants(chemins6), [
    'src/components/Button.tsx',
    'src/components/Card.tsx',
    'src/components/Input.tsx',
    'src/ui/Modal.vue',
    'src/ui/Tabs.svelte',
  ])
  const axe = parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, chemins: chemins6 }), 'composants')
  assert.equal(critereDe(axe, 'au-moins-5').ok, true)
  assert.equal(critereDe(axe, 'stories').ok, false) // 2 sur 5 < 50 %
  assert.equal(critereDe(axe, 'stories').manque, 3)
  assert.equal(critereDe(axe, 'tests').ok, false) // 1 sur 5
  assert.equal(critereDe(axe, 'tests').manque, 4)
  assert.equal(axe.note, 1)
  // Moitié exactement : 1 story sur 2 composants
  const deux = parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, chemins: ['components/A.jsx', 'components/B.jsx', 'A.stories.js', 'x/B.spec.js'] }), 'composants')
  assert.equal(critereDe(deux, 'stories').ok, true)
  assert.equal(critereDe(deux, 'tests').ok, true)
  assert.equal(critereDe(deux, 'au-moins-5').ok, false)
  // Aucun composant : les deux ratios ne sont pas évaluables
  const aucun = parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, chemins: ['README.md'] }), 'composants')
  assert.equal(critereDe(aucun, 'stories').ok, null)
  assert.equal(aucun.note, 0)
})
await verifier('axe 5 : documentation', () => {
  const noter = (chemins) => parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, chemins }), 'documentation')
  const complet = noter(['README.md', 'docs/guide.md', '.storybook/main.js', 'CONTRIBUTING.md'])
  assert.equal(complet.note, 3)
  assert.equal(noter(['sous/README.md']).note, 0) // README seulement à la racine
  const mdx = noter(['README.md', 'src/Intro.mdx', 'packages/x/.storybook/preview.js'])
  assert.equal(critereDe(mdx, 'docs').ok, true)
  assert.equal(critereDe(mdx, 'storybook').ok, true)
  assert.equal(critereDe(mdx, 'contributing').ok, false)
  assert.equal(mdx.note, 2) // 3 sur 4 → 2,25 → 2
})
await verifier('axe 6 : gouvernance', () => {
  const noter = (chemins) => parId(evaluerGrille({ resultat: { tokens: [], constats: [] }, chemins }), 'gouvernance')
  assert.equal(noter(['CHANGELOG.md', '.github/CODEOWNERS', '.github/workflows/ci.yml', 'LICENSE']).note, 3)
  assert.equal(critereDe(noter(['.changeset/config.json']), 'changelog').ok, true)
  assert.equal(critereDe(noter(['docs/CODEOWNERS']), 'codeowners').ok, true)
  assert.equal(critereDe(noter(['src/CODEOWNERS']), 'codeowners').ok, false)
  assert.equal(critereDe(noter(['.github/workflows/']), 'workflows').ok, true)
  assert.equal(critereDe(noter(['LICENSE.md']), 'licence').ok, true)
  assert.equal(critereDe(noter(['LICENCE-MIT']), 'licence').ok, true)
  assert.equal(critereDe(noter(['sous/LICENSE']), 'licence').ok, false)
  assert.equal(noter([]).note, 0)
})
await verifier('moyenne : axes évalués seulement, une décimale, jamais de note inventée', () => {
  const tokens = [jeton('--a', '#000'), ref('--b', '--a')]
  const chemins = ['README.md', 'CHANGELOG.md', 'LICENSE', '.github/workflows/ci.yml'] // 2 sur 4, 3 sur 4
  const g = evaluerGrille({ resultat: { tokens, constats: [] }, chemins, contrastes: { paires: [], detectees: 0, echecs: 0 }, couverture: { taux: 0.9, dejaTokenisees: [], valeursEnDur: 0, nombreDejaTokenisees: 0 } })
  const notes = g.axes.map((a) => a.note)
  assert.deepEqual(notes, [3, 3, null, 0, 1, 2, null]) // axe 3 : pas de paire ni de code
  assert.equal(g.axesEvalues, 5)
  assert.equal(g.moyenne, 1.8) // (3 + 3 + 0 + 1 + 2) / 5 = 1,8
})
await verifier('ajustement (D4) : note et commentaire, note calculée conservée, moyenne recalculée', () => {
  const tokens = [jeton('--a', '#000'), ref('--b', '--a')]
  const g = evaluerGrille({ resultat: { tokens, constats: [] }, contrastes: { paires: [], detectees: 0, echecs: 0 } })
  assert.equal(g.axesEvalues, 1)
  assert.equal(g.moyenne, 3)
  const a = appliquerAjustements(g, { parite: { note: 2, commentaire: '  Écarts sur les rayons.  ' } })
  const parite = parId(a, 'parite')
  assert.equal(parite.note, null)
  assert.equal(parite.noteFinale, 2)
  assert.equal(parite.ajustee, true)
  assert.equal(parite.commentaire, 'Écarts sur les rayons.')
  assert.equal(a.axesEvalues, 2)
  assert.equal(a.moyenne, 2.5)
  // Abaisser un axe noté ; « non évalué » (null) le sort de la moyenne
  const b = appliquerAjustements(g, { architecture: { note: 1 }, parite: { note: 3 } })
  assert.equal(parId(b, 'architecture').note, 3)
  assert.equal(parId(b, 'architecture').noteFinale, 1)
  assert.equal(b.moyenne, 2)
  const c = appliquerAjustements(g, { architecture: { note: null } })
  assert.equal(c.moyenne, null)
  assert.equal(c.axesEvalues, 0)
  // Commentaire seul : pas « ajustée », note inchangée
  const d = appliquerAjustements(g, { architecture: { commentaire: 'RAS' } })
  assert.equal(parId(d, 'architecture').ajustee, false)
  assert.equal(parId(d, 'architecture').noteFinale, 3)
  assert.equal(parId(d, 'architecture').commentaire, 'RAS')
  // Sans ajustement : identique aux notes calculées ; la grille d'origine n'est pas modifiée
  assert.equal(appliquerAjustements(g).moyenne, g.moyenne)
  assert.equal(parId(g, 'parite').noteFinale, undefined)
})

/* --- D7 matrice -------------------------------------------------------------- */
console.log('Matrice impact × effort (D7)')
const sujetsDe = (entrees) => prioriser(entrees).sujets.map((s) => s.id)
const grilleVide = evaluerGrille({ resultat: { tokens: [], constats: [] } })
await verifier('quadrants selon impact et effort', () => {
  assert.equal(quadrantDe('fort', 'faible'), 'gains-rapides')
  assert.equal(quadrantDe('fort', 'moyen'), 'gains-rapides')
  assert.equal(quadrantDe('fort', 'fort'), 'chantiers')
  assert.equal(quadrantDe('moyen', 'faible'), 'appoint')
  assert.equal(quadrantDe('faible', 'faible'), 'appoint')
  assert.equal(quadrantDe('moyen', 'moyen'), 'plus-tard')
  assert.equal(quadrantDe('moyen', 'fort'), 'plus-tard')
  assert.equal(quadrantDe('faible', 'moyen'), 'plus-tard')
  assert.deepEqual(QUADRANTS.map((q) => q.id), ['gains-rapides', 'chantiers', 'appoint', 'plus-tard'])
})
await verifier('un sujet n’apparaît que s’il a une occurrence, avec son compte', () => {
  assert.deepEqual(sujetsDe({ resultat: { tokens: [], constats: [] }, grille: grilleVide }), [])
  const p = prioriser({
    resultat: { tokens: [], constats: [constat('R1', 'erreur'), constat('R2', 'erreur'), constat('R4', 'avertissement'), constat('R5', 'info'), constat('R5', 'info'), constat('R6', 'info'), constat('R3', 'avertissement'), constat('R7', 'info'), constat('R8', 'info')] },
    grille: grilleVide,
  })
  const parIdSujet = (id) => p.sujets.find((s) => s.id === id)
  assert.equal(parIdSujet('references').compte, 2)
  assert.equal(parIdSujet('doublons').compte, 3)
  assert.equal(parIdSujet('inutilises').compte, 1)
  assert.equal(parIdSujet('hygiene').compte, 3)
  assert.equal(parIdSujet('contrastes'), undefined)
  assert.equal(parIdSujet('couverture'), undefined)
  assert.deepEqual(p.quadrants['gains-rapides'].map((s) => s.id), ['references'])
  assert.deepEqual(p.quadrants.appoint.map((s) => s.id), ['doublons', 'hygiene'])
  assert.deepEqual(p.quadrants['plus-tard'].map((s) => s.id), ['inutilises'])
  assert.deepEqual(p.quadrants.chantiers, [])
  for (const s of p.sujets) assert.ok(s.titre.fr && s.titre.en && s.unite.fr && s.unite.en)
})
await verifier('sujets issus de la couverture, des contrastes et des axes 4 à 6', () => {
  const chemins = ['components/A.jsx', 'components/B.jsx']
  const grille = evaluerGrille({ resultat: { tokens: [], constats: [] }, chemins })
  const p = prioriser({
    resultat: { tokens: [], constats: [] },
    couverture: { taux: 0.4, valeursEnDur: 60, nombreDejaTokenisees: 7, dejaTokenisees: [] },
    contrastes: { paires: [], detectees: 5, echecs: 2 },
    grille,
  })
  const get = (id) => p.sujets.find((s) => s.id === id)
  assert.equal(get('couverture').compte, 60)
  assert.equal(get('couverture').quadrant, 'chantiers')
  assert.equal(get('deja-tokenisees').compte, 7)
  assert.equal(get('deja-tokenisees').quadrant, 'gains-rapides')
  assert.equal(get('contrastes').compte, 2)
  assert.equal(get('contrastes').quadrant, 'gains-rapides')
  assert.equal(get('composants').compte, 4) // 2 sans story + 2 sans test
  assert.equal(get('composants').quadrant, 'plus-tard')
  assert.equal(get('documentation').compte, 4)
  assert.equal(get('documentation').quadrant, 'plus-tard')
  assert.equal(get('gouvernance').compte, 4)
  assert.equal(get('gouvernance').quadrant, 'appoint')
  // Couverture ≥ 80 % : pas de sujet ; couverture absente : idem
  assert.equal(sujetsDe({ resultat: { tokens: [], constats: [] }, couverture: { taux: 0.8, valeursEnDur: 9, nombreDejaTokenisees: 0, dejaTokenisees: [] }, grille: grilleVide }).includes('couverture'), false)
  assert.equal(sujetsDe({ resultat: { tokens: [], constats: [] }, couverture: { taux: null, valeursEnDur: 0, nombreDejaTokenisees: 0, dejaTokenisees: [] }, grille: grilleVide }).includes('couverture'), false)
})
await verifier('entrées absentes : aucune exception', () => {
  assert.deepEqual(prioriser().sujets, [])
  assert.deepEqual(prioriser({ resultat: null, grille: null }).sujets, [])
})
await verifier('tokens du site : grille, contrastes et matrice sans exception', () => {
  const css = readFileSync(resolve(ici, '..', '..', 'src', 'styles', 'tokens.css'), 'utf8')
  const resultat = analyse([{ nom: 'tokens.css', contenu: css }])
  const contrastes = evaluerContrastes(resultat.tokens)
  const g = evaluerGrille({ resultat, contrastes })
  assert.equal(g.axes.length, 7)
  assert.ok(parId(g, 'architecture').note !== null)
  assert.ok(g.moyenne >= 0 && g.moyenne <= 3)
  assert.ok(Array.isArray(prioriser({ resultat, grille: g, contrastes }).sujets))
})

console.log(echecs === 0 ? '\nToutes les vérifications passent' : `\n${echecs} vérification(s) en échec`)
process.exit(echecs === 0 ? 0 : 1)
