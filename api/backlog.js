import { parseCookies, verifySession, COOKIE } from './_lib/auth.js'

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie)
  const authenticated = verifySession(cookies[COOKIE], process.env.SESSION_SECRET)

  if (!authenticated) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  return res.status(200).send(process.env.BACKLOG_MD ?? '')
}
