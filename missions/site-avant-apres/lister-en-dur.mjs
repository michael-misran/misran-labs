// Liste, avec numéro de ligne, les valeurs en px « déjà tokenisées » relevées comme
// en dur par l'audit, dans l'échantillon de code que l'audit lit (mêmes règles que
// src/lab/audit/couverture.js : chaînes JS, déclarations CSS ; var(…) et couleurs ignorés).
// Usage : node missions/site-avant-apres/lister-en-dur.mjs
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { reperer } from '../../src/lab/audit/github.js'
import { lireCss } from '../../src/lab/audit/lecteurs/css.js'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const CIBLES = new Set(['12px', '8px', '10px', '16px', '2px', '24px', '20px', '4px', '32px'])
const RE_PX = /(?<![\w.#])(-?\d*\.?\d+)px(?![\w-])/gi
const RE_CHAINE = /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/g
const RE_FONCTION = /\b(var|rgba?|hsla?)\((?:[^()]|\([^()]*\))*\)/gi
const blanchir = (m) => m.replace(/[^\n]/g, ' ')
const ligneDe = (texte, i) => texte.slice(0, i).split('\n').length

const suivis = execFileSync('git', ['ls-files', '-z'], { cwd: racine, encoding: 'utf8' }).split('\0').filter(Boolean)
const arbre = suivis.map((path) => ({ path, type: 'blob', size: readFileSync(join(racine, path)).length }))
const { echantillon } = reperer(arbre)
console.log(`# échantillon : ${echantillon.length} fichiers`)
const deja = new Set()

for (const { chemin } of echantillon) {
  const contenu = readFileSync(join(racine, chemin), 'utf8')
  if (chemin.endsWith('.css')) {
    const { declarations } = lireCss(contenu, 'x.css')
    for (const d of declarations) {
      const v = d.valeur.replace(RE_FONCTION, ' ')
      for (const p of v.matchAll(RE_PX)) if (CIBLES.has(p[0])) console.log(`${chemin}\t?\t${p[0]}\t${d.valeur}`)
    }
    continue
  }
  const texte = contenu
    .replace(/\/\*[\s\S]*?(\*\/|$)/g, blanchir)
    .replace(/(^|\s)\/\/[^\n]*/gm, (m, a) => a + blanchir(m.slice(a.length)))
  for (const s of texte.matchAll(RE_CHAINE)) {
    const valeur = s[0].slice(1, -1).replace(RE_FONCTION, ' ')
    for (const p of valeur.matchAll(RE_PX)) {
      if (!CIBLES.has(p[0])) continue
      const n = ligneDe(texte, s.index)
      const ligne = contenu.split('\n')[n - 1].trim()
      if (deja.has(`${chemin}:${n}`) && process.argv.includes('--ligne')) continue
      deja.add(`${chemin}:${n}`)
      console.log(`${chemin}:${n}\t${p[0]}\t${s[0].slice(0, 60)}\t${process.argv.includes('--ligne') ? ligne.slice(0, 260) : ''}`)
    }
  }
}
