// Convertit le livre Canopée (Markdown du dépôt privé) dans le format du site :
// un fichier JSON par partie dans src/canopee/parties/, un sommaire, et les SVG
// utilisés dans public/canopee/visuels/. Aucune dépendance.
//
// Seuls entrent docs/livre/00-*.md à 19-*.md et les SVG qu'ils citent. Une
// syntaxe inconnue arrête le script : rien ne doit se perdre en silence.
//
// Conversion :    node scripts/canopee-convertir.mjs <dossier du dépôt canopee>
// Vérification :  node scripts/canopee-convertir.mjs <dossier du dépôt canopee> --verifier
//   (reconstruit chaque Markdown depuis le JSON et le compare à la source)

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

const SORTIE_PARTIES = 'src/canopee/parties'
const SORTIE_VISUELS = 'public/canopee/visuels'

// ---------- Texte courant : gras, italique, code ----------

function lireEnLigne(texte) {
  const morceaux = []
  let courant = ''
  const pousser = () => { if (courant) morceaux.push(courant); courant = '' }
  let i = 0
  while (i < texte.length) {
    if (texte[i] === '`') {
      const fin = texte.indexOf('`', i + 1)
      if (fin > i) { pousser(); morceaux.push({ c: texte.slice(i + 1, fin) }); i = fin + 1; continue }
    }
    if (texte.startsWith('**', i)) {
      const fin = texte.indexOf('**', i + 2)
      if (fin > i + 2) { pousser(); morceaux.push({ g: lireEnLigne(texte.slice(i + 2, fin)) }); i = fin + 2; continue }
    }
    // Italique : l'astérisque ouvrant colle au mot, le fermant aussi
    if (texte[i] === '*' && texte[i + 1] && !/[\s*]/.test(texte[i + 1])) {
      let fin = texte.indexOf('*', i + 1)
      while (fin > 0 && (texte[fin + 1] === '*' || /\s/.test(texte[fin - 1]))) fin = texte.indexOf('*', fin + 2)
      if (fin > i) { pousser(); morceaux.push({ i: lireEnLigne(texte.slice(i + 1, fin)) }); i = fin + 1; continue }
    }
    courant += texte[i]
    i += 1
  }
  pousser()
  return morceaux
}

function ecrireEnLigne(morceaux) {
  return morceaux.map((m) => {
    if (typeof m === 'string') return m
    if (m.c !== undefined) return `\`${m.c}\``
    if (m.g) return `**${ecrireEnLigne(m.g)}**`
    return `*${ecrireEnLigne(m.i)}*`
  }).join('')
}

const texteBrut = (morceaux) => morceaux.map((m) => {
  if (typeof m === 'string') return m
  if (m.c !== undefined) return m.c
  return texteBrut(m.g ?? m.i)
}).join('')

// ---------- Tableaux : « \| » est un trait littéral, pas une séparation ----------

function cellules(ligne) {
  const brut = ligne.trim().replace(/^\|/, '').replace(/\|$/, '')
  return brut.split(/(?<!\\)\|/).map((c) => lireEnLigne(c.trim().replace(/\\\|/g, '|')))
}

const ecrireCellules = (rangee) => `| ${rangee.map((c) => ecrireEnLigne(c).replace(/\|/g, '\\|')).join(' | ')} |`

// ---------- Blocs ----------

function slugifier(texte) {
  return texte.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function lireBlocs(lignes, ids = new Map()) {
  const blocs = []
  let i = 0
  while (i < lignes.length) {
    const l = lignes[i]
    if (!l.trim()) { i += 1; continue }

    const titre = l.match(/^(#{1,3}) (.+)$/)
    if (titre) {
      const x = lireEnLigne(titre[2])
      const base = slugifier(texteBrut(x))
      const n = (ids.get(base) ?? 0) + 1
      ids.set(base, n)
      blocs.push({ t: `h${titre[1].length}`, id: n > 1 ? `${base}-${n}` : base, x })
      i += 1
      continue
    }
    if (l.startsWith('```')) {
      const fin = lignes.indexOf('```', i + 1)
      if (fin < 0) throw new Error(`Bloc de code non fermé : ${l}`)
      blocs.push({ t: 'code', langue: l.slice(3), texte: lignes.slice(i + 1, fin).join('\n') })
      i = fin + 1
      continue
    }
    const image = l.match(/^!\[([^\]]*)\]\(\.\.\/visuels\/([\w-]+\.svg)\)$/)
    if (image) {
      blocs.push({ t: 'fig', alt: image[1], src: image[2] })
      i += 1
      continue
    }
    if (l.startsWith('|')) {
      const debut = i
      while (i < lignes.length && lignes[i].startsWith('|')) i += 1
      const [entete, separation, ...corps] = lignes.slice(debut, i)
      if (!/^\|[\s:|-]+\|$/.test(separation ?? '')) throw new Error(`Tableau sans séparation : ${entete}`)
      blocs.push({ t: 'table', sep: separation, entete: cellules(entete), lignes: corps.map(cellules) })
      continue
    }
    if (l === '>' || l.startsWith('> ')) {
      const debut = i
      while (i < lignes.length && (lignes[i] === '>' || lignes[i].startsWith('> '))) i += 1
      blocs.push({ t: 'cite', blocs: lireBlocs(lignes.slice(debut, i).map((c) => c.slice(2)), ids) })
      continue
    }
    if (l.startsWith('- ')) {
      const items = []
      while (i < lignes.length && lignes[i].startsWith('- ')) { items.push(lireEnLigne(lignes[i].slice(2))); i += 1 }
      blocs.push({ t: 'ul', items })
      continue
    }
    if (/^\d+\. /.test(l)) {
      const debut = parseInt(l, 10)
      const items = []
      while (i < lignes.length && /^\d+\. /.test(lignes[i])) {
        if (parseInt(lignes[i], 10) !== debut + items.length) throw new Error(`Liste mal numérotée : ${lignes[i]}`)
        items.push(lireEnLigne(lignes[i].replace(/^\d+\. /, '')))
        i += 1
      }
      blocs.push({ t: 'ol', debut, items })
      continue
    }
    // Rien de ce qui ressemble à une syntaxe non gérée ne passe en paragraphe
    if (/^(\s|[*+] |#{4,}|<|---$)/.test(l)) throw new Error(`Syntaxe inconnue : ${l}`)
    if (/(?<!!)\[[^\]]*\]\(/.test(l) || /!\[/.test(l)) throw new Error(`Lien ou image dans le texte : ${l}`)
    blocs.push({ t: 'p', x: lireEnLigne(l) })
    i += 1
  }
  return blocs
}

function ecrireBlocs(blocs) {
  return blocs.map((b) => {
    if (b.t === 'h1' || b.t === 'h2' || b.t === 'h3') return `${'#'.repeat(Number(b.t[1]))} ${ecrireEnLigne(b.x)}`
    if (b.t === 'p') return ecrireEnLigne(b.x)
    if (b.t === 'code') return `\`\`\`${b.langue}\n${b.texte}\n\`\`\``
    if (b.t === 'fig') return `![${b.alt}](../visuels/${b.src})`
    if (b.t === 'ul') return b.items.map((x) => `- ${ecrireEnLigne(x)}`).join('\n')
    if (b.t === 'ol') return b.items.map((x, n) => `${b.debut + n}. ${ecrireEnLigne(x)}`).join('\n')
    if (b.t === 'cite') return ecrireBlocs(b.blocs).split('\n').map((c) => (c ? `> ${c}` : '>')).join('\n')
    if (b.t === 'table') return [ecrireCellules(b.entete), b.sep, ...b.lignes.map(ecrireCellules)].join('\n')
    throw new Error(`Bloc inconnu : ${b.t}`)
  }).join('\n\n')
}

// Compare au blanc près seulement : lignes vides (y compris « > » seul dans une
// citation, où chaque ligne devient un paragraphe) et espaces des cellules de tableau
const normaliser = (md) => md.split('\n')
  .map((l) => (l.startsWith('|') && !/^\|[\s:|]*-[\s:|-]*\|$/.test(l) ? l.split(/(?<!\\)\|/).map((c) => c.trim()).join('|') : l.trimEnd()))
  .filter((l) => l !== '' && l !== '>')
  .join('\n')

// ---------- Programme ----------

const [depot, option] = process.argv.slice(2)
if (!depot) throw new Error('Indiquer le dossier du dépôt canopee')
const dossierLivre = join(depot, 'docs/livre')
const sources = readdirSync(dossierLivre).filter((f) => /^(0\d|1\d)-.*\.md$/.test(f)).sort()
if (sources.length !== 20) throw new Error(`20 parties attendues, ${sources.length} trouvées`)

const slugDe = (f) => basename(f, '.md').replace(/^\d+-/, '')

if (option === '--verifier') {
  let ecarts = 0
  for (const f of sources) {
    const source = readFileSync(join(dossierLivre, f), 'utf8')
    const { blocs } = JSON.parse(readFileSync(join(SORTIE_PARTIES, `${basename(f, '.md')}.json`), 'utf8'))
    const a = normaliser(source).split('\n')
    const b = normaliser(ecrireBlocs(blocs)).split('\n')
    const i = a.findIndex((l, n) => l !== b[n])
    if (i >= 0 || a.length !== b.length) {
      ecarts += 1
      console.log(`ÉCART ${f}, ligne ${i}\n  source : ${a[i]}\n  site   : ${b[i]}`)
    } else {
      console.log(`identique  ${f}  (${a.length} lignes)`)
    }
  }
  console.log(ecarts ? `${ecarts} partie(s) en écart` : 'Les 20 parties sont identiques à la source.')
  process.exit(ecarts ? 1 : 0)
}

mkdirSync(SORTIE_PARTIES, { recursive: true })
mkdirSync(SORTIE_VISUELS, { recursive: true })
const sommaire = []
const visuels = new Set()
const figures = (blocs) => blocs.forEach((b) => {
  if (b.t === 'fig') visuels.add(b.src)
  if (b.t === 'cite') figures(b.blocs)
})

sources.forEach((f) => {
  const blocs = lireBlocs(readFileSync(join(dossierLivre, f), 'utf8').split('\n'))
  if (blocs[0]?.t !== 'h1') throw new Error(`${f} ne commence pas par un titre`)
  const titre = texteBrut(blocs[0].x)
  const decoupe = titre.match(/^(Introduction|Conclusion|Chapitre \d+|Annexe [A-Z])\. (.+)$/)
  if (!decoupe) throw new Error(`Titre inattendu : ${titre}`)
  figures(blocs)
  writeFileSync(join(SORTIE_PARTIES, `${basename(f, '.md')}.json`), `${JSON.stringify({ blocs }, null, 1)}\n`)
  sommaire.push({
    fichier: basename(f, '.md'),
    slug: slugDe(f),
    etiquette: decoupe[1],
    titre: decoupe[2],
    annexe: decoupe[1].startsWith('Annexe'),
    intertitres: blocs.filter((b) => b.t === 'h2').map((b) => ({ id: b.id, x: texteBrut(b.x) })),
  })
})

writeFileSync('src/canopee/sommaire.json', `${JSON.stringify(sommaire, null, 1)}\n`)
for (const v of visuels) {
  const source = join(depot, 'docs/visuels', v)
  if (!existsSync(source)) throw new Error(`Schéma absent : ${v}`)
  copyFileSync(source, join(SORTIE_VISUELS, v))
}
console.log(`${sommaire.length} parties, ${visuels.size} schémas`)
