// Contrastes texte / fond (WCAG 2.x) déduits des noms de tokens : module pur (ni
// React ni Vite). Couleurs opaques seulement ; les paires viennent d'une
// convention de nommage, pas d'une vérification dans le code réel.
import { analyserCouleur } from './outils.js'

const MAX_PAIRES = 200
const SEUIL = 4.5
const MOTS_TEXTE = ['text', 'fg', 'foreground', 'ink']
const MOTS_FOND = ['bg', 'background', 'surface', 'canvas', 'paper']
const MAX_PROFONDEUR = 20

// Segments d'un nom : séparés par - . / (les tirets de tête d'une propriété CSS sont ignorés).
const segmentsNom = (nom) => String(nom).toLowerCase().split(/[-./]+/).filter(Boolean)

// Luminance relative WCAG d'une couleur { r, g, b } (0-255).
function luminance({ r, g, b }) {
  const lin = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

// Rapport de contraste WCAG entre deux couleurs { r, g, b }, de 1 à 21.
export function rapportContraste(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

// Référence pure (`var(--x)`, `var(--x, repli)` ou `{a.b}`) → nom référencé, sinon null.
function referencePure(valeur) {
  if (typeof valeur !== 'string') return null
  const v = valeur.trim()
  const css = /^var\(\s*(--[^\s,)]+)\s*(?:,.*)?\)$/.exec(v)
  if (css) return css[1]
  const acc = /^\{([^{}]+)\}$/.exec(v)
  return acc ? acc[1].trim() : null
}

// Résout le token jusqu'à une couleur opaque { r, g, b } (ou null), en suivant
// les références par nom ; à nom égal, on préfère la définition du même contexte.
function resoudre(token, index) {
  const vus = new Set()
  let courant = token
  for (let i = 0; i < MAX_PROFONDEUR && courant; i++) {
    const ref = referencePure(courant.valeur)
    if (ref === null) {
      const c = analyserCouleur(courant.valeur)
      return c && c.a === 1 ? c : null
    }
    if (vus.has(ref)) return null // cycle : signalé par R2
    vus.add(ref)
    const definitions = index.get(ref) ?? []
    courant =
      definitions.find((d) => d.contexte === token.contexte) ??
      definitions.find((d) => d.contexte === null) ??
      definitions[0]
  }
  return null
}

const contexteCompatible = (a, b) => a === null || b === null || a === b

// tokens : tableau du modèle commun (resultat.tokens).
// → { paires: [{ texte, fond, contexte, ratio, ok }], detectees, echecs }
export function evaluerContrastes(tokens) {
  const liste = Array.isArray(tokens) ? tokens : []
  const index = new Map()
  for (const t of liste) {
    if (!index.has(t.nom)) index.set(t.nom, [])
    index.get(t.nom).push(t)
  }

  // Couleur résolue de chaque token, calculée une seule fois.
  const cache = new Map()
  const couleurDe = (t) => {
    if (!cache.has(t)) cache.set(t, resoudre(t, index))
    return cache.get(t)
  }

  const textes = []
  const fonds = []
  for (const t of liste) {
    const segs = segmentsNom(t.nom)
    const estTexte = MOTS_TEXTE.some((m) => segs.includes(m)) || (segs[0] === 'on' && segs.length > 1)
    const estFond = !estTexte && MOTS_FOND.some((m) => segs.includes(m))
    if ((estTexte || estFond) && couleurDe(t)) (estTexte ? textes : fonds).push({ t, segs })
  }

  const trouvees = new Map()
  for (const { t: texte, segs } of textes) {
    let candidats = fonds.map((f) => f.t)
    // `on-X` : apparié en priorité avec le token X, quand il existe.
    if (segs[0] === 'on') {
      const cible = segs.slice(1).join('-')
      const dedies = liste.filter((t) => segmentsNom(t.nom).join('-') === cible && couleurDe(t))
      if (dedies.length > 0) candidats = dedies
    }
    for (const fond of candidats) {
      if (fond === texte || !contexteCompatible(texte.contexte, fond.contexte)) continue
      const contexte = texte.contexte ?? fond.contexte ?? null
      const cle = `${texte.nom}\u0000${fond.nom}\u0000${contexte ?? ''}`
      if (trouvees.has(cle)) continue
      const ratio = rapportContraste(couleurDe(texte), couleurDe(fond))
      trouvees.set(cle, { texte: texte.nom, fond: fond.nom, contexte, ratio, ok: ratio >= SEUIL })
    }
  }

  const paires = [...trouvees.values()]
    .sort((a, b) => (a.texte < b.texte ? -1 : a.texte > b.texte ? 1 : a.fond < b.fond ? -1 : a.fond > b.fond ? 1 : 0))
    .slice(0, MAX_PAIRES)
    .map((p) => ({ ...p, ratio: Math.round(p.ratio * 100) / 100 }))
  return { paires, detectees: paires.length, echecs: paires.filter((p) => !p.ok).length }
}
