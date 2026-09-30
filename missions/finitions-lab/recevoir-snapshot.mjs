// Petit récepteur local : la page envoie ses styles calculés par POST (no-cors, text/plain),
// un appel par couple page/largeur ({ clef, donnees }). Accumulé et réécrit dans
// missions/finitions-lab/snapshot-<etiquette>.json après chaque appel ; le serveur s'arrête
// en recevant { clef: '__fin__' }.
// Adapté de missions/site-avant-apres/recevoir-snapshot.mjs (celui-ci fermait après un seul
// appel ; ici plusieurs pages × largeurs doivent être accumulées avant l'arrêt).
// Usage : node missions/finitions-lab/recevoir-snapshot.mjs avant|apres   (port 4174)
import { createServer } from 'node:http'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const etiquette = process.argv[2]
if (!['avant', 'apres'].includes(etiquette)) process.exit(1)
const sortie = join(dirname(fileURLToPath(import.meta.url)), `snapshot-${etiquette}.json`)

const accumulateur = {}

const serveur = createServer((req, res) => {
  let corps = ''
  req.on('data', (morceau) => (corps += morceau))
  req.on('end', () => {
    try {
      const { clef, donnees } = JSON.parse(corps)
      if (clef === '__fin__') {
        console.log('Fin reçue, snapshot final :', sortie)
        res.end('ok')
        serveur.close()
        return
      }
      accumulateur[clef] = donnees
      writeFileSync(sortie, JSON.stringify(accumulateur, null, 2) + '\n')
      console.log(`Reçu « ${clef} » (${Array.isArray(donnees) ? donnees.length : '?'} éléments) → ${sortie}`)
    } catch (e) {
      console.log('Corps illisible :', e.message)
    }
    res.end('ok')
  })
})
serveur.listen(4174, '127.0.0.1')
console.log(`En écoute sur 127.0.0.1:4174, écriture dans ${sortie}`)
