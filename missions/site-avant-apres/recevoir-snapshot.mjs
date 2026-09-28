// Petit récepteur local : la page envoie son snapshot par POST (no-cors, text/plain),
// il est écrit dans missions/site-avant-apres/snapshot-<etiquette>.json puis le serveur s'arrête.
// Usage : node missions/site-avant-apres/recevoir-snapshot.mjs avant|apres   (port 4174)
import { createServer } from 'node:http'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const etiquette = process.argv[2]
if (!['avant', 'apres'].includes(etiquette)) process.exit(1)
const sortie = join(dirname(fileURLToPath(import.meta.url)), `snapshot-${etiquette}.json`)

const serveur = createServer((req, res) => {
  let corps = ''
  req.on('data', (morceau) => (corps += morceau))
  req.on('end', () => {
    try {
      writeFileSync(sortie, JSON.stringify(JSON.parse(corps), null, 2) + '\n')
      console.log('Snapshot écrit :', sortie)
    } catch (e) {
      console.log('Corps illisible :', e.message)
    }
    res.end('ok')
    serveur.close()
  })
})
serveur.listen(4174, '127.0.0.1')
