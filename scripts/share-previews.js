import fs from 'node:fs'
import path from 'node:path'
import { writeRssFeeds } from './rss.js'

export const SITE_URL = 'https://misran-labs.vercel.app'

const MAGAZINE_FIXED = {
  title: 'Lab Magazine — veille IA hebdomadaire · Misran Labs',
  description: 'Une veille IA chaque lundi, pour designers et développeurs.',
  image: 'og-magazine.png',
}
const PROJETS_FIXED = {
  title: 'Projets — idées en développement · Misran Labs',
  description: 'Des idées de produits numérotées, étudiées puis gardées ou arrêtées.',
  image: 'og-projets.png',
}
const PROJETS_FONCTIONNEMENT_FIXED = {
  title: 'Comment fonctionnent les Projets · Misran Labs',
  description: 'La routine du dimanche, les fiches publiques, les décisions.',
  image: 'og-projets.png',
}
const BREVES_FIXED = {
  title: 'Brèves — l\'actu IA et tech du jour · Misran Labs',
  description: 'Chaque jour, quelques brèves d\'actu IA et tech tirées du Journal du matin, avec le mot et le chiffre du jour.',
  image: 'og-magazine.png',
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

// Lit un JSON de numéro de Magazine ou d'idée Projets ; ignore (avec
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

export function collectMagazineNumeros(rootDir) {
  const dir = path.join(rootDir, 'src/magazine/numeros')
  if (!fs.existsSync(dir)) return []
  const pages = []
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.json')) continue
    const dateFromName = file.replace(/\.json$/, '')
    const data = readValidJson(path.join(dir, file), ['numero', 'titre.fr', 'edito.fr'])
    if (!data) continue
    if (data.date !== dateFromName) {
      console.warn(`[share-previews] ignoré (date "${data.date}" ≠ nom de fichier) : ${file}`)
      continue
    }
    const numeroImagePath = path.join(rootDir, 'public/og/magazine', `${dateFromName}.png`)
    let image = MAGAZINE_FIXED.image
    if (fs.existsSync(numeroImagePath)) {
      image = `og/magazine/${dateFromName}.png`
    } else {
      console.warn(`[share-previews] pas d'image pour le numéro ${dateFromName}, image de rubrique utilisée`)
    }

    pages.push({
      path: `/magazine/${dateFromName}`,
      title: `Nº ${data.numero} — ${data.titre.fr} · Lab Magazine`,
      description: normalizeAndTruncate(data.edito.fr),
      image,
      type: 'article',
      lastmod: data.date,
      raw: data,
    })
  }
  return pages
}

// D7 (mission breves) : pas de nouvelle image — l'image de rubrique du
// Magazine sert aussi pour /breves et chaque jour, contrairement au
// Magazine et aux idées Projets qui ont leur propre image par numéro/idée.
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
      title: `${data.breves[0].titre.fr} · Brèves — Misran Labs`,
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

      const magazinePages = collectMagazineNumeros(rootDir)
      const brevesPages = collectBrevesJours(rootDir)
      const projetsPages = collectProjetsIdees(rootDir)

      const pages = [
        { path: '/magazine', title: MAGAZINE_FIXED.title, description: MAGAZINE_FIXED.description, image: MAGAZINE_FIXED.image, type: 'website' },
        { path: '/breves', title: BREVES_FIXED.title, description: BREVES_FIXED.description, image: BREVES_FIXED.image, type: 'website' },
        { path: '/projets', title: PROJETS_FIXED.title, description: PROJETS_FIXED.description, image: PROJETS_FIXED.image, type: 'website' },
        { path: '/projets/fonctionnement', title: PROJETS_FONCTIONNEMENT_FIXED.title, description: PROJETS_FONCTIONNEMENT_FIXED.description, image: PROJETS_FONCTIONNEMENT_FIXED.image, type: 'website' },
        ...magazinePages,
        ...brevesPages,
        ...projetsPages,
        ...(await collectLabProjects(rootDir)),
      ]

      for (const page of pages) {
        const html = applyPreview(baseHtml, page)
        writePage(distDir, page.path, html)
      }

      console.log(`[share-previews] ${pages.length} page(s) d'aperçu générées :`)
      for (const page of pages) console.log(`  - ${page.path}`)

      const sitemapUrls = [
        { loc: homeUrl },
        ...pages.map((page) => ({ loc: `${SITE_URL}${page.path}`, lastmod: page.lastmod })),
      ]
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemapXml(sitemapUrls))
      console.log(`[share-previews] sitemap.xml : ${sitemapUrls.length} URL`)

      writeRssFeeds({ distDir, magazinePages, brevesPages, projetsPages })
    },
  }
}
