import crypto from 'node:crypto'

export const COOKIE = 'misran_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 jours

function timingSafeEqualStrings(a, b) {
  const ha = crypto.createHash('sha256').update(String(a ?? '')).digest()
  const hb = crypto.createHash('sha256').update(String(b ?? '')).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function checkPassword(candidate, expected) {
  if (!expected) return false
  return timingSafeEqualStrings(candidate, expected)
}

export function signSession(secret, maxAgeSeconds = MAX_AGE_SECONDS) {
  const exp = Date.now() + maxAgeSeconds * 1000
  const payload = Buffer.from(JSON.stringify({ exp })).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifySession(token, secret) {
  if (!token || !secret || typeof token !== 'string' || !token.includes('.')) return false
  const [payload, sig] = token.split('.')
  const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  const sigBuf = Buffer.from(sig)
  const expectedBuf = Buffer.from(expectedSig)
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export function parseCookies(header) {
  const out = {}
  if (!header) return out
  header.split(';').forEach((part) => {
    const idx = part.indexOf('=')
    if (idx === -1) return
    const k = part.slice(0, idx).trim()
    const v = part.slice(idx + 1).trim()
    if (k) out[k] = decodeURIComponent(v)
  })
  return out
}

export function sessionCookieHeader(token, { secure = true, maxAge = MAX_AGE_SECONDS } = {}) {
  const parts = [`${COOKIE}=${token}`, 'HttpOnly', 'Path=/', 'SameSite=Lax', `Max-Age=${maxAge}`]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

export function clearCookieHeader({ secure = true } = {}) {
  const parts = [`${COOKIE}=`, 'HttpOnly', 'Path=/', 'SameSite=Lax', 'Max-Age=0']
  if (secure) parts.push('Secure')
  return parts.join('; ')
}
