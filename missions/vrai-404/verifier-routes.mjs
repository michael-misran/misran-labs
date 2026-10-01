// Vérifie, sans réseau et sans dépendance, que Vercel répondrait 200 ou 404
// pour chaque adresse listée, d'après vercel.json ({ trailingSlash: false })
// et le contenu réel de dist/ (généré par `npm run build`).
// Usage : npm run build && node missions/vrai-404/verifier-routes.mjs
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ici = dirname(fileURLToPath(import.meta.url))
const racine = join(ici, '..', '..')
const distDir = join(racine, 'dist')

// Résout une adresse comme le ferait Vercel avec vercel.json = { trailingSlash: false } :
// pas de réécriture, un fichier exact d'abord, sinon <chemin>/index.html, sinon 404.html.
function resoudre(adresse) {
  const chemin = adresse.split('?')[0].split('#')[0]
  if (chemin !== '/' && chemin.endsWith('/')) {
    return { code: 308, fichier: null, note: 'redirection trailingSlash: false' }
  }
  if (chemin === '/') {
    return { code: 200, fichier: 'index.html' }
  }
  const relatif = chemin.replace(/^\//, '')
  const fichierExact = join(distDir, relatif)
  if (existsSync(fichierExact) && statSync(fichierExact).isFile()) {
    return { code: 200, fichier: relatif }
  }
  const indexDossier = join(distDir, relatif, 'index.html')
  if (existsSync(indexDossier)) {
    return { code: 200, fichier: `${relatif}/index.html` }
  }
  return { code: 404, fichier: '404.html' }
}

function lireSitemap() {
  const contenu = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8')
  const urls = [...contenu.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const base = 'https://misran-labs.vercel.app'
  return urls.map((u) => (u.startsWith(base) ? u.slice(base.length) || '/' : u))
}

function unFichierAssets() {
  const fichiers = readdirSync(join(distDir, 'assets')).filter((f) => f.endsWith('.js'))
  return `/assets/${fichiers[0]}`
}

const attendues200 = [
  '/',
  // /jeux et /jeux/geste-parfait arrivent via lireSitemap() (générés
  // génériquement par share-previews.js, D3 de la mission jeux-geste).
  ...lireSitemap(),
  '/lab/lost-cauldron-game/demo',
  '/lab/lost-cauldron-game/demo/v2',
  '/lab/exp-003/demo',
  '/magazine/rss.xml',
  '/breves/rss.xml',
  '/projets/rss.xml',
  '/rss.xml',
  '/sitemap.xml',
  '/robots.txt',
  '/og-image.png',
  '/games/lost-cauldron-game/index.html',
  unFichierAssets(),
]

const attendues404 = [
  '/nimporte-quoi',
  '/magazine/1999-01-01',
  '/breves/1999-01-01',
  '/projets/P-999',
  '/lab/inexistant',
  '/lab/audit-tokens/demo',
  '/assets/inexistant.js',
  '/jeux/inconnu',
]

let echecs = 0
const lignes = []

function verifier(adresse, codeAttendu) {
  const resultat = resoudre(adresse)
  const ok = resultat.code === codeAttendu
  if (!ok) echecs++
  lignes.push({ adresse, attendu: codeAttendu, obtenu: resultat.code, fichier: resultat.fichier, ok })
}

for (const adresse of attendues200) verifier(adresse, 200)
for (const adresse of attendues404) verifier(adresse, 404)

const largeurAdresse = Math.max(...lignes.map((l) => l.adresse.length))
console.log(`${'ADRESSE'.padEnd(largeurAdresse)}  ATTENDU  OBTENU  FICHIER`)
for (const l of lignes) {
  const marque = l.ok ? '✓' : '✗ ATTENDU ≠ OBTENU'
  console.log(`${l.adresse.padEnd(largeurAdresse)}  ${String(l.attendu).padEnd(7)}  ${String(l.obtenu).padEnd(6)}  ${l.fichier ?? '—'}  ${marque}`)
}

console.log(`\n${lignes.length} adresses vérifiées, ${echecs} échec(s).`)
if (echecs > 0) process.exit(1)
