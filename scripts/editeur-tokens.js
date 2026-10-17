import fs from 'node:fs'
import path from 'node:path'

// Éditeur de tokens, côté serveur de dev : le panneau du site (src/editeur/)
// lit src/styles/tokens.css et y réécrit les valeurs modifiées à l'écran.
// Ne tourne qu'avec `npm run dev` (configureServer n'existe pas au build) :
// rien de tout ça n'arrive en production.
//   GET  /__tokens → { source } : le fichier tel quel
//   POST /__tokens ← { changes: { '--nom': 'valeur' } } → { ok, ecrits, inconnus }

const NOM = /^--[a-z0-9-]+$/
// Une valeur ne doit pas pouvoir casser le fichier : ni ; ni accolades ni retour à la ligne
const VALEUR_INTERDITE = /[;{}\n\r]|\/\*|\*\//

// Le bloc :root principal (couches primitive → semantic → component)
function blocRacine(source) {
  const debut = source.indexOf(':root {')
  if (debut === -1) return null
  const fin = source.indexOf('\n}', debut)
  return fin === -1 ? null : { debut, fin }
}

export function remplacerTokens(source, changes) {
  const bloc = blocRacine(source)
  if (!bloc) throw new Error('Bloc :root introuvable dans tokens.css')
  let racine = source.slice(bloc.debut, bloc.fin)
  const ecrits = []
  const inconnus = []
  for (const [nom, valeur] of Object.entries(changes)) {
    const v = String(valeur).trim()
    if (!NOM.test(nom) || !v || VALEUR_INTERDITE.test(v)) { inconnus.push(nom); continue }
    // Le nom suivi de « : » en début de ligne (indentation comprise), jusqu'au « ; »
    const motif = new RegExp(`^(\\s*${nom}:\\s*)([^;]*)(;)`, 'm')
    if (!motif.test(racine)) { inconnus.push(nom); continue }
    racine = racine.replace(motif, (_, avant, _ancienne, pv) => `${avant}${v}${pv}`)
    ecrits.push(nom)
  }
  return { source: source.slice(0, bloc.debut) + racine + source.slice(bloc.fin), ecrits, inconnus }
}

export function editeurTokensPlugin(racineProjet) {
  const fichier = path.join(racineProjet, 'src/styles/tokens.css')
  return {
    name: 'editeur-tokens',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__tokens', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method === 'GET') {
          res.end(JSON.stringify({ source: fs.readFileSync(fichier, 'utf-8') }))
          return
        }
        if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return }
        // Écriture réservée au site local lui-même : une autre page ouverte dans
        // le navigateur (autre origine) ou un envoi de formulaire est refusé.
        // Le JSON obligatoire force aussi le navigateur à demander la permission avant un appel d'ailleurs.
        const origine = req.headers.origin
        let memeSite = false
        try { memeSite = !origine || new URL(origine).host === req.headers.host } catch { /* origine illisible */ }
        if (!memeSite || !String(req.headers['content-type']).startsWith('application/json')) {
          res.statusCode = 403
          res.end(JSON.stringify({ error: 'Appel refusé : réservé au site local' }))
          return
        }
        let corps = ''
        req.on('data', (morceau) => { corps += morceau })
        req.on('end', () => {
          try {
            const { changes } = JSON.parse(corps)
            if (!changes || typeof changes !== 'object') throw new Error('changes manquant')
            const resultat = remplacerTokens(fs.readFileSync(fichier, 'utf-8'), changes)
            if (resultat.ecrits.length) fs.writeFileSync(fichier, resultat.source)
            res.end(JSON.stringify({ ok: true, ecrits: resultat.ecrits, inconnus: resultat.inconnus }))
          } catch (err) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    },
  }
}
