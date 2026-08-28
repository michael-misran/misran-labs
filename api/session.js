import { parseCookies, verifySession, COOKIE } from './_lib/auth.js'

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie)
  const authenticated = verifySession(cookies[COOKIE], process.env.SESSION_SECRET)
  return res.status(200).json({ authenticated })
}
