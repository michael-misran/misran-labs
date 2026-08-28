import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkPassword, signSession, verifySession, sessionCookieHeader, clearCookieHeader, parseCookies, COOKIE } from './api/_lib/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'src/private/data')
const ALLOWED_DOMAINS = ['subscriptions', 'bills', 'jobApplications']
const BACKLOG_FALLBACK_FILE = path.join(__dirname, 'src/private/backlog.md')

// Dev-only local API for the private MAIA pages: reads/writes gitignored
// JSON files under src/private/data/. Never runs in production (configureServer
// only fires for `vite dev`, not `vite build`), and browser JS can't write to
// disk directly, so this is the bridge between the forms and the files.
function maiaApiPlugin() {
  return {
    name: 'maia-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/jarvis/')) return next()

        const domain = req.url.slice('/api/jarvis/'.length).split('?')[0]
        if (!ALLOWED_DOMAINS.includes(domain)) {
          res.statusCode = 404
          res.end('Unknown domain')
          return
        }

        const filePath = path.join(DATA_DIR, `${domain}.json`)

        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          if (!fs.existsSync(filePath)) {
            res.end('[]')
            return
          }
          res.end(fs.readFileSync(filePath, 'utf-8'))
          return
        }

        if (req.method === 'PUT') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body)
              if (!Array.isArray(parsed)) throw new Error('Expected a JSON array')
              fs.mkdirSync(DATA_DIR, { recursive: true })
              fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2))
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch (err) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }

        next()
      })
    },
  }
}

const CONFORMA_DIR = path.join(__dirname, 'src/private/data/conforma')
const CONFORMA_STUDIES_DIR = path.join(CONFORMA_DIR, 'studies')
const SAFE_ID = /^[a-zA-Z0-9_-]+$/

function studyDir(id) {
  return path.join(CONFORMA_STUDIES_DIR, id)
}

// Dev-only local API for the private Conforma page: same principle as
// maiaApiPlugin — reads/writes gitignored JSON files under
// src/private/data/conforma/studies/<id>/, one directory per company
// mode-opératoire study, each with its own data.json + uploads/. Never
// runs in production.
function conformaApiPlugin() {
  return {
    name: 'conforma-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/conforma/')) return next()

        const [urlPath, query] = req.url.split('?')
        const parts = urlPath.slice('/api/conforma/'.length).split('/').filter(Boolean)

        // GET /api/conforma/studies — list all studies (summary only)
        if (parts.length === 1 && parts[0] === 'studies' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          if (!fs.existsSync(CONFORMA_STUDIES_DIR)) {
            res.end('[]')
            return
          }
          const list = fs.readdirSync(CONFORMA_STUDIES_DIR)
            .filter((id) => fs.existsSync(path.join(studyDir(id), 'data.json')))
            .map((id) => {
              const data = JSON.parse(fs.readFileSync(path.join(studyDir(id), 'data.json'), 'utf-8'))
              const stat = fs.statSync(path.join(studyDir(id), 'data.json'))
              const counts = { oui: 0, partiel: 0, non: 0 }
              Object.values(data.results ?? {}).forEach((r) => {
                if (r.statut && counts[r.statut] !== undefined) counts[r.statut] += 1
              })
              return {
                id,
                entreprise: data.entreprise ?? '',
                reference: data.reference ?? '',
                dureeAnalyseMinutes: data.dureeAnalyseMinutes ?? '',
                counts,
                updatedAt: stat.mtimeMs,
              }
            })
            .sort((a, b) => b.updatedAt - a.updatedAt)
          res.end(JSON.stringify(list))
          return
        }

        // GET|PUT /api/conforma/studies/:id
        if (parts.length === 2 && parts[0] === 'studies' && SAFE_ID.test(parts[1])) {
          const id = parts[1]
          const dataFile = path.join(studyDir(id), 'data.json')

          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json')
            if (!fs.existsSync(dataFile)) {
              res.end('null')
              return
            }
            res.end(fs.readFileSync(dataFile, 'utf-8'))
            return
          }

          if (req.method === 'PUT') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body)
                fs.mkdirSync(studyDir(id), { recursive: true })
                fs.writeFileSync(dataFile, JSON.stringify(parsed, null, 2))
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: true }))
              } catch (err) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            })
            return
          }
        }

        // POST /api/conforma/studies/:id/upload?filename=...
        if (parts.length === 3 && parts[0] === 'studies' && SAFE_ID.test(parts[1]) && parts[2] === 'upload' && req.method === 'POST') {
          const id = parts[1]
          const filename = new URLSearchParams(query).get('filename') || 'mode-operatoire.pdf'
          const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
          const uploadsDir = path.join(studyDir(id), 'uploads')
          const chunks = []
          req.on('data', (chunk) => chunks.push(chunk))
          req.on('end', () => {
            fs.mkdirSync(uploadsDir, { recursive: true })
            fs.writeFileSync(path.join(uploadsDir, safeFilename), Buffer.concat(chunks))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, filename: safeFilename }))
          })
          return
        }

        next()
      })
    },
  }
}

// Dev-only local API émulant les fonctions Vercel /api/login, /api/logout,
// /api/session, /api/backlog — permet de tester le flux de connexion en
// local (`npm run dev`) sans déployer. Utilise AUTH_PASSWORD/SESSION_SECRET
// depuis .env.local (gitignored). BACKLOG_MD optionnel : si absent, retombe
// sur la lecture directe de src/private/backlog.md pour le confort en dev.
function authApiPlugin(env) {
  const AUTH_PASSWORD = env.AUTH_PASSWORD || ''
  const SESSION_SECRET = env.SESSION_SECRET || 'dev-secret-not-for-prod'

  return {
    name: 'auth-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()
        const [urlPath] = req.url.split('?')

        if (urlPath === '/api/login' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => { body += chunk })
          req.on('end', () => {
            let password = ''
            try { password = JSON.parse(body).password } catch { /* ignore */ }
            res.setHeader('Content-Type', 'application/json')
            if (!AUTH_PASSWORD || !checkPassword(password, AUTH_PASSWORD)) {
              res.statusCode = 401
              res.end(JSON.stringify({ error: 'Mot de passe incorrect' }))
              return
            }
            const token = signSession(SESSION_SECRET)
            res.setHeader('Set-Cookie', sessionCookieHeader(token, { secure: false }))
            res.end(JSON.stringify({ ok: true }))
          })
          return
        }

        if (urlPath === '/api/logout' && req.method === 'POST') {
          res.setHeader('Set-Cookie', clearCookieHeader({ secure: false }))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
          return
        }

        if (urlPath === '/api/session' && req.method === 'GET') {
          const cookies = parseCookies(req.headers.cookie)
          const authenticated = verifySession(cookies[COOKIE], SESSION_SECRET)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ authenticated }))
          return
        }

        if (urlPath === '/api/backlog' && req.method === 'GET') {
          const cookies = parseCookies(req.headers.cookie)
          const authenticated = verifySession(cookies[COOKIE], SESSION_SECRET)
          if (!authenticated) {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Not authenticated' }))
            return
          }
          const content = env.BACKLOG_MD || (fs.existsSync(BACKLOG_FALLBACK_FILE) ? fs.readFileSync(BACKLOG_FALLBACK_FILE, 'utf-8') : '')
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(content)
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  return {
    plugins: [react(), maiaApiPlugin(), conformaApiPlugin(), authApiPlugin(env)],
  }
})
