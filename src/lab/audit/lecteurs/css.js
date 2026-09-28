// Lecteur CSS / SCSS : relève les propriétés personnalisées (tokens) et les
// déclarations ordinaires (pour la règle R3). Pas un vrai parseur CSS : un
// balayage caractère par caractère qui suit les accolades, les guillemets et
// les parenthèses, et garde les numéros de ligne.
import { estCouleur } from '../outils.js'

// Retire les commentaires en conservant les sauts de ligne.
function retirerCommentaires(texte, scss) {
  let t = texte.replace(/\/\*[\s\S]*?(\*\/|$)/g, (m) => m.replace(/[^\n]/g, ' '))
  if (scss) t = t.replace(/(^|[^:])\/\/[^\n]*/g, '$1')
  return t
}

// Références var(--x) d'une valeur. `repli` : celles qui ont une valeur de secours.
export function extraireReferences(valeur) {
  const references = []
  const repli = []
  for (const m of valeur.matchAll(/var\(\s*(--[^\s,)]+)\s*(,)?/g)) {
    if (!references.includes(m[1])) references.push(m[1])
    if (m[2] && !repli.includes(m[1])) repli.push(m[1])
  }
  return { references, repli }
}

function deduireType(valeur) {
  const v = valeur.trim()
  if (estCouleur(v)) return 'color'
  if (/^-?\d*\.?\d+(px|rem|em|%|vw|vh|pt|ch)$/i.test(v)) return 'dimension'
  return null
}

export function lireCss(contenu, fichier) {
  const scss = /\.scss$/i.test(fichier)
  const texte = retirerCommentaires(contenu, scss)
  const tokens = []
  const declarations = []
  const pile = []

  let tampon = ''
  let ligneTampon = null
  let ligne = 1
  let parentheses = 0
  let guillemet = null

  const ajouter = (ch) => {
    if (ligneTampon === null && !/\s/.test(ch)) ligneTampon = ligne
    tampon += ch
  }
  const vider = () => {
    tampon = ''
    ligneTampon = null
  }

  function traiterDeclaration() {
    const t = tampon.trim()
    if (!t || t.startsWith('@') || pile.length === 0) return
    const i = t.indexOf(':')
    if (i < 1) return
    const propriete = t.slice(0, i).trim()
    if (!/^(--[^\s:;]+|-?[a-zA-Z][\w-]*)$/.test(propriete)) return
    const valeur = t
      .slice(i + 1)
      .replace(/\s*!important\s*$/i, '')
      .replace(/\s+/g, ' ')
      .trim()
    const contexte = pile.filter(Boolean).join(' ') || null
    const { references, repli } = extraireReferences(valeur)
    if (propriete.startsWith('--')) {
      tokens.push({
        nom: propriete,
        valeur,
        type: deduireType(valeur),
        references,
        repli,
        fichier,
        emplacement: ligneTampon,
        contexte,
        format: 'css',
      })
    } else {
      declarations.push({ propriete, valeur, references, fichier, ligne: ligneTampon, selecteur: contexte })
    }
  }

  for (let i = 0; i < texte.length; i++) {
    const ch = texte[i]
    if (guillemet) {
      ajouter(ch)
      if (ch === '\\' && i + 1 < texte.length) {
        i++
        if (texte[i] === '\n') ligne++
        tampon += texte[i]
      } else if (ch === guillemet) {
        guillemet = null
      } else if (ch === '\n') {
        ligne++
      }
      continue
    }
    if (ch === '\n') ligne++
    if (ch === '"' || ch === "'") {
      guillemet = ch
      ajouter(ch)
      continue
    }
    if (ch === '(') parentheses++
    else if (ch === ')') parentheses = Math.max(0, parentheses - 1)

    if (parentheses > 0) {
      ajouter(ch)
    } else if (ch === '{') {
      pile.push(tampon.replace(/\s+/g, ' ').trim())
      vider()
    } else if (ch === '}') {
      traiterDeclaration()
      pile.pop()
      vider()
    } else if (ch === ';') {
      traiterDeclaration()
      vider()
    } else {
      ajouter(ch)
    }
  }
  traiterDeclaration()

  return { tokens, declarations, avertissements: [] }
}
