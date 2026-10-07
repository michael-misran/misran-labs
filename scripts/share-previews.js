import fs from 'node:fs'
import path from 'node:path'
import { writeRssFeeds } from './rss.js'

export const SITE_URL = 'https://misran-labs.vercel.app'

const PROJETS_FIXED = {
  title: 'Les idées du Lab — idées en développement · Misran Labs',
  description: 'Des idées de produits numérotées, étudiées puis gardées ou arrêtées.',
  image: 'og-projets.png',
}
const PROJETS_FONCTIONNEMENT_FIXED = {
  title: 'Comment fonctionnent les idées du Lab · Misran Labs',
  description: 'La routine du dimanche, les fiches publiques, les décisions.',
  image: 'og-projets.png',
}
const BREVES_FIXED = {
  title: 'La Gazette du Lab — les brèves IA et tech du jour · Misran Labs',
  description: 'Chaque jour, quelques brèves d\'actu IA et tech tirées de La Gazette du Lab, le journal papier du matin, avec le mot et le chiffre du jour.',
  image: 'og-image.png',
}
const SUIVRE_FIXED = {
  title: 'Suivre le Lab · Misran Labs',
  description: 'Misran Labs, maison d’édition indépendante : pas de compte à créer, un lecteur RSS ou un réseau suffit pour que les nouveautés viennent à vous.',
  image: 'og-image.png',
}
const KIOSQUE_FIXED = {
  title: 'La vitrine du kiosque · Misran Labs',
  description: 'Tous les titres de Misran Labs, maison d’édition indépendante, sur un seul présentoir : la Gazette, le Zine, la salle de jeu et le Lab.',
  image: 'og-image.png',
}
const ZINE_FIXED = {
  title: 'Misran Zine — fait main, pas en série · Misran Labs',
  description: 'Le fanzine de Misran Labs, maison d’édition indépendante : photos, dessins, jeux et pages de carnet.',
  image: 'og-image.png',
}
const JEUX_FIXED = {
  title: 'Jeux — petits défis quotidiens · Misran Labs',
  description: 'Un mini-jeu par jour, noté sur 100 et partageable en un clic, façon neal.fun.',
  image: 'og-image.png',
}

// Échappe une valeur pour un attribut HTML.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Échappe une valeur pour un nœud texte XML (sitemap, flux RSS).
export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Ramène espaces multiples / retours à la ligne à un seul espace, puis
// tronque au dernier espace avant 155 caractères (pas de troncature si
// le texte tient déjà en 160 caractères).
function normalizeAndTruncate(text) {
  const normalized = String(text).replace(/\s+/g, ' ').trim()
  if (normalized.length <= 160) return normalized
  const cut = normalized.slice(0, 155)
  const lastSpace = cut.lastIndexOf(' ')
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`
}

// Remplace le contenu d'une balise <meta name="..."> ou <meta property="...">
// en ciblant précisément son attribut content. Échoue si la balise est
// introuvable : mieux vaut un build en échec qu'un aperçu faux en silence.
function replaceMetaContent(html, attr, attrValue, newContent) {
  const re = new RegExp(`(<meta\\s+${attr}="${attrValue}"\\s+content=")([^"]*)("\\s*/?>)`)
  if (!re.test(html)) {
    throw new Error(`[share-previews] balise introuvable : <meta ${attr}="${attrValue}">`)
  }
  return html.replace(re, `$1${escapeHtml(newContent)}$3`)
}

function replaceTitleTag(html, newTitle) {
  const re = /(<title>)([^<]*)(<\/title>)/
  if (!re.test(html)) {
    throw new Error('[share-previews] balise introuvable : <title>')
  }
  return html.replace(re, `$1${escapeHtml(newTitle)}$3`)
}

// Ajoute (ou remplace si déjà présent) le <link rel="canonical"> juste avant </head>.
function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`
  const existingRe = /<link rel="canonical"[^>]*\/>\s*/
  if (existingRe.test(html)) {
    return html.replace(existingRe, `${tag}\n    `)
  }
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function applyPreview(baseHtml, { path: pagePath, title, description, image, type }) {
  const url = `${SITE_URL}${pagePath}`
  const imageUrl = `${SITE_URL}/${image}`
  let html = baseHtml
  html = replaceTitleTag(html, title)
  html = replaceMetaContent(html, 'name', 'description', description)
  html = replaceMetaContent(html, 'property', 'og:type', type)
  html = replaceMetaContent(html, 'property', 'og:url', url)
  html = replaceMetaContent(html, 'property', 'og:title', title)
  html = replaceMetaContent(html, 'property', 'og:description', description)
  html = replaceMetaContent(html, 'property', 'og:image', imageUrl)
  html = replaceMetaContent(html, 'name', 'twitter:title', title)
  html = replaceMetaContent(html, 'name', 'twitter:description', description)
  html = replaceMetaContent(html, 'name', 'twitter:image', imageUrl)
  html = setCanonical(html, url)
  return html
}

function writePage(distDir, pagePath, html) {
  const dir = path.join(distDir, pagePath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

// Construit dist/sitemap.xml (format sitemaps.org 0.9) à partir des URL
// données : l'accueil, puis chaque page d'aperçu avec son lastmod optionnel.
function buildSitemapXml(urls) {
  const items = urls
    .map(({ loc, lastmod }) => {
      const lastmodTag = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ''
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodTag}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
}

// Lit un JSON de jour de Gazette ou d'idée Projets ; ignore (avec
// avertissement) si le fichier est illisible ou sans les champs attendus.
// Ne fait jamais échouer le build : le site ignore déjà ces fichiers de son côté.
function readValidJson(filePath, requiredFields) {
  let data
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (err) {
    console.warn(`[share-previews] ignoré (JSON invalide) : ${filePath} — ${err.message}`)
    return null
  }
  for (const field of requiredFields) {
    const value = field.split('.').reduce((acc, key) => acc?.[key], data)
    if (value === undefined || value === null || value === '') {
      console.warn(`[share-previews] ignoré (champ "${field}" manquant) : ${filePath}`)
      return null
    }
  }
  return data
}

// Numéros du Zine (src/zine/numeros/NN.json) : une page d'aperçu par
// numéro, image de rubrique tant qu'il n'existe pas d'image par numéro.
export function collectZineNumeros(rootDir) {
  const dir = path.join(rootDir, 'src/zine/numeros')
  if (!fs.existsSync(dir)) return []
  const pages = []
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) continue
    const data = readValidJson(path.join(dir, file), ['numero', 'titre.fr', 'edito.fr'])
    if (!data) continue
    if (file !== `${String(data.numero).padStart(2, '0')}.json`) {
      console.warn(`[share-previews] ignoré (numéro "${data.numero}" ≠ nom de fichier) : ${file}`)
      continue
    }
    pages.push({
      path: `/zine/${data.numero}`,
      title: `#${String(data.numero).padStart(2, '0')} — ${data.titre.fr} · Misran Zine`,
      description: normalizeAndTruncate(data.edito.fr),
      image: ZINE_FIXED.image,
      type: 'article',
    })
  }
  return pages
}

// D7 (mission breves) : pas d'image propre — l'image générique du site
// sert pour /breves et chaque jour, contrairement aux idées Projets qui ont
// leur propre image par idée.
export function collectBrevesJours(rootDir) {
  const dir = path.join(rootDir, 'src/breves/jours')
  if (!fs.existsSync(dir)) return []
  const pages = []
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) continue
    const dateFromName = file.replace(/\.json$/, '')
    const data = readValidJson(path.join(dir, file), ['date', 'breves.0.titre.fr', 'breves.0.resume.fr'])
    if (!data) continue
    if (data.date !== dateFromName) {
      console.warn(`[share-previews] ignoré (date "${data.date}" ≠ nom de fichier) : ${file}`)
      continue
    }

    pages.push({
      path: `/breves/${dateFromName}`,
      title: `${data.breves[0].titre.fr} · La Gazette du Lab — Misran Labs`,
      description: normalizeAndTruncate(data.breves[0].resume.fr),
      image: BREVES_FIXED.image,
      type: 'article',
      lastmod: data.date,
      raw: data,
    })
  }
  return pages
}

export function collectProjetsIdees(rootDir) {
  const dir = path.join(rootDir, 'src/projets/idees')
  if (!fs.existsSync(dir)) return []
  const pages = []
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) continue
    const idFromName = file.replace(/\.json$/, '')
    const data = readValidJson(path.join(dir, file), ['id', 'titre.fr', 'resume.fr'])
    if (!data) continue
    if (data.id !== idFromName) {
      console.warn(`[share-previews] ignoré (id "${data.id}" ≠ nom de fichier) : ${file}`)
      continue
    }
    pages.push({
      path: `/projets/${idFromName}`,
      title: `${idFromName} — ${data.titre.fr} · Misran Labs`,
      description: normalizeAndTruncate(data.resume.fr),
      image: PROJETS_FIXED.image,
      type: 'article',
      lastmod: data.date,
      raw: data,
    })
  }
  return pages
}

// Lecture générique de src/jeux/*/meta.js (D3) : pas de liste codée en dur,
// un jeu de plus = un dossier de plus, lu automatiquement au build.
async function collectJeux(rootDir) {
  const dir = path.join(rootDir, 'src/jeux')
  if (!fs.existsSync(dir)) return []
  const pages = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue
    const metaPath = path.join(dir, entry.name, 'meta.js')
    if (!fs.existsSync(metaPath)) continue

    let meta
    try {
      const mod = await import(metaPath)
      meta = mod.default ?? mod
    } catch (err) {
      console.warn(`[share-previews] jeu ignoré (import impossible) : ${entry.name} — ${err.message}`)
      continue
    }

    if (!meta || meta.slug !== entry.name || !meta.titre?.fr || !meta.accroche?.fr) {
      console.warn(`[share-previews] jeu ignoré (meta.js invalide) : ${entry.name}`)
      continue
    }

    pages.push({
      path: `/jeux/${meta.slug}`,
      title: `${meta.titre.fr} · Jeux — Misran Labs`,
      description: normalizeAndTruncate(meta.accroche.fr),
      image: JEUX_FIXED.image,
      type: 'website',
    })
  }
  return pages
}

async function collectLabProjects(rootDir) {
  const mod = await import(path.join(rootDir, 'src/lab/projects.js'))
  return mod.visibleProjects().map((p) => ({
    path: `/lab/${p.slug}`,
    title: `${p.title.fr} — Lab · Misran Labs`,
    description: normalizeAndTruncate(p.summary.fr),
    image: 'og-lab.png',
    type: 'website',
  }))
}

// Pages de démo (/lab/<slug>/demo, /lab/<slug>/demo/v2) : routes réelles de
// App.jsx (ProjectDemoPage) sans fichier généré jusqu'ici. Pas dans le
// sitemap (pages secondaires) : à appeler séparément de collectLabProjects.
async function collectLabDemoPages(rootDir) {
  const mod = await import(path.join(rootDir, 'src/lab/projects.js'))
  const pages = []
  for (const p of mod.visibleProjects()) {
    const base = {
      title: `${p.title.fr} — démo · Misran Labs`,
      description: normalizeAndTruncate(p.summary.fr),
      image: 'og-lab.png',
      type: 'website',
    }
    if (p.demoComponent) pages.push({ ...base, path: `/lab/${p.slug}/demo` })
    if (p.demoComponentV2) pages.push({ ...base, path: `/lab/${p.slug}/demo/v2` })
  }
  return pages
}

// dist/404.html : copie de dist/index.html avec un titre dédié, indexation
// refusée, et sans URL canonique (une page 404 n'a pas d'adresse propre).
function build404Html(baseHtml) {
  let html = baseHtml
  html = replaceTitleTag(html, 'Page introuvable · Misran Labs')
  html = html.replace(/<link rel="canonical"[^>]*\/>\s*/, '')
  html = html.replace('<head>', '<head>\n    <meta name="robots" content="noindex">')
  return html
}

// Plugin Vite : génère, seulement au build, une copie de dist/index.html
// par page publique listée dans la SPEC de la mission apercus-partage,
// avec ses propres balises d'aperçu de partage (titre, description, image, url).
// Les robots de partage ne lisent que le HTML reçu, sans exécuter le JS ; le
// JS/CSS référencé reste identique, donc l'application démarre normalement
// et React Router affiche la bonne page.
export function sharePreviewsPlugin() {
  return {
    name: 'share-previews',
    apply: 'build',
    async closeBundle() {
      const rootDir = process.cwd()
      const distDir = path.join(rootDir, 'dist')
      const indexPath = path.join(distDir, 'index.html')
      const baseHtml = fs.readFileSync(indexPath, 'utf-8')

      const homeUrl = `${SITE_URL}/`
      fs.writeFileSync(indexPath, setCanonical(baseHtml, homeUrl))

      const brevesPages = collectBrevesJours(rootDir)
      const projetsPages = collectProjetsIdees(rootDir)
      const jeuxPages = await collectJeux(rootDir)

      const pages = [
        { path: '/breves', title: BREVES_FIXED.title, description: BREVES_FIXED.description, image: BREVES_FIXED.image, type: 'website' },
        { path: '/projets', title: PROJETS_FIXED.title, description: PROJETS_FIXED.description, image: PROJETS_FIXED.image, type: 'website' },
        { path: '/projets/fonctionnement', title: PROJETS_FONCTIONNEMENT_FIXED.title, description: PROJETS_FONCTIONNEMENT_FIXED.description, image: PROJETS_FONCTIONNEMENT_FIXED.image, type: 'website' },
        { path: '/suivre', title: SUIVRE_FIXED.title, description: SUIVRE_FIXED.description, image: SUIVRE_FIXED.image, type: 'website' },
        { path: '/kiosque', title: KIOSQUE_FIXED.title, description: KIOSQUE_FIXED.description, image: KIOSQUE_FIXED.image, type: 'website' },
        { path: '/zine', title: ZINE_FIXED.title, description: ZINE_FIXED.description, image: ZINE_FIXED.image, type: 'website' },
        { path: '/jeux', title: JEUX_FIXED.title, description: JEUX_FIXED.description, image: JEUX_FIXED.image, type: 'website' },
        ...collectZineNumeros(rootDir),
        ...brevesPages,
        ...projetsPages,
        ...jeuxPages,
        ...(await collectLabProjects(rootDir)),
      ]

      for (const page of pages) {
        const html = applyPreview(baseHtml, page)
        writePage(distDir, page.path, html)
      }

      console.log(`[share-previews] ${pages.length} page(s) d'aperçu générées :`)
      for (const page of pages) console.log(`  - ${page.path}`)

      const demoPages = await collectLabDemoPages(rootDir)
      for (const page of demoPages) {
        const html = applyPreview(baseHtml, page)
        writePage(distDir, page.path, html)
      }
      console.log(`[share-previews] ${demoPages.length} page(s) de démo générées (hors sitemap) :`)
      for (const page of demoPages) console.log(`  - ${page.path}`)

      const sitemapUrls = [
        { loc: homeUrl },
        ...pages.map((page) => ({ loc: `${SITE_URL}${page.path}`, lastmod: page.lastmod })),
      ]
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemapXml(sitemapUrls))
      console.log(`[share-previews] sitemap.xml : ${sitemapUrls.length} URL`)

      fs.writeFileSync(path.join(distDir, '404.html'), build404Html(baseHtml))
      console.log('[share-previews] dist/404.html écrit')

      writeRssFeeds({ distDir, brevesPages, projetsPages })
    },
  }
}
