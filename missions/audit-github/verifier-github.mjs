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
import { mesurerCouverture, extraireUsagesTokens } from '../../src/lab/audit/couverture.js'
import { analyse } from '../../src/lab/audit/analyse.js'

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

/* --- couverture (D6) ------------------------------------------------------------- */
console.log('Couverture du code (D6)')

const CSS_CONNU = `/* commentaire : #123456 et 40px ne comptent pas */
#dead { margin: 0 }
.a {
  color: var(--texte, #fff);
  background: #FF5500;
  padding: 13px 0;
  margin: 0 1px;
  border: 1px solid rgba(0, 0, 0, .5);
  box-shadow: 0 0 0 1px var(--ombre);
  width: calc(var(--espace) + 8px);
  color: rgb(var(--r) 0 0);
  background-image: url(#abc);
  content: "#fff 20px";
}
@media (min-width: 768px) { .b { font-size: 12px } }
`
const JSX_CONNU = `/* bloc #111 */
// ligne #222 et 30px
const styles = {
  a: 'color: var(--texte, #fff); padding: 13px', // #333 en commentaire de fin
  b: "#0af",
  c: \`margin: 1px 0 8px; background: var(--fond)\`,
  d: 'var(--a-b-c)',
}
export const Lien = () => <a href="#top">ancre #abc et 20px hors chaîne</a>
`
const VUE_CONNU = `<template><div style="color: var(--x)">#abc <!-- #fff 9px --></div></template>
<style lang="scss">
// commentaire #eee
.a { color: #333; margin: 4px 0; }
</style>
`

await verifier('CSS : compte exact, #id et var(--x, #fff) non comptés', () => {
  const c = mesurerCouverture([{ nom: 'src/a.css', contenu: CSS_CONNU }])
  // en dur : #FF5500, 13px, rgba(0, 0, 0, .5), 8px, 12px — usages : texte, ombre, espace, r
  assert.equal(c.valeursEnDur, 5)
  assert.equal(c.usagesTokens, 4)
  assert.equal(c.taux, 4 / 9)
  assert.equal(c.fichiersAnalyses, 1)
  assert.deepEqual(c.parFichier, [{ fichier: 'src/a.css', valeursEnDur: 5, usagesTokens: 4 }])
})
await verifier('JSX : seules les chaînes comptent, commentaires et texte courant ignorés', () => {
  const c = mesurerCouverture([{ nom: 'src/B.jsx', contenu: JSX_CONNU }])
  // en dur : 13px, #0af, 8px — usages : texte, fond, --a-b-c
  assert.equal(c.valeursEnDur, 3)
  assert.equal(c.usagesTokens, 3)
  assert.equal(c.taux, 0.5)
})
await verifier('Vue : attributs, bloc <style lang="scss">, commentaires HTML et // ignorés', () => {
  const c = mesurerCouverture([{ nom: 'src/C.vue', contenu: VUE_CONNU }])
  assert.equal(c.valeursEnDur, 2) // #333, 4px
  assert.equal(c.usagesTokens, 1) // var(--x)
})
await verifier('totaux sur plusieurs fichiers ; extension inconnue ignorée', () => {
  const c = mesurerCouverture([
    { nom: 'src/a.css', contenu: CSS_CONNU },
    { nom: 'src/B.jsx', contenu: JSX_CONNU },
    { nom: 'README.md', contenu: 'color: #fff; margin: 40px' },
  ])
  assert.equal(c.valeursEnDur, 8)
  assert.equal(c.usagesTokens, 7)
  assert.equal(c.fichiersAnalyses, 3)
  assert.equal(c.parFichier.length, 2)
  assert.equal(c.parFichier[0].fichier, 'src/a.css', 'trié par valeurs en dur décroissantes')
})
await verifier('valeurs répétées : normalisées, comptées, avec leurs fichiers ; une seule occurrence exclue', () => {
  const c = mesurerCouverture([
    { nom: 'a.css', contenu: '.x{color:#FF5500;border-color:#ff5500;margin:16px;top:9px}' },
    { nom: 'b.css', contenu: '.y{color:#f50;margin:16px}' },
  ])
  // #FF5500, #ff5500 et #f50 (= #ff5500 une fois développé) : 3 fois ; 16px : 2 fois ; 9px : 1 fois
  assert.deepEqual(c.valeursRepetees, [
    { valeur: '#ff5500', occurrences: 3, fichiers: ['a.css', 'b.css'] },
    { valeur: '16px', occurrences: 2, fichiers: ['a.css', 'b.css'] },
  ])
})
await verifier('valeurs déjà tokenisées : la valeur d’un token existant réapparaît en dur', () => {
  const lecture = analyse([{ nom: 'tokens.css', contenu: fixture('tokens.css') }])
  const c = mesurerCouverture(
    [{ nom: 'a.css', contenu: '.x{color:#FF5500;border-color:#ff5500;margin:16px;top:9px}' }],
    lecture.tokens
  )
  assert.deepEqual(c.dejaTokenisees, [
    { valeur: '#ff5500', token: '--couleur-marque', occurrences: 2 },
    { valeur: '16px', token: '--espace-md', occurrences: 1 },
  ])
  assert.equal(c.nombreDejaTokenisees, 2)
  assert.deepEqual(mesurerCouverture([{ nom: 'a.css', contenu: '.x{margin:9px}' }], lecture.tokens).dejaTokenisees, [])
})
await verifier('plafond de 10 par liste, tri stable', () => {
  const fichiers = Array.from({ length: 12 }, (_, i) => ({
    nom: `f${String(i).padStart(2, '0')}.css`,
    contenu: `.x{margin:${i + 2}px;padding:${i + 2}px}`,
  }))
  const c = mesurerCouverture(fichiers)
  assert.equal(c.parFichier.length, 10)
  assert.equal(c.valeursEnDur, 24)
  assert.ok(c.parFichier.every((f) => f.valeursEnDur === 2))
  assert.equal(c.valeursRepetees.length, 10)
  assert.equal(c.valeursRepetees[0].occurrences, 2)
})
await verifier('entrées vides ou incohérentes : taux null, aucune exception', () => {
  const vide = mesurerCouverture([])
  assert.equal(vide.taux, null)
  assert.equal(vide.fichiersAnalyses, 0)
  for (const mauvais of [undefined, null, 'x', [null, 3, { nom: 'a.css' }, { nom: 'b.css', contenu: 5 }]]) {
    assert.equal(mesurerCouverture(mauvais, mauvais).taux, null)
  }
  assert.equal(mesurerCouverture([{ nom: 'a.css', contenu: '.x{margin:0}' }]).taux, null)
  assert.doesNotThrow(() => mesurerCouverture([{ nom: 'a.css', contenu: 'a{b:var(--x, rgb(' }]))
  assert.doesNotThrow(() => mesurerCouverture([{ nom: 'a.jsx', contenu: "const s = 'jamais fermée\n`non plus" }]))
})

/* --- usages externes pour R6 (D6) ------------------------------------------------ */
console.log('Usages externes et R6')

const inutilises = (resultat) => resultat.constats.filter((c) => c.regle === 'R6').map((c) => c.tokens[0]).sort()
const CSS_TOKENS = ':root { --a-b: 1px; --inutile: 2px; --c: #fff }'
const DTCG_TOKENS = JSON.stringify({ a: { b: { c: { $value: '#fff', $type: 'color' } } }, d: { $value: '#000', $type: 'color' } })

await verifier('extraireUsagesTokens : --a-b-c et a.b.c', () => {
  const noms = extraireUsagesTokens([{ nom: 'x.css', contenu: '.z{color:var(--a-b-c);margin:var( --m , 4px)}' }])
  assert.ok(noms instanceof Set)
  assert.deepEqual([...noms].sort(), ['--a-b-c', '--m', 'a.b.c', 'm'].sort())
})
await verifier('un usage dans le code fait disparaître le constat R6 (CSS)', () => {
  const fichiers = [{ nom: 'tokens.css', contenu: CSS_TOKENS }]
  assert.deepEqual(inutilises(analyse(fichiers)), ['--a-b', '--c', '--inutile'])
  const usages = extraireUsagesTokens([{ nom: 'x.css', contenu: '.z{padding:var(--a-b)}' }])
  assert.deepEqual(inutilises(analyse(fichiers, { usagesExternes: usages })), ['--c', '--inutile'])
})
await verifier('un usage dans le code fait disparaître le constat R6 (DTCG, nom pointé)', () => {
  const fichiers = [{ nom: 'tokens.json', contenu: DTCG_TOKENS }]
  assert.deepEqual(inutilises(analyse(fichiers)), ['a.b.c', 'd'])
  const usages = extraireUsagesTokens([{ nom: 'x.css', contenu: '.z{color:var(--a-b-c)}' }])
  assert.deepEqual(inutilises(analyse(fichiers, { usagesExternes: usages })), ['d'])
  assert.deepEqual(inutilises(analyse(fichiers, { usagesExternes: ['--d'] })), ['a.b.c'], 'un tableau est accepté')
})
await verifier('analyse sans option (ou option vide) : résultat strictement inchangé', () => {
  const fichiers = [
    { nom: 'tokens.css', contenu: CSS_TOKENS },
    { nom: 'tokens.json', contenu: DTCG_TOKENS },
    { nom: 'exemple.css', contenu: readFileSync(resolve(ici, '../../src/lab/audit/exemples/exemple.css'), 'utf8') },
  ]
  const reference = analyse(fichiers)
  assert.deepEqual(analyse(fichiers, {}), reference)
  assert.deepEqual(analyse(fichiers, { usagesExternes: new Set() }), reference)
  assert.deepEqual(analyse(fichiers, { usagesExternes: null }), reference)
})

if (echecs > 0) {
  console.log(`\n${echecs} vérification(s) en échec`)
  process.exit(1)
}
console.log('\nToutes les vérifications passent')
