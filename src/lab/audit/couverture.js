// Couverture du code par les tokens : part des valeurs de style qui passent par
// un token (var(--nom)) plutôt que par une valeur en dur. Module pur (ni React,
// ni Vite, ni réseau). C'est une HEURISTIQUE, pas un analyseur de langage :
//   usage de token   chaque var(--nom…)
//   valeur en dur    couleur littérale (#hex, rgb(), hsl()) ou longueur en px
//                    autre que 0 et 1px, hors d'un var(…) (valeur de secours
//                    comprise) et hors commentaires
// Fichiers CSS / SCSS / LESS : seules les valeurs de déclarations comptent
// (jamais les sélecteurs, donc `#id { … }` n'est pas une couleur).
// Fichiers JS / TS / Vue / Svelte : seules les chaînes de caractères comptent
// (guillemets, apostrophes, accents graves) et les blocs <style>, ce qui évite
// les ancres `#id` et le texte courant.
import { lireCss } from './lecteurs/css.js'
import { normaliserValeur } from './outils.js'

const MAX_LISTE = 10

const RE_FONCTION = /\b(var|rgba?|hsla?)\(/gi
const RE_VAR = /var\(\s*(--[^\s,)]+)/gi
const RE_HEX = /(?<![\w&#])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![\w-])/gi
const RE_PX = /(?<![\w.#])(-?\d*\.?\d+)px(?![\w-])/gi
const RE_CHAINE = /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/g
const RE_STYLE = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi

const extensionDe = (nom) => {
  const m = /\.([a-z0-9]+)$/i.exec(nom)
  return m ? '.' + m[1].toLowerCase() : ''
}
const EST_CSS = new Set(['.css', '.scss', '.less'])
const EST_SCRIPT = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'])

// Index juste après la parenthèse fermante qui correspond à celle de `debut`
// (ou la fin du texte si elle ne ferme jamais).
function finParenthese(texte, debut) {
  let profondeur = 0
  for (let i = debut; i < texte.length; i++) {
    if (texte[i] === '(') profondeur++
    else if (texte[i] === ')' && --profondeur === 0) return i + 1
  }
  return texte.length
}

// Une valeur (ou un contenu de chaîne) → noms de tokens utilisés et valeurs en dur.
function scruterValeur(valeur) {
  const usages = []
  const enDur = []
  let reste = ''
  let position = 0
  const re = new RegExp(RE_FONCTION.source, 'gi')
  let m
  while ((m = re.exec(valeur))) {
    const fin = finParenthese(valeur, m.index + m[0].length - 1)
    const bloc = valeur.slice(m.index, fin)
    for (const v of bloc.matchAll(RE_VAR)) usages.push(v[1])
    // Un var(…) n'est jamais une valeur en dur, ni ce qu'il contient (valeur de secours) ;
    // une couleur qui contient un var(…) est déjà en partie tokenisée : non comptée.
    if (m[1].toLowerCase() !== 'var' && !/var\(/i.test(bloc)) enDur.push(bloc)
    reste += valeur.slice(position, m.index) + ' '
    position = fin
    re.lastIndex = fin
  }
  reste += valeur.slice(position)

  for (const h of reste.matchAll(RE_HEX)) enDur.push(h[0])
  for (const p of reste.matchAll(RE_PX)) {
    const n = Math.abs(Number(p[1]))
    if (n !== 0 && n !== 1) enDur.push(p[0])
  }
  return { usages, enDur }
}

function cumuler(total, partie) {
  total.usages.push(...partie.usages)
  total.enDur.push(...partie.enDur)
}

// Déclarations d'un contenu CSS (et valeurs des propriétés personnalisées locales).
function scruterCss(contenu, scss) {
  const total = { usages: [], enDur: [] }
  const { tokens, declarations } = lireCss(contenu, scss ? 'x.scss' : 'x.css')
  const valeurs = [...declarations.map((d) => d.valeur), ...tokens.map((t) => t.valeur)]
  for (const valeur of valeurs) {
    // Comme R3 : ni url(…), ni chaînes (content: "#fff").
    const nettoyee = valeur.replace(/url\([^)]*\)/gi, ' ').replace(/(["'])(?:\\.|(?!\1).)*\1/g, ' ')
    cumuler(total, scruterValeur(nettoyee))
  }
  return total
}

function scruterScript(contenu, extension) {
  const total = { usages: [], enDur: [] }
  let texte = contenu
  if (extension === '.vue' || extension === '.svelte') {
    texte = texte.replace(/<!--[\s\S]*?-->/g, ' ')
    texte = texte.replace(RE_STYLE, (_, attributs, css) => {
      cumuler(total, scruterCss(css, /lang=["']?(scss|less)/i.test(attributs)))
      return ' '
    })
  }
  texte = texte.replace(/\/\*[\s\S]*?(\*\/|$)/g, ' ').replace(/(^|\s)\/\/[^\n]*/gm, '$1')
  for (const chaine of texte.matchAll(RE_CHAINE)) cumuler(total, scruterValeur(chaine[0].slice(1, -1)))
  return total
}

// Résultat par fichier, gardé en mémoire : usages et couverture lisent le même objet.
const memoire = new WeakMap()

function analyserFichier(fichier) {
  if (memoire.has(fichier)) return memoire.get(fichier)
  const extension = extensionDe(fichier.nom)
  let resultat = { usages: [], enDur: [] }
  if (EST_CSS.has(extension)) resultat = scruterCss(fichier.contenu, extension !== '.css')
  else if (EST_SCRIPT.has(extension)) resultat = scruterScript(fichier.contenu, extension)
  memoire.set(fichier, resultat)
  return resultat
}

const lisible = (fichiers) =>
  (Array.isArray(fichiers) ? fichiers : []).filter(
    (f) => f && typeof f.nom === 'string' && typeof f.contenu === 'string'
  )

// Noms de tokens utilisés par le code, pour `analyse(fichiers, { usagesExternes })`.
// `var(--a-b-c)` marque utilisés `--a-b-c` (CSS) et `a.b.c` (noms DTCG / Tokens Studio).
export function extraireUsagesTokens(fichiersCode) {
  const noms = new Set()
  for (const f of lisible(fichiersCode)) {
    try {
      for (const nom of analyserFichier(f).usages) {
        noms.add(nom)
        noms.add(nom.slice(2).replace(/-/g, '.'))
      }
    } catch {
      // Un fichier illisible n'empêche pas de lire les autres.
    }
  }
  return noms
}

const trierParNombre = (a, b, cle) => b.occurrences - a.occurrences || (a[cle] < b[cle] ? -1 : a[cle] > b[cle] ? 1 : 0)

// fichiersCode = [{ nom, contenu }], tokens = tokens lus par `analyse` (modèle commun).
export function mesurerCouverture(fichiersCode, tokens = []) {
  const fichiers = lisible(fichiersCode)
  const parFichier = []
  const valeurs = new Map() // valeur normalisée → { occurrences, fichiers: Set }
  let usagesTokens = 0
  let valeursEnDur = 0
  let fichiersAnalyses = 0

  for (const f of fichiers) {
    let r
    try {
      r = analyserFichier(f)
    } catch {
      continue
    }
    fichiersAnalyses++
    usagesTokens += r.usages.length
    valeursEnDur += r.enDur.length
    if (r.enDur.length > 0) parFichier.push({ fichier: f.nom, valeursEnDur: r.enDur.length, usagesTokens: r.usages.length })
    for (const brute of r.enDur) {
      const cle = normaliserValeur(brute)
      if (!valeurs.has(cle)) valeurs.set(cle, { valeur: cle, occurrences: 0, fichiers: new Set() })
      const v = valeurs.get(cle)
      v.occurrences++
      v.fichiers.add(f.nom)
    }
  }

  // Valeurs brutes des tokens existants : couleur ou longueur définie une fois pour toutes.
  const tokenParValeur = new Map()
  for (const t of Array.isArray(tokens) ? tokens : []) {
    if (typeof t?.valeur !== 'string' || t.valeur === '' || t.references?.length) continue
    const cle = normaliserValeur(t.valeur)
    if (!tokenParValeur.has(cle)) tokenParValeur.set(cle, t.nom)
  }

  const toutes = [...valeurs.values()].map((v) => ({ ...v, fichiers: [...v.fichiers].sort() }))
  const dejaTokenisees = toutes
    .filter((v) => tokenParValeur.has(v.valeur))
    .map((v) => ({ valeur: v.valeur, token: tokenParValeur.get(v.valeur), occurrences: v.occurrences }))
    .sort((a, b) => trierParNombre(a, b, 'valeur'))

  const total = usagesTokens + valeursEnDur
  return {
    fichiersAnalyses,
    usagesTokens,
    valeursEnDur,
    taux: total === 0 ? null : usagesTokens / total,
    parFichier: parFichier
      .sort((a, b) => b.valeursEnDur - a.valeursEnDur || (a.fichier < b.fichier ? -1 : 1))
      .slice(0, MAX_LISTE),
    // Une valeur vue une seule fois n'est pas « répétée » : elle n'entre pas dans la liste.
    valeursRepetees: toutes
      .filter((v) => v.occurrences >= 2)
      .sort((a, b) => trierParNombre(a, b, 'valeur'))
      .slice(0, MAX_LISTE),
    dejaTokenisees: dejaTokenisees.slice(0, MAX_LISTE),
    nombreDejaTokenisees: dejaTokenisees.length,
  }
}
