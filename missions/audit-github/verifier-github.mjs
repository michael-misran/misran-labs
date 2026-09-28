// Vérification de la lecture GitHub et de la couverture, sans framework de test
// et sans réseau : `fetch` est simulé, les réponses viennent de ./fixtures/.
// Lancer : node missions/audit-github/verifier-github.mjs
// Code de sortie ≠ 0 en cas d'échec.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  lireAdresse,
  reperer,
  explorerDepot,
  lireContenus,
  filtrerCandidatsLus,
  formaterHeure,
} from '../../src/lab/audit/github.js'

const ici = dirname(fileURLToPath(import.meta.url))
const fixture = (nom) => readFileSync(resolve(ici, 'fixtures', nom), 'utf8')
const json = (nom) => JSON.parse(fixture(nom))

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

/* --- fetch simulé ---------------------------------------------------------- */
// `routes` : { url: { statut?, entetes?, json?, texte? } | Error }. URL inconnue → 404.
// `appels` garde chaque appel tel que reçu (URL + éventuel second argument).
function simulerFetch(routes, { delai = 0 } = {}) {
  const appels = []
  let enCours = 0
  const etat = { maxParalleles: 0 }
  const fetchSimule = async (...args) => {
    const [url] = args
    appels.push(args)
    enCours++
    etat.maxParalleles = Math.max(etat.maxParalleles, enCours)
    if (delai) await new Promise((r) => setTimeout(r, delai))
    enCours--
    const route = routes[url]
    if (route instanceof Error) throw route
    const statut = route ? (route.statut ?? 200) : 404
    const entetes = Object.fromEntries(Object.entries(route?.entetes ?? {}).map(([k, v]) => [k.toLowerCase(), String(v)]))
    return {
      ok: statut >= 200 && statut < 300,
      status: statut,
      headers: { get: (nom) => entetes[nom.toLowerCase()] ?? null },
      json: async () => {
        if (route?.json === undefined) throw new Error('pas de JSON')
        return route.json
      },
      text: async () => route?.texte ?? '',
    }
  }
  return { fetch: fetchSimule, appels, etat }
}

const API = 'https://api.github.com/repos/exemple/demo'
const RAW = 'https://raw.githubusercontent.com/exemple/demo/main/'
const routesOk = () => ({
  [API]: { json: json('repos.json') },
  [`${API}/git/trees/main?recursive=1`]: { json: json('arbre.json') },
})
const adresseDemo = { proprietaire: 'exemple', depot: 'demo', branche: null, dossier: null }

/* --- D2 adresses ------------------------------------------------------------ */
console.log('Adresses (D2)')
await verifier('formes acceptées', () => {
  const base = { proprietaire: 'exemple', depot: 'demo', branche: null, dossier: null }
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo'), base)
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo.git'), base)
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo/'), base)
  assert.deepEqual(lireAdresse('  github.com/exemple/demo  '), base)
  assert.deepEqual(lireAdresse('exemple/demo'), base)
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo?tab=readme#top'), base)
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo/tree/dev'), { ...base, branche: 'dev' })
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo/tree/dev/'), { ...base, branche: 'dev' })
  assert.deepEqual(lireAdresse('https://github.com/exemple/demo/tree/dev/src/styles'), {
    ...base,
    branche: 'dev',
    dossier: 'src/styles',
  })
  assert.deepEqual(lireAdresse('https://www.github.com/exemple/mon.depot-v2.git'), {
    ...base,
    depot: 'mon.depot-v2',
  })
})
await verifier('branche avec / : seul le premier segment est pris pour la branche', () => {
  const a = lireAdresse('https://github.com/exemple/demo/tree/feature/login')
  assert.equal(a.branche, 'feature')
  assert.equal(a.dossier, 'login')
})
await verifier('adresses invalides → null', () => {
  for (const mauvaise of [
    '',
    '   ',
    'pas une adresse',
    'https://gitlab.com/exemple/demo',
    'https://github.com/seul',
    'https://github.com/exemple/demo/issues',
    'https://github.com/exemple/demo/tree',
    'exemple/../demo',
    'a b/c',
    null,
    undefined,
    42,
  ]) {
    assert.equal(lireAdresse(mauvaise), null, `« ${mauvaise} » aurait dû être refusée`)
  }
})

/* --- D4, D5 repérage --------------------------------------------------------- */
console.log('Repérage des fichiers (D4, D5)')
const arbre = json('arbre.json').tree
const chemins = (liste) => liste.map((f) => f.chemin)

await verifier('candidats tokens : json, css, scss ; exclusions ; 400 Ko écarté', () => {
  const r = reperer(arbre)
  assert.deepEqual(chemins(r.candidats), [
    'design/brand.tokens.json',
    'packages/ui/theme.scss',
    'src/styles/tokens.css',
    'src/styles/variables.css',
    'tokens/design-tokens.json',
  ])
  assert.equal(r.candidatsTotal, 5)
})
await verifier('échantillon : priorité src/app/components/packages, tests et gros fichiers écartés', () => {
  const r = reperer(arbre)
  assert.deepEqual(chemins(r.echantillon), [
    'app/page.tsx',
    'src/App.tsx',
    'src/Widget.vue',
    'src/components/Button.jsx',
    'src/styles/reset.css',
    'lib/util.js',
  ])
  assert.equal(r.eligibles, 6)
})
await verifier('plafonds : 20 candidats, 60 fichiers de code (compteurs = éligibles)', () => {
  const beaucoup = [
    ...Array.from({ length: 25 }, (_, i) => ({ path: `tokens/t${String(i).padStart(2, '0')}.json`, type: 'blob', size: 100 })),
    ...Array.from({ length: 100 }, (_, i) => ({ path: `lib/f${String(i).padStart(3, '0')}.js`, type: 'blob', size: 100 })),
  ]
  const r = reperer(beaucoup)
  assert.equal(r.candidats.length, 20)
  assert.equal(r.candidatsTotal, 25)
  assert.equal(r.echantillon.length, 60)
  assert.equal(r.eligibles, 100)
})
await verifier('dossier : exploration limitée au sous-dossier', () => {
  const r = reperer(arbre, 'src/styles')
  assert.deepEqual(chemins(r.candidats), ['src/styles/tokens.css', 'src/styles/variables.css'])
  assert.deepEqual(chemins(r.echantillon), ['src/styles/reset.css'])
  assert.deepEqual(reperer(arbre, 'src/styl').echantillon, [], 'un préfixe partiel n’est pas un dossier')
})
await verifier('arbre absent ou incohérent : pas d’exception', () => {
  assert.deepEqual(reperer(undefined).candidats, [])
  assert.deepEqual(reperer([null, 3, { path: 5 }]).echantillon, [])
})
await verifier('fichier css sans propriété personnalisée écarté avec avertissement', () => {
  const { gardes, avertissements } = filtrerCandidatsLus([
    { nom: 'src/styles/tokens.css', contenu: fixture('tokens.css') },
    { nom: 'src/styles/reset.css', contenu: fixture('reset.css') },
    { nom: 'tokens/design-tokens.json', contenu: '{}' },
  ])
  assert.deepEqual(gardes.map((f) => f.nom), ['src/styles/tokens.css', 'tokens/design-tokens.json'])
  assert.equal(avertissements.length, 1)
  assert.equal(avertissements[0].fichier, 'src/styles/reset.css')
  assert.ok(avertissements[0].detail.fr && avertissements[0].detail.en)
})

/* --- D3 réseau ---------------------------------------------------------------- */
console.log('Exploration d’un dépôt (D3, fetch simulé)')

await verifier('deux appels exactement, sans en-tête, branche par défaut lue', async () => {
  const sim = simulerFetch(routesOk())
  const r = await explorerDepot(adresseDemo, sim.fetch)
  assert.equal(r.ok, true)
  assert.equal(r.branche, 'main')
  assert.equal(r.taille, 1234)
  assert.equal(r.candidats.length, 5)
  assert.equal(r.echantillon.length, 6)
  assert.deepEqual(r.avertissements, [])
  assert.deepEqual(
    sim.appels.map((a) => a[0]),
    [API, `${API}/git/trees/main?recursive=1`]
  )
  assert.ok(sim.appels.every((a) => a.length === 1), 'aucun second argument (donc aucun en-tête d’authentification)')
})
await verifier('branche donnée dans l’adresse : pas de lecture de la branche par défaut', async () => {
  const routes = routesOk()
  routes[`${API}/git/trees/dev?recursive=1`] = { json: json('arbre.json') }
  const sim = simulerFetch(routes)
  const r = await explorerDepot({ ...adresseDemo, branche: 'dev', dossier: 'src/styles' }, sim.fetch)
  assert.equal(r.ok, true)
  assert.equal(r.branche, 'dev')
  assert.equal(r.dossier, 'src/styles')
  assert.equal(r.candidats.length, 2)
})
await verifier('404 : dépôt introuvable ou privé', async () => {
  const sim = simulerFetch({})
  const r = await explorerDepot(adresseDemo, sim.fetch)
  assert.equal(r.ok, false)
  assert.match(r.erreur.fr, /introuvable ou privé/)
  assert.match(r.erreur.en, /not found or private/)
  assert.equal(sim.appels.length, 1, 'on s’arrête au premier échec')
})
await verifier('dépôt marqué privé : refusé', async () => {
  const sim = simulerFetch({ [API]: { json: { ...json('repos.json'), private: true } } })
  const r = await explorerDepot(adresseDemo, sim.fetch)
  assert.equal(r.ok, false)
  assert.match(r.erreur.fr, /privé/)
})
await verifier('404 sur l’arborescence : branche introuvable', async () => {
  const sim = simulerFetch({ [API]: { json: json('repos.json') } })
  const r = await explorerDepot({ ...adresseDemo, branche: 'nexiste-pas' }, sim.fetch)
  assert.equal(r.ok, false)
  assert.match(r.erreur.fr, /Branche introuvable/)
})
await verifier('limite atteinte (403, puis 429) : heure de reprise locale', async () => {
  const reset = Math.floor(new Date(2030, 0, 1, 14, 5).getTime() / 1000)
  assert.equal(formaterHeure(reset), '14:05')
  for (const statut of [403, 429]) {
    const sim = simulerFetch({
      [API]: { statut, entetes: { 'X-RateLimit-Remaining': '0', 'X-RateLimit-Reset': reset } },
    })
    const r = await explorerDepot(adresseDemo, sim.fetch)
    assert.equal(r.ok, false)
    assert.match(r.erreur.fr, /Limite de GitHub atteinte \(60 requêtes\/heure sans connexion\), réessaie après 14:05/)
    assert.match(r.erreur.en, /rate limit reached.*try again after 14:05/)
  }
})
await verifier('403 sans limite atteinte : refus générique, pas « limite »', async () => {
  const sim = simulerFetch({ [API]: { statut: 403, entetes: { 'x-ratelimit-remaining': '12' } } })
  const r = await explorerDepot(adresseDemo, sim.fetch)
  assert.equal(r.ok, false)
  assert.doesNotMatch(r.erreur.fr, /Limite/)
  assert.match(r.erreur.fr, /403/)
})
await verifier('arbre tronqué : avertissement, on continue', async () => {
  const routes = routesOk()
  routes[`${API}/git/trees/main?recursive=1`] = { json: { ...json('arbre.json'), truncated: true } }
  const r = await explorerDepot(adresseDemo, simulerFetch(routes).fetch)
  assert.equal(r.ok, true)
  assert.equal(r.avertissements.length, 1)
  assert.match(r.avertissements[0].detail.fr, /tronqué/)
  assert.match(r.avertissements[0].detail.en, /truncated/)
  assert.equal(r.candidats.length, 5)
})
await verifier('dossier absent de l’arbre : avertissement', async () => {
  const r = await explorerDepot({ ...adresseDemo, dossier: 'nulle/part' }, simulerFetch(routesOk()).fetch)
  assert.equal(r.ok, true)
  assert.equal(r.avertissements.length, 1)
  assert.equal(r.candidats.length, 0)
})
await verifier('erreur réseau et réponses illisibles : jamais d’exception', async () => {
  const reseau = await explorerDepot(adresseDemo, simulerFetch({ [API]: new Error('réseau coupé') }).fetch)
  assert.equal(reseau.ok, false)
  assert.match(reseau.erreur.fr, /Impossible de joindre GitHub/)
  assert.match(reseau.erreur.en, /Could not reach GitHub/)

  const illisible = await explorerDepot(adresseDemo, simulerFetch({ [API]: { statut: 200 } }).fetch)
  assert.equal(illisible.ok, false)

  const sansArbre = simulerFetch({
    [API]: { json: json('repos.json') },
    [`${API}/git/trees/main?recursive=1`]: { json: { tree: 'pas un tableau' } },
  })
  assert.equal((await explorerDepot(adresseDemo, sansArbre.fetch)).ok, false)

  const nul = await explorerDepot(null, simulerFetch({}).fetch)
  assert.equal(nul.ok, false)
  assert.ok(nul.erreur.fr && nul.erreur.en)
})

/* --- lecture du contenu --------------------------------------------------------- */
console.log('Lecture du contenu (raw.githubusercontent.com)')

await verifier('au plus 6 en parallèle, progression, ordre conservé, échec isolé', async () => {
  const cibles = Array.from({ length: 15 }, (_, i) => `src/f${i}.css`)
  const routes = {}
  for (const c of cibles) routes[RAW + c] = { texte: `contenu de ${c}` }
  delete routes[RAW + 'src/f7.css'] // → 404 pour ce seul fichier
  const sim = simulerFetch(routes, { delai: 5 })
  const progression = []
  const r = await lireContenus({ ...adresseDemo, branche: 'main' }, cibles, sim.fetch, (faits, total) =>
    progression.push([faits, total])
  )
  assert.ok(sim.etat.maxParalleles <= 6, `${sim.etat.maxParalleles} requêtes en parallèle`)
  assert.ok(sim.etat.maxParalleles >= 2, 'le parallélisme est bien utilisé')
  assert.equal(r.fichiers.length, 14)
  assert.equal(r.echecs.length, 1)
  assert.equal(r.echecs[0].chemin, 'src/f7.css')
  assert.match(r.echecs[0].erreur.fr, /introuvable/)
  assert.deepEqual(r.fichiers.map((f) => f.nom), cibles.filter((c) => c !== 'src/f7.css'))
  assert.equal(r.fichiers[0].contenu, 'contenu de src/f0.css')
  assert.equal(progression.length, 15)
  assert.deepEqual(progression.at(-1), [15, 15])
  assert.ok(sim.appels.every((a) => a.length === 1 && a[0].startsWith('https://raw.githubusercontent.com/')))
})
await verifier('chemin avec espace et accent encodé, erreur réseau isolée, liste vide', async () => {
  const sim = simulerFetch({
    [RAW + 'src/mon%20fichier%C3%A9.css']: { texte: 'a{}' },
    [RAW + 'src/coupe.css']: new Error('coupé'),
  })
  const r = await lireContenus(
    { ...adresseDemo, branche: 'main' },
    ['src/mon fichieré.css', 'src/coupe.css'],
    sim.fetch,
    () => {
      throw new Error('erreur d’affichage sans conséquence')
    }
  )
  assert.equal(r.fichiers.length, 1)
  assert.equal(r.fichiers[0].nom, 'src/mon fichieré.css')
  assert.equal(r.echecs.length, 1)
  assert.match(r.echecs[0].erreur.fr, /Impossible de joindre GitHub/)
  const vide = await lireContenus({ ...adresseDemo, branche: 'main' }, [], sim.fetch)
  assert.deepEqual(vide, { fichiers: [], echecs: [] })
})

/* --- PARTIE 2 : couverture et usages externes (étape 3) -------------------------- */

if (echecs > 0) {
  console.log(`\n${echecs} vérification(s) en échec`)
  process.exit(1)
}
console.log('\nToutes les vérifications passent')
