// Outils partagés du moteur d'audit : modules purs, sans React ni Vite.

export const GRAVITES = ['erreur', 'avertissement', 'info']

// Couleur littérale entière : #hex, rgb()/rgba(), hsl()/hsla().
const RE_COULEUR_LITTERALE = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([^)]*\))$/i

export function estCouleur(valeur) {
  return typeof valeur === 'string' && RE_COULEUR_LITTERALE.test(valeur.trim())
}

// Lit #rgb, #rgba, #rrggbb, #rrggbbaa, rgb() et rgba() (syntaxe à virgules
// ou à espaces). Renvoie { r, g, b, a } ou null (hsl, pourcentages, autre).
export function analyserCouleur(valeur) {
  if (typeof valeur !== 'string') return null
  const t = valeur.trim().toLowerCase()

  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(t)
  if (hex) {
    let h = hex[1]
    if (h.length <= 4) h = [...h].map((c) => c + c).join('')
    const n = (i) => parseInt(h.slice(i, i + 2), 16)
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 }
  }

  const fn = /^rgba?\((.*)\)$/.exec(t)
  if (fn) {
    const parts = fn[1].split(/[\s,/]+/).filter(Boolean)
    if (parts.length !== 3 && parts.length !== 4) return null
    const [r, g, b] = parts.slice(0, 3).map(Number)
    if ([r, g, b].some((x) => Number.isNaN(x) || x < 0 || x > 255)) return null
    let a = 1
    if (parts.length === 4) {
      const brut = parts[3]
      a = brut.endsWith('%') ? Number(brut.slice(0, -1)) / 100 : Number(brut)
      if (Number.isNaN(a)) return null
    }
    return { r, g, b, a }
  }
  return null
}

// Forme comparable d'une valeur : minuscules, espaces réduits ou retirés
// autour de , ( ) /, hex court développé (#fff = #ffffff).
export function normaliserValeur(valeur) {
  let t = String(valeur).trim().toLowerCase().replace(/\s+/g, ' ')
  t = t.replace(/\s*([,()/])\s*/g, '$1')
  if (/^#[0-9a-f]{3,4}$/.test(t)) t = '#' + [...t.slice(1)].map((c) => c + c).join('')
  return t
}

// Clé stable d'une couleur opaque, pour regrouper les valeurs identiques.
export function cleCouleur({ r, g, b }) {
  return `${r},${g},${b}`
}

// Références {chemin.du.token} trouvées dans toutes les chaînes d'une valeur
// (chaîne simple ou composite : objet, tableau). Sans doublon.
export function extraireReferencesAccolades(valeur, refs = [], profondeur = 0) {
  if (profondeur > 50) return refs
  if (typeof valeur === 'string') {
    for (const m of valeur.matchAll(/\{([^{}]+)\}/g)) {
      const nom = m[1].trim()
      if (nom && !refs.includes(nom)) refs.push(nom)
    }
  } else if (valeur && typeof valeur === 'object') {
    for (const v of Object.values(valeur)) extraireReferencesAccolades(v, refs, profondeur + 1)
  }
  return refs
}

// Valeur d'un token JSON : les composites (objets, tableaux) sont gardés
// tels quels, le reste devient une chaîne.
export function valeurJson(valeur) {
  if (valeur && typeof valeur === 'object') return valeur
  return valeur === undefined || valeur === null ? '' : String(valeur)
}

// Avertissement bilingue, forme commune à tous les lecteurs.
export function avertissement(fichier, fr, en) {
  return { fichier, detail: { fr, en } }
}
