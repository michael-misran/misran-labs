// Fabrique un recueil imprimable de L’Oracle du Matin : couverture + sommaire,
// puis les numéros A4 recto verso déjà publiés, dans l'ordre.
// Usage (depuis la racine du dépôt) :
//   node scripts/recueil-oracle.mjs [AAAA-MM-JJ début] [AAAA-MM-JJ fin] [en] [--volume N] [--sortie chemin.pdf]
// Sans dates : tous les numéros disponibles. Sortie par défaut :
//   src/private/journal/recueils/oracle-recueil-<début>-<fin>[-en].pdf
// Dépendances : Google Chrome (impression PDF), pdfunite et pdfinfo (poppler).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'

const RACINE = process.cwd()
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const DOSSIER_PDF = join(RACINE, 'public/oracle/pdf')
const DOSSIER_NUMEROS = join(RACINE, 'src/breves/numeros')

// --- Arguments
const args = process.argv.slice(2)
const option = (nom) => {
  const i = args.indexOf(nom)
  if (i < 0) return undefined
  const v = args[i + 1]
  args.splice(i, 2)
  return v
}
const volume = option('--volume') ?? '1'
let sortie = option('--sortie')
const anglais = args.includes('en')
const dates = args.filter((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)).sort()

// --- Numéros disponibles : un PDF publié et son numéro complet (pour le sommaire)
const suffixe = anglais ? '-en' : ''
const disponibles = readdirSync(DOSSIER_PDF)
  .map((f) => f.match(anglais ? /^(\d{4}-\d{2}-\d{2})-en\.pdf$/ : /^(\d{4}-\d{2}-\d{2})\.pdf$/)?.[1])
  .filter(Boolean)
  .filter((d) => existsSync(join(DOSSIER_NUMEROS, `${d}${anglais ? '.en' : ''}.json`)))
  .sort()
const debut = dates[0] ?? disponibles[0]
const fin = dates[1] ?? dates[0] ?? disponibles.at(-1)
const choisis = disponibles.filter((d) => d >= debut && d <= fin)
if (!choisis.length) {
  console.error(`Aucun numéro entre ${debut} et ${fin}.`)
  process.exit(1)
}
sortie ??= join(RACINE, `src/private/journal/recueils/oracle-recueil-${choisis[0]}-${choisis.at(-1)}${suffixe}.pdf`)

const numeros = choisis.map((d) => JSON.parse(readFileSync(join(DOSSIER_NUMEROS, `${d}${anglais ? '.en' : ''}.json`), 'utf8')))

// --- Textes
const T = anglais
  ? {
      lang: 'en-GB', recueil: 'Collected edition', volume: `Volume ${roman(volume)}`, sommaire: 'Contents',
      numero: 'No.', page: 'p.', une: 'Front page', aussi: 'Also inside',
      sousTitre: (a, b) => `Issues ${a} to ${b}`, maison: '1977 Éditions',
      note: 'Print double-sided, long-edge binding: each issue keeps its front and back on one sheet.',
    }
  : {
      lang: 'fr-FR', recueil: 'Recueil', volume: `Volume ${roman(volume)}`, sommaire: 'Sommaire',
      numero: 'N°', page: 'p.', une: 'À la une', aussi: 'Aussi dans ce numéro',
      sousTitre: (a, b) => `Numéros ${a} à ${b}`, maison: '1977 Éditions',
      note: 'Imprimer recto verso, reliure bord long : chaque numéro garde son recto et son verso sur une même feuille.',
    }
// En français, le premier du mois s'écrit « 1er »
const premier = (s) => (anglais ? s : s.replace(/(^|\s)1(\s)/, '$11er$2'))
const jour = (d, avecAnnee) =>
  premier(new Intl.DateTimeFormat(T.lang, { weekday: 'long', day: 'numeric', month: 'long', ...(avecAnnee ? { year: 'numeric' } : {}), timeZone: 'UTC' })
    .format(new Date(`${d}T12:00:00Z`)))
const periode = (a, b) =>
  `${new Intl.DateTimeFormat(T.lang, { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${a}T12:00:00Z`))} – ${new Intl.DateTimeFormat(T.lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${b}T12:00:00Z`))}`
function roman(n) {
  const v = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let r = ''
  let x = Number(n) || 1
  for (const [k, s] of v) while (x >= k) { r += s; x -= k }
  return r
}
const echappe = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// --- Sommaire : chaque numéro occupe 2 pages, après la couverture et le sommaire
function entrees(pagesAvant) {
  return numeros
    .map((n, i) => {
      const articles = ['page2', 'page3']
        .flatMap((p) => n[p]?.articles ?? [])
        .map((a) => a.titre)
        .filter(Boolean)
        .slice(0, 3)
      return `
      <li>
        <div class="tete">
          <span class="num">${T.numero} ${n.numero}</span>
          <span class="date">${echappe(jour(n.date))}</span>
          <span class="points"></span>
          <span class="page">${T.page} ${pagesAvant + 1 + i * 2}</span>
        </div>
        <div class="une"><span class="rub">${echappe(n.une?.rubrique ?? T.une)}</span> ${echappe(n.une?.titre)}</div>
        ${articles.length ? `<div class="aussi">${articles.map(echappe).join(' · ')}</div>` : ''}
      </li>`
    })
    .join('')
}

const germanica = readFileSync(join(RACINE, 'public/fonts/plain-germanica.ttf')).toString('base64')
const html = (pagesAvant, pageBlanche) => `<!doctype html>
<html lang="${anglais ? 'en' : 'fr'}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Ultra&family=Oswald:wght@500;700&family=IM+Fell+English:ital@0;1&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>
  /* Recueil de L’Oracle du Matin : couverture et sommaire, A4, même encre que le journal */
  @page { size: A4 portrait; margin: 0; }
  @font-face { font-family: 'Plain Germanica'; src: url(data:font/ttf;base64,${germanica}) format('truetype'); }
  :root { --encre: #16120e; --gris: #4b443c; --filet: #a79f93; --rouge: #b3301d; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { color: var(--encre); background: #fff; font-family: 'Crimson Pro', Georgia, serif; }
  .feuille { width: 210mm; height: 297mm; padding: 16mm 18mm; position: relative; break-after: page; overflow: hidden; }
  .feuille:last-child { break-after: auto; }

  /* Couverture */
  .couverture { display: flex; flex-direction: column; align-items: center; text-align: center; border: 0; }
  .cadre { position: absolute; inset: 10mm; border: 1.2pt solid var(--encre); }
  .cadre::after { content: ''; position: absolute; inset: 2.2mm; border: 0.5pt solid var(--encre); }
  .maison-haut { margin-top: 18mm; font: 500 9pt 'Oswald', sans-serif; letter-spacing: 0.35em; text-transform: uppercase; }
  .titre { margin-top: 26mm; font-family: 'Plain Germanica', serif; font-size: 66pt; line-height: 1; }
  .filets { width: 120mm; margin: 9mm auto 0; border-top: 2pt solid var(--encre); border-bottom: 0.6pt solid var(--encre); height: 2.4mm; }
  .recueil { margin-top: 12mm; font-family: 'Ultra', serif; font-size: 30pt; letter-spacing: 0.04em; text-transform: uppercase; }
  .volume { margin-top: 3mm; font: italic 20pt 'IM Fell English', serif; color: var(--rouge); }
  .numeros { margin-top: 16mm; font: 700 12pt 'Oswald', sans-serif; letter-spacing: 0.2em; text-transform: uppercase; }
  .periode { margin-top: 2mm; font: italic 15pt 'IM Fell English', serif; color: var(--gris); }
  .fleuron { margin-top: 18mm; font-size: 22pt; color: var(--rouge); }
  .maison-bas { position: absolute; bottom: 22mm; left: 0; right: 0; font: 500 10pt 'Oswald', sans-serif; letter-spacing: 0.3em; text-transform: uppercase; }
  .note { position: absolute; bottom: 15mm; left: 0; right: 0; font: italic 8.5pt 'IM Fell English', serif; color: var(--gris); }

  /* Sommaire */
  .sommaire h2 { font-family: 'Plain Germanica', serif; font-size: 34pt; font-weight: normal; text-align: center; }
  .sommaire .sous { text-align: center; font: italic 11pt 'IM Fell English', serif; color: var(--gris); margin-top: 1mm; }
  .sommaire hr { border: 0; border-top: 1.5pt solid var(--encre); border-bottom: 0.5pt solid var(--encre); height: 1.6mm; margin: 4mm 0 5mm; }
  .sommaire ol { list-style: none; columns: 2; column-gap: 9mm; column-rule: 0.5pt solid var(--filet); }
  .sommaire li { break-inside: avoid; padding: 0 0 3.2mm; margin-bottom: 3.2mm; border-bottom: 0.4pt dotted var(--filet); }
  .tete { display: flex; align-items: baseline; gap: 2mm; font: 700 8.5pt 'Oswald', sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }
  .tete .num { color: var(--rouge); }
  .tete .date { font-weight: 500; }
  .tete .points { flex: 1; border-bottom: 0.6pt dotted var(--gris); transform: translateY(-1mm); }
  .une { margin-top: 1mm; font-size: 11pt; line-height: 1.2; font-weight: 600; }
  .une .rub { font: italic 9pt 'IM Fell English', serif; color: var(--gris); font-weight: normal; }
  .aussi { margin-top: 0.8mm; font-size: 8.6pt; line-height: 1.25; color: var(--gris); }
</style>
</head>
<body>
  <section class="feuille couverture">
    <div class="cadre"></div>
    <div class="maison-haut">${T.maison}</div>
    <div class="titre">L’Oracle du Matin</div>
    <div class="filets"></div>
    <div class="recueil">${T.recueil}</div>
    <div class="volume">${T.volume}</div>
    <div class="numeros">${T.sousTitre(numeros[0].numero, numeros.at(-1).numero)}</div>
    <div class="periode">${echappe(periode(choisis[0], choisis.at(-1)))}</div>
    <div class="fleuron">❦</div>
    <div class="maison-bas">misran-labs.vercel.app/oracle</div>
    <div class="note">${T.note}</div>
  </section>
  <section class="feuille sommaire">
    <h2>${T.sommaire}</h2>
    <div class="sous">${T.sousTitre(numeros[0].numero, numeros.at(-1).numero)} · ${echappe(periode(choisis[0], choisis.at(-1)))}</div>
    <hr>
    <ol>${entrees(pagesAvant)}</ol>
  </section>
  ${pageBlanche ? '<section class="feuille"></section>' : ''}
</body>
</html>`

// --- Impression de la couverture et du sommaire (nombre de pages pair, pour garder le recto verso)
const travail = join(tmpdir(), `recueil-oracle-${process.pid}`)
mkdirSync(travail, { recursive: true })
const imprimer = (contenu) => {
  const page = join(travail, 'couverture.html')
  const pdf = join(travail, 'couverture.pdf')
  writeFileSync(page, contenu)
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--virtual-time-budget=10000', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, `file://${page}`], { stdio: 'ignore' })
  return pdf
}
const pages = (pdf) => Number(execFileSync('pdfinfo', [pdf], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/)[1])

let couverture = imprimer(html(2, false))
let n = pages(couverture)
if (n !== 2) {
  // Sommaire plus long qu'une page : on recalcule les renvois, et on complète par une page blanche si besoin
  const blanche = n % 2 === 1
  couverture = imprimer(html(n + (blanche ? 1 : 0), blanche))
  n = pages(couverture)
}

// --- Assemblage
mkdirSync(dirname(sortie), { recursive: true })
const morceaux = choisis.map((d) => join(DOSSIER_PDF, `${d}${suffixe}.pdf`))
const impairs = morceaux.filter((f) => pages(f) % 2 === 1)
if (impairs.length) console.warn(`Attention : numéro(s) à nombre de pages impair, le recto verso sera décalé : ${impairs.join(', ')}`)
execFileSync('pdfunite', [couverture, ...morceaux, sortie])
rmSync(travail, { recursive: true, force: true })

console.log(`Recueil : ${sortie}`)
console.log(`${numeros.length} numéros (${T.sousTitre(numeros[0].numero, numeros.at(-1).numero)}), ${pages(sortie)} pages`)
