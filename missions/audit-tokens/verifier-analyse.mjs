// Vérification du moteur d'audit sans framework de test.
// Lancer : node missions/audit-tokens/verifier-analyse.mjs
// Code de sortie ≠ 0 en cas d'échec.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { analyse } from '../../src/lab/audit/analyse.js'

const racine = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const lire = (chemin) => readFileSync(resolve(racine, chemin), 'utf8')

let echecs = 0
function verifier(titre, fn) {
  try {
    fn()
    console.log(`  ok   ${titre}`)
  } catch (e) {
    echecs++
    console.log(`  ECHEC ${titre}\n       ${e.message.split('\n').join('\n       ')}`)
  }
}

const regles = (resultat) => new Set(resultat.constats.map((c) => c.regle))
const constatsDe = (resultat, id) => resultat.constats.filter((c) => c.regle === id)

console.log('CSS')
const exempleCss = analyse([{ nom: 'exemple.css', contenu: lire('src/lab/audit/exemples/exemple.css') }])

verifier('format CSS détecté et tokens lus', () => {
  assert.equal(exempleCss.fichiers[0].format, 'css')
  assert.ok(exempleCss.tokens.length >= 15, `${exempleCss.tokens.length} tokens`)
  assert.ok(exempleCss.tokens.every((t) => t.format === 'css' && t.nom.startsWith('--')))
})
verifier('numéros de ligne et sélecteurs', () => {
  const marque = exempleCss.tokens.find((t) => t.nom === '--couleur-marque')
  assert.equal(marque.contexte, ':root')
  assert.equal(marque.emplacement, 5)
  const sombre = exempleCss.tokens.find((t) => t.nom === '--texte' && t.contexte !== ':root')
  assert.equal(sombre.contexte, '[data-theme="sombre"]')
  assert.equal(marque.type, 'color')
  assert.equal(exempleCss.tokens.find((t) => t.nom === '--espace-md').type, 'dimension')
})
verifier('R1 : erreur sans repli, avertissement avec repli', () => {
  const r1 = constatsDe(exempleCss, 'R1')
  assert.equal(r1.find((c) => c.tokens[0] === '--bouton-fond').gravite, 'erreur')
  assert.equal(r1.find((c) => c.tokens[0] === '--bordure').gravite, 'avertissement')
})
verifier('R2 : un seul constat pour le cycle a → b → c', () => {
  const r2 = constatsDe(exempleCss, 'R2')
  assert.equal(r2.length, 1)
  assert.deepEqual([...r2[0].tokens].sort(), ['--cycle-a', '--cycle-b', '--cycle-c'])
})
verifier('R3 : valeurs en dur, sans var(), 0 et 1px exclus', () => {
  const r3 = constatsDe(exempleCss, 'R3')
  assert.equal(r3.length, 3) // background #ff00aa, padding 13px 0, margin 0 8px
  assert.ok(r3.every((c) => c.fichier === 'exemple.css' && c.emplacement > 40))
  assert.ok(!r3.some((c) => c.detail.fr.includes('box-shadow')), '0 0 0 1px + var() ne doit pas être signalé')
})
verifier('R4 : doublon de valeur, surcharge de contexte ignorée', () => {
  const r4 = constatsDe(exempleCss, 'R4')
  assert.equal(r4.length, 1)
  assert.deepEqual([...r4[0].tokens].sort(), ['--couleur-action', '--couleur-marque'])
})
verifier('R5 : couleurs quasi identiques', () => {
  const r5 = constatsDe(exempleCss, 'R5')
  assert.equal(r5.length, 1)
  assert.ok(r5[0].tokens.includes('--couleur-marque-hover'))
})
verifier('R6 : token inutilisé', () => {
  const noms = constatsDe(exempleCss, 'R6').map((c) => c.tokens[0])
  assert.ok(noms.includes('--espace-orphelin'))
  assert.ok(!noms.includes('--espace-md'), 'utilisé dans .bouton')
})
verifier('R7 : chaîne d’alias trop longue signalée une fois, par son sommet', () => {
  const r7 = constatsDe(exempleCss, 'R7')
  assert.equal(r7.length, 1)
  assert.equal(r7[0].tokens[0], '--alias-1')
})
verifier('résumé et bilinguisme', () => {
  const { resume } = exempleCss
  assert.equal(resume.fichiers, 1)
  assert.equal(resume.tokens, exempleCss.tokens.length)
  assert.ok(resume.constatsParGravite.erreur >= 2)
  assert.ok(resume.partSaine > 0 && resume.partSaine < 1)
  assert.ok(exempleCss.constats.every((c) => c.detail.fr && c.detail.en))
  assert.equal(exempleCss.constats[0].gravite, 'erreur', 'tri : erreurs d’abord')
})

console.log('JSON W3C DTCG')
const exempleDtcg = analyse([{ nom: 'exemple.dtcg.json', contenu: lire('src/lab/audit/exemples/exemple.dtcg.json') }])

verifier('format DTCG détecté, noms en chemin pointé, type hérité du groupe', () => {
  assert.equal(exempleDtcg.fichiers[0].format, 'dtcg')
  assert.ok(exempleDtcg.tokens.every((t) => t.format === 'dtcg'))
  const noms = exempleDtcg.tokens.map((t) => t.nom)
  assert.ok(noms.includes('color.brand.primary') && noms.includes('spacing.small'))
  assert.ok(!noms.some((n) => n.startsWith('$')), 'les clés $ ne sont pas des groupes')
  assert.equal(exempleDtcg.tokens.find((t) => t.nom === 'color.brand.primary').type, 'color')
  assert.equal(exempleDtcg.tokens.find((t) => t.nom === 'spacing.small').type, 'dimension')
  assert.equal(exempleDtcg.tokens.find((t) => t.nom === 'spacing.medium').type, null)
})
verifier('DTCG : référence résolue, référence cassée (R1), composite lu', () => {
  const action = exempleDtcg.tokens.find((t) => t.nom === 'color.action')
  assert.deepEqual(action.references, ['color.brand.primary'])
  const r1 = constatsDe(exempleDtcg, 'R1')
  assert.equal(r1.length, 1)
  assert.equal(r1[0].tokens[0], 'color.danger')
  assert.equal(r1[0].gravite, 'erreur')
  const ombre = exempleDtcg.tokens.find((t) => t.nom === 'shadow.card')
  assert.equal(typeof ombre.valeur, 'object')
  assert.deepEqual(ombre.references, ['color.action'], 'référence trouvée dans le composite')
})
verifier('DTCG : R4, R5, R8 ; composite exclu de R4 et R5', () => {
  assert.deepEqual([...constatsDe(exempleDtcg, 'R4')[0].tokens].sort(), ['color.brand.accent', 'color.brand.primary'])
  assert.ok(constatsDe(exempleDtcg, 'R5')[0].tokens.includes('color.brand.primary-hover'))
  assert.deepEqual(constatsDe(exempleDtcg, 'R8').map((c) => c.tokens[0]), ['spacing.medium'])
  assert.ok(!exempleDtcg.constats.some((c) => c.regle !== 'R6' && c.tokens.includes('shadow.card')))
})

console.log('JSON Tokens Studio')
const exempleTs = analyse([
  { nom: 'exemple.tokens-studio.json', contenu: lire('src/lab/audit/exemples/exemple.tokens-studio.json') },
])

verifier('format Tokens Studio détecté, ensembles = contexte, $themes et $metadata ignorés', () => {
  assert.equal(exempleTs.fichiers[0].format, 'tokens-studio')
  const contextes = new Set(exempleTs.tokens.map((t) => t.contexte))
  assert.deepEqual([...contextes].sort(), ['dark', 'global', 'light'])
  assert.ok(!exempleTs.tokens.some((t) => t.nom.includes('themes') || t.nom.includes('tokenSetOrder')))
  assert.ok(exempleTs.tokens.find((t) => t.nom === 'gray.100' && t.contexte === 'global'))
  assert.equal(exempleTs.tokens.find((t) => t.nom === 'radius.sm').type, 'borderRadius', 'type hérité du groupe')
})
verifier('Tokens Studio : référence résolue entre ensembles, référence cassée (R1)', () => {
  // light.surface → {gray.100}, défini dans « global » : pas d'erreur.
  const r1 = constatsDe(exempleTs, 'R1')
  assert.equal(r1.length, 1)
  assert.equal(r1[0].tokens[0], 'surface')
  assert.ok(r1[0].detail.fr.includes('gray.900'))
  assert.equal(r1[0].emplacement, 'dark.surface')
})
verifier('Tokens Studio : surcharge d’ensemble normale, R4, R5, R8', () => {
  const r4 = constatsDe(exempleTs, 'R4')
  assert.equal(r4.length, 1)
  assert.deepEqual([...r4[0].tokens].sort(), ['brand', 'brand-soft'])
  assert.ok(!exempleTs.constats.some((c) => c.tokens.filter((n) => n === 'surface').length > 1), 'surface light/dark n’est pas un doublon')
  assert.ok(constatsDe(exempleTs, 'R5').length >= 1)
  assert.deepEqual(constatsDe(exempleTs, 'R8').map((c) => c.tokens[0]), ['space.md'])
})

console.log('Les trois exemples ensemble')
verifier('chaque règle R1 à R8 est déclenchée au moins une fois', () => {
  const tous = analyse([
    { nom: 'exemple.css', contenu: lire('src/lab/audit/exemples/exemple.css') },
    { nom: 'exemple.dtcg.json', contenu: lire('src/lab/audit/exemples/exemple.dtcg.json') },
    { nom: 'exemple.tokens-studio.json', contenu: lire('src/lab/audit/exemples/exemple.tokens-studio.json') },
  ])
  const vues = new Set([...regles(exempleCss), ...regles(exempleDtcg), ...regles(exempleTs), ...regles(tous)])
  for (const id of ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8']) assert.ok(vues.has(id), `${id} jamais déclenchée`)
  assert.deepEqual(tous.resume.tokensParFormat && Object.keys(tous.resume.tokensParFormat).sort(), ['css', 'dtcg', 'tokens-studio'])
  assert.equal(tous.resume.fichiers, 3)
})
verifier('détection selon le contenu, sans extension utile', () => {
  const css = analyse([{ nom: 'colle.txt', contenu: ':root { --a: #fff; }' }])
  assert.equal(css.fichiers[0].format, 'css')
  const dtcg = analyse([{ nom: 'colle.txt', contenu: '{"a": {"$value": "#fff", "$type": "color"}}' }])
  assert.equal(dtcg.fichiers[0].format, 'dtcg')
  const ts = analyse([{ nom: 'colle.txt', contenu: '{"s": {"a": {"value": "#fff", "type": "color"}}}' }])
  assert.equal(ts.fichiers[0].format, 'tokens-studio')
})

console.log('Cas limites (aucune exception)')
const limites = {
  'texte vide': [{ nom: 'vide.css', contenu: '' }],
  '}}}{{': [{ nom: 'colle.txt', contenu: '}}}{{' }],
  'JSON invalide': [{ nom: 'casse.json', contenu: '{ "a": ' }],
  'JSON sans token': [{ nom: 'rien.json', contenu: '{"a": 1, "b": [1, 2]}' }],
  'CSS sans token': [{ nom: 'plat.css', contenu: '.a { color: red; padding: 4px }' }],
  'entrée absente': undefined,
  'entrée incohérente': [null, {}, { nom: 3, contenu: 42 }],
  'parenthèse jamais fermée': [{ nom: 'p.css', contenu: ':root { --a: calc(1px + ; }' }],
}
for (const [titre, entree] of Object.entries(limites)) {
  verifier(titre, () => {
    const r = analyse(entree)
    assert.ok(Array.isArray(r.tokens) && Array.isArray(r.constats) && Array.isArray(r.avertissements))
    assert.ok(r.resume && typeof r.resume.tokens === 'number')
  })
}
verifier('avertissements attendus', () => {
  assert.equal(analyse(limites['JSON invalide']).avertissements.length, 1)
  assert.equal(analyse(limites['JSON sans token']).avertissements.length, 1)
  assert.equal(analyse(limites['CSS sans token']).avertissements.length, 1)
})
verifier('limite de 300 000 caractères', () => {
  const gros = ':root { --a: 1px; }\n'.repeat(20000)
  const r = analyse([{ nom: 'gros.css', contenu: gros }])
  assert.ok(r.avertissements.some((a) => a.detail.fr.includes('tronqué')))
})

console.log('Tokens du site')
const site = analyse([{ nom: 'src/styles/tokens.css', contenu: lire('src/styles/tokens.css') }])
verifier('tokens.css analysé sans exception', () => {
  assert.ok(site.tokens.length > 100, `${site.tokens.length} tokens`)
})
console.log(JSON.stringify({ resume: site.resume, erreurs: site.constats.filter((c) => c.gravite === 'erreur').map((c) => c.detail.fr) }, null, 2))

if (echecs > 0) {
  console.log(`\n${echecs} vérification(s) en échec`)
  process.exit(1)
}
console.log('\nToutes les vérifications passent')
