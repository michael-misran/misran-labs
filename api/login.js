import { checkPassword, signSession, sessionCookieHeader } from './_lib/auth.js'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const expected = process.env.AUTH_PASSWORD
  const secret = process.env.SESSION_SECRET

  if (!expected || !secret) {
    return res.status(500).json({ error: 'Auth not configured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }

  if (!checkPassword(body?.password, expected)) {
    return res.status(401).json({ error: 'Mot de passe incorrect' })
  }

  const token = signSession(secret)
  res.setHeader('Set-Cookie', sessionCookieHeader(token, { secure: true }))
  return res.status(200).json({ ok: true })
}
